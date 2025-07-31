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

type Order = {
  id: number;
  created_at: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivering"
    | "delivered"
    | "cancelled"
    | "done";
  items: OrderItem[];
};
type Status = (typeof allStatuses)[number];
type OrdersHistoryProps = {
  orders: Order[];
  expandedOrderIds: number[];
  onToggleExpand: (id: number) => void;
  onStatusChange: (
    orderId: number,
    newStatus:
      | "pending"
      | "confirmed"
      | "preparing"
      | "ready"
      | "delivering"
      | "delivered"
      | "cancelled"
      | "done"
  ) => void;
  loadingOrders: boolean;
  errorOrders: string | null;
  disabled: boolean;
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "delivering", label: "Delivering" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "done", label: "Done" },
];

const allStatuses = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivering",
  "delivered",
  "cancelled",
  "done",
] as const;

const statusColors: Record<Status, string> = {
  pending: "#f39c12",
  confirmed: "#2196f3",
  preparing: "#9c27b0",
  ready: "#00bcd4",
  delivering: "#e91e63",
  delivered: "#4caf50",
  cancelled: "#9e9e9e",
  done: "#3f51b5",
};

const OrdersHistory: React.FC<OrdersHistoryProps> = ({
  orders,
  expandedOrderIds,
  onToggleExpand,
  onStatusChange,
  loadingOrders,
  errorOrders,
  disabled,
}) => {
  const getLineChartDataByStatus = () => {
    const grouped: {
      [key: string]: { date: string } & Record<Status, number>;
    } = {};

    orders.forEach((order) => {
      const date = new Date(order.created_at).toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = { date } as { date: string } & Record<Status, number>;
        allStatuses.forEach((status) => {
          grouped[date][status] = 0;
        });
      }

      grouped[date][order.status] += 1;
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
          {allStatuses.map((status) => (
            <Bar
              key={status}
              dataKey={status}
              fill={statusColors[status]}
              name={
                statusOptions.find((o) => o.value === status)?.label || status
              }
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <h4 className="mt-4">Order Status Line Chart</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getLineChartDataByStatus()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {allStatuses.map((status) => (
            <Line
              key={status}
              type="monotone"
              dataKey={status}
              stroke={statusColors[status]}
              name={
                statusOptions.find((o) => o.value === status)?.label || status
              }
            />
          ))}
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
                  onClick={() => !disabled && onToggleExpand(order.id)}
                  className={`order-row ${disabled ? "disabled" : ""}`}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                >
                  <td>{order.id}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.status}
                      disabled={disabled}
                      onChange={(e) =>
                        onStatusChange &&
                        onStatusChange(
                          order.id,
                          e.target.value as
                            | "pending"
                            | "confirmed"
                            | "preparing"
                            | "ready"
                            | "delivering"
                            | "delivered"
                            | "cancelled"
                            | "done"
                        )
                      }
                    >
                      {statusOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{order.items.length}</td>
                </tr>
                {expandedOrderIds.includes(order.id) &&
                  order.items.map((idx) => (
                    <tr
                      key={`${order.id}-${idx}`}
                      className={`order-item-row ${
                        order.status === "done"
                          ? "order-done"
                          : order.status === "confirmed"
                          ? "order-confirmed"
                          : ""
                      }`}
                    >
                      {/* <td colSpan={2} className="order-item-name">
                        {item.foodName}
                      </td>
                      <td colSpan={2} className="order-item-quantity">
                        Qty: {item.quantity}
                      </td> */}
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
