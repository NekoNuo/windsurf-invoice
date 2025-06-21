import { InvoiceData, BillToInfo, AdvancedConfig } from '@/types/invoice';

// 随机生成Invoice号码 (格式: 8位字符-4位数字)
function generateInvoiceNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${result}-${numbers}`;
}

// 随机生成收据号码 (格式: 4位数字-4位数字)
function generateReceiptNumber(): string {
  const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${part1}-${part2}`;
}

// 随机生成支付方式
function generatePaymentMethod(): string {
  const methods = [
    'American Express - 1116',
    'Visa - 4532',
    'MasterCard - 5678',
    'American Express - 3456',
    'Visa - 4123',
    'MasterCard - 5432',
    'Discover - 6011',
    'American Express - 3789',
    'Visa - 4987',
    'MasterCard - 5123'
  ];
  return methods[Math.floor(Math.random() * methods.length)];
}

// 随机生成日期 (2025年4月17日至2025年6月16日)
function generateRandomDate(): string {
  const startDate = new Date('2025-04-17');
  const endDate = new Date('2025-06-16');
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  
  return randomDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 随机生成收票人信息
function generateBillToInfo(email: string, config?: AdvancedConfig): BillToInfo {
  const names = [
    'ZHANG WEI', 'WANG MING', 'LI XIAOLI', 'CHEN ZHANGQI', 'ZHAO YIFAN',
    'JOHN SMITH', 'JANE DOE', 'MICHAEL BROWN', 'SARAH WILSON', 'DAVID JONES',
    'MARIA GARCIA', 'ROBERT TAYLOR', 'JENNIFER DAVIS', 'WILLIAM MILLER', 'ELIZABETH MOORE'
  ];

  const addresses1 = [
    '100000', '200000', '300000', '400000', '500000',
    '123 Main Street', '456 Oak Avenue', '789 Pine Road', '321 Elm Street', '654 Maple Drive'
  ];

  const addresses2 = [
    '北京市北京', '上海市上海', '广州市广东', '深圳市广东', '杭州市浙江',
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'
  ];

  const cities = [
    '通州玉桥', '浦东新区', '天河区', '南山区', '西湖区',
    'Manhattan', 'Hollywood', 'Downtown', 'Midtown', 'Uptown'
  ];

  const states = [
    '北京', '上海', '广东', '浙江', '江苏',
    'New York', 'California', 'Illinois', 'Texas', 'Arizona'
  ];

  const countries = [
    'China', 'United States', 'Canada', 'United Kingdom', 'Australia',
    'Germany', 'France', 'Japan', 'South Korea', 'Singapore'
  ];

  return {
    name: config?.customName || names[Math.floor(Math.random() * names.length)],
    address1: config?.customAddress1 || addresses1[Math.floor(Math.random() * addresses1.length)],
    address2: config?.customAddress2 || addresses2[Math.floor(Math.random() * addresses2.length)],
    city: config?.customCity || cities[Math.floor(Math.random() * cities.length)],
    state: config?.customState || states[Math.floor(Math.random() * states.length)],
    country: config?.customCountry || countries[Math.floor(Math.random() * countries.length)],
    email: email
  };
}

// 生成日期范围 (基于支付日期)
function generateDateRange(datePaid: string): string {
  const paidDate = new Date(datePaid);
  const startDate = new Date(paidDate);
  const endDate = new Date(paidDate);
  endDate.setMonth(endDate.getMonth() + 1);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}, ${paidDate.getFullYear()}`;
}

// 主要的Invoice生成函数
export function generateRandomInvoice(email: string, config?: AdvancedConfig): InvoiceData {
  const invoiceNumber = generateInvoiceNumber();
  const receiptNumber = generateReceiptNumber();
  const datePaid = config?.customDatePaid || generateRandomDate();
  const paymentMethod = config?.customPaymentMethod || generatePaymentMethod();
  const billTo = generateBillToInfo(email, config);
  const amount = config?.customAmount || '$6.90';
  const description = config?.customDescription || 'Windsurf Pro';
  const dateRange = generateDateRange(datePaid);

  return {
    invoiceNumber,
    receiptNumber,
    datePaid,
    paymentMethod,
    billTo,
    amount,
    description,
    dateRange
  };
}
