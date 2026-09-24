import React, { useState } from 'react';
import { Search, X, Package, Users, FileText, ArrowRight } from 'lucide-react';
import { db } from '../services/db';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [keyword, setKeyword] = useState('');

  if (!isOpen) return null;

  const products = db.getProducts();
  const customers = db.getCustomers();
  const purchases = db.getPurchases();
  const sales = db.getSales();

  const kw = keyword.toLowerCase().trim();

  const matchedProducts = kw ? products.filter(p => p.name.toLowerCase().includes(kw) || p.code.toLowerCase().includes(kw) || p.category.toLowerCase().includes(kw)).slice(0, 5) : [];
  const matchedCustomers = kw ? customers.filter(c => c.firstName.toLowerCase().includes(kw) || c.lastName.toLowerCase().includes(kw) || c.phone.includes(kw) || (c.companyName && c.companyName.toLowerCase().includes(kw))).slice(0, 5) : [];
  const matchedPurchases = kw ? purchases.filter(p => p.billNo.toLowerCase().includes(kw) || p.customerName.toLowerCase().includes(kw)).slice(0, 5) : [];

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            autoFocus
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="ค้นหาลูกค้า, สินค้า, บิลซื้อ/ขาย (พิมพ์อย่างน้อย 1 ตัวอักษร)..."
            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 text-base font-medium placeholder-slate-400"
          />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!keyword ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              พิมพ์คำค้นหาเพื่อค้นหาข้อมูลในระบบ Smart Recycle ERP อย่างรวดเร็ว
            </div>
          ) : (
            <>
              {/* Products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <span>สินค้า ({matchedProducts.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectTab('products');
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.code} • หมวด: {p.category} • รับซื้อ: ฿{p.purchasePrice}/{p.unit}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customers */}
              {matchedCustomers.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>ลูกค้า ({matchedCustomers.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedCustomers.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectTab('customers');
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{c.firstName} {c.lastName} {c.companyName ? `(${c.companyName})` : ''}</p>
                          <p className="text-xs text-slate-500">โทร: {c.phone} • ประเภท: {c.type}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchases */}
              {matchedPurchases.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>บิลรับซื้อ ({matchedPurchases.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedPurchases.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectTab('bills');
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{p.billNo} - {p.customerName}</p>
                          <p className="text-xs text-slate-500">วันที่: {p.date} • ยอดรวม: ฿{p.total.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedProducts.length === 0 && matchedCustomers.length === 0 && matchedPurchases.length === 0 && (
                <div className="text-center py-12 text-slate-400 text-sm">
                  ไม่พบข้อมูลที่ตรงกับคำค้นหา "{keyword}"
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
