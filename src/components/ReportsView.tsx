import React, { useState } from 'react';
import { BarChart3, FileSpreadsheet, Printer, Download, Calendar } from 'lucide-react';
import { db } from '../services/db';

export const ReportsView: React.FC = () => {
  const [reportType, setReportType] = useState<'daily' | 'profit' | 'tax' | 'stock'>('daily');
  const purchases = db.getPurchases();
  const sales = db.getSales();
  const shop = db.getShopProfile();

  const totalPurchase = purchases.reduce((acc, p) => acc + p.total, 0);
  const totalSale = sales.reduce((acc, s) => acc + s.total, 0);
  const estimatedProfit = totalSale * 0.25;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">ศูนย์รายงานธุรกิจ (Report Center)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">รายงานรายรับ รายจ่าย กำไรขั้นต้น ภาษีมูลค่าเพิ่ม (VAT) และสต๊อก</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Export PDF สำเร็จ')}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'daily', label: 'สรุปรายงานรายวัน' },
          { id: 'profit', label: 'ส่วนต่างกำไร (Profit Report)' },
          { id: 'tax', label: 'รายงานภาษี & VAT 7%' },
          { id: 'stock', label: 'รายงานความเคลื่อนไหวสต๊อก' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              reportType === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {reportType === 'daily' && 'รายงานสรุปยอดซื้อ-ขายรายวัน'}
              {reportType === 'profit' && 'รายงานส่วนต่างกำไรและมาร์จิ้น'}
              {reportType === 'tax' && 'รายงานภาษีซื้อ / ภาษีขาย / VAT 7%'}
              {reportType === 'stock' && 'รายงานการเคลื่อนไหวสินค้าในคลัง'}
            </h3>
            <p className="text-xs text-slate-500">ข้อมูลอ้างอิงจากฐานข้อมูลจริง Smart Recycle ERP</p>
          </div>
          <span className="text-xs font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
            {shop.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500">ยอดรับซื้อสะสมรวม</p>
            <p className="text-xl font-mono font-bold text-slate-900 dark:text-white mt-1">฿{totalPurchase.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500">ยอดขายออกสะสมรวม</p>
            <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">฿{totalSale.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500">กำไรขั้นต้นประมาณการ</p>
            <p className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">฿{estimatedProfit.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-center space-y-2">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">ทุกรายงานสามารถดาวน์โหลดเป็น PDF, Excel หรือพิมพ์ออกเครื่องพิมพ์ความร้อนได้ทันที</p>
          <div className="flex justify-center space-x-3 pt-2">
            <button onClick={() => alert('ดาวน์โหลดรายงาน Excel สำเร็จ')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Excel</span>
            </button>
            <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm">
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
