import React, { useState, useEffect, useCallback } from "react";
import { useScore } from "../contexts/GameScoreContext";
import { api } from "../../utils/api";
import "../../styles/Wallet.css";

interface WalletShowProps {
  currentBalance: number;
  onChargeButtonClick: () => void;
  onSubmitAmount?: (amount: number) => void;
  onSecondActionClick?: () => void;
}

const WalletShow: React.FC<WalletShowProps> = ({
  currentBalance,
  onChargeButtonClick,
  onSubmitAmount,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { totalScore, setTotalScore } = useScore();

  const formatWalletCurrency = (amount: number) =>
    amount.toLocaleString("en-US") + " Toman";

  const generateCaptcha = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  useEffect(() => {
    async function fetchTotalScore() {
      try {
        const res = await api.get("/api/accounts/game-score/");
        const backendScore = res.game_score ?? 0;
        setTotalScore(backendScore);
      } catch (error) {
        console.error("Failed to fetch total score:", error);
      }
    }

    fetchTotalScore();
  }, [setTotalScore]);

  const handleSubmit = async () => {
    if (amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    if (amount > totalScore) {
      setPopupMessage(`Amount cannot exceed your total score of ${totalScore}.`);
      setShowPopup(true);
      return;
    }

    if (userCaptchaInput.toLowerCase() !== captchaText.toLowerCase()) {
      setMessage("CAPTCHA mismatch. Please try again.");
      generateCaptcha();
      setUserCaptchaInput("");
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const newScore = totalScore - amount;
      await api.put("/api/accounts/game-score/", { score: newScore });
      setTotalScore(newScore);
      await onSubmitAmount?.(amount);
      setMessage(`Successfully topped up ${formatWalletCurrency(amount)}!`);
      setAmount(0);
      setUserCaptchaInput("");
      generateCaptcha();
    } catch (error) {
      console.error("Top-up failed:", error);
      setMessage("Top-up failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="wallet-content-grid">
      <div className="wallet-column-left">
        <div className="wallet-balance-card">
          <p className="wallet-balance-label">Current Balance:</p>
          <p className="wallet-balance-amount">
            {formatWalletCurrency(currentBalance)}
          </p>
        </div>

        <button className="wallet-charge-button" onClick={onChargeButtonClick}>
          Top-up Wallet
        </button>

        <div className="wallet-input-wrapper">
          <p className="wallet-score-label" style={{ fontWeight: "bold" }}>
            Total Game Score: {totalScore}
          </p>
          {!showInput && (
            <button
              className="wallet-show-input-button"
              onClick={() => setShowInput(true)}
            >
              Exchange Game Score
            </button>
          )}

          {showInput && (
            <div className="wallet-custom-topup-box">
              <input
                type="number"
                className="wallet-inline-input"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > totalScore) {
                    setPopupMessage(
                      `You cannot enter more than your total score of ${totalScore}.`
                    );
                    setShowPopup(true);
                    setAmount(totalScore);
                  } else if (val < 0) {
                    setAmount(0);
                  } else {
                    setAmount(val);
                  }
                }}
                disabled={isProcessing}
              />

              <div className="wallet-captcha-row">
                <div
                  className="wallet-captcha-display"
                  onClick={generateCaptcha}
                >
                  {captchaText}
                </div>
                <button
                  className="wallet-captcha-refresh-button"
                  onClick={generateCaptcha}
                  disabled={isProcessing}
                >
                  🔁
                </button>
              </div>

              <input
                type="text"
                className="wallet-captcha-input"
                placeholder="Enter CAPTCHA"
                value={userCaptchaInput}
                onChange={(e) => setUserCaptchaInput(e.target.value)}
                disabled={isProcessing}
              />

              <button
                className="wallet-inline-submit"
                onClick={handleSubmit}
                disabled={isProcessing || !amount || !userCaptchaInput}
              >
                {isProcessing ? "Processing..." : "Top Up Now"}
              </button>

              {message && (
                <div
                  className={`wallet-message ${
                    message.includes("Successfully")
                      ? "wallet-message-success"
                      : "wallet-message-error"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="wallet-transactions-section">
        <h2 className="wallet-transactions-title">Transaction History</h2>
        <p className="wallet-no-transactions">
          This section is temporarily disabled.
        </p>
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletShow;
