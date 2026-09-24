import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { db } from '../services/db';
import { PurchaseBill } from '../types';

interface ReceiptModalProps {
  billId: string | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ billId, onClose }) => {
  if (!billId) return null;

  const purchases = db.getPurchases();
  const bill = purchases.find(p => p.id === billId);
  const shop = db.getShopProfile();

  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧾</span>
            <span className="font-bold text-slate-900 dark:text-white">ใบเสร็จรับเงิน / ใบรับซื้อของเก่า</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์</span>
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 font-['Sarabun'] bg-white dark:bg-slate-900" id="printable-receipt">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold">{shop.name}</h2>
            <p className="text-xs text-slate-500">{shop.companyName}</p>
            <p className="text-xs text-slate-500">{shop.address} ต.{shop.subdistrict} อ.{shop.district} จ.{shop.province} {shop.postalCode}</p>
            <p className="text-xs text-slate-500">เลขประจำตัวผู้เสียภาษี: {shop.taxId} • โทร: {shop.phone}</p>
          </div>

          <div className="border-t border-b border-dashed border-slate-300 dark:border-slate-700 py-3 my-4 flex justify-between text-xs">
            <div>
              <p><strong className="text-slate-500">เลขที่บิล:</strong> <span className="font-mono font-bold text-emerald-600">{bill.billNo}</span></p>
              <p><strong className="text-slate-500">ลูกค้า:</strong> {bill.customerName}</p>
            </div>
            <div className="text-right">
              <p><strong className="text-slate-500">วันที่:</strong> {bill.date}</p>
              <p><strong className="text-slate-500">พนักงาน:</strong> {bill.staffName}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 font-bold text-slate-500 uppercase">
                <th className="py-2 text-left">รายการสินค้า</th>
                <th className="py-2 text-center">น้ำหนัก</th>
                <th className="py-2 text-right">ราคา/หน่วย</th>
                <th className="py-2 text-right">จำนวนเงิน (฿)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bill.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-medium">{item.productName}</td>
                  <td className="py-2.5 text-center font-mono">{item.weight} {item.unit}</td>
                  <td className="py-2.5 text-right font-mono">฿{item.purchasePrice}</td>
                  <td className="py-2.5 text-right font-mono font-bold">฿{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="border-t border-slate-300 dark:border-slate-700 pt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>รวมเป็นเงิน</span>
              <span className="font-mono font-bold">฿{bill.subtotal.toLocaleString()}</span>
            </div>
            {bill.discount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>ส่วนลด</span>
                <span className="font-mono">-฿{bill.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>ยอดสุทธิที่จ่าย</span>
              <span className="font-mono text-emerald-600">฿{bill.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 pt-1">
              <span>วิธีชำระเงิน</span>
              <span className="font-semibold uppercase">{bill.paymentMethod}</span>
            </div>
          </div>

          {/* Footer QR PromptPay / Signatures */}
          <div className="pt-6 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="text-center space-y-1">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 border rounded-lg flex items-center justify-center font-mono text-[9px] text-slate-400 mx-auto">
                [QR PromptPay]
              </div>
              <p className="text-[10px] text-slate-500">พร้อมเพย์: {shop.promptPay}</p>
            </div>
            <div className="text-center space-y-8">
              <p className="text-slate-500">ลงชื่อ______________________ ผู้รับเงิน</p>
              <p className="text-slate-500">ลงชื่อ______________________ ลูกค้า</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
