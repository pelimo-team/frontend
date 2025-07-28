import React from "react";
import { Table, Spinner } from "react-bootstrap";

interface MenuItem {
  id?: number;
  name: string;
  price: number | null;
  image?: File | string | null;
  rate: number | null;
  availability: boolean;
  bestseller: boolean;
  onsale: boolean;
  tab: string;
  quantity: number | null;
}

interface StockManagementProps {
  menuItems: MenuItem[];
  loading: boolean;
}

const StockManagement: React.FC<StockManagementProps> = ({
  menuItems,
  loading,
}) => {
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (menuItems.length === 0) {
    return <p className="text-center">No food available.</p>;
  }

  return (
    <div className="stock-management">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StockManagement; 