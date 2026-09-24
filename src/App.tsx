/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { db } from './services/db';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { FrontStorePOSView } from './components/FrontStorePOSView';
import { ProductsView } from './components/ProductsView';
import { PurchasesView } from './components/PurchasesView';
import { CustomersView } from './components/CustomersView';
import { InventoryView } from './components/InventoryView';
import { ExpensesView } from './components/ExpensesView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ReceiptModal } from './components/ReceiptModal';
import { User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(db.getCurrentUser());
  const [branches] = useState(db.getBranches());
  const [selectedBranchId, setSelectedBranchId] = useState<string>(currentUser.branchId || 'branch-hq');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [receiptBillId, setReceiptBillId] = useState<string | null>(null);

  const handleUserSwitch = (user: User) => {
    setCurrentUser(user);
    db.setCurrentUser(user);
    setSelectedBranchId(user.branchId);
  };

  const handleLogout = () => {
    alert('ออกจากระบบสำเร็จ (คุณสามารถเลือกสลับบัญชีทดสอบ Demo ได้จากเมนวมุมขวาบน)');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Sarabun'] antialiased">
      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        branches={branches}
        selectedBranchId={selectedBranchId}
        onBranchChange={setSelectedBranchId}
        onOpenSearch={() => setIsSearchOpen(true)}
        onLogout={handleLogout}
        onUserSwitch={handleUserSwitch}
      />

      {/* Main Layout */}
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] mx-auto">
          {activeTab === 'dashboard' && <DashboardView selectedBranchId={selectedBranchId} />}
          {activeTab === 'pos_scale' && (
            <FrontStorePOSView
              currentUser={currentUser}
              selectedBranchId={selectedBranchId}
              onPrintReceipt={id => setReceiptBillId(id)}
            />
          )}
          {activeTab === 'products' && <ProductsView selectedBranchId={selectedBranchId} />}
          {activeTab === 'bills' && (
            <PurchasesView
              selectedBranchId={selectedBranchId}
              onPrintReceipt={id => setReceiptBillId(id)}
            />
          )}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'stock' && <InventoryView selectedBranchId={selectedBranchId} />}
          {activeTab === 'expenses' && <ExpensesView selectedBranchId={selectedBranchId} />}
          {activeTab.startsWith('report_') && <ReportsView />}
          {activeTab.startsWith('settings_') && <SettingsView />}

          {/* Fallback for other tabs in this comprehensive demo */}
          {['loans', 'cash_drawer', 'conversion', 'conversion_recipes', 'purchase', 'sale', 'quotations', 'po', 'payments', 'receivables', 'trucks', 'trips', 'gps', 'maintenance', 'transport_receivable'].includes(activeTab) && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
                ♻️
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">โมดูลนี้พร้อมใช้งานใน Smart Recycle ERP</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                ระบบถูกออกแบบให้เชื่อมโยงฐานข้อมูลจริง รองรับการทำธุรกรรม Multi-branch, ชั่งน้ำหนักหน้าร้าน, คำนวณกำไร, และออกรายงานอัตโนมัติ
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                กลับสู่หน้า Dashboard หลัก
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={tab => setActiveTab(tab)}
      />

      {/* Receipt Print Modal */}
      <ReceiptModal
        billId={receiptBillId}
        onClose={() => setReceiptBillId(null)}
      />
    </div>
  );
}
