import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  restaurantName: string;
  date: string;
  items: OrderItem[];
  totalCost: number;
  status: string;
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
    case 'done': return 'Done';
    default: return status;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'delivered': return 'status-delivered';
    case 'cancelled': return 'status-cancelled';
    case 'done': return 'status-done';
    default: return '';
  }
};

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get('/api/cart/order-history/');
        const ordersArray = Array.isArray(data) ? data : data.results;
        if (!Array.isArray(ordersArray)) {
          throw new Error('Unexpected response format: expected an array');
        }

        const filteredOrders = ordersArray.filter((order: any) =>
          ['delivered', 'cancelled', 'done'].includes(order.status)
        );

        const mappedOrders = filteredOrders.map((order: any) => ({
          id: order.id,
          restaurantName: order.restaurant.name,
          date: order.created_at,
          items: order.items.map((item: any) => ({
            name: item.menu_item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
            image: item.menu_item.image,
          })),
          totalCost: parseFloat(order.total),
          status: order.status,
        }));

        setOrders(mappedOrders);
      } catch (err: any) {
        console.error('Failed to fetch orders', err);
        setError(err.message || 'An error occurred while fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Order History</h2>
        <p>Your past orders and purchases</p>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3 className="restaurant-name">{order.restaurantName}</h3>
              <div>
                <span className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span
                  className={`order-status-label ${getStatusClass(order.status)}`}
                  style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="order-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '10px',
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <span className="item-name" style={{ display: 'block', fontWeight: 500 }}>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="item-price" style={{ color: '#555' }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
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
