import React, { useState, useEffect } from "react";
import { CartItem } from "./types";
import { api } from "../../utils/api"; // مسیر api.ts را تنظیم کن

interface CartSummaryProps {
  items: CartItem[];
  deliveryCost: number;
  onClearCart: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, deliveryCost,onClearCart }) => {
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // محاسبه جمع کل
  const calculateTotal = (items: CartItem[]) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => {
      const basePrice = Number(item?.menu_item?.price) || 0;
      const salePrice = Number(item?.menu_item?.sale_price) || basePrice;
      const price = item?.menu_item?.onsale ? salePrice : basePrice;
      const quantity = Number(item?.quantity) || 0;

      const itemTotal = price * quantity;
      return total + (Number.isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  const itemsTotal = calculateTotal(items);
  const overallTotal = itemsTotal + (Number(deliveryCost) || 0);

  // گرفتن موجودی کیف پول هنگام لود کامپوننت یا تغییر items/deliveryCost
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const walletData = await api.get("/api/accounts/wallet/balance/");
        const balance = Number(walletData.balance);
        if (isNaN(balance)) throw new Error(" invalid balance!");
        setWalletBalance(balance);
      } catch (error) {
        console.error("error in fetching wallet balance", error);
        setWalletBalance(null);
      }
    };

    fetchWalletBalance();
  }, [items, deliveryCost]);

  const handlePayment = async () => {
    setMessage(null);
    setMessageType(null);
    setLoading(true);

    try {
      const paymentResponse = await api.post("/api/cart/pay/", {});
      console.log("✅ successful payment:", paymentResponse);

      setMessage("payment done succesfuly✅");
      setMessageType("success");
      
      // بعد پرداخت، میتونی موجودی کیف پول رو دوباره بروزرسانی کنی اگر میخوای
      // fetchWalletBalance(); // اگر بخوای این رو به useEffect خارجیش منتقل کنی یا داخل تابع جداگانه بذاری
    } catch (error: any) {
      console.error("❌ error in payment :", error);
      setMessage("trouble in payment. please try again!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const isWalletSufficient =
    walletBalance !== null && walletBalance >= overallTotal;

  return (
    <div className="cart-summary mt-4">
      <div className="d-flex justify-content-between mb-2">
        <span>Order Cost:</span>
        <span className="cart-food-price">
          {(itemsTotal || 0).toLocaleString()} Toman
        </span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Delivery Cost:</span>
        <span className="cart-food-price">
          {(Number(deliveryCost) || 0).toLocaleString()} Toman
        </span>
      </div>
      <div className="d-flex justify-content-between fw-bold mb-3">
        <span>Total Cost:</span>
        <span className="cart-food-price">
          {(overallTotal || 0).toLocaleString()} Toman
        </span>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span>Wallet Balance:</span>
        <span
          className={`cart-food-price ${
            isWalletSufficient ? "text-success" : "text-danger"
          }`}
        >
          {walletBalance !== null
            ? walletBalance.toLocaleString() + " Toman"
            : "Loading..."}
        </span>
      </div>

      {message && (
        <div
          className={`alert text-center mt-3 ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="custom-continue-btn"
          onClick={onClearCart}
          
        >
clear basket
        </button>

        <button
          className="custom-continue-btn"
          onClick={handlePayment}
          disabled={loading || !isWalletSufficient}
          title={!isWalletSufficient ? " not enough wallet amount" : undefined}
        >
          {loading ? "loading..." : "payment"}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
