import React, { useState, useEffect } from "react";
import { ShoppingBasket } from "lucide-react";
import "../../styles/FoodPage.css";
import { api } from "../../utils/api";
import AlertModal from "../Cart/CartAlertModel";

interface AddToBasketProps {
  price: number;
  restaurantId: number;
  menuItemId: number;
  onSuccess?: () => void;
}

const AddToBasket: React.FC<AddToBasketProps> = ({
  price,
  restaurantId,
  menuItemId,
  onSuccess,
}) => {
  const [cartRestaurantId, setCartRestaurantId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [added, setAdded] = useState(false);
  const [cartItemId, setCartItemId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showError = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await api.get("/api/cart/");
        console.log("Fetched carts:", response); // 
        const cart = Array.isArray(response) ? response[0] : response;

        const cartRestId = cart?.restaurant?.id || null;
        setCartRestaurantId(cartRestId);

        if (cartRestId) {
          localStorage.setItem("cartRestaurantId", cartRestId.toString());
        }

        const matchingItem = cart.items.find(
          (item: any) => item.menu_item.id === menuItemId
        );

        if (matchingItem) {
          setQuantity(matchingItem.quantity);
          setCartItemId(matchingItem.id); // ✅ اینجا هم id می‌گیریم
          setAdded(true);
        }
      } catch (err) {
        setCartRestaurantId(null);
      }
    };

    fetchCart();
  }, [menuItemId]);

  const handleAddToBasket = async () => {
    const quantityToAdd = 1;

    if (cartRestaurantId !== null && cartRestaurantId !== restaurantId) {
      setModalMessage("you can only add item from one restaurant!");
      setShowModal(true);
      return;
    }

    try {
      await api.post("/api/cart/add/", {
        restaurant_id: restaurantId,
        menu_item_id: menuItemId,
        quantity: quantityToAdd,
      });

      // ✅ بعد از اضافه کردن، سبد رو بگیر
      const cartRes = await api.get("/api/cart/");
      const cart = Array.isArray(cartRes) ? cartRes[0] : cartRes;

      const matchingItem = cart.items.find(
        (item: any) => item.menu_item.id === menuItemId
      );

      if (matchingItem) {
        setQuantity(matchingItem.quantity);
        setAdded(true);
        setCartItemId(matchingItem.id); // ✅ حالا id آیتم رو داری
        setCartRestaurantId(restaurantId);
       
        if (onSuccess) onSuccess();
      } else {
        throw new Error("Item not found in cart after adding.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "problem in adding to basket!";
      setModalMessage(errorMessage);
      setShowModal(true);
    }
  };

  const updateQuantity = async (newQuantity: number) => {
    if (!cartItemId) return;
  
    try {
      if (newQuantity < 1) {
        // حذف آیتم از سبد خرید با DELETE به مسیر صحیح
        await api.delete(`/api/cart/item/${cartItemId}/delete/`);
        setQuantity(0);
        setAdded(false);
        setCartItemId(null);
        setCartRestaurantId(null);
        localStorage.removeItem("cartRestaurantId");
      } else {
        await api.patch(`/api/cart/item/${cartItemId}/`, {
          quantity: newQuantity,
        });
        setQuantity(newQuantity);
      }
  
      if (onSuccess) onSuccess();
    } catch (err) {
      showError("error in updating basket amount");
    }
  };
  


  const totalPrice = (price * (quantity || 1)).toFixed(2);

  return (
    <div className="add-to-basket">
      <div className="price-container">
        <span className="price">${totalPrice}</span>
      </div>

      {quantity === 0 ? (
        <button
          className={`add-btn ${added ? "added" : ""}`}
          onClick={handleAddToBasket}
        >
          <ShoppingBasket size={18} />
          <span>{added ? "Added!" : "Add to Basket"}</span>
        </button>
      ) : (
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(quantity - 1)}
          >
            -
          </button>

          <span className="quantity">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      )}

      <AlertModal
        show={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default AddToBasket;
