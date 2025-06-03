import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Button, Table, Spinner, Alert, Nav, Tab } from "react-bootstrap";
import axios from "axios";
import "../styles/Admin.css";
import { FiPackage, FiShoppingCart, FiCoffee } from "react-icons/fi";

type MenuItem = {
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
};

type OrderItem = {
  id: number;
  foodName: string;
  quantity: number;
  orderDate: string;
  status: string;
};

const BASE_URL = "http://localhost:8000/api/manager/menu-items/";
const ORDERS_API = "http://localhost:8000/api/cart/manager/orders/";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "orders" | "stock">("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    price: null,
    image: null,
    rate: null,
    availability: false,
    bestseller: false,
    onsale: false,
    tab: "",
    quantity: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchCsrfToken = async () => {
    try {
      await axios.get("http://localhost:8000/api/accounts/csrf/", { withCredentials: true });
      const cookies = document.cookie.split("; ").reduce((acc: any, current) => {
        const [name, value] = current.split("=");
        acc[name] = value;
        return acc;
      }, {});
      setCsrfToken(cookies["csrftoken"] || "");
    } catch {
      setError("Error fetching CSRF token");
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/accounts/user/", {
          withCredentials: true,
        });
        setUsername(response.data.username);
      } catch {
        setError("Error fetching user info");
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (activeTab === "menu" && csrfToken) fetchMenuItems();
    if (activeTab === "orders" && csrfToken) fetchOrders();
  }, [activeTab, csrfToken]);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrfToken },
      });
      setMenuItems(response.data.results || []);
    } catch {
      setError("Error fetching menu");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders(null);
    try {
      const response = await axios.get(ORDERS_API, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrfToken },
      });
      // فرض بر این که response.data شکل زیر است:
      // { count, next, previous, results: [] }
      // هر order در results با این فیلدها: id, foodName, quantity, orderDate, status
      setOrders(response.data.results || []);
    } catch {
      setErrorOrders("Error fetching orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file" && files && files.length > 0) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      const numericFields = ["price", "rate", "quantity"];
      const numericValue = numericFields.includes(name) ? Math.max(0, Number(value)) : value;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    if (formData.price !== null) formPayload.append("price", String(formData.price));
    if (formData.rate !== null) formPayload.append("rate", String(formData.rate));
    if (formData.quantity !== null) formPayload.append("quantity", String(formData.quantity));
    formPayload.append("availability", String(formData.availability));
    formPayload.append("bestseller", String(formData.bestseller));
    formPayload.append("onsale", String(formData.onsale));
    formPayload.append("tab", formData.tab);
    if (formData.image instanceof File) {
      formPayload.append("image", formData.image);
    }

    try {
      if (editId !== null) {
        await axios.put(`${BASE_URL}${editId}/`, formPayload, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchMenuItems();
        setEditId(null);
      } else {
        await axios.post(BASE_URL, formPayload, {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchMenuItems();
      }

      setFormData({
        name: "",
        price: null,
        image: null,
        rate: null,
        availability: false,
        bestseller: false,
        onsale: false,
        tab: "",
        quantity: null,
      });
    } catch {
      setError("Error saving food item.");
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({ ...item });
    setEditId(item.id ?? null);
    setActiveTab("menu");
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await axios.delete(`${BASE_URL}${id}/`, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrfToken },
      });
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch {
      setError("Error deleting food item.");
    }
  };

  const formatShamsiDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="food-admin-panel">
      <main className="admin-main-content">
        <section className="stats-cards">
          <div className="stats-card">
            <div>{loading ? <Spinner animation="border" /> : menuItems.length}</div>
            <div>Available Foods Count</div>
            <div className="icon">🍽️</div>
          </div>
          <div className="stats-card">
            <div>{loadingOrders ? <Spinner animation="border" /> : orders.length}</div>
            <div>Orders Count</div>
            <div className="icon">🛒</div>
          </div>
        </section>

        <Tab.Container activeKey={activeTab} onSelect={k => setActiveTab(k as any)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item><Nav.Link eventKey="menu">Menu Management</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="orders">Orders History</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="stock">Stock</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="menu">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="food-form">
                {/* فرم مدیریت منو (همانند کد اولیه) */}
                {/* ... (کد فرم مانند قبل) */}
                <Form.Group className="mb-3">
                  <Form.Label>Food Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter food name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    min="0"
                    value={formData.price ?? ""}
                    onChange={handleChange}
                    placeholder="Enter price"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {formData.image && (
                    typeof formData.image === "string" ? (
                      <img
                        src={formData.image}
                        alt="preview"
                        className="food-preview"
                        style={{ maxWidth: "150px", marginTop: "8px" }}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="preview"
                        className="food-preview"
                        style={{ maxWidth: "150px", marginTop: "8px" }}
                      />
                    )
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    min="0"
                    max={5}
                    step="0.1"
                    value={formData.rate ?? ""}
                    onChange={handleChange}
                    placeholder="Enter rating (0-5)"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    min="0"
                    value={formData.quantity ?? ""}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                  />
                </Form.Group>
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  label="Available"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  label="Bestseller"
                  name="bestseller"
                  checked={formData.bestseller}
                  onChange={handleChange}
                />
                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  label="On Sale"
                  name="onsale"
                  checked={formData.onsale}
                  onChange={handleChange}
                />
                <Button type="submit">{editId !== null ? "Save Changes" : "Add Food"}</Button>
              </Form>

              <hr />
              {/* Menu Table */}
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Rating</th>
                    <th>Available</th>
                    <th>Bestseller</th>
                    <th>On Sale</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.rate}</td>
                      <td>{item.availability ? "✅" : "❌"}</td>
                      <td>{item.bestseller ? "✅" : "❌"}</td>
                      <td>{item.onsale ? "✅" : "❌"}</td>
                      <td>
                        <Button size="sm" variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => item.id && handleDelete(item.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>

            <Tab.Pane eventKey="orders">
              {errorOrders && <Alert variant="danger">{errorOrders}</Alert>}
              {loadingOrders ? (
                <Spinner animation="border" />
              ) : orders.length === 0 ? (
                <p className="text-center">No orders found.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>{order.foodName}</td>
                        <td>{order.quantity}</td>
                        <td>{new Date(order.orderDate).toLocaleString("en-US")}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="stock">
              {loading ? (
                <Spinner animation="border" />
              ) : menuItems.length === 0 ? (
                <p className="text-center">No food available.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </main>

      <aside className="sidebar">
        <div className="username">
          <h2>{username}</h2>
          <div className="time">
            {currentTime.toLocaleTimeString("en-US", { hour12: false })}
            <br />
            {formatShamsiDate(currentTime)}
          </div>
        </div>

        <ul>
          <li
            onClick={() => setActiveTab("menu")}
            className={activeTab === "menu" ? "active" : ""}
          >
            <FiCoffee />
            <span>Menu Management</span>
          </li>
          <li
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "active" : ""}
          >
            <FiShoppingCart />
            <span>Orders History</span>
          </li>
          <li
            onClick={() => setActiveTab("stock")}
            className={activeTab === "stock" ? "active" : ""}
          >
            <FiPackage />
            <span>Stock</span>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Admin;
