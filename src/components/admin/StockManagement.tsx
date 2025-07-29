import React, { useState, useEffect, useRef } from "react";
import { Table, Spinner, Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

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

interface DebounceTimers {
  [key: number]: number;
}

const StockManagement: React.FC<StockManagementProps> = ({ menuItems, loading }) => {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const debounceTimers = useRef<DebounceTimers>({});

  // دریافت توکن و csrf توکن از جاهای معمول (localStorage و کوکی)
  const token = localStorage.getItem("token");
  const csrfToken =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1] || "";

  // ساختن axios instance با هدرها
  const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "X-CSRFToken": csrfToken,
    },
  });

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

  const updateStock = async (id: number, quantity: number) => {
    try {
      await api.patch(`manager/menu-items/${id}/`, { quantity });
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number | undefined) => {
    if (id === undefined) return;
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: value } : item))
    );

    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
    }

    debounceTimers.current[id] = window.setTimeout(() => {
      updateStock(id, value);
    }, 500);
  };

  const incrementQuantity = (id: number | undefined, delta: number) => {
    if (id === undefined) return;

    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, (item.quantity ?? 0) + delta) }
          : item
      );

      const updatedItem = newItems.find((item) => item.id === id);
      if (updatedItem) {
        updateStock(id, updatedItem.quantity ?? 0);
      }

      return newItems;
    });

    if (debounceTimers.current[id]) {
      clearTimeout(debounceTimers.current[id]);
      delete debounceTimers.current[id];
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Spinner animation="border" className="loading-spinner" />
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-center">No food available.</p>;
  }

  return (
    <div className="stock-management">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Adjust Stock</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <InputGroup className="input-group-quantity">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => incrementQuantity(item.id, -1)}
                    disabled={(item.quantity ?? 0) <= 0}
                    className="btn-decrement"
                  >
                    -
                  </Button>
                  <FormControl
                    type="number"
                    min={0}
                    value={item.quantity ?? 0}
                    onChange={(e) => handleInputChange(e, item.id)}
                    className="input-quantity"
                  />
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => incrementQuantity(item.id, 1)}
                    className="btn-increment"
                  >
                    +
                  </Button>
                </InputGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StockManagement;
