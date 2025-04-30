<<<<<<< Updated upstream
import React, { useRef } from 'react';

const Menu = ({ menuItems, cart, updateCart }) => {
  const categoryRefs = useRef([]);

  const scrollToCategory = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-categories d-flex text-center border-top border-bottom">
        {menuItems.map((cat, index) => (
          <div
            className="flex-fill py-3 border-end"
            key={index}
            onClick={() => scrollToCategory(index)}
            style={{ cursor: 'pointer' }}
          >
            {cat.category}
          </div>
        ))}
      </div>

      {menuItems.map((category, index) => (
        <div
          ref={(el) => (categoryRefs.current[index] = el)}
          key={index}
          className="menu-category p-3"
        >
          <h5 className="menu-section-title text-center">{category.category}</h5>
          {category.items.map((item) => (
            <div
              key={item.id}
              className="menu-item d-flex align-items-center justify-content-between py-3"
            >
              <img src={item.image} className="menu-item-img" alt={item.name} />
              <div className="mx-3 flex-grow-1">
                <div>{item.name}</div>
                <small>{item.price} تومان</small>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateCart(item.id, 1)}
                >
                  +
                </button>
                <span className="mx-2">{cart[item.id] || 0}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => updateCart(item.id, -1)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ categories, cart, updateCart, isAuthenticated }) => {
  const navigate = useNavigate();
  console.log('Menu component received categories:', categories);
  console.log('Menu component received cart:', cart);

  const handleQuantityChange = (itemId, change) => {
    const currentQuantity = cart[itemId] || 0;
    const newQuantity = Math.max(currentQuantity + change, 0);
    updateCart(itemId, newQuantity);
  };

  const handleItemClick = (e, itemId) => {
    // Prevent navigation if clicking on buttons or quantity controls
    if (e.target.closest('.item-actions')) {
      return;
    }
    if (itemId) {
      console.log('Navigating to food item:', itemId);
      navigate(`/food/${itemId}`);
    } else {
      console.error('No item ID provided for navigation');
    }
  };

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    console.log('No menu items available - categories is:', categories);
    return <div className="menu-empty">منو در دسترس نیست</div>;
  }

  return (
    <div className="menu-container">
      {categories.map((category) => {
        console.log('Rendering category:', category);
        if (!category.items || !Array.isArray(category.items)) {
          return null;
        }
        return (
          <div key={category.id} className="menu-category">
            <h3 className="category-title">{category.name}</h3>
            <div className="menu-items">
              {category.items.map((item) => {
                console.log('Rendering menu item:', item);
                if (!item || !item.id) return null;
                return (
                  <div 
                    key={item.id} 
                    className="menu-item"
                    onClick={(e) => handleItemClick(e, item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="item-image">
                      {item.image && (
                        <img 
                          src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`} 
                          alt={item.name} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/food-placeholder.png';
                          }}
                        />
                      )}
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-description">{item.description}</p>
                      <div className="item-price">
                        {typeof item.price === 'number' 
                          ? `${item.price.toLocaleString()} تومان`
                          : 'قیمت نامشخص'}
                      </div>
                    </div>
                    <div className="item-actions" onClick={e => e.stopPropagation()}>
                      {cart[item.id] > 0 ? (
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn decrease"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity">{cart[item.id]}</span>
                          <button 
                            className="quantity-btn increase"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="add-to-cart"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          افزودن به سبد خرید
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
>>>>>>> Stashed changes
    </div>
  );
};

export default Menu;