import React from 'react';
import '../../styles/Wallet.css';

interface WalletShowProps {
  currentBalance: number;
  onChargeButtonClick: () => void;
}

const WalletShow: React.FC<WalletShowProps> = ({ currentBalance, onChargeButtonClick }) => {
  const formatWalletCurrency = (amount: number) => {
    return amount.toLocaleString('en-US') + ' Toman';
  };

  return (
    <div className="wallet-content-grid">
      {/* فقط نمایش موجودی و دکمه شارژ */}
      <div className="wallet-column-left">
        <div className="wallet-balance-card">
          <p className="wallet-balance-label">Current Balance:</p>
          <p className="wallet-balance-amount">{formatWalletCurrency(currentBalance)}</p>
        </div>

        <button className="wallet-charge-button" onClick={onChargeButtonClick}>
          Top-up Wallet
        </button>
      </div>

      {/* این بخش تراکنش‌ها به صورت ماک غیر فعال شده */}
      <div className="wallet-transactions-section">
        <h2 className="wallet-transactions-title">Transaction History</h2>
        <p className="wallet-no-transactions">This section is temporarily disabled.</p>
      </div>
    </div>
  );
};

export default WalletShow;
