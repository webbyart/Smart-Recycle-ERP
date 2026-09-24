import React, { useState } from 'react';
import { Settings, Building2, Users, Shield, Save, CheckCircle } from 'lucide-react';
import { db } from '../services/db';

export const SettingsView: React.FC = () => {
  const [shop, setShop] = useState(db.getShopProfile());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    db.saveShopProfile(shop);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">ตั้งค่าร้านค้า & ระบบ (Shop Settings)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">แก้ไขข้อมูลร้านค้า เลขผู้เสียภาษี พร้อมเพย์ และข้อมูลสาขา</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>บันทึกการตั้งค่า</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl flex items-center space-x-3 text-emerald-800 dark:text-emerald-200 text-sm font-semibold">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>บันทึกข้อมูลตั้งค่าร้านค้าเรียบร้อยแล้ว</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">ข้อมูลร้านค้าและใบเสร็จ</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">ชื่อร้าน (แสดงในใบเสร็จ)</label>
            <input
              type="text"
              value={shop.name}
              onChange={e => setShop({ ...shop, name: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">ชื่อบริษัท / นิติบุคคล</label>
            <input
              type="text"
              value={shop.companyName}
              onChange={e => setShop({ ...shop, companyName: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">เลขประจำตัวผู้เสียภาษี (13 หลัก)</label>
            <input
              type="text"
              value={shop.taxId}
              onChange={e => setShop({ ...shop, taxId: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">เบอร์โทรศัพท์</label>
            <input
              type="text"
              value={shop.phone}
              onChange={e => setShop({ ...shop, phone: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">ที่อยู่ร้าน</label>
            <input
              type="text"
              value={shop.address}
              onChange={e => setShop({ ...shop, address: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">พร้อมเพย์ (PromptPay / QR)</label>
            <input
              type="text"
              value={shop.promptPay}
              onChange={e => setShop({ ...shop, promptPay: e.target.value })}
              className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
