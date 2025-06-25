export interface InvoiceData {
  invoiceNumber: string;
  receiptNumber: string;
  datePaid: string;
  paymentMethod: string;
  billTo: {
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    email: string;
  };
  amount: string;
  description: string;
  dateRange: string;
  invoiceType: 'windsurf' | 'cursor';
}

export interface BillToInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  email: string;
}

export interface AdvancedConfig {
  customName?: string;
  customAddress1?: string;
  customAddress2?: string;
  customCity?: string;
  customState?: string;
  customCountry?: string;
  customPaymentMethod?: string;
  customAmount?: string;
  customDatePaid?: string;
  customDescription?: string;
}
