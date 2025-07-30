import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletShow from '../components/Wallet/WalletShow';
import TopUpWallet from '../components/Wallet/TopUpWallet';
import '../styles/Wallet.css';
import '../styles/TopUpWallet.css';

// فرض کنیم api.ts در مسیر src/api.ts موجوده
import { api } from '../utils/api'

const WalletPage: React.FC = () => {
  const navigate = useNavigate();

  const [walletBalance, setWalletBalance] = useState<number>(0); // مقدار اولیه 0
  const [showTopUpPage, setShowTopUpPage] = useState<boolean>(false);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // تابع بارگذاری موجودی کیف پول از API
  const fetchWalletBalance = async () => {
    setLoadingBalance(true);
    setErrorMessage(null);
    try {
      // اگر api.ts رو استفاده می‌کنی:
      const data = await api.get('/api/accounts/wallet/balance/');
      // فرض می‌کنیم پاسخ به شکل { balance: number }
      setWalletBalance(data.balance);
    } catch (error) {
      console.error('Failed to load wallet balance:', error);
      setErrorMessage('error in loading wallet amount');
    } finally {
      setLoadingBalance(false);
    }
  };

  // بارگذاری موجودی هنگام بارگذاری کامپوننت
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  // تابع ارسال درخواست شارژ به API
  const handleTopUpSuccess = async (amountAdded: number) => {
    try {
      // ارسال درخواست شارژ به API
      await api.post('/api/accounts/wallet/charge/', { amount: amountAdded.toString() });
      // پس از شارژ موفق، مجدد موجودی را از سرور دریافت کن
      await fetchWalletBalance();
      setShowTopUpPage(false);
      console.log(`Wallet topped up by ${amountAdded}. New balance: ${walletBalance + amountAdded}`);
    } catch (error) {
      console.error('Top-up failed:', error);
      alert('error in charging wallet. please try again');
    }
  };

  const handleWalletBack = () => {
    if (showTopUpPage) {
      setShowTopUpPage(false);
    } else {
      navigate(-1);
    }
  };

  const handleWalletProfile = () => {
    navigate('/userprofile');
  };

  const handleShowTopUpPage = () => {
    setShowTopUpPage(true);
  };

  return (
    <>
      <header className="wallet-header">
        <button className="wallet-header-button wallet-back-button" onClick={handleWalletBack}>
          <img src="/arrow-right-solid.svg" alt="Back" className="wallet-icon" />
        </button>
        <div className="wallet-header-logo">{showTopUpPage ? 'Pelimo' : 'Pelimo'}</div>
        <button className="wallet-header-button wallet-profile-button" onClick={handleWalletProfile}>
          <img src="/profile.png" alt="Profile" className="wallet-icon" />
        </button>
      </header>

      <div className="wallet-main-container">
        {showTopUpPage ? (
          <TopUpWallet
            onTopUpSuccess={handleTopUpSuccess}
            onBackButtonClick={() => setShowTopUpPage(false)}
          />
        ) : (
          <>
            <h1 className="wallet-title">My Wallet</h1>
            {loadingBalance ? (
              <p>loading...</p>
            ) : errorMessage ? (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            ) : (
              <WalletShow
                currentBalance={walletBalance}
                onChargeButtonClick={handleShowTopUpPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WalletPage;
