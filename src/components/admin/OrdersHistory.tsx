import React from "react";
import { Table, Alert, Spinner } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface OrderItem {
  foodName: string;
  quantity: number;
}

interface Order {
  id: number;
  created_at: string;
  status: "paid" | "done";
  items: OrderItem[];
}

interface OrdersHistoryProps {
  orders: Order[];
  expandedOrderIds: number[];
  errorOrders: string | null;
  loadingOrders: boolean;
  onToggleExpand: (id: number) => void;
}

const OrdersHistory: React.FC<OrdersHistoryProps> = ({
  orders,
  expandedOrderIds,
  errorOrders,
  loadingOrders,
  onToggleExpand,
}) => {
  const getLineChartDataByStatus = () => {
    const grouped: {
      [key: string]: {
        date: string;
        paid: number;
        done: number;
      };
    } = {};

    orders.forEach((order) => {
      const date = new Date(order.created_at).toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = { date, paid: 0, done: 0 };
      }

      if (order.status === "paid" || order.status === "done") {
        grouped[date][order.status] += 1;
      }
    });

    return Object.values(grouped);
  };

  if (loadingOrders) {
    return <Spinner animation="border" />;
  }

  if (orders.length === 0) {
    return <p className="text-center">No orders found.</p>;
  }

  return (
    <div className="orders-history">
      {errorOrders && <Alert variant="danger">{errorOrders}</Alert>}

      <h4>Orders Bar Chart</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getLineChartDataByStatus()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="paid" fill="#2196f3" name="Paid" />
          <Bar dataKey="done" fill="#4caf50" name="Done" />
        </BarChart>
      </ResponsiveContainer>

      <h4 className="mt-4">Order Status Line Chart</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getLineChartDataByStatus()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="paid" stroke="#2196f3" />
          <Line type="monotone" dataKey="done" stroke="#4caf50" />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="mt-4">Orders Table</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Items Count</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <React.Fragment key={order.id}>
                <tr
                  onClick={() => onToggleExpand(order.id)}
                  className="order-row"
                >
                  <td>{order.id}</td>
                  <td>
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td>{order.status}</td>
                  <td>{order.items.length}</td>
                </tr>
                {expandedOrderIds.includes(order.id) &&
                  order.items.map((item, idx) => (
                    <tr
                      key={`${order.id}-${idx}`}
                      className={`order-item-row ${order.status === "done" ? "order-done" : order.status === "paid" ? "order-paid" : ""}`}
                    >
                      <td colSpan={2} className="order-item-name">
                        {item.foodName}
                      </td>
                      <td colSpan={2} className="order-item-quantity">
                        Qty: {item.quantity}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersHistory; 