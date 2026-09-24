import React, { useState } from 'react';
import { FileText, Printer, Search, Calendar, CheckCircle } from 'lucide-react';
import { db } from '../services/db';

interface PurchasesViewProps {
  selectedBranchId: string;
  onPrintReceipt: (billId: string) => void;
}

export const PurchasesView: React.FC<PurchasesViewProps> = ({ selectedBranchId, onPrintReceipt }) => {
  const [purchases] = useState(db.getPurchases());
  const [search, setSearch] = useState('');

  const filtered = purchases.filter(p =>
    p.billNo.toLowerCase().includes(search.toLowerCase()) ||
    p.customerName.toLowerCase().includes(search.toLowerCase()) ||
    p.staffName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">ประวัติบิลรับซื้อของเก่า ({purchases.length} บิล)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">บิลรับซื้อทั้งหมด เชื่อมโยงสต๊อกและบัญชีแบบ Real-time</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาเลขที่บิล, ชื่อลูกค้า, หรือพนักงาน..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3.5 px-4">เลขที่บิล</th>
                <th className="py-3.5 px-4">วันที่/เวลา</th>
                <th className="py-3.5 px-4">ลูกค้า</th>
                <th className="py-3.5 px-4">รายการสินค้า</th>
                <th className="py-3.5 px-4 text-right">ยอดสุทธิ (฿)</th>
                <th className="py-3.5 px-4 text-center">ชำระเงิน</th>
                <th className="py-3.5 px-4 text-center">พนักงาน</th>
                <th className="py-3.5 px-4 text-center">พิมพ์</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{p.billNo}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-medium">{p.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{p.customerName}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-400">
                    {p.items.map(i => `${i.productName} (${i.weight} ${i.unit})`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">฿{p.total.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-full font-semibold uppercase">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-xs text-slate-600 dark:text-slate-400">{p.staffName}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onPrintReceipt(p.id)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
                      title="พิมพ์ใบเสร็จ"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
