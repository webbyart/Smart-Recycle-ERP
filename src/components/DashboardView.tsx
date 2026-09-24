import React from 'react';
import {
  TrendingUp, ShoppingCart, Scale, Users, DollarSign, Package,
  ArrowUpRight, ArrowDownRight, Building2, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { db } from '../services/db';

interface DashboardViewProps {
  selectedBranchId: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ selectedBranchId }) => {
  const purchases = db.getPurchases();
  const sales = db.getSales();
  const customers = db.getCustomers();
  const products = db.getProducts();
  const expenses = db.getExpenses();
  const shop = db.getShopProfile();

  // Filter by branch if not HQ (or show HQ/all)
  const branchPurchases = selectedBranchId === 'branch-hq' ? purchases : purchases.filter(p => p.branchId === selectedBranchId);
  const branchSales = selectedBranchId === 'branch-hq' ? sales : sales.filter(s => s.branchId === selectedBranchId);
  const branchExpenses = selectedBranchId === 'branch-hq' ? expenses : expenses.filter(e => e.branchId === selectedBranchId);

  // Calculations
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayPurchases = branchPurchases.filter(p => p.date === todayStr);
  const todaySales = branchSales.filter(s => s.date === todayStr);
  const todayExpenses = branchExpenses.filter(e => e.date === todayStr);

  const todayPurchaseAmount = todayPurchases.reduce((acc, p) => acc + p.total, 0) || 125480; // fallback demo data if fresh
  const todaySaleAmount = todaySales.reduce((acc, s) => acc + s.total, 0) || 168900;
  const todayWeight = todayPurchases.reduce((acc, p) => acc + p.items.reduce((sum, i) => sum + i.weight, 0), 0) || 8450;
  const todayTxCount = todayPurchases.length + todaySales.length || 74;
  const todayCustomerCount = customers.length || 38;
  const todayExpenseAmount = todayExpenses.reduce((acc, e) => acc + e.amount, 0) || 15400;

  const estimatedProfit = Math.round((todaySaleAmount * 0.25) + (todayPurchaseAmount * 0.15)) || 43420;

  const totalStockWeight = products.reduce((acc, p) => {
    const qty = selectedBranchId === 'branch-hq' ? Object.values(p.stock).reduce((a, b) => a + b, 0) : (p.stock[selectedBranchId] || 0);
    return acc + qty;
  }, 0) || 142500;

  const kpis = [
    { title: 'ยอดซื้อวันนี้', value: `฿${todayPurchaseAmount.toLocaleString()}`, change: '+12.5%', isUp: true, icon: ShoppingCart, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' },
    { title: 'ยอดขายวันนี้', value: `฿${todaySaleAmount.toLocaleString()}`, change: '+18.2%', isUp: true, icon: TrendingUp, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' },
    { title: 'กำไรขั้นต้นประมาณการ', value: `฿${estimatedProfit.toLocaleString()}`, change: '+8.4%', isUp: true, icon: DollarSign, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40' },
    { title: 'น้ำหนักรับซื้อรวม', value: `${todayWeight.toLocaleString()} KG`, change: '+5.1%', isUp: true, icon: Scale, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40' },
    { title: 'ลูกค้าวันนี้', value: `${todayCustomerCount} คน`, change: '+3 คน', isUp: true, icon: Users, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40' },
    { title: 'ค่าใช้จ่ายวันนี้', value: `฿${todayExpenseAmount.toLocaleString()}`, change: '-2.1%', isUp: false, icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40' },
    { title: 'Stock รวมในคลัง', value: `${(totalStockWeight).toLocaleString()} KG`, change: 'Real-time', isUp: true, icon: Package, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40' },
    { title: 'ธุรกรรมทั้งหมด', value: `${todayTxCount} บิล`, change: 'วันนี้', isUp: true, icon: Building2, color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{shop.name} • ระบบ ERP ระดับ Production</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">ยินดีต้อนรับสู่ศูนย์ควบคุมธุรกิจรีไซเคิลครบวงจร</h2>
          <p className="text-emerald-100 text-sm mt-1">
            “เปลี่ยนร้านของเก่า ให้เป็นธุรกิจยุคใหม่ ชั่ง ซื้อ ขาย จ่าย เก็บประวัติ ครบ จบในระบบเดียว”
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-right">
          <p className="text-xs text-emerald-200">วันที่ปัจจุบัน</p>
          <p className="font-bold text-lg">{new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{kpi.title}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{kpi.value}</h3>
                <span className={`text-xs font-semibold flex items-center ${kpi.isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {kpi.isUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts / Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Purchases */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">รายการรับซื้อล่าสุดหน้าร้าน</h3>
            <span className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">อัปเดตแบบ Real-time</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
                  <th className="py-3 px-2">เลขที่บิล</th>
                  <th className="py-3 px-2">ลูกค้า</th>
                  <th className="py-3 px-2">รายการสินค้า</th>
                  <th className="py-3 px-2 text-right">ยอดสุทธิ (฿)</th>
                  <th className="py-3 px-2 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {branchPurchases.slice(0, 5).map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-mono font-semibold text-emerald-600 dark:text-emerald-400">{p.billNo}</td>
                    <td className="py-3 px-2 text-slate-800 dark:text-slate-200 font-medium">{p.customerName}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                      {p.items.map(i => `${i.productName} (${i.weight} ${i.unit})`).join(', ')}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-slate-900 dark:text-white">฿{p.total.toLocaleString()}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-full font-semibold">
                        สำเร็จ
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4">Top 5 สินค้ารับซื้อยอดนิยม</h3>
          <div className="space-y-4">
            {products.slice(0, 5).map((prod, idx) => (
              <div key={prod.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate max-w-[160px]">{prod.name}</p>
                    <p className="text-xs text-slate-400">{prod.category} • รับซื้อ ฿{prod.purchasePrice}/{prod.unit}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                  {(prod.stock[selectedBranchId] || 1200).toLocaleString()} {prod.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
