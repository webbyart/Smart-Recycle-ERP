import React, { useState } from 'react';
import { Package, Search, BarChart3, ArrowUpRight } from 'lucide-react';
import { db } from '../services/db';

interface InventoryViewProps {
  selectedBranchId: string;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ selectedBranchId }) => {
  const [products] = useState(db.getProducts());
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Stock Real-time (คลังสินค้า)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">ตรวจสอบสต๊อกสินค้าคงเหลือแบบเรียลไทม์แยกตามสาขา</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาสินค้าในคลัง..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3.5 px-4">รหัสสินค้า</th>
                <th className="py-3.5 px-4">ชื่อสินค้า</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4 text-right">ราคารับซื้อ (฿)</th>
                <th className="py-3.5 px-4 text-right">ราคาขาย (฿)</th>
                <th className="py-3.5 px-4 text-center">Stock สาขาปัจจุบัน</th>
                <th className="py-3.5 px-4 text-center">มูลค่ารวมสต๊อก (฿)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map(prod => {
                const stockQty = prod.stock[selectedBranchId] || 0;
                const totalVal = stockQty * prod.purchasePrice;
                return (
                  <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-xs">{prod.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{prod.name}</td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-lg font-semibold">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-800 dark:text-slate-200">฿{prod.purchasePrice}</td>
                    <td className="py-3 px-4 text-right font-mono text-blue-600 dark:text-blue-400">฿{prod.sellingPrice}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {stockQty.toLocaleString()} {prod.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ฿{totalVal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
