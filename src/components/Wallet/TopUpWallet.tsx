import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/TopUpWallet.css'; // وارد کردن فایل CSS برای استایل‌دهی

// تعریف اینترفیس برای props کامپوننت
interface TopUpWalletProps {
  onTopUpSuccess?: (amountAdded: number) => void; // تابعی که پس از شارژ موفق فراخوانی می‌شود و مبلغ اضافه شده را برمی‌گرداند
  onBackButtonClick: () => void; // تابعی برای بازگشت به صفحه WalletShow (این prop در این کامپوننت استفاده نمی‌شود اما برای سازگاری با والد نگه داشته شده)
}

const TopUpWallet: React.FC<TopUpWalletProps> = ({ onTopUpSuccess}) => {
  // مبلغ‌های پیشنهادی برای شارژ
  const walletSuggestedAmounts = [
    10000, // 10,000 Toman
    20000, // 20,000 Toman
    50000, // 50,000 Toman
    100000, // 100,000 Toman
    200000, // 200,000 Toman
  ];

  // State برای نگهداری مبلغ انتخاب شده توسط کاربر
  const [walletSelectedAmount, setWalletSelectedAmount] = useState<number | null>(null);
  // State برای متن کپچا تولید شده
  const [walletCaptchaText, setWalletCaptchaText] = useState<string>('');
  // State برای ورودی کپچای کاربر
  const [walletUserInputCaptcha, setWalletUserInputCaptcha] = useState<string>('');
  // State برای پیام‌های وضعیت (موفقیت/خطا)
  const [walletMessage, setWalletMessage] = useState<string | null>(null);
  // State برای مدیریت وضعیت پردازش (مثلاً در حال شارژ)
  const [walletIsProcessing, setWalletIsProcessing] = useState<boolean>(false);

  // تابع برای تولید یک رشته کپچای تصادفی
  const generateWalletCaptcha = useCallback(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) { // تولید کپچای 6 کاراکتری
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setWalletCaptchaText(result);
  }, []);

  // هنگام بارگذاری کامپوننت، یک کپچا تولید شود
  useEffect(() => {
    generateWalletCaptcha();
  }, [generateWalletCaptcha]);

  // تابع برای فرمت‌بندی مبلغ به واحد تومان
  const formatWalletCurrency = (amount: number) => {
    return amount.toLocaleString('en-US') + ' Toman';
  };

  // تابع برای مدیریت انتخاب مبلغ توسط کاربر
  const handleWalletAmountSelect = (amount: number) => {
    setWalletSelectedAmount(amount);
    setWalletMessage(null); // پاک کردن پیام‌های قبلی
  };

  // تابع برای مدیریت فرآیند شارژ کیف پول
  const handleWalletTopUp = async () => {
    if (walletSelectedAmount === null) {
      setWalletMessage('Please select an amount to top up.');
      return;
    }
    if (walletUserInputCaptcha.toLowerCase() !== walletCaptchaText.toLowerCase()) {
      setWalletMessage('CAPTCHA mismatch. Please try again.');
      generateWalletCaptcha(); // تولید کپچای جدید در صورت خطا
      setWalletUserInputCaptcha(''); // پاک کردن ورودی کاربر
      return;
    }

    setWalletIsProcessing(true); // شروع پردازش
    setWalletMessage(null); // پاک کردن پیام قبلی

    try {
      // شبیه‌سازی فرآیند شارژ (مثلاً تماس با API پرداخت)
      await new Promise(resolve => setTimeout(resolve, 2000)); // تاخیر 2 ثانیه

      setWalletMessage(`Successfully topped up ${formatWalletCurrency(walletSelectedAmount)}!`);

      // اگر تابعی برای اطلاع‌رسانی به کامپوننت والد وجود دارد، آن را فراخوانی کن
      if (onTopUpSuccess) {
        onTopUpSuccess(walletSelectedAmount); // مبلغ اضافه شده را به والد می‌فرستد
      }

      // پس از موفقیت، مبلغ انتخاب شده و ورودی کپچا را پاک کن و کپچای جدید تولید کن
      setWalletSelectedAmount(null);
      setWalletUserInputCaptcha('');
      generateWalletCaptcha();

    } catch (error) {
      console.error("Top-up failed:", error);
      setWalletMessage('Top-up failed. Please try again later.');
    } finally {
      setWalletIsProcessing(false); // پایان پردازش
    }
  };

  return (
    // محتوای صفحه افزایش موجودی مستقیماً رندر می‌شود
    // و توسط کانتینر wallet-main-container در WalletPage.tsx احاطه خواهد شد.
    <div className="wallet-topup-content"> {/* یک div جدید برای استایل‌دهی داخلی این کامپوننت */}
      <h1 className="wallet-topup-title">Top-up Your Wallet</h1>

      {/* بخش انتخاب مبلغ */}
      <div className="wallet-amount-selection-section">
        <h2 className="wallet-section-title">Select Amount</h2>
        <div className="wallet-amount-buttons">
          {walletSuggestedAmounts.map((amount) => (
            <button
              key={amount}
              className={`wallet-amount-button ${walletSelectedAmount === amount ? 'wallet-amount-button-selected' : ''}`}
              onClick={() => handleWalletAmountSelect(amount)}
              disabled={walletIsProcessing}
            >
              {formatWalletCurrency(amount)}
            </button>
          ))}
        </div>
      </div>

      {/* بخش کپچا */}
      <div className="wallet-captcha-section">
        <h2 className="wallet-section-title">Verify You Are Human</h2>
        <div className="wallet-captcha-controls"> {/* کانتینر جدید برای کنترل‌های کپچا */}
          <div className="wallet-captcha-display-and-refresh"> {/* کانتینر برای کد کپچا و دکمه رفرش */}
            <div className="wallet-captcha-display" onClick={generateWalletCaptcha}>
              {walletCaptchaText}
            </div>
            <button className="wallet-captcha-refresh-button" onClick={generateWalletCaptcha} disabled={walletIsProcessing}>
              <img src="/public/refresh.png" alt="Refresh" className="wallet-refresh-icon" />
            </button>
          </div>
          <input
            type="text"
            className="wallet-captcha-input"
            placeholder="Enter CAPTCHA"
            value={walletUserInputCaptcha}
            onChange={(e) => setWalletUserInputCaptcha(e.target.value)}
            disabled={walletIsProcessing}
          />  
        </div>
      </div>

      {/* دکمه شارژ و پیام وضعیت */}
      <button
        className="wallet-topup-button"
        onClick={handleWalletTopUp}
        disabled={walletSelectedAmount === null || walletUserInputCaptcha === '' || walletIsProcessing}
      >
        {walletIsProcessing ? 'Processing...' : 'Top Up Now'}
      </button>

      {walletMessage && (
        <div className={`wallet-message ${walletMessage.includes('Successfully') ? 'wallet-message-success' : 'wallet-message-error'}`}>
          {walletMessage}
        </div>
      )}
    </div>
  );
};

export default TopUpWallet;
