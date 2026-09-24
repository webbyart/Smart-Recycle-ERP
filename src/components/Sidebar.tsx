import React from 'react';
import {
  LayoutDashboard, Scale, FileText, Users, DollarSign, Wallet, Package,
  ArrowLeftRight, ShoppingCart, TrendingUp, CreditCard, Truck, BarChart3, Settings, Calculator, FileSpreadsheet
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'pos_scale'
  | 'bills'
  | 'customers'
  | 'loans'
  | 'cash_drawer'
  | 'products'
  | 'stock'
  | 'conversion'
  | 'conversion_recipes'
  | 'purchase'
  | 'sale'
  | 'quotations'
  | 'po'
  | 'payments'
  | 'receivables'
  | 'expenses'
  | 'trucks'
  | 'trips'
  | 'gps'
  | 'maintenance'
  | 'transport_receivable'
  | 'report_daily'
  | 'report_monthly'
  | 'report_yearly'
  | 'report_profit'
  | 'report_stock'
  | 'report_customer'
  | 'report_tax'
  | 'settings_shop'
  | 'settings_branch'
  | 'settings_users'
  | 'settings_permissions'
  | 'settings_scale'
  | 'settings_docs'
  | 'settings_notifications';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuGroups = [
    {
      title: 'ภาพรวม',
      items: [
        { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      title: '⭐ ใช้ทุกวัน',
      items: [
        { id: 'pos_scale' as ActiveTab, label: 'ชั่งน้ำหนักหน้าร้าน (POS)', icon: Scale },
        { id: 'bills' as ActiveTab, label: 'บิลลูกค้า / ประวัติบิล', icon: FileText },
        { id: 'customers' as ActiveTab, label: 'จัดการลูกค้า', icon: Users },
        { id: 'loans' as ActiveTab, label: 'เงินลูกค้ายืม', icon: DollarSign },
        { id: 'cash_drawer' as ActiveTab, label: 'เงินสดหน้าร้าน', icon: Wallet },
      ]
    },
    {
      title: '📦 สินค้า',
      items: [
        { id: 'products' as ActiveTab, label: 'สินค้าและราคา', icon: Package },
        { id: 'stock' as ActiveTab, label: 'Stock Real-time', icon: BarChart3 },
        { id: 'conversion' as ActiveTab, label: 'แปลงสภาพสินค้า', icon: ArrowLeftRight },
        { id: 'conversion_recipes' as ActiveTab, label: 'สูตรแปลงสภาพ', icon: FileSpreadsheet },
      ]
    },
    {
      title: '💰 ซื้อ-ขาย',
      items: [
        { id: 'purchase' as ActiveTab, label: 'รับซื้อของเก่า', icon: ShoppingCart },
        { id: 'sale' as ActiveTab, label: 'ขายสินค้าออก', icon: TrendingUp },
        { id: 'quotations' as ActiveTab, label: 'ใบเสนอราคา', icon: FileText },
        { id: 'po' as ActiveTab, label: 'ใบสั่งซื้อ (PO)', icon: FileText },
      ]
    },
    {
      title: '💳 การเงิน',
      items: [
        { id: 'payments' as ActiveTab, label: 'การชำระเงิน / QR', icon: CreditCard },
        { id: 'expenses' as ActiveTab, label: 'ค่าใช้จ่าย', icon: Calculator },
      ]
    },
    {
      title: '🚚 รถบรรทุก',
      items: [
        { id: 'trucks' as ActiveTab, label: 'รถบรรทุก & เที่ยวรถ', icon: Truck },
      ]
    },
    {
      title: '📊 รายงาน',
      items: [
        { id: 'report_daily' as ActiveTab, label: 'รายงานรายวัน', icon: BarChart3 },
        { id: 'report_profit' as ActiveTab, label: 'รายงานกำไร', icon: TrendingUp },
        { id: 'report_stock' as ActiveTab, label: 'รายงานสต๊อก', icon: Package },
        { id: 'report_tax' as ActiveTab, label: 'รายงานภาษี & VAT', icon: FileText },
      ]
    },
    {
      title: '⚙️ ตั้งค่า',
      items: [
        { id: 'settings_shop' as ActiveTab, label: 'ตั้งค่าร้าน & สาขา', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto shrink-0">
      <div className="p-4 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{group.title}</p>
            <div className="space-y-0.5 mt-1">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
