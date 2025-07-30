import React from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ActiveOrder {
  id: string;
  restaurantName: string;
  date: string;
  items: OrderItem[];
  totalCost: number;
  status: 'paid' | 'pending' | 'done';
}

const OrderStatus: React.FC = () => {
  // Mock data for active orders
  const activeOrders: ActiveOrder[] = [
    {
      id: "ORD-005",
      restaurantName: "Mediterranean Delight",
      date: "2024-01-16",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 24.99 },
        { name: "Greek Salad", quantity: 1, price: 14.50 },
        { name: "Pita Bread", quantity: 2, price: 4.99 }
      ],
      totalCost: 49.47,
      status: 'done'
    },
    {
      id: "ORD-006",
      restaurantName: "Taco Fiesta",
      date: "2024-01-16",
      items: [
        { name: "Beef Tacos", quantity: 3, price: 4.99 },
        { name: "Guacamole & Chips", quantity: 1, price: 8.99 },
        { name: "Horchata", quantity: 2, price: 3.50 }
      ],
      totalCost: 29.95,
      status: 'pending'
    },
    {
      id: "ORD-007",
      restaurantName: "Sakura Sushi",
      date: "2024-01-16",
      items: [
        { name: "California Roll", quantity: 2, price: 12.99 },
        { name: "Salmon Sashimi", quantity: 1, price: 18.50 },
        { name: "Miso Soup", quantity: 1, price: 4.99 }
      ],
      totalCost: 49.47,
      status: 'paid'
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'done': return 'status-done';
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Payment Confirmed';
      case 'pending': return 'Preparing Order';
      case 'done': return 'Ready for Pickup';
      default: return status;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Order Status</h2>
        <p>Track your current orders</p>
      </div>

      <div className="orders-grid">
        {activeOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3 className="restaurant-name">{order.restaurantName}</h3>
              <div className="order-meta">
                <span className="order-date">{new Date(order.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
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
              <span className="total-label">Total Cost</span>
              <span className="total-amount">${order.totalCost.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;