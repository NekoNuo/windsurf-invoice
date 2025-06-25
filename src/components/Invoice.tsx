'use client';

import { InvoiceData } from '@/types/invoice';

interface InvoiceProps {
  data: InvoiceData;
}

export default function Invoice({ data }: InvoiceProps) {
  // 根据平台获取公司信息
  const getCompanyInfo = () => {
    if (data.platform === 'cursor') {
      return {
        name: 'Cursor',
        address1: '801 West End Avenue',
        address2: 'New York, New York 10025',
        country: 'United States',
        phone: '+1 831-425-9504',
        email: 'hi@cursor.com',
        logo: '/cursor.svg',
        logoAlt: 'Cursor Logo'
      };
    } else {
      return {
        name: 'Windsurf',
        address1: '900 Villa Street',
        address2: 'Mountain View, California 94041',
        country: 'United States',
        phone: '',
        email: 'noreply@windsurf.com',
        logo: '/logo.png',
        logoAlt: 'Windsurf Logo'
      };
    }
  };

  const companyInfo = getCompanyInfo();

  return (
    <div className="invoice-container">
      <style jsx>{`
        /* 引入与图片中字体相似的Inter字体 */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        .invoice-container {
          /* 设置页面背景色，以凸显A4纸张效果 */
          background-color: #f3f4f6;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .page {
          /* A4纸张尺寸 */
          width: 210mm;
          min-height: 297mm;
          
          /* 在屏幕上居中显示并添加边距和阴影 */
          margin: 2cm 0;
          padding: 40px 50px;
          box-shadow: 0 0 1cm rgba(0,0,0,0.3);
          background-color: #ffffff;

          /* 关键：使用flexbox使页脚能固定在底部 */
          display: flex;
          flex-direction: column;
          
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #000000;
        }

        .content-wrapper {
          flex-grow: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          line-height: 1;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo img {
          width: auto;
          height: 80px;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 700;
        }

        .invoice-meta-section {
          margin-bottom: 20px;
        }

        .invoice-info table {
          border-collapse: collapse;
        }

        .invoice-info td {
          padding: 1px 0;
          vertical-align: top;
          line-height: 1.6;
          font-size: 13px;
        }

        /* 标签样式 (e.g., "Invoice number") */
        .invoice-info td:first-child {
          color: #000000;
          padding-right: 20px;
          font-weight: 400; /* Regular weight */
        }
        
        /* 值样式 (e.g., "70C68990-0002") */
        .invoice-info td:last-child {
          font-weight: 500; /* Medium weight, slightly heavier than regular */
        }

        .address-section {
          display: flex;
          justify-content: flex-start;
          gap: 120px;
          margin-bottom: 20px;
          font-size: 13px;
        }
        
        .address p {
          margin: 0;
          line-height: 1.6;
        }
        
        .address-title {
          font-weight: 500;
        }

        .summary {
          margin-bottom: 40px;
        }
        
        .summary h2 {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        
        .items-table thead th {
          text-align: right;
          border-bottom: 1px solid #9ca3af;
          padding-bottom: 8px;
          font-weight: 400;
          color: #000000;
          font-size: 12px;
        }
        
        .items-table thead th:first-child {
          text-align: left;
        }
        
        .items-table tbody td {
          padding: 8px 0;
          border-bottom: none;
          text-align: right;
          vertical-align: top;
        }
        
        .items-table tbody td:first-child {
          text-align: left;
        }
        
        .items-table th:nth-child(2),
        .items-table td:nth-child(2) {
          width: 15%;
        }

        .items-table th:nth-child(3),
        .items-table td:nth-child(3) {
          width: 15%;
        }
        .items-table th:nth-child(4),
        .items-table td:nth-child(4) {
          width: 13%;
        }
        
        .item-description {
          color: #000000;
        }

        .item-date {
          font-size: 12px;
          margin-top: 2px;
        }
        
        .totals-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0 0 20px 0;
        }
        
        .totals-section {
          display: flex;
          justify-content: flex-end;
        }
        
        .totals-table {
          width: 350px;
          font-size: 13px;
        }
        
        .totals-table tr {
          border-top: 1px solid #e5e7eb;
        }

        .totals-table td {
          padding: 1px 0;
        }

        .totals-table td:last-child {
          text-align: right;
          font-weight: 500;
        }
        
        .totals-table tr td {
          border-top: 1px solid #e5e7eb;
        }

        .totals-table tr:last-child td {
          font-weight: 700;
        }
        
        .footer {
          margin-top: auto;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
        }

        /* 打印样式 */
        @page {
          margin: 0;
          size: A4;
        }

        @media print {
          @page {
            margin: 0;
            size: A4;
          }

          html, body {
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
          }

          .invoice-container {
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            display: block !important;
            justify-content: unset !important;
          }

          .page {
            width: 100% !important;
            min-height: 100vh !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            padding: 40px 50px !important;
            background-color: #ffffff !important;
            display: block !important;
            flex-direction: unset !important;
          }

          .content-wrapper {
            flex-grow: unset !important;
          }

          .footer {
            margin-top: 380px;
            page-break-inside: avoid;
          }

          /* 隐藏浏览器默认的页眉页脚和所有阴影 */
          * {
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
            background-color: inherit !important;
          }

          /* 确保没有灰色背景 */
          *:not(.page) {
            background-color: transparent !important;
          }
        }
      `}</style>

      <div className="page">
        <div className="content-wrapper">
          <div className="header">
            <h1>Receipt</h1>
            <div className="logo">
              <img src={companyInfo.logo} alt={companyInfo.logoAlt} />
            </div>
          </div>

          <div className="invoice-meta-section">
            <div className="invoice-info">
              <table>
                <tbody>
                  <tr>
                    <td><b>Invoice number</b></td>
                    <td><b>{data.invoiceNumber}</b></td>
                  </tr>
                  <tr>
                    <td><b>Receipt number</b></td>
                    <td><b>{data.receiptNumber}</b></td>
                  </tr>
                  <tr>
                    <td><b>Date paid</b></td>
                    <td><b>{data.datePaid}</b></td>
                  </tr>
                  <tr>
                    <td><b>Payment method</b></td>
                    <td><b>{data.paymentMethod}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="address-section">
            <div className="address">
              <p><b>{companyInfo.name}</b></p>
              <p>{companyInfo.address1}</p>
              <p>{companyInfo.address2}</p>
              <p>{companyInfo.country}</p>
              {companyInfo.phone && <p>{companyInfo.phone}</p>}
              <p>{companyInfo.email}</p>
              {data.platform === 'windsurf' && <p>EU OSS VAT EU372077851</p>}
            </div>
            <div className="address">
              <p><b>Bill to</b></p>
              <p>{data.billTo.name}</p>
              <p>{data.billTo.address1}</p>
              <p>{data.billTo.address2}</p>
              <p>{data.billTo.city}</p>
              <p>{data.billTo.state}</p>
              <p>{data.billTo.country}</p>
              <p>{data.billTo.email}</p>
            </div>
          </div>

          <div className="summary">
            <h2>{data.amount} paid on {data.datePaid}</h2>
          </div>

          <table className="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="item-description">{data.description}</div>
                  <div className="item-date">{data.dateRange}</div>
                </td>
                <td>1</td>
                <td>{data.amount}</td>
                <td>{data.amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="totals-section">
            <table className="totals-table">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{data.amount}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{data.amount}</td>
                </tr>
                <tr>
                  <td><b>Amount paid</b></td>
                  <td><b>{data.amount}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer">
          <span>{data.receiptNumber} - {data.amount} paid on {data.datePaid}</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}