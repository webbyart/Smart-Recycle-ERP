import { Branch, ShopProfile, Product, Customer, PurchaseBill, SaleBill, CustomerLoan, Expense, TruckTrip, AuditLog, NotificationItem, CashDrawerShift } from '../types';

export const initialShopProfile: ShopProfile = {
  name: 'สมบูรณ์รีไซเคิล 2026',
  companyName: 'บริษัท สมบูรณ์ รีไซเคิล อินเตอร์เนชั่นแนล จำกัด',
  taxId: '0105565001234',
  phone: '081-234-5678',
  email: 'contact@somboonrecycle.com',
  address: '99/9 หมู่ 4 ถนนพหลโยธิน',
  subdistrict: 'คลองหนึ่ง',
  district: 'คลองหลวง',
  province: 'ปทุมธานี',
  postalCode: '12120',
  bankName: 'ธนาคารกสิกรไทย',
  bankAccount: '123-4-56789-0',
  bankHolder: 'บจก. สมบูรณ์ รีไซเคิล',
  promptPay: '0812345678000',
};

export const initialBranches: Branch[] = [
  { id: 'branch-hq', code: 'HQ', name: 'สำนักงานใหญ่ (ปทุมธานี)', address: '99/9 ถ.พหลโยธิน คลองหลวง ปทุมธานี', phone: '02-516-9999', manager: 'คุณสมชาย ใจดี', isHQ: true },
  { id: 'branch-cnx', code: 'CNX', name: 'สาขาเชียงใหม่', address: '45 ถ.ซุปเปอร์ไฮเวย์ เมืองเชียงใหม่ เชียงใหม่', phone: '053-211-555', manager: 'คุณวิชัย มั่นคง', isHQ: false },
  { id: 'branch-kkc', code: 'KKC', name: 'สาขาสกลนคร', address: '120 ถ.นิตโย เมืองสกลนคร สกลนคร', phone: '042-711-888', manager: 'คุณประเสริฐ ศรีสกล', isHQ: false },
  { id: 'branch-bkk', code: 'BKK', name: 'สาขากรุงเทพ (บางนา)', address: '88 ถ.บางนา-ตราด บางนา กรุงเทพฯ', phone: '02-399-1234', manager: 'คุณกcญจนา รักไทย', isHQ: false },
];

export const initialUsers = [
  { id: 'user-1', name: 'คุณสมชาย (Owner)', email: 'owner@demo.com', role: 'owner' as const, branchId: 'branch-hq', pin: '123456', status: 'active' as const, permissions: ['*'] },
  { id: 'user-2', name: 'คุณวิชัย (Manager)', email: 'manager@demo.com', role: 'manager' as const, branchId: 'branch-cnx', pin: '234567', status: 'active' as const, permissions: ['view_dashboard', 'create_purchase', 'approve_purchase', 'view_reports'] },
  { id: 'user-3', name: 'คุณสมศรี (Staff หน้าร้าน)', email: 'staff@demo.com', role: 'staff' as const, branchId: 'branch-hq', pin: '345678', status: 'active' as const, permissions: ['create_purchase', 'view_dashboard'] },
  { id: 'user-4', name: 'คุณมานพ (Cashier)', email: 'cashier@demo.com', role: 'cashier' as const, branchId: 'branch-hq', pin: '456789', status: 'active' as const, permissions: ['manage_cash', 'create_purchase'] },
  { id: 'user-5', name: 'คุณนภา (Accountant)', email: 'accountant@demo.com', role: 'accountant' as const, branchId: 'branch-hq', pin: '567890', status: 'active' as const, permissions: ['view_reports', 'manage_tax', 'manage_expenses'] },
];

// Generate 110+ recycling products
const categories = ['อลูมิเนียม', 'ทองแดง', 'ทองเหลือง', 'เหล็ก', 'แบตเตอรี่', 'มอเตอร์/ไฟฟ้า', 'แก้ว', 'กระดาษ', 'พลาสติก', 'ยางรถ', 'สแตนเลส', 'ตะกั่ว', 'อื่นๆ'];
const baseProductTemplates: { name: string; cat: string; unit: string; pPrice: number; margin: number }[] = [
  // อลูมิเนียม
  { name: 'อลูมิเนียมหนา (ฉาก/แผ่น)', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 62, margin: 15 },
  { name: 'อลูมิเนียมเส้นหน้าต่าง', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 58, margin: 15 },
  { name: 'อลูมิเนียมกระป๋อง (เบียร์/น้ำอัดลม)', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 38, margin: 18 },
  { name: 'อลูมิเนียมกะละมัง/หม้อเก่า', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 45, margin: 15 },
  { name: 'อลูมิเนียมฉากผสม', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 50, margin: 15 },
  { name: 'อลูมิเนียมลวดไฟฟ้า', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 55, margin: 15 },
  { name: 'อลูมิเนียมขี้กลึง', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 32, margin: 20 },
  { name: 'อลูมิเนียมอัลลอยด์', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 42, margin: 15 },
  { name: 'เศษอลูมิเนียมหล่อ', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 48, margin: 15 },
  { name: 'ฝาจุกอลูมิเนียม', cat: 'อลูมิเนียม', unit: 'KG', pPrice: 35, margin: 15 },

  // ทองแดง
  { name: 'ทองแดงท่อใหม่ (แดงเงา)', cat: 'ทองแดง', unit: 'KG', pPrice: 280, margin: 12 },
  { name: 'ทองแดงปอก (เบอร์ 1)', cat: 'ทองแดง', unit: 'KG', pPrice: 275, margin: 12 },
  { name: 'ทองแดงพันหม้อแปลง', cat: 'ทองแดง', unit: 'KG', pPrice: 250, margin: 15 },
  { name: 'ทองแดงท่อเก่า (เบอร์ 2)', cat: 'ทองแดง', unit: 'KG', pPrice: 245, margin: 15 },
  { name: 'ทองแดงขี้กลึง', cat: 'ทองแดง', unit: 'KG', pPrice: 230, margin: 15 },
  { name: 'เศษทองแดงแผ่น', cat: 'ทองแดง', unit: 'KG', pPrice: 260, margin: 12 },
  { name: 'ทองแดงลวดเคลือบ', cat: 'ทองแดง', unit: 'KG', pPrice: 240, margin: 15 },
  { name: 'ทองแดงหม้อน้ำรถยนต์', cat: 'ทองแดง', unit: 'KG', pPrice: 190, margin: 15 },
  { name: 'ทองแดงผสม', cat: 'ทองแดง', unit: 'KG', pPrice: 210, margin: 15 },
  { name: 'ทองแดงสายไฟใหญ่', cat: 'ทองแดง', unit: 'KG', pPrice: 265, margin: 12 },

  // ทองเหลือง
  { name: 'ทองเหลืองหนา (วาล์ว/ข้อต่อ)', cat: 'ทองเหลือง', unit: 'KG', pPrice: 175, margin: 15 },
  { name: 'ทองเหลืองบาง', cat: 'ทองเหลือง', unit: 'KG', pPrice: 155, margin: 15 },
  { name: 'ทองเหลืองขี้กลึง', cat: 'ทองเหลือง', unit: 'KG', pPrice: 140, margin: 15 },
  { name: 'ทองเหลืองปั๊มน้ำ', cat: 'ทองเหลือง', unit: 'KG', pPrice: 165, margin: 15 },
  { name: 'เศษทองเหลืองแผ่น', cat: 'ทองเหลือง', unit: 'KG', pPrice: 170, margin: 15 },
  { name: 'ก๊อกน้ำทองเหลือง', cat: 'ทองเหลือง', unit: 'KG', pPrice: 150, margin: 15 },
  { name: 'ปลอกกระสุนทองเหลือง', cat: 'ทองเหลือง', unit: 'KG', pPrice: 180, margin: 15 },
  { name: 'ทองเหลืองก้านสูบ', cat: 'ทองเหลือง', unit: 'KG', pPrice: 172, margin: 15 },
  { name: 'ทองเหลืองผสม', cat: 'ทองเหลือง', unit: 'KG', pPrice: 145, margin: 15 },
  { name: 'หม้อน้ำทองเหลืองเก่า', cat: 'ทองเหลือง', unit: 'KG', pPrice: 160, margin: 15 },

  // เหล็ก
  { name: 'เหล็กหนา (เหล็กข้ออ้อย/I-Beam)', cat: 'เหล็ก', unit: 'KG', pPrice: 12.5, margin: 20 },
  { name: 'เหล็กบาง (สังกะสี/ปี๊บ)', cat: 'เหล็ก', unit: 'KG', pPrice: 8.5, margin: 25 },
  { name: 'เหล็กปั๊ม/เศษปั๊ม', cat: 'เหล็ก', unit: 'KG', pPrice: 10.0, margin: 20 },
  { name: 'เหล็กหล่อ (เสื้อสูบ/ท่อปูน)', cat: 'เหล็ก', unit: 'KG', pPrice: 11.5, margin: 20 },
  { name: 'เศษเหล็กเส้นก่อสร้าง', cat: 'เหล็ก', unit: 'KG', pPrice: 11.0, margin: 20 },
  { name: 'ตะปูเก่า/น๊อตสกรู', cat: 'เหล็ก', unit: 'KG', pPrice: 9.0, margin: 20 },
  { name: 'ถังแก๊สปอก (เหล็กหนา)', cat: 'เหล็ก', unit: 'KG', pPrice: 13.0, margin: 20 },
  { name: 'ลวดสลิงเหล็ก', cat: 'เหล็ก', unit: 'KG', pPrice: 10.5, margin: 20 },
  { name: 'โครงหลังคาเหล็กเก่า', cat: 'เหล็ก', unit: 'KG', pPrice: 11.0, margin: 20 },
  { name: 'เศษเหล็กกล่อง', cat: 'เหล็ก', unit: 'KG', pPrice: 12.0, margin: 20 },

  // แบตเตอรี่
  { name: 'แบตเตอรี่รถยนต์ (แห้ง/น้ำ)', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 32, margin: 18 },
  { name: 'แบตเตอรี่มอเตอร์ไซค์', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 28, margin: 18 },
  { name: 'แบตเตอรี่ UPS / โซล่าเซลล์', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 30, margin: 18 },
  { name: 'แบตเตอรี่รถไฟฟ้า (EV Pack)', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 38, margin: 20 },
  { name: 'แบตเตอรี่รถโฟล์คลิฟท์', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 35, margin: 18 },
  { name: 'แผ่นตะกั่วแบตเตอรี่แยก', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 45, margin: 15 },
  { name: 'แบตเตอรี่โทรศัพท์เก่า', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 50, margin: 20 },
  { name: 'แบตเตอรี่โน๊ตบุ๊ค', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 45, margin: 20 },
  { name: 'ขั้วแบตเตอรี่ตะกั่ว', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 40, margin: 18 },
  { name: 'แบตเตอรี่สำรองไฟกลาง', cat: 'แบตเตอรี่', unit: 'KG', pPrice: 29, margin: 18 },

  // มอเตอร์/ไฟฟ้า
  { name: 'มอเตอร์พัดลมเก่า', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 35, margin: 20 },
  { name: 'คอมเพรสเซอร์ตู้เย็น', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 30, margin: 20 },
  { name: 'ไดนาโม / มอเตอร์อุตสาหกรรม', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 42, margin: 18 },
  { name: 'หม้อแปลงไฟฟ้าขนาดเล็ก', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 38, margin: 18 },
  { name: 'ทีวีจอแบนเก่า / จอคอม', cat: 'มอเตอร์/ไฟฟ้า', unit: 'ชิ้น', pPrice: 45, margin: 30 },
  { name: 'เมนบอร์ดคอมพิวเตอร์', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 120, margin: 25 },
  { name: 'ฮาร์ดดิสก์ (HDD)', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 65, margin: 25 },
  { name: 'พาวเวอร์ซัพพลายคอม', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 28, margin: 20 },
  { name: 'สายไฟเส้นเล็ก (คละ)', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 85, margin: 18 },
  { name: 'แผงวงจรอิเล็กทรอนิกส์รวม', cat: 'มอเตอร์/ไฟฟ้า', unit: 'KG', pPrice: 90, margin: 25 },

  // แก้ว
  { name: 'ขวดแก้วใส (เบียร์/โซดา)', cat: 'แก้ว', unit: 'KG', pPrice: 2.5, margin: 30 },
  { name: 'ขวดแก้วเขียว (เครื่องดื่ม)', cat: 'แก้ว', unit: 'KG', pPrice: 2.0, margin: 30 },
  { name: 'ขวดแก้วชาเขียว/น้ำอัดลม', cat: 'แก้ว', unit: 'KG', pPrice: 2.2, margin: 30 },
  { name: 'เศษแก้วแตก (รวมสี)', cat: 'แก้ว', unit: 'KG', pPrice: 1.2, margin: 40 },
  { name: 'ขวดแก้วแม่โขง/แม่น้ำ', cat: 'แก้ว', unit: 'ชิ้น', pPrice: 3.0, margin: 30 },
  { name: 'ขวดเวชภัณฑ์แก้ว', cat: 'แก้ว', unit: 'KG', pPrice: 1.8, margin: 30 },
  { name: 'ขวดน้ำอัดลมขวดใหญ่', cat: 'แก้ว', unit: 'ชิ้น', pPrice: 2.5, margin: 30 },
  { name: 'โหลแก้วเก่า', cat: 'แก้ว', unit: 'ชิ้น', pPrice: 5.0, margin: 30 },
  { name: 'ขวดซอสพริก/น้ำปลา', cat: 'แก้ว', unit: 'KG', pPrice: 1.5, margin: 30 },
  { name: 'แก้วน้ำคริสตัลเก่า', cat: 'แก้ว', unit: 'KG', pPrice: 10, margin: 30 },

  // กระดาษ
  { name: 'กระดาษกล่องลัง (OC)', cat: 'กระดาษ', unit: 'KG', pPrice: 4.5, margin: 25 },
  { name: 'กระดาษหนังสือพิมพ์', cat: 'กระดาษ', unit: 'KG', pPrice: 5.0, margin: 25 },
  { name: 'กระดาษ A4 ขาวดำ', cat: 'กระดาษ', unit: 'KG', pPrice: 6.5, margin: 25 },
  { name: 'กระดาษนิตยสาร/สี', cat: 'กระดาษ', unit: 'KG', pPrice: 3.5, margin: 25 },
  { name: 'กระดาษสมุดนักเรียน', cat: 'กระดาษ', unit: 'KG', pPrice: 4.0, margin: 25 },
  { name: 'กระดาษลังปะปน', cat: 'กระดาษ', unit: 'KG', pPrice: 3.8, margin: 25 },
  { name: 'กระดาษชานอ้อย/อัดก้อน', cat: 'กระดาษ', unit: 'KG', pPrice: 3.0, margin: 25 },
  { name: 'แฟ้มเอกสารเก่า (ติดพลาสติก)', cat: 'กระดาษ', unit: 'KG', pPrice: 2.5, margin: 25 },
  { name: 'กระดาษลูกฟูกหนา', cat: 'กระดาษ', unit: 'KG', pPrice: 4.2, margin: 25 },
  { name: 'กระดาษพิมพ์เขียว', cat: 'กระดาษ', unit: 'KG', pPrice: 3.2, margin: 25 },

  // พลาสติก
  { name: 'พลาสติก PET ใส (ขวดน้ำดื่ม)', cat: 'พลาสติก', unit: 'KG', pPrice: 12, margin: 20 },
  { name: 'พลาสติก HDPE ขุ่น (แกลลอนนม/น้ำยา)', cat: 'พลาสติก', unit: 'KG', pPrice: 15, margin: 20 },
  { name: 'พลาสติก PP (ถุงใส/กระสอบ)', cat: 'พลาสติก', unit: 'KG', pPrice: 10, margin: 20 },
  { name: 'พลาสติก ABS (ชิ้นส่วนเครื่องใช้ไฟฟ้า)', cat: 'พลาสติก', unit: 'KG', pPrice: 22, margin: 18 },
  { name: 'พลาสติก PVC (ท่อฟ้า/รางสายไฟ)', cat: 'พลาสติก', unit: 'KG', pPrice: 8, margin: 25 },
  { name: 'พลาสติก PE ดำ (ถุงดำ/ฟิล์ม)', cat: 'พลาสติก', unit: 'KG', pPrice: 7, margin: 25 },
  { name: 'พลาสติก PS (กล่องโฟม/ถาด)', cat: 'พลาสติก', unit: 'KG', pPrice: 5, margin: 30 },
  { name: 'ลังพลาสติกใส่ผลไม้', cat: 'พลาสติก', unit: 'KG', pPrice: 18, margin: 20 },
  { name: 'ท่อ PVC เก่า', cat: 'พลาสติก', unit: 'KG', pPrice: 9, margin: 22 },
  { name: 'เศษพลาสติกฉีดขึ้นรูป', cat: 'พลาสติก', unit: 'KG', pPrice: 14, margin: 20 },

  // ยางรถ
  { name: 'ยางรถยนต์เก๋ง (ขอบ 13-16)', cat: 'ยางรถ', unit: 'เส้น', pPrice: 15, margin: 30 },
  { name: 'ยางรถกระบะ / SUV', cat: 'ยางรถ', unit: 'เส้น', pPrice: 25, margin: 30 },
  { name: 'ยางรถบรรทุก 10 ล้อ', cat: 'ยางรถ', unit: 'เส้น', pPrice: 120, margin: 25 },
  { name: 'ยางรถแทรกเตอร์/รถเกี่ยวข้าว', cat: 'ยางรถ', unit: 'เส้น', pPrice: 250, margin: 25 },
  { name: 'ยางในรถยนต์', cat: 'ยางรถ', unit: 'KG', pPrice: 18, margin: 20 },
  { name: 'เศษยางบดรีไซเคิล', cat: 'ยางรถ', unit: 'KG', pPrice: 6, margin: 25 },
  { name: 'ยางมอเตอร์ไซค์', cat: 'ยางรถ', unit: 'เส้น', pPrice: 5, margin: 30 },

  // สแตนเลส
  { name: 'สแตนเลส 304 (ไม่ดูดแม่เหล็ก)', cat: 'สแตนเลส', unit: 'KG', pPrice: 42, margin: 15 },
  { name: 'สแตนเลส 202 (ดูดแม่เหล็กเล็กน้อย)', cat: 'สแตนเลส', unit: 'KG', pPrice: 28, margin: 15 },
  { name: 'สแตนเลสเศษท่อ/ฉาก', cat: 'สแตนเลส', unit: 'KG', pPrice: 38, margin: 15 },
  { name: 'อ่างล้างจานสแตนเลสเก่า', cat: 'สแตนเลส', unit: 'KG', pPrice: 35, margin: 15 },
  { name: 'เศษขี้กลึงสแตนเลส', cat: 'สแตนเลส', unit: 'KG', pPrice: 25, margin: 20 },

  // ตะกั่ว
  { name: 'ตะกั่วถ่วงล้อรถยนต์', cat: 'ตะกั่ว', unit: 'KG', pPrice: 35, margin: 18 },
  { name: 'ตะกั่วแผ่นมุงหลังคาเก่า', cat: 'ตะกั่ว', unit: 'KG', pPrice: 48, margin: 15 },
  { name: 'ตะกั่วก้อน / ตะกั่วบัดกรี', cat: 'ตะกั่ว', unit: 'KG', pPrice: 90, margin: 15 },
  { name: 'ลูกปืนตะกั่วตกปลา', cat: 'ตะกั่ว', unit: 'KG', pPrice: 55, margin: 18 },

  // อื่นๆ
  { name: 'น้ำมันเครื่องเก่า (ดำ)', cat: 'อื่นๆ', unit: 'ลิตร', pPrice: 6, margin: 30 },
  { name: 'ท่อแป๊ปน้ำประปาเก่า', cat: 'อื่นๆ', unit: 'KG', pPrice: 11, margin: 20 },
  { name: 'สายพานยางอุตสาหกรรม', cat: 'อื่นๆ', unit: 'KG', pPrice: 8, margin: 25 },
];

export const initialProducts: Product[] = baseProductTemplates.map((item, index) => {
  const code = `PRD-${(index + 1).toString().padStart(3, '0')}`;
  const selling = Math.round(item.pPrice * (1 + item.margin / 100) * 10) / 10;
  return {
    id: `product-${index + 1}`,
    code,
    name: item.name,
    category: item.cat,
    unit: item.unit,
    purchasePrice: item.pPrice,
    sellingPrice: selling,
    marginPercent: item.margin,
    status: 'active',
    reorderLevel: 50,
    stock: {
      'branch-hq': Math.floor(Math.random() * 800) + 100,
      'branch-cnx': Math.floor(Math.random() * 400) + 50,
      'branch-kkc': Math.floor(Math.random() * 300) + 40,
      'branch-bkk': Math.floor(Math.random() * 600) + 80,
    },
  };
});

export const initialCustomers: Customer[] = [
  { id: 'cus-1', code: 'CUS-001', firstName: 'สมศักดิ์', lastName: 'เจริญกิจ', companyName: 'ร้านสมศักดิ์ค้าของเก่า', phone: '081-999-1111', address: '12 ถ.พหลโยธิน ปทุมธานี', type: 'shop', priceGroup: 'ราคา 1', createdAt: '2026-01-15', status: 'active', totalPurchasedWeight: 4500, totalPurchasedAmount: 320000, outstandingLoan: 5000 },
  { id: 'cus-2', code: 'CUS-002', firstName: 'วิภาดา', lastName: 'แซ่ตั้ง', companyName: 'เจริญรุ่งเรืองรีไซเคิล', phone: '089-888-2222', address: '45/2 ถ.รังสิต-นครนายก ปทุมธานี', type: 'company', priceGroup: 'ราคา 1', createdAt: '2026-01-20', status: 'active', totalPurchasedWeight: 12400, totalPurchasedAmount: 980000, outstandingLoan: 0 },
  { id: 'cus-3', code: 'CUS-003', firstName: 'บุญมี', lastName: 'มั่นคง', phone: '086-777-3333', address: '88 หมู่ 3 คลองหลวง ปทุมธานี', type: 'regular', priceGroup: 'ราคา 2', createdAt: '2026-02-01', status: 'active', totalPurchasedWeight: 1800, totalPurchasedAmount: 145000, outstandingLoan: 2000 },
  { id: 'cus-4', code: 'CUS-004', firstName: 'ประandร์', lastName: 'แสงสุวรรณ', companyName: 'บริษัท ไทยรีไซเคิล จำกัด', phone: '02-444-5555', address: '999 ถ.บางนา-ตราด บางนา กทม.', type: 'vip', priceGroup: 'ราคา 1', createdAt: '2026-02-10', status: 'active', totalPurchasedWeight: 35000, totalPurchasedAmount: 3200000, outstandingLoan: 0 },
  { id: 'cus-5', code: 'CUS-005', firstName: 'อำไพ', lastName: 'ทองสุข', phone: '083-222-4444', address: '23 ถ.เชียงใหม่-ลำปาง เชียงใหม่', type: 'general', priceGroup: 'ราคา 3', createdAt: '2026-02-15', status: 'active', totalPurchasedWeight: 650, totalPurchasedAmount: 48000, outstandingLoan: 0 },
];

export const initialPurchases: PurchaseBill[] = [
  {
    id: 'pur-1',
    billNo: 'RC-202609-00001',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-hq',
    customerId: 'cus-1',
    customerName: 'สมศักดิ์ เจริญกิจ (ร้านสมศักดิ์ค้าของเก่า)',
    staffId: 'user-3',
    staffName: 'คุณสมศรี (Staff หน้าร้าน)',
    items: [
      { productId: 'product-11', productName: 'ทองแดงท่อใหม่ (แดงเงา)', productCode: 'PRD-011', weight: 15, unit: 'KG', purchasePrice: 280, amount: 4200 },
      { productId: 'product-1', productName: 'อลูมิเนียมหนา (ฉาก/แผ่น)', productCode: 'PRD-001', weight: 50, unit: 'KG', purchasePrice: 62, amount: 3100 },
    ],
    subtotal: 7300,
    discount: 0,
    total: 7300,
    paymentMethod: 'cash',
    status: 'completed',
  },
  {
    id: 'pur-2',
    billNo: 'RC-202609-00002',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-hq',
    customerId: 'cus-2',
    customerName: 'วิภาดา แซ่ตั้ง (เจริญรุ่งเรืองรีไซเคิล)',
    staffId: 'user-3',
    staffName: 'คุณสมศรี (Staff หน้าร้าน)',
    items: [
      { productId: 'product-31', productName: 'เหล็กหนา (เหล็กข้ออ้อย/I-Beam)', productCode: 'PRD-031', weight: 1200, unit: 'KG', purchasePrice: 12.5, amount: 15000 },
      { productId: 'product-41', productName: 'แบตเตอรี่รถยนต์ (แห้ง/น้ำ)', productCode: 'PRD-041', weight: 250, unit: 'KG', purchasePrice: 32, amount: 8000 },
    ],
    subtotal: 23000,
    discount: 500,
    total: 22500,
    paymentMethod: 'promptpay',
    status: 'completed',
  },
  {
    id: 'pur-3',
    billNo: 'RC-202609-00003',
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    branchId: 'branch-cnx',
    customerId: 'cus-5',
    customerName: 'อำไพ ทองสุข',
    staffId: 'user-2',
    staffName: 'คุณวิชัย (Manager)',
    items: [
      { productId: 'product-71', productName: 'กระดาษกล่องลัง (OC)', productCode: 'PRD-071', weight: 450, unit: 'KG', purchasePrice: 4.5, amount: 2025 },
      { productId: 'product-81', productName: 'พลาสติก PET ใส (ขวดน้ำดื่ม)', productCode: 'PRD-081', weight: 120, unit: 'KG', purchasePrice: 12, amount: 1440 },
    ],
    subtotal: 3465,
    discount: 65,
    total: 3400,
    paymentMethod: 'cash',
    status: 'completed',
  },
];

export const initialSales: SaleBill[] = [
  {
    id: 'sale-1',
    saleNo: 'INV-202609-00001',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-hq',
    customerName: 'บริษัท โรงถลุงโลหะไทย จำกัด',
    staffId: 'user-1',
    staffName: 'คุณสมชาย (Owner)',
    items: [
      { productId: 'product-11', productName: 'ทองแดงท่อใหม่ (แดงเงา)', productCode: 'PRD-011', weight: 200, unit: 'KG', sellingPrice: 313.6, amount: 62720 },
      { productId: 'product-1', productName: 'อลูมิเนียมหนา (ฉาก/แผ่น)', productCode: 'PRD-001', weight: 500, unit: 'KG', sellingPrice: 71.3, amount: 35650 },
    ],
    subtotal: 98370,
    vat: 6885.9,
    discount: 0,
    total: 105255.9,
    paymentMethod: 'transfer',
    status: 'completed',
  },
];

export const initialLoans: CustomerLoan[] = [
  {
    id: 'loan-1',
    loanNo: 'LN-2026-001',
    customerId: 'cus-1',
    customerName: 'สมศักดิ์ เจริญกิจ',
    branchId: 'branch-hq',
    amount: 10000,
    issueDate: '2026-09-01',
    dueDate: '2026-10-01',
    status: 'active',
    remark: 'ยืมเงินสดไปซื้อของล่วงหน้า',
    repayments: [{ date: '2026-09-10', amount: 5000, staffName: 'คุณมานพ (Cashier)' }],
  },
  {
    id: 'loan-2',
    loanNo: 'LN-2026-002',
    customerId: 'cus-3',
    customerName: 'บุญมี มั่นคง',
    branchId: 'branch-hq',
    amount: 5000,
    issueDate: '2026-09-05',
    dueDate: '2026-09-20',
    status: 'overdue',
    remark: 'เงินทดรองค่าขนส่ง',
    repayments: [{ date: '2026-09-12', amount: 3000, staffName: 'คุณมานพ (Cashier)' }],
  },
];

export const initialExpenses: Expense[] = [
  {
    id: 'exp-1',
    expenseNo: 'EXP-202609-001',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-hq',
    category: 'ค่าแรง',
    description: 'ค่าแรงคนงานคัดแยกขยะ ประจำสัปดาห์',
    amount: 12500,
    paymentMethod: 'cash',
    staffName: 'คุณนภา (Accountant)',
  },
  {
    id: 'exp-2',
    expenseNo: 'EXP-202609-002',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-hq',
    category: 'ค่าไฟ',
    description: 'ค่าไฟฟ้าสำนักงานใหญ่ (ก.ย. 2026)',
    amount: 8400,
    paymentMethod: 'transfer',
    staffName: 'คุณนภา (Accountant)',
  },
  {
    id: 'exp-3',
    expenseNo: 'EXP-202609-003',
    date: new Date().toISOString().slice(0, 10),
    branchId: 'branch-cnx',
    category: 'ค่าน้ำมัน',
    description: 'ค่าน้ำมันรถบรรทุก 6 ล้อ รับของสาขาเชียงใหม่',
    amount: 4500,
    paymentMethod: 'cash',
    staffName: 'คุณวิชัย (Manager)',
  },
];

export const initialCashDrawer: CashDrawerShift = {
  id: 'shift-1',
  branchId: 'branch-hq',
  staffName: 'คุณมานพ (Cashier)',
  openTime: '2026-09-24 08:00:00',
  openingCash: 25000,
  cashSales: 0,
  cashPurchases: 30300,
  expenses: 12500,
  expectedCash: 37200,
  status: 'open',
};

export const initialTruckTrips: TruckTrip[] = [
  {
    id: 'trip-1',
    tripNo: 'TRIP-202609-001',
    truckId: 't-1',
    licensePlate: '81-5544 ปทุมธานี',
    driverName: 'ลุงชาญ ขนส่ง',
    date: new Date().toISOString().slice(0, 10),
    customerName: 'บริษัท โรงถลุงโลหะไทย จำกัด',
    origin: 'สำนักงานใหญ่',
    destination: 'อยุธยา',
    weight: 4500,
    freightAmount: 3500,
    status: 'completed',
  },
  {
    id: 'trip-2',
    tripNo: 'TRIP-202609-002',
    truckId: 't-2',
    licensePlate: '70-1122 กรุงเทพ',
    driverName: 'นายศักดิ์ 6ล้อ',
    date: new Date().toISOString().slice(0, 10),
    customerName: 'เจริญรุ่งเรืองรีไซเคิล',
    origin: 'สำนักงานใหญ่',
    destination: 'สระบุรี',
    weight: 6200,
    freightAmount: 4800,
    status: 'in_transit',
  },
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-24 08:30:15',
    userName: 'คุณสมชาย (Owner)',
    branchId: 'branch-hq',
    action: 'อัปเด้าราคาสินค้า',
    oldValue: '270 บาท/กก.',
    newValue: '280 บาท/กก.',
    details: 'เปลี่ยนราคารับซื้อ ทองแดงท่อใหม่ (แดงเงา)',
  },
  {
    id: 'log-2',
    timestamp: '2026-09-24 09:15:22',
    userName: 'คุณสมศรี (Staff หน้าร้าน)',
    branchId: 'branch-hq',
    action: 'บันทึกซื้อสินค้า',
    newValue: 'RC-202609-00001 (฿7,300)',
    details: 'รับซื้อทองแดงและอลูมิเนียมจากลูกค้า สมศักดิ์ เจริญกิจ',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'แจ้งเตือนสต๊อกต่ำ',
    message: 'สินค้า "แบตเตอรี่รถไฟฟ้า (EV Pack)" ในสาขาเชียงใหม่ ต่ำกว่าจุด Reorder Level (เหลือ 15 ชิ้น)',
    type: 'stock_low',
    timestamp: '2026-09-24 07:00:00',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'ลูกหนี้เกินกำหนด',
    message: 'ลูกหนี้ บุญมี มั่นคง (LN-2026-002) เกินกำหนดชำระเงิน 4 วัน (ยอดค้าง ฿2,000)',
    type: 'overdue_loan',
    timestamp: '2026-09-23 18:00:00',
    read: false,
  },
];
