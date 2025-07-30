import React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  date: string;
  items: OrderItem[];
  totalCost: number;
}

const OrderHistory: React.FC = () => {
  // Mock data for order history
  const orders: Order[] = [
    {
      id: "ORD-001",
      restaurantName: "Bella Italia",
      date: "2024-01-15",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 18.99 },
        { name: "Caesar Salad", quantity: 1, price: 12.50 },
        { name: "Tiramisu", quantity: 2, price: 8.99 }
      ],
      totalCost: 49.47
    },
    {
      id: "ORD-002", 
      restaurantName: "Dragon Palace",
      date: "2024-01-12",
      items: [
        { name: "Sweet & Sour Chicken", quantity: 1, price: 16.80 },
        { name: "Fried Rice", quantity: 2, price: 9.50 },
        { name: "Spring Rolls", quantity: 4, price: 2.75 }
      ],
      totalCost: 46.80
    },
    {
      id: "ORD-003",
      restaurantName: "Burger Junction",
      date: "2024-01-10",
      items: [
        { name: "Classic Cheeseburger", quantity: 2, price: 14.99 },
        { name: "French Fries", quantity: 2, price: 5.99 },
        { name: "Chocolate Milkshake", quantity: 1, price: 6.50 }
      ],
      totalCost: 42.47
    },
    {
      id: "ORD-004",
      restaurantName: "Spice Garden",
      date: "2024-01-08",
      items: [
        { name: "Chicken Tikka Masala", quantity: 1, price: 19.99 },
        { name: "Basmati Rice", quantity: 1, price: 4.50 },
        { name: "Garlic Naan", quantity: 2, price: 3.99 }
      ],
      totalCost: 32.47
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Order History</h2>
        <p>Your past orders and purchases</p>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3 className="restaurant-name">{order.restaurantName}</h3>
              <span className="order-date">{new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span className="total-label">Total Paid</span>
              <span className="total-amount">${order.totalCost.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;