import React, { useState } from 'react';
import { Users, Search, Plus, Phone, MapPin, Award } from 'lucide-react';
import { db } from '../services/db';

export const CustomersView: React.FC = () => {
  const [customers] = useState(db.getCustomers());
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search.toLowerCase()) ||
    (c.companyName && c.companyName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">จัดการลูกค้า & ผู้ขาย ({customers.length} ราย)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">ประวัติการซื้อ ยอดสะสม และกลุ่มราคารับซื้อพิเศษ</p>
        </div>
        <button
          onClick={() => alert('เปิดหน้าเพิ่มลูกค้าใหม่')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-750 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มลูกค้าใหม่</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ, บริษัท, หรือเบอร์โทร..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cus => (
          <div key={cus.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded uppercase">{cus.type}</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">{cus.firstName} {cus.lastName}</h3>
                {cus.companyName && <p className="text-xs font-medium text-slate-500">{cus.companyName}</p>}
              </div>
              <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                {cus.priceGroup}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{cus.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{cus.address}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                <p className="text-[10px] text-slate-400">น้ำหนักสะสม</p>
                <p className="font-bold text-xs text-slate-900 dark:text-white mt-0.5">{(cus.totalPurchasedWeight || 0).toLocaleString()} KG</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                <p className="text-[10px] text-slate-400">ยอดซื้อสะสม</p>
                <p className="font-bold text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">฿{(cus.totalPurchasedAmount || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
