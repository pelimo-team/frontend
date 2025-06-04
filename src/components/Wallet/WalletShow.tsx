import React, { useState, useEffect } from 'react';
import '../../styles/Wallet.css'; // وارد کردن فایل CSS برای استایل‌دهی از پوشه styles

// تعریف اینترفیس برای ساختار یک تراکنش
interface Transaction {
  walletTransactionId: string; // شناسه منحصر به فرد تراکنش
  walletTransactionType: 'charge' | 'payment'; // نوع تراکنش: 'charge' (افزایش موجودی) یا 'payment' (پرداخت)
  walletTransactionAmount: number; // مبلغ تراکنش
  walletTransactionDate: string; // تاریخ و زمان تراکنش
  walletTransactionDescription: string; // توضیحات مربوط به تراکنش
}

// تعریف اینترفیس برای props کامپوننت WalletShow
interface WalletShowProps {
  currentBalance: number; // موجودی فعلی کیف پول که از والد (WalletPage) دریافت می‌شود
  onChargeButtonClick: () => void; // تابعی که هنگام کلیک روی دکمه شارژ فراخوانی می‌شود
}

const WalletShow: React.FC<WalletShowProps> = ({ currentBalance, onChargeButtonClick }) => {
  // State برای نگهداری لیست تراکنش‌ها
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>([]);
  // State برای مدیریت وضعیت بارگذاری داده‌ها
  const [walletIsLoading, setWalletIsLoading] = useState<boolean>(true);
  // State برای نمایش پیام خطا در صورت بروز مشکل
  const [walletError, setWalletError] = useState<string | null>(null);

  // useEffect برای شبیه‌سازی دریافت تاریخچه تراکنش‌ها از سرور هنگام بارگذاری کامپوننت
  useEffect(() => {
    const fetchWalletTransactions = async () => {
      try {
        setWalletIsLoading(true); // شروع بارگذاری
        setWalletError(null); // پاک کردن خطاهای قبلی

        // شبیه‌سازی تاخیر در دریافت داده از سرور (مثلاً 1 ثانیه)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // داده‌های نمونه: در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
        const fetchedTransactions: Transaction[] = [
          { walletTransactionId: '1', walletTransactionType: 'charge', walletTransactionAmount: 50000, walletTransactionDate: '2024/06/01 14:30', walletTransactionDescription: 'Wallet Top-up' },
          { walletTransactionId: '2', walletTransactionType: 'payment', walletTransactionAmount: -35000, walletTransactionDate: '2024/05/30 10:15', walletTransactionDescription: 'Pizza Purchase' },
          { walletTransactionId: '3', walletTransactionType: 'charge', walletTransactionAmount: 100000, walletTransactionDate: '2024/05/28 18:00', walletTransactionDescription: 'Wallet Top-up' },
          { walletTransactionId: '4', walletTransactionType: 'payment', walletTransactionAmount: -20000, walletTransactionDate: '2024/05/27 12:45', walletTransactionDescription: 'Soft Drink Purchase' },
        ];

        setWalletTransactions(fetchedTransactions); // به‌روزرسانی لیست تراکنش‌ها
      } catch (err) {
        // مدیریت خطا در صورت عدم موفقیت در دریافت داده
        setWalletError('Failed to load transaction history. Please try again.');
        console.error("Error fetching wallet data:", err);
      } finally {
        setWalletIsLoading(false); // پایان بارگذاری
      }
    };

    fetchWalletTransactions(); // فراخوانی تابع دریافت داده
  }, []); // آرایه وابستگی خالی به معنای اجرای یک بار پس از mount شدن کامپوننت

  // تابع برای فرمت‌بندی مبلغ به واحد تومان
  const formatWalletCurrency = (amount: number) => {
    return amount.toLocaleString('en-US') + ' Toman'; // فرمت‌بندی برای زبان انگلیسی و اضافه کردن "Toman"
  };

  return (
    // این بخش شامل چیدمان دو ستونه برای دسکتاپ است
    <div className="wallet-content-grid">
      {/* ستون اول: کارت موجودی و دکمه افزایش موجودی (در حالت RTL در سمت راست قرار می‌گیرد) */}
      <div className="wallet-column-left">
        {/* کارت نمایش موجودی فعلی */}
        <div className="wallet-balance-card">
          <p className="wallet-balance-label">Current Balance:</p>
          <p className="wallet-balance-amount">{formatWalletCurrency(currentBalance)}</p> {/* موجودی از props دریافت می‌شود */}
        </div>

        {/* دکمه افزایش موجودی */}
        <button className="wallet-charge-button" onClick={onChargeButtonClick}> {/* تابع از props فراخوانی می‌شود */}
          Top-up Wallet
        </button>
      </div>

      {/* ستون دوم: تاریخچه تراکنش‌ها (در حالت RTL در سمت چپ قرار می‌گیرد) */}
      <div className="wallet-transactions-section">
        <h2 className="wallet-transactions-title">Transaction History</h2>
        {walletIsLoading ? (
          <div className="wallet-loading-message">Loading transactions...</div>
        ) : walletError ? (
          <div className="wallet-error-message">{walletError}</div>
        ) : walletTransactions.length === 0 ? (
          <p className="wallet-no-transactions">No transactions found.</p>
        ) : (
          <ul className="wallet-transaction-list">
            {walletTransactions.map((transaction) => (
              <li key={transaction.walletTransactionId} className={`wallet-transaction-item ${transaction.walletTransactionType}`}>
                <div className="wallet-transaction-details">
                  <span className="wallet-transaction-description">{transaction.walletTransactionDescription}</span>
                  <span className="wallet-transaction-date">{transaction.walletTransactionDate}</span>
                </div>
                <span className={`wallet-transaction-amount ${transaction.walletTransactionType}`}>
                  {/* نمایش علامت + یا - بر اساس نوع تراکنش */}
                  {transaction.walletTransactionType === 'payment' ? '-' : '+'} {formatWalletCurrency(Math.abs(transaction.walletTransactionAmount))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletShow;
