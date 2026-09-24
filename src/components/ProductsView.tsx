import React, { useState } from 'react';
import { Package, Search, Plus, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { db } from '../services/db';
import { Product } from '../types';

interface ProductsViewProps {
  selectedBranchId: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ selectedBranchId }) => {
  const [products, setProducts] = useState<Product[]>(db.getProducts());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['ทั้งหมด', 'อลูมิเนียม', 'ทองแดง', 'ทองเหลือง', 'เหล็ก', 'แบตเตอรี่', 'มอเตอร์/ไฟฟ้า', 'แก้ว', 'กระดาษ', 'พลาสติก', 'ยางรถ', 'สแตนเลส', 'ตะกั่ว', 'อื่นๆ'];

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'ทั้งหมด' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">สินค้าและราคารับซื้อ ({products.length} รายการ)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">จัดการราคารับซื้อ ราคาขาย และคำนวณ Margin อัตโนมัติ</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Export Excel สำเร็จ')}
            className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2 border border-emerald-200 dark:border-emerald-800"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel / CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มสินค้าใหม่</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อสินค้าหรือรหัส..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
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
                <th className="py-3.5 px-4 text-center">Margin %</th>
                <th className="py-3.5 px-4 text-center">Stock คงเหลือ</th>
                <th className="py-3.5 px-4 text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filtered.map(prod => (
                <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-xs">{prod.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{prod.name}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-lg font-semibold">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-800 dark:text-slate-200">฿{prod.purchasePrice} / {prod.unit}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-blue-600 dark:text-blue-400">฿{prod.sellingPrice}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs px-2 py-0.5 rounded font-bold">
                      +{prod.marginPercent}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {(prod.stock[selectedBranchId] || 0).toLocaleString()} {prod.unit}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-full font-semibold">
                      เปิดใช้งาน
                    </span>
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
