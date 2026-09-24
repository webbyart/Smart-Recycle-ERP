import React, { useState } from 'react';
import {
  Search, Bell, Moon, Sun, Building2, User as UserIcon, LogOut, ChevronDown, Shield, CheckCircle2
} from 'lucide-react';
import { User, Branch } from '../types';
import { db } from '../services/db';

interface NavbarProps {
  currentUser: User;
  branches: Branch[];
  selectedBranchId: string;
  onBranchChange: (branchId: string) => void;
  onOpenSearch: () => void;
  onLogout: () => void;
  onUserSwitch: (user: User) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  branches,
  selectedBranchId,
  onBranchChange,
  onOpenSearch,
  onLogout,
  onUserSwitch,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const notifications = db.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const users = db.getUsers();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 flex items-center justify-between shadow-xs">
      {/* Left: Brand & Branch selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            ♻️
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Smart Recycle ERP</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">ระบบบริหารร้านรับซื้อของเก่า</p>
          </div>
        </div>

        {/* Branch Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span className="max-w-[160px] truncate">{currentBranch.name}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showBranchMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">เลือกสาขาการทำงาน</div>
              {branches.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => {
                    onBranchChange(branch.id);
                    setShowBranchMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors ${
                    selectedBranchId === branch.id ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{branch.name}</span>
                  {selectedBranchId === branch.id && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Search, Notifications, User Menu */}
      <div className="flex items-center space-x-3">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center space-x-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm text-slate-500 dark:text-slate-400 w-64 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">ค้นหาลูกค้า, สินค้า, บิล...</span>
          <kbd className="bg-white dark:bg-slate-900 px-1.5 py-0.5 text-xs rounded border border-slate-300 dark:border-slate-700 font-mono">⌘K</kbd>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="สลับโหมดมืด/สว่าง"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="การแจ้งเตือน"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">การแจ้งเตือนระบบ</span>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} ใหม่
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">ไม่มีการแจ้งเตือนในขณะนี้</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-800/55 transition-colors ${!n.read ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : ''}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timestamp.slice(11, 16)}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Demo Account Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center justify-center font-bold text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{currentUser.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400">เข้าสู่ระบบด้วยบัญชี</p>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>

              <div className="px-3 py-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">สลับบัญชีทดสอบ (Demo)</p>
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onUserSwitch(u);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      currentUser.id === u.id ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-medium">{u.name}</span>
                      <span className="block text-[10px] text-slate-400 uppercase">{u.role}</span>
                    </div>
                    {currentUser.id === u.id && <Shield className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-2 px-2">
                <button
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg flex items-center space-x-2 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
