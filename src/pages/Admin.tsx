import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Form, Button, Table, Spinner, Alert, Nav, Tab } from "react-bootstrap";
import axios from "axios";
import { FiPackage, FiShoppingCart, FiCoffee, FiInfo } from "react-icons/fi";
import "../styles/Admin.css";
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

const token = localStorage.getItem("token");
const csrfToken =
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1] || "";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    Authorization: token ? `Token ${token}` : "",
    "X-CSRFToken": csrfToken,
  },
});

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

type RestaurantInfo = {
  name: string;
  description: string;
  city: string;
  coverImage: File | string | null;
  logo: File | string | null;
  type: string;
  deliveryCost: number | null;
  isNightwalker: boolean;
  isPublished: boolean;
};

const mockOrders: OrderItem[] = [
  {
    id: 1,
    foodName: "Pizza",
    quantity: 2,
    orderDate: "2024-06-01T12:34:00Z",
    status: "Delivered",
  },
  {
    id: 2,
    foodName: "Burger",
    quantity: 1,
    orderDate: "2024-06-02T15:20:00Z",
    status: "Pending",
  },
  {
    id: 3,
    foodName: "Pasta",
    quantity: 3,
    orderDate: "2024-06-03T09:15:00Z",
    status: "Canceled",
  },
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "menu" | "orders" | "stock" | "restaurant information"
  >("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: "",
    description: "",
    city: "",
    coverImage: null,
    logo: null,
    type: "",
    deliveryCost: null,
    isNightwalker: false,
    isPublished: false,
  });
  const getLineChartDataByStatus = () => {
    const statuses = ["Delivered", "Pending", "Canceled"];
    const grouped: Record<string, Record<string, number>> = {};

    orders.forEach((order) => {
      const date = new Date(order.orderDate).toLocaleDateString("en-US");
      if (!grouped[date]) {
        grouped[date] = { Delivered: 0, Pending: 0, Canceled: 0 };
      }
      grouped[date][order.status] += order.quantity;
    });

    return Object.entries(grouped).map(([date, counts]) => ({
      date,
      ...counts,
    }));
  };

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

  const [editId, setEditId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  const restaurantTypes = [
    "restaurant",
    "fastfood",
    "juice and ice cream",
    "fruits",
    "confectionary",
    "coffee shop",
  ];

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.get("accounts/user/");
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
    if (activeTab === "menu") fetchMenuItems();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);
  const getChartData = () => {
    const grouped = orders.reduce<Record<string, number>>((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString("en-US");
      acc[date] = (acc[date] || 0) + order.quantity;
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, quantity]) => ({
      date,
      quantity,
    }));
  };

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("manager/menu-items/");
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(mockOrders);
    } catch {
      setErrorOrders("Error fetching orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file" && files && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      const numericFields = ["price", "rate", "quantity"];
      const numericValue = numericFields.includes(name)
        ? Math.max(0, Number(value))
        : value;
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === "image") {
          if (value instanceof File) formPayload.append("image", value);
        } else {
          formPayload.append(key, String(value));
        }
      }
    });

    try {
      if (editId !== null) {
        await api.put(`manager/menu-items/${editId}/`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await api.post("manager/menu-items/", formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchMenuItems();
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
      await api.delete(`manager/menu-items/${id}/`);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Error deleting food item.");
    }
  };

  const handleRestaurantInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
    if (type === "file" && files && files.length > 0) {
      setRestaurantInfo((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setRestaurantInfo((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "deliveryCost") {
      setRestaurantInfo((prev) => ({
        ...prev,
        [name]: value ? Number(value) : null,
      }));
    } else {
      setRestaurantInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRestaurantInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const infoPayload = new FormData();
    Object.entries(restaurantInfo).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) infoPayload.append(key, value);
        else infoPayload.append(key, String(value));
      }
    });

    try {
      await api.post("restaurant-info/", infoPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch {
      setError("Error saving restaurant information");
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
            <div>
              {loading ? <Spinner animation="border" /> : menuItems.length}
            </div>
            <div>Available Foods Count</div>
            <div className="icon">🍽️</div>
          </div>
          <div className="stats-card">
            <div>
              {loadingOrders ? <Spinner animation="border" /> : orders.length}
            </div>
            <div>Orders Count</div>
            <div className="icon">🛒</div>
          </div>
        </section>

        <Tab.Container
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k as any)}
        >
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="menu">Menu Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Orders History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="stock">Stock</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="restaurant information">
                Restaurant information
              </Nav.Link>
            </Nav.Item>
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
                  {formData.image &&
                    (typeof formData.image === "string" ? (
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
                    ))}
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
                <Button type="submit">
                  {editId !== null ? "Save Changes" : "Add Food"}
                </Button>
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
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.rate}</td>
                      <td>{item.availability ? "✅" : "❌"}</td>
                      <td>{item.bestseller ? "✅" : "❌"}</td>
                      <td>{item.onsale ? "✅" : "❌"}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
      {/* Table */}
      <h5 className="mt-5">Order History Table</h5>
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
            <Tab.Pane eventKey="orders">
              {errorOrders && <Alert variant="danger">{errorOrders}</Alert>}

              {loadingOrders ? (
                <Spinner animation="border" />
              ) : orders.length === 0 ? (
                <p className="text-center">No orders found.</p>
              ) : (
                <>
                  {/* Bar Chart: Total Orders */}
                  <h5 className="mb-3">Total Orders per Day (Bar Chart)</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="quantity" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Line Chart: Status Breakdown */}
                  <h5 className="mt-5 mb-3">
                    Order Quantity Trend by Status (Line Chart)
                  </h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getLineChartDataByStatus()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="Delivered"
                        stroke="#4caf50"
                        name="Delivered"
                      />
                      <Line
                        type="monotone"
                        dataKey="Pending"
                        stroke="#ff9800"
                        name="Pending"
                      />
                      <Line
                        type="monotone"
                        dataKey="Canceled"
                        stroke="#f44336"
                        name="Canceled"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </>
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
                    {menuItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="restaurant information">
              <Form
                onSubmit={handleRestaurantInfoSubmit}
                className="restaurant-info-form"
              >
                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={restaurantInfo.name}
                    onChange={handleRestaurantInfoChange}
                    placeholder="Enter restaurant name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={restaurantInfo.description}
                    onChange={handleRestaurantInfoChange}
                    placeholder="Enter restaurant description"
                    rows={3}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={restaurantInfo.city}
                    onChange={handleRestaurantInfoChange}
                    placeholder="Enter city"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cover Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="coverImage"
                    onChange={handleRestaurantInfoChange}
                    accept="image/*"
                  />
                  {restaurantInfo.coverImage instanceof File && (
                    <img
                      src={URL.createObjectURL(restaurantInfo.coverImage)}
                      alt="Cover preview"
                      className="image-preview cover-preview"
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo"
                    onChange={handleRestaurantInfoChange}
                    accept="image/*"
                  />
                  {restaurantInfo.logo instanceof File && (
                    <img
                      src={URL.createObjectURL(restaurantInfo.logo)}
                      alt="Logo preview"
                      className="image-preview logo-preview"
                    />
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Restaurant Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={restaurantInfo.type}
                    onChange={handleRestaurantInfoChange}
                    required
                  >
                    <option value="">Select type</option>
                    {restaurantTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Delivery Cost</Form.Label>
                  <Form.Control
                    type="number"
                    name="deliveryCost"
                    value={restaurantInfo.deliveryCost ?? ""}
                    onChange={handleRestaurantInfoChange}
                    placeholder="Enter delivery cost"
                    min="0"
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Night Walker"
                  name="isNightwalker"
                  checked={restaurantInfo.isNightwalker}
                  onChange={handleRestaurantInfoChange}
                  className="mb-2"
                />

                <Form.Check
                  type="checkbox"
                  label="Published"
                  name="isPublished"
                  checked={restaurantInfo.isPublished}
                  onChange={handleRestaurantInfoChange}
                  className="checkbox-info"
                />

                <Button className="submit-btn-info" type="submit">
                  Save Restaurant Information
                </Button>
              </Form>
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
          <li
            onClick={() => setActiveTab("restaurant information")}
            className={activeTab === "restaurant information" ? "active" : ""}
          >
            <FiInfo />
            <span>Restaurant Information</span>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Admin;
