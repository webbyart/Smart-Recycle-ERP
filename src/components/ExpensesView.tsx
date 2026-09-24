import React, { useState } from 'react';
import { Calculator, Plus, Search, DollarSign } from 'lucide-react';
import { db } from '../services/db';
import { Expense } from '../types';

interface ExpensesViewProps {
  selectedBranchId: string;
}

export const ExpensesView: React.FC<ExpensesViewProps> = ({ selectedBranchId }) => {
  const [expenses, setExpenses] = useState<Expense[]>(db.getExpenses());
  const [search, setSearch] = useState('');

  const filtered = expenses.filter(e => e.description.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">บันทึกค่าใช้จ่ายร้าน (Expenses)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">ควบคุมค่าใช้จ่าย ค่าแรง ค่าไฟ ค่าน้ำมัน และค่าขนส่ง</p>
        </div>
        <button
          onClick={() => alert('เปิด modal บันทึกค่าใช้จ่ายใหม่')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>บันทึกค่าใช้จ่าย</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาหมวดหมู่ หรือรายละเอียดค่าใช้จ่าย..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3.5 px-4">เลขที่เอกสาร</th>
                <th className="py-3.5 px-4">วันที่</th>
                <th className="py-3.5 px-4">หมวดหมู่</th>
                <th className="py-3.5 px-4">รายละเอียด</th>
                <th className="py-3.5 px-4 text-right">จำนวนเงิน (฿)</th>
                <th className="py-3.5 px-4 text-center">วิธีชำระ</th>
                <th className="py-3.5 px-4 text-center">ผู้บันทึก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map(ex => (
                <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-semibold text-rose-600 dark:text-rose-400 text-xs">{ex.expenseNo}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{ex.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs px-2.5 py-1 rounded-lg font-semibold">
                      {ex.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{ex.description}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">฿{ex.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center uppercase text-xs font-semibold">{ex.paymentMethod}</td>
                  <td className="py-3.5 px-4 text-center text-xs text-slate-500">{ex.staffName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
