import {
  User, Branch, ShopProfile, Product, Customer, PurchaseBill, SaleBill,
  CustomerLoan, Expense, TruckTrip, AuditLog, NotificationItem, CashDrawerShift, Quotation, PurchaseOrder
} from '../types';
import {
  initialShopProfile, initialBranches, initialUsers, initialProducts,
  initialCustomers, initialPurchases, initialSales, initialLoans,
  initialExpenses, initialCashDrawer, initialTruckTrips, initialAuditLogs, initialNotifications
} from '../data/seedData';

class ERPDatabase {
  private getStorage<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(`smart_recycle_${key}`);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private setStorage<T>(key: string, val: T): void {
    try {
      localStorage.setItem(`smart_recycle_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  // Shop Profile
  getShopProfile(): ShopProfile {
    return this.getStorage('shop_profile', initialShopProfile);
  }
  saveShopProfile(profile: ShopProfile) {
    this.setStorage('shop_profile', profile);
  }

  // Branches
  getBranches(): Branch[] {
    return this.getStorage('branches', initialBranches);
  }

  // Users & Auth
  getUsers(): User[] {
    return this.getStorage('users', initialUsers);
  }
  getCurrentUser(): User {
    return this.getStorage('current_user', initialUsers[0]);
  }
  setCurrentUser(user: User) {
    this.setStorage('current_user', user);
  }

  // Products
  getProducts(): Product[] {
    return this.getStorage('products', initialProducts);
  }
  saveProducts(products: Product[]) {
    this.setStorage('products', products);
  }

  // Customers
  getCustomers(): Customer[] {
    return this.getStorage('customers', initialCustomers);
  }
  saveCustomers(customers: Customer[]) {
    this.setStorage('customers', customers);
  }

  // Purchases
  getPurchases(): PurchaseBill[] {
    return this.getStorage('purchases', initialPurchases);
  }
  createPurchase(bill: Omit<PurchaseBill, 'id' | 'billNo'>, user: User): PurchaseBill {
    const purchases = this.getPurchases();
    const count = purchases.length + 1;
    const billNo = `RC-${new Date().toISOString().slice(0, 7).replace('-', '')}-${count.toString().padStart(5, '0')}`;
    const newBill: PurchaseBill = {
      ...bill,
      id: `pur-${Date.now()}`,
      billNo,
      date: bill.date || new Date().toISOString().slice(0, 10),
    };

    purchases.unshift(newBill);
    this.setStorage('purchases', purchases);

    // Update Stock & Customer history
    const products = this.getProducts();
    for (const item of newBill.items) {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const currentBranchStock = prod.stock[newBill.branchId] || 0;
        prod.stock[newBill.branchId] = currentBranchStock + item.weight;
      }
    }
    this.saveProducts(products);

    // Update customer stats
    const customers = this.getCustomers();
    const cus = customers.find(c => c.id === newBill.customerId);
    if (cus) {
      cus.totalPurchasedWeight = (cus.totalPurchasedWeight || 0) + newBill.items.reduce((acc, i) => acc + i.weight, 0);
      cus.totalPurchasedAmount = (cus.totalPurchasedAmount || 0) + newBill.total;
      this.saveCustomers(customers);
    }

    // Add Audit Log
    this.addAuditLog({
      userName: user.name,
      branchId: newBill.branchId,
      action: 'รับซื้อสินค้า (Purchase)',
      newValue: `${newBill.billNo} (฿${newBill.total.toLocaleString()})`,
      details: `รับซื้อสินค้าจำนวน ${newBill.items.length} รายการ จาก ${newBill.customerName}`,
    });

    return newBill;
  }

  // Sales
  getSales(): SaleBill[] {
    return this.getStorage('sales', initialSales);
  }
  createSale(bill: Omit<SaleBill, 'id' | 'saleNo'>, user: User): SaleBill {
    const sales = this.getSales();
    const count = sales.length + 1;
    const saleNo = `INV-${new Date().toISOString().slice(0, 7).replace('-', '')}-${count.toString().padStart(5, '0')}`;
    const newBill: SaleBill = {
      ...bill,
      id: `sale-${Date.now()}`,
      saleNo,
      date: bill.date || new Date().toISOString().slice(0, 10),
    };

    sales.unshift(newBill);
    this.setStorage('sales', sales);

    // Deduct stock
    const products = this.getProducts();
    for (const item of newBill.items) {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const currentBranchStock = prod.stock[newBill.branchId] || 0;
        prod.stock[newBill.branchId] = Math.max(0, currentBranchStock - item.quantity);
      }
    }
    this.saveProducts(products);

    this.addAuditLog({
      userName: user.name,
      branchId: newBill.branchId,
      action: 'ขายสินค้าออก (Sale)',
      newValue: `${newBill.saleNo} (฿${newBill.total.toLocaleString()})`,
      details: `ขายสินค้าให้ ${newBill.customerName}`,
    });

    return newBill;
  }

  // Customer Loans
  getLoans(): CustomerLoan[] {
    return this.getStorage('loans', initialLoans);
  }
  saveLoans(loans: CustomerLoan[]) {
    this.setStorage('loans', loans);
  }

  // Expenses
  getExpenses(): Expense[] {
    return this.getStorage('expenses', initialExpenses);
  }
  createExpense(expense: Omit<Expense, 'id' | 'expenseNo'>, user: User) {
    const expenses = this.getExpenses();
    const count = expenses.length + 1;
    const expenseNo = `EXP-${new Date().toISOString().slice(0, 7).replace('-', '')}-${count.toString().padStart(3, '0')}`;
    const newExp: Expense = {
      ...expense,
      id: `exp-${Date.now()}`,
      expenseNo,
    };
    expenses.unshift(newExp);
    this.setStorage('expenses', expenses);

    this.addAuditLog({
      userName: user.name,
      branchId: newExp.branchId,
      action: 'บันทึกค่าใช้จ่าย',
      newValue: `${newExp.expenseNo} (฿${newExp.amount.toLocaleString()})`,
      details: `${newExp.category}: ${newExp.description}`,
    });
    return newExp;
  }

  // Cash Drawer
  getCashDrawer(): CashDrawerShift {
    return this.getStorage('cash_drawer', initialCashDrawer);
  }
  saveCashDrawer(shift: CashDrawerShift) {
    this.setStorage('cash_drawer', shift);
  }

  // Truck Trips
  getTruckTrips(): TruckTrip[] {
    return this.getStorage('truck_trips', initialTruckTrips);
  }
  saveTruckTrips(trips: TruckTrip[]) {
    this.setStorage('truck_trips', trips);
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.getStorage('audit_logs', initialAuditLogs);
  }
  addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>) {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };
    logs.unshift(newLog);
    this.setStorage('audit_logs', logs.slice(0, 200)); // keep last 200
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.getStorage('notifications', initialNotifications);
  }
  saveNotifications(notifs: NotificationItem[]) {
    this.setStorage('notifications', notifs);
  }

  // Quotations & POs
  getQuotations(): Quotation[] {
    return this.getStorage('quotations', [
      {
        id: 'qt-1',
        quotationNo: 'QT-2026-001',
        date: '2026-09-20',
        expiryDate: '2026-10-20',
        customerId: 'cus-4',
        customerName: 'บริษัท ไทยรีไซเคิล จำกัด',
        branchId: 'branch-hq',
        items: [{ productId: 'product-11', productName: 'ทองแดงท่อใหม่ (แดงเงา)', quantity: 500, unit: 'KG', price: 315, amount: 157500 }],
        total: 157500,
        status: 'sent',
        revision: 1,
      }
    ]);
  }
  saveQuotations(qts: Quotation[]) {
    this.setStorage('quotations', qts);
  }

  getPurchaseOrders(): PurchaseOrder[] {
    return this.getStorage('pos', [
      {
        id: 'po-1',
        poNo: 'PO-2026-001',
        supplierName: 'โรงงานรีไซเคิลเหล็กพระราม 2',
        date: '2026-09-21',
        branchId: 'branch-hq',
        items: [{ productName: 'เหล็กหนา', quantity: 5000, unit: 'KG', price: 11.5, amount: 57500 }],
        total: 57500,
        status: 'approved',
      }
    ]);
  }
  savePurchaseOrders(pos: PurchaseOrder[]) {
    this.setStorage('pos', pos);
  }
}

export const db = new ERPDatabase();
