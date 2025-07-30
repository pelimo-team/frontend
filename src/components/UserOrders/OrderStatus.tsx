import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  menu_item: {
    name: string;
    image?: string;
  };
}

interface ActiveOrder {
  id: string;
  restaurant: {
    name: string;
  };
  created_at: string;
  items: OrderItem[];
  total: string;
  status: string;
}

const OrderStatus: React.FC = () => {
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get('/api/cart/order-history/');
        const ordersArray = Array.isArray(data) ? data : data.results;

        if (!Array.isArray(ordersArray)) {
          throw new Error('Unexpected response format: expected an array');
        }

        // Filter active statuses (excluding final ones)
        const filteredOrders = ordersArray.filter(
          (order) => !['delivered', 'cancelled', 'done'].includes(order.status)
        );

        setActiveOrders(filteredOrders);
      } catch (err: any) {
        console.error('Failed to fetch orders', err);
        setError(err.message || 'An error occurred while fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'label-pending';
      case 'confirmed': return 'label-confirmed';
      case 'preparing': return 'label-preparing';
      case 'ready': return 'label-ready';
      case 'delivering': return 'label-delivering';
      case 'paid': return 'label-paid'; // Add this class in your CSS
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'delivering': return 'Delivering';
      case 'paid': return 'Paid';
      default: return status;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Order Status</h2>
        <p>Track your current orders</p>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="orders-grid">
        {activeOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3 className="restaurant-name">{order.restaurant.name}</h3>
              <div
                className="order-meta"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '5px',
                }}
              >
                <span className="order-date">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
                <span
                  className={`order-status-label ${getStatusClass(order.status)}`}
                  style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
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
                  {item.menu_item.image && (
                    <img
                      src={item.menu_item.image}
                      alt={item.menu_item.name}
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
                      {item.quantity}x {item.menu_item.name}
                    </span>
                    <span className="item-price" style={{ color: '#555' }}>
                      ${parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span className="total-label">Total Cost</span>
              <span className="total-amount">${parseFloat(order.total).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
