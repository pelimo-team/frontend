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
    </div>
  );
};

export default Menu;