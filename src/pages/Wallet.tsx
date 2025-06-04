import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletShow from '../components/Wallet/WalletShow'; // وارد کردن کامپوننت WalletShow
import TopUpWallet from '../components/Wallet/TopUpWallet'; // وارد کردن کامپوننت TopUpWallet
import '../styles/Wallet.css'; // وارد کردن فایل CSS اصلی کیف پول
import '../styles/TopUpWallet.css'; // وارد کردن فایل CSS صفحه افزایش موجودی (برای هدر مشترک)

const WalletPage: React.FC = () => {
  const navigate = useNavigate(); // هوک برای ناوبری

  // State اصلی برای نگهداری موجودی کیف پول در این صفحه
  const [walletBalance, setWalletBalance] = useState<number>(150000); // موجودی اولیه
  // State برای کنترل نمایش صفحه افزایش موجودی
  const [showTopUpPage, setShowTopUpPage] = useState<boolean>(false);

  // تابع برای بازگشت به صفحه قبلی (در اینجا به WalletShow)
  const handleWalletBack = () => {
    if (showTopUpPage) {
      setShowTopUpPage(false); // اگر در صفحه افزایش موجودی هستیم، به WalletShow برگرد
    } else {
      navigate(-1); // در غیر این صورت، به صفحه قبلی در تاریخچه مرورگر برو
    }
  };

  // تابع برای هدایت به صفحه پروفایل
  const handleWalletProfile = () => {
    navigate('/userprofile'); // هدایت به مسیر /profile
  };

  // تابع برای نمایش صفحه افزایش موجودی
  const handleShowTopUpPage = () => {
    setShowTopUpPage(true);
  };

  // تابعی که از TopUpWallet فراخوانی می‌شود تا موجودی را به‌روز کند
  const handleTopUpSuccess = (amountAdded: number) => {
    setWalletBalance(prevBalance => prevBalance + amountAdded); // مبلغ اضافه شده را به موجودی قبلی اضافه می‌کند
    setShowTopUpPage(false); // پس از شارژ موفق، به صفحه نمایش کیف پول برگرد
    // می‌توانید در اینجا یک پیام موفقیت‌آمیز کلی نیز نمایش دهید
    console.log(`Wallet topped up by ${amountAdded}. New balance: ${walletBalance + amountAdded}`);
  };

  return (
    <>
      {/* بخش هدر (خارج از کانتینر اصلی) */}
      <header className="wallet-header">
        <button className="wallet-header-button wallet-back-button" onClick={handleWalletBack}>
          <img src="public\arrow-right-solid.svg" alt="Back" className="wallet-icon" />
        </button>
        <div className="wallet-header-logo">
          {showTopUpPage ? 'Pelimo' : 'Pelimo'}
        </div>
        <button className="wallet-header-button wallet-profile-button" onClick={handleWalletProfile}>
          <img src="public\profile.png" alt="Profile" className="wallet-icon" />
        </button>
      </header>

      {/* کانتینر اصلی صفحه کیف پول */}
      <div className="wallet-main-container">
        {/* رندر شرطی بر اساس showTopUpPage */}
        {showTopUpPage ? (
          <TopUpWallet 
            onTopUpSuccess={handleTopUpSuccess} // تابع موفقیت شارژ
            onBackButtonClick={() => setShowTopUpPage(false)} // تابع بازگشت از صفحه شارژ
          />
        ) : (
          <>
            <h1 className="wallet-title">My Wallet</h1>
            <WalletShow 
              currentBalance={walletBalance} // موجودی را به WalletShow پاس می‌دهد
              onChargeButtonClick={handleShowTopUpPage} // تابع نمایش صفحه شارژ را به WalletShow پاس می‌دهد
            />
          </>
        )}
      </div>
    </>
  );
};

export default WalletPage;
