<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import './CartPage.css';

const CartPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [showAllItems, setShowAllItems] = useState({});

  useEffect(() => {
   
      setRestaurant({
        name: 'رستوران پلومو',
        location: 'تهران، ونک',
        rating: 4,
        image: '/restaurant.jpg',
        logo: '/Logo.png',
        username: 'username123',
        avatar: null,
      });

      setMenuItems([
        {
          category: 'دسته بندی ۱',
          items: [
            { id: 1, name: 'سالاد سزار', price: '50000', image: '/food_image.jpg' },
            { id: 2, name: 'سوپ ورمیشل', price: '30000', image: '/food_image.jpg' },
            { id: 3, name: 'پیتزا مارگاریتا', price: '70000', image: '/food_image.jpg' },
          ],
        },
        {
          category: 'دسته بندی ۲',
          items: [
            { id: 4, name: 'استیک گوشت', price: '150000', image: '/food_image.jpg' },
            { id: 5, name: 'پاستا آلفردو', price: '120000', image: '/food_image.jpg' },
            { id: 6, name: 'چیکن کوردن بلو', price: '110000', image: '/food_image.jpg' },
          ],
        },
        {
          category: 'دسته بندی ۳',
          items: [
            { id: 7, name: 'برگر کلاسیک', price: '90000', image: '/food_image.jpg' },
            { id: 8, name: 'هات‌داگ ویژه', price: '60000', image: '/food_image.jpg' },
            { id: 9, name: 'ساندویچ مرغ', price: '65000', image: '/food_image.jpg' },
          ],
        },
      ]);
   
  }, []);

  const toggleShowAll = (index) => {
    setShowAllItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container className="mt-5 text-end">
      <h5 className="mb-4 fw-bold">
        آدرس: تهران، صادقیه، فلکه دوم، کوچه سلام، پلاک 10 واحد 11
      </h5>

      {restaurant && menuItems.length > 0 && (
        <>
          {menuItems.map((category, index) => (
            <Card className="mb-5 p-4 border border-dark" key={index}>
              <Row>
                <Col xs={12} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="restaurant-header">
                    <div className="logo-circle">
                      <Image src={restaurant.logo} fluid />
                    </div>
                    <div className="text-end">
                      <h4 className="fw-bold mb-1">{restaurant.name}</h4>
                      <span className="text-muted">جمعه 29 فروردین . 20:30</span>
                    </div>
                  </div>
                </Col>

                <div
                  className="menu-item-wrapper"
                  style={{
                    maxHeight: showAllItems[index] ? '1000px' : '320px',
                  }}
                >
                  {(showAllItems[index] ? category.items : category.items.slice(0, 2)).map((item) => (
                    <Row className="align-items-center border-top pt-3 mt-3" key={item.id}>
                      <Col md={2}>
                        <Image src={item.image} fluid style={{ width: '90px' }} />
                      </Col>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                      </Col>
                      <Col md={4} className="text-start">
                        <h5>{parseInt(item.price).toLocaleString()} تومان</h5>
                      </Col>
                    </Row>
                  ))}
                </div>

                {category.items.length > 2 && (
                  <div
                    className="text-center my-3 cursor-pointer more-toggle"
                    onClick={() => toggleShowAll(index)}
                  >
                    <span>
                      {showAllItems[index] ? 'بستن' : 'موارد بیشتر'}
                      <span className={`arrow-icon ${showAllItems[index] ? 'rotate' : ''}`}>▼</span>
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-center gap-3 align-items-center mt-4">
                  <button className="custom-delete-btn">حذف سبد</button>
                  <button className="custom-continue-btn">ادامه خرید</button>
                </div>
              </Row>
            </Card>
          ))}
        </>
      )}
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { api } from './utils/api';
import './Cart.css';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await api.get('/api/cart/');
      setCarts(Array.isArray(response) ? response : [response]);
      setError(null);
    } catch (err) {
      console.error('Error fetching carts:', err);
      setError(err.message);
      if (err.message === 'Authentication required') {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await api.patch(`/api/cart/item/${itemId}/`, {
        quantity: newQuantity
      });
      await fetchCarts();
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError(err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/api/cart/item/${itemId}/delete/`);
      await fetchCarts();
    } catch (err) {
      console.error('Error removing item:', err);
      setError(err.message);
    }
  };

  const calculateTotal = (items) => {
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

  if (loading) {
    return (
      <Container className="cart-container">
        <div className="cart-loading">در حال بارگذاری سبد خرید...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="cart-container">
        <div className="cart-error">
          {error}
          <button className="custom-continue-btn" onClick={fetchCarts}>تلاش مجدد</button>
        </div>
      </Container>
    );
  }

  if (carts.length === 0) {
    return (
      <Container className="cart-container">
        <div className="cart-box text-center">
          <h2>سبد خرید شما خالی است</h2>
          <button className="custom-continue-btn mt-3" onClick={() => navigate('/')}>
            مشاهده رستوران‌ها
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="cart-container mt-4">
      <header className="d-flex align-items-center justify-content-between mb-4">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/back.png" alt="بازگشت" />
        </button>
        <h1 className="cart-title mb-0">سبد خرید</h1>
        <div style={{ width: '40px' }}></div>
      </header>

      {carts.map((cart) => (
        <div key={cart.id} className="cart-box">
          <div className="restaurant-header">
            <div className="d-flex align-items-center gap-3">
              <div className="logo-circle">
                <img 
                  src={cart.restaurant.logo || '/restaurant-placeholder.png'} 
                  alt={cart.restaurant.name}
                />
              </div>
              <div>
                <h2 className="cart-title">{cart.restaurant.name}</h2>
                <div className="cart-date">{new Date(cart.created_at).toLocaleDateString('fa-IR')}</div>
              </div>
            </div>
          </div>

          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.menu_item.image || '/food-placeholder.png'} 
                  alt={item.menu_item.name}
                  className="cart-food-img"
                />
                <div className="cart-item-content">
                  <div>
                    <h3 className="cart-food-name">{item.menu_item?.name || 'نامشخص'}</h3>
                    <p className="cart-food-price">
                      {item.menu_item?.onsale ? (
                        <>
                          <span className="original-price">{(Number(item.menu_item?.price) || 0).toLocaleString()} تومان</span>
                          <span className="sale-price">{(Number(item.menu_item?.sale_price) || 0).toLocaleString()} تومان</span>
                        </>
                      ) : (
                        <span>{(Number(item.menu_item?.price) || 0).toLocaleString()} تومان</span>
                      )}
                    </p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button 
                      className="custom-delete-btn ms-3"
                      onClick={() => removeItem(item.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(() => {
            const itemsTotal = calculateTotal(cart.items);
            const deliveryCost = Number(cart.restaurant?.delivery_cost) || 0;
            const overallTotal = itemsTotal + deliveryCost;

            return (
              <div className="cart-summary mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>جمع سفارش:</span>
                  <span className="cart-food-price">{itemsTotal.toLocaleString()} تومان</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>هزینه ارسال:</span>
                  <span className="cart-food-price">{deliveryCost.toLocaleString()} تومان</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <span>مجموع:</span>
                  <span className="cart-food-price">
                    {overallTotal.toLocaleString()} تومان
                  </span>
                </div>
                
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button className="custom-continue-btn">
                    تکمیل خرید
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      ))}
>>>>>>> Stashed changes
    </Container>
  );
};

<<<<<<< Updated upstream
export default CartPage;
=======
export default Cart;
>>>>>>> Stashed changes
