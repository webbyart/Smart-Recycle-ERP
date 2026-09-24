import React, { useState } from 'react';
import { Scale, Plus, Trash2, Printer, CheckCircle, Search, User, RefreshCw, QrCode } from 'lucide-react';
import { db } from '../services/db';
import { Product, Customer, PurchaseItem, User as UserType } from '../types';

interface FrontStorePOSViewProps {
  currentUser: UserType;
  selectedBranchId: string;
  onPrintReceipt: (billId: string) => void;
}

export const FrontStorePOSView: React.FC<FrontStorePOSViewProps> = ({ currentUser, selectedBranchId, onPrintReceipt }) => {
  const products = db.getProducts();
  const customers = db.getCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [cartItems, setCartItems] = useState<PurchaseItem[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>(products[0]);
  const [weightInput, setWeightInput] = useState<string>('50');
  const [customPrice, setCustomPrice] = useState<number>(products[0].purchasePrice);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer' | 'promptpay' | 'credit'>('cash');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [scaleConnected, setScaleConnected] = useState<boolean>(true);
  const [successModal, setSuccessModal] = useState<any>(null);

  const categories = ['ทั้งหมด', 'อลูมิเนียม', 'ทองแดง', 'ทองเหลือง', 'เหล็ก', 'แบตเตอรี่', 'มอเตอร์/ไฟฟ้า', 'กระดาษ', 'พลาสติก', 'สแตนเลส'];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'ทั้งหมด' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) || p.code.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSelectProduct = (prod: Product) => {
    setCurrentProduct(prod);
    setCustomPrice(prod.purchasePrice);
  };

  const handleAddCart = () => {
    const w = parseFloat(weightInput) || 0;
    if (w <= 0) return;

    const newItem: PurchaseItem = {
      productId: currentProduct.id,
      productName: currentProduct.name,
      productCode: currentProduct.code,
      weight: w,
      unit: currentProduct.unit,
      purchasePrice: customPrice,
      amount: w * customPrice,
    };

    setCartItems([...cartItems, newItem]);
    setWeightInput('');
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((acc, i) => acc + i.amount, 0);
  const total = subtotal;

  const handleCompletePurchase = () => {
    if (cartItems.length === 0) return;

    const newBill = db.createPurchase({
      date: new Date().toISOString().slice(0, 10),
      branchId: selectedBranchId,
      customerId: selectedCustomer.id,
      customerName: `${selectedCustomer.firstName} ${selectedCustomer.lastName} ${selectedCustomer.companyName ? `(${selectedCustomer.companyName})` : ''}`,
      staffId: currentUser.id,
      staffName: currentUser.name,
      items: cartItems,
      subtotal,
      discount: 0,
      total,
      paymentMethod,
      status: 'completed',
    }, currentUser);

    setSuccessModal(newBill);
    setCartItems([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6rem)] animate-in fade-in duration-300">
      {/* Left / Center: Products & Scale Panel (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col space-y-4 overflow-y-auto">
        {/* Scale Status Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${scaleConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <div>
              <h3 className="font-bold text-sm">เครื่องชั่งดิจิทัล (Digital Scale POS)</h3>
              <p className="text-xs text-slate-400">{scaleConnected ? 'เชื่อมต่อผ่าน USB Serial / Web Serial API (พร้อมใช้งาน)' : 'ไม่ได้เชื่อมต่อเครื่องชั่ง (Demo Mode)'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScaleConnected(!scaleConnected)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{scaleConnected ? 'จำลองน้ำหนักอัตโนมัติ' : 'เชื่อมต่อเครื่องชั่ง'}</span>
            </button>
            <div className="bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 px-3 py-1 rounded-lg text-xs font-mono font-bold">
              น้ำหนัก: {weightInput || '0.00'} KG
            </div>
          </div>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="ค้นหาสินค้า..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredProducts.map(prod => {
            const isSelected = currentProduct.id === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{prod.category}</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1 leading-snug line-clamp-2">{prod.name}</h4>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">฿{prod.purchasePrice}/{prod.unit}</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-mono">
                    {prod.stock[selectedBranchId] || 0} {prod.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: POS Checkout & Cart Sidebar (4 Cols) */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
        <div className="space-y-4">
          {/* Customer Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">เลือกลูกค้า</label>
            <select
              value={selectedCustomer.id}
              onChange={e => {
                const c = customers.find(cus => cus.id === e.target.value);
                if (c) setSelectedCustomer(c);
              }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} {c.companyName ? `(${c.companyName})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Item Quick Weight Input */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{currentProduct.category}</p>
              <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">{currentProduct.name}</h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">น้ำหนัก ({currentProduct.unit})</label>
                <input
                  type="number"
                  value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  placeholder="0.00"
                  className="w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">ราคา/หน่วย (฿)</label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={e => setCustomPrice(parseFloat(e.target.value) || 0)}
                  className="w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleAddCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มรายการลงบิล (F9)</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>รายการในบิล ({cartItems.length})</span>
              <span>รวมน้ำหนัก</span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">ยังไม่มีรายการสินค้าในบิลนี้</div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">{item.productName}</p>
                      <p className="text-[10px] text-slate-400">{item.weight} {item.unit} × ฿{item.purchasePrice}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-xs text-slate-900 dark:text-white font-mono">฿{item.amount.toLocaleString()}</span>
                      <button onClick={() => handleRemoveCartItem(idx)} className="text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Checkout Summary & Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>ยอดรวมสินค้า</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">฿{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold text-slate-900 dark:text-white">
              <span>ยอดสุทธิที่ต้องจ่าย</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xl">฿{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-2">
            {(['cash', 'transfer', 'promptpay'] as const).map(m => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  paymentMethod === m
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {m === 'cash' ? 'เงินสด' : m === 'transfer' ? 'โอนธนาคาร' : 'พร้อมเพย์ QR'}
              </button>
            ))}
          </div>

          <button
            disabled={cartItems.length === 0}
            onClick={handleCompletePurchase}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <CheckCircle className="w-5 h-5" />
            <span>บันทึกบิล & จ่ายเงิน (Enter)</span>
          </button>
        </div>
      </div>

      {/* Success Modal & Thermal Receipt Print Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">บันทึกรับซื้อสำเร็จ!</h3>
              <p className="text-xs text-slate-500 mt-1">เลขที่บิล: <span className="font-mono font-bold text-emerald-600">{successModal.billNo}</span></p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">ลูกค้า:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{successModal.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ยอดเงินสุทธิ:</span>
                <span className="font-bold text-emerald-600 text-sm">฿{successModal.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">การชำระเงิน:</span>
                <span className="font-semibold uppercase">{successModal.paymentMethod}</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => {
                  onPrintReceipt(successModal.id);
                  setSuccessModal(null);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 text-sm shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>พิมพ์ใบเสร็จ (Thermal/A4)</span>
              </button>
              <button
                onClick={() => setSuccessModal(null)}
                className="px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-sm"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
