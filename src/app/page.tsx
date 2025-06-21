'use client';

import { useState } from 'react';
import Invoice from '@/components/Invoice';
import { generateRandomInvoice } from '@/utils/invoiceGenerator';
import { InvoiceData, AdvancedConfig } from '@/types/invoice';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [advancedConfig, setAdvancedConfig] = useState<AdvancedConfig>({});

  // 统一的输入框样式
  const inputClassName = "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500 text-base font-medium shadow-sm";

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGenerateInvoice = () => {
    // 清除之前的错误
    setEmailError('');

    // 验证邮箱
    if (!email.trim()) {
      setEmailError('请输入邮箱地址');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('请输入有效的邮箱地址');
      return;
    }

    const newInvoice = generateRandomInvoice(email.trim(), advancedConfig);
    setInvoiceData(newInvoice);
  };

  const handlePrint = () => {
    // 设置PDF文件名为Receipt-{receiptNumber}
    if (invoiceData) {
      const receiptNumber = invoiceData.receiptNumber;
      const fileName = `Receipt-${receiptNumber}`;

      // 创建一个临时的样式元素来设置PDF标题
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
        }
      `;
      document.head.appendChild(style);

      // 临时修改页面标题
      const originalTitle = document.title;
      document.title = fileName;

      // 执行打印
      window.print();

      // 恢复原始标题和移除样式
      setTimeout(() => {
        document.title = originalTitle;
        document.head.removeChild(style);
      }, 1000);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 控制面板 */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 print:hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">随机Invoice生成器</h1>
              <p className="text-gray-600">基于Windsurf Invoice模板生成随机Invoice数据</p>
            </div>
            {invoiceData && (
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                打印/保存PDF
              </button>
            )}
          </div>

          {/* 邮箱输入区域 */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1 max-w-md">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                收票人邮箱地址 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500 text-base font-medium shadow-sm ${
                  emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <button
              onClick={handleGenerateInvoice}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              生成新Invoice
            </button>
          </div>

          {/* 高级配置切换按钮 */}
          <div className="mt-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              {showAdvanced ? '隐藏高级配置' : '显示高级配置'}
            </button>
          </div>

          {/* 高级配置面板 */}
          {showAdvanced && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">高级配置 (可选)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 收票人信息 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义姓名
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customName || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customName: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义地址1
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customAddress1 || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customAddress1: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义地址2
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customAddress2 || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customAddress2: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义城市
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customCity || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customCity: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义州/省
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customState || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customState: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义国家
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customCountry || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customCountry: e.target.value})}
                    placeholder="留空则随机生成"
                    className={inputClassName}
                  />
                </div>

                {/* 支付信息 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义支付方式
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customPaymentMethod || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customPaymentMethod: e.target.value})}
                    placeholder="如: Visa - 1234"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义金额
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customAmount || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customAmount: e.target.value})}
                    placeholder="如: $9.90"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义支付日期
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={advancedConfig.customDatePaid ?
                        new Date(advancedConfig.customDatePaid).toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          const date = new Date(e.target.value);
                          const formattedDate = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                          setAdvancedConfig({...advancedConfig, customDatePaid: formattedDate});
                        } else {
                          setAdvancedConfig({...advancedConfig, customDatePaid: ''});
                        }
                      }}
                      className={inputClassName}
                    />
                    {advancedConfig.customDatePaid && (
                      <div className="mt-1 text-xs text-gray-500">
                        预览: {advancedConfig.customDatePaid}
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    自定义产品描述
                  </label>
                  <input
                    type="text"
                    value={advancedConfig.customDescription || ''}
                    onChange={(e) => setAdvancedConfig({...advancedConfig, customDescription: e.target.value})}
                    placeholder="如: Windsurf Pro"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* 重置按钮 */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setAdvancedConfig({})}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
                >
                  重置所有配置
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice显示区域 */}
      <div className="py-2">
        {invoiceData ? (
          <Invoice data={invoiceData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">暂无Invoice</h3>
              <p className="mt-1 text-sm text-gray-500">
                请在上方输入邮箱地址，然后点击&quot;生成新Invoice&quot;按钮开始创建随机Invoice
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 功能说明 */}
      <div className="bg-white border-t border-gray-200 p-6 print:hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">功能说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">随机数据生成</h3>
              <p className="text-sm text-gray-600">
                自动生成Invoice号码、收据号码、支付方式、收票人信息和账单日期
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">PDF导出</h3>
              <p className="text-sm text-gray-600">
                点击&quot;打印/保存PDF&quot;按钮可以将Invoice保存为PDF文件
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">原始样式</h3>
              <p className="text-sm text-gray-600">
                完全保持原始Windsurf Invoice模板的样式和布局
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Augment上传</h3>
              <p className="text-sm text-blue-700 mb-3">
                生成的Invoice可以上传到Augment平台进行进一步处理
              </p>
              <a
                href="https://www.augmentcode.com/resources/windsurf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                访问Augment平台
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
