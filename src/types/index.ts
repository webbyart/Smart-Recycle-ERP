export type UserRole = 'owner' | 'admin' | 'manager' | 'staff' | 'cashier' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId: string;
  pin: string;
  avatar?: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  isHQ: boolean;
}

export interface ShopProfile {
  name: string;
  companyName: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  promptPay: string;
  logoUrl?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  subcategory?: string;
  unit: string; // 'KG' | 'ชิ้น' | 'ตัน' | 'ถุง'
  purchasePrice: number;
  sellingPrice: number;
  marginPercent: number;
  status: 'active' | 'inactive';
  image?: string;
  remark?: string;
  reorderLevel: number;
  stock: Record<string, number>; // branchId -> stock quantity
  priceTier?: number;
}

export interface Customer {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone: string;
  idCard?: string;
  taxId?: string;
  address: string;
  type: 'general' | 'shop' | 'company' | 'regular' | 'vip';
  priceGroup: string;
  remark?: string;
  createdAt: string;
  status: 'active' | 'inactive';
  totalPurchasedWeight?: number;
  totalPurchasedAmount?: number;
  outstandingLoan?: number;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  productCode: string;
  weight: number;
  unit: string;
  purchasePrice: number;
  amount: number;
}

export interface PurchaseBill {
  id: string;
  billNo: string;
  date: string;
  branchId: string;
  customerId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  items: PurchaseItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'promptpay' | 'credit';
  status: 'completed' | 'cancelled' | 'pending';
  slipUrl?: string;
  remark?: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  sellingPrice: number;
  amount: number;
}

export interface SaleBill {
  id: string;
  saleNo: string;
  date: string;
  branchId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  items: SaleItem[];
  subtotal: number;
  vat: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'credit';
  status: 'completed' | 'cancelled';
}

export interface CustomerLoan {
  id: string;
  loanNo: string;
  customerId: string;
  customerName: string;
  branchId: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'active' | 'paid' | 'overdue';
  remark?: string;
  repayments: { date: string; amount: number; staffName: string }[];
}

export interface StockMovement {
  id: string;
  date: string;
  branchId: string;
  productId: string;
  productName: string;
  type: 'purchase' | 'sale' | 'adjustment_in' | 'adjustment_out' | 'conversion_in' | 'conversion_out';
  quantity: number;
  balanceAfter: number;
  referenceNo: string;
  staffName: string;
}

export interface ConversionRecipe {
  id: string;
  name: string;
  inputProductId: string;
  inputProductName: string;
  outputProductId: string;
  outputProductName: string;
  inputWeight: number;
  outputWeight: number;
  lossPercent: number;
  remark?: string;
}

export interface Quotation {
  id: string;
  quotationNo: string;
  date: string;
  expiryDate: string;
  customerId: string;
  customerName: string;
  branchId: string;
  items: { productId: string; productName: string; quantity: number; unit: string; price: number; amount: number }[];
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'converted';
  revision: number;
}

export interface PurchaseOrder {
  id: string;
  poNo: string;
  supplierName: string;
  date: string;
  branchId: string;
  items: { productName: string; quantity: number; unit: string; price: number; amount: number }[];
  total: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
}

export interface CashDrawerShift {
  id: string;
  branchId: string;
  staffName: string;
  openTime: string;
  closeTime?: string;
  openingCash: number;
  cashSales: number;
  cashPurchases: number;
  expenses: number;
  expectedCash: number;
  actualCash?: number;
  difference?: number;
  status: 'open' | 'closed';
}

export interface Expense {
  id: string;
  expenseNo: string;
  date: string;
  branchId: string;
  category: 'ค่าแรง' | 'ค่าไฟ' | 'ค่าน้ำ' | 'ค่าน้ำมัน' | 'ค่าขนส่ง' | 'ค่าซ่อม' | 'ค่าเช่า' | 'ค่าใช้จ่ายสำนักงาน' | 'อื่น ๆ';
  description: string;
  amount: number;
  paymentMethod: 'cash' | 'transfer';
  staffName: string;
  remark?: string;
}

export interface TruckTrip {
  id: string;
  tripNo: string;
  truckId: string;
  licensePlate: string;
  driverName: string;
  date: string;
  customerName: string;
  origin: string;
  destination: string;
  weight: number;
  freightAmount: number;
  status: 'pending' | 'in_transit' | 'completed';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  branchId: string;
  action: string;
  oldValue?: string;
  newValue?: string;
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'stock_low' | 'pending_approval' | 'overdue_loan' | 'price_change' | 'system';
  timestamp: string;
  read: boolean;
}
