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

interface OrderItem {
  foodName: string;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  orderDate: string;
  status: string;
}

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

const mockOrders: Order[] = [
  {
    id: 1,
    orderDate: "2024-06-01T12:34:00Z",
    status: "Delivered",
    items: [
      { foodName: "Pizza", quantity: 2 },
      { foodName: "Fries", quantity: 1 },
    ],
  },
  {
    id: 2,
    orderDate: "2024-06-02T15:20:00Z",
    status: "Pending",
    items: [{ foodName: "Burger", quantity: 1 }],
  },
  {
    id: 3,
    orderDate: "2024-06-03T09:15:00Z",
    status: "Canceled",
    items: [
      { foodName: "Pasta", quantity: 3 },
      { foodName: "Salad", quantity: 2 },
    ],
  },
  {
    id: 4,
    orderDate: "2024-06-03T17:10:00Z",
    status: "Delivered",
    items: [{ foodName: "Sandwich", quantity: 2 }],
  },
  {
    id: 5,
    orderDate: "2024-06-04T11:45:00Z",
    status: "Pending",
    items: [
      { foodName: "Tacos", quantity: 3 },
      { foodName: "Nachos", quantity: 1 },
    ],
  },
  {
    id: 6,
    orderDate: "2024-06-04T19:30:00Z",
    status: "Canceled",
    items: [{ foodName: "Pizza", quantity: 1 }],
  },
  {
    id: 7,
    orderDate: "2024-06-05T08:25:00Z",
    status: "Delivered",
    items: [{ foodName: "Hot Dog", quantity: 2 }],
  },
  {
    id: 8,
    orderDate: "2024-06-05T13:00:00Z",
    status: "Pending",
    items: [
      { foodName: "Salad", quantity: 1 },
      { foodName: "Juice", quantity: 2 },
    ],
  },
  {
    id: 9,
    orderDate: "2024-06-06T10:10:00Z",
    status: "Delivered",
    items: [{ foodName: "Burger", quantity: 3 }],
  },
  {
    id: 10,
    orderDate: "2024-06-06T15:45:00Z",
    status: "Canceled",
    items: [{ foodName: "Steak", quantity: 1 }],
  },
  {
    id: 11,
    orderDate: "2024-05-30T14:20:00Z",
    status: "Delivered",
    items: [{ foodName: "Rice Bowl", quantity: 2 }],
  },
  {
    id: 12,
    orderDate: "2024-05-31T16:10:00Z",
    status: "Pending",
    items: [{ foodName: "Curry", quantity: 1 }],
  },
  {
    id: 13,
    orderDate: "2024-06-01T09:00:00Z",
    status: "Delivered",
    items: [
      { foodName: "Fries", quantity: 2 },
      { foodName: "Milkshake", quantity: 1 },
    ],
  },
  {
    id: 14,
    orderDate: "2024-06-02T18:00:00Z",
    status: "Canceled",
    items: [{ foodName: "Sushi", quantity: 4 }],
  },
  {
    id: 15,
    orderDate: "2024-06-03T20:10:00Z",
    status: "Pending",
    items: [
      { foodName: "Pizza", quantity: 1 },
      { foodName: "Cola", quantity: 1 },
    ],
  },
  {
    id: 16,
    orderDate: "2024-06-04T12:00:00Z",
    status: "Delivered",
    items: [{ foodName: "Wrap", quantity: 3 }],
  },
  {
    id: 17,
    orderDate: "2024-06-05T14:30:00Z",
    status: "Delivered",
    items: [{ foodName: "Falafel", quantity: 2 }],
  },
  {
    id: 18,
    orderDate: "2024-06-05T19:00:00Z",
    status: "Canceled",
    items: [{ foodName: "Soup", quantity: 1 }],
  },
  {
    id: 19,
    orderDate: "2024-06-06T08:45:00Z",
    status: "Pending",
    items: [{ foodName: "Burger", quantity: 2 }],
  },
  {
    id: 20,
    orderDate: "2024-06-06T11:50:00Z",
    status: "Delivered",
    items: [
      { foodName: "Chicken Wings", quantity: 6 },
      { foodName: "Cola", quantity: 2 },
    ],
  },
  {
    id: 21,
    orderDate: "2024-06-07T13:25:00Z",
    status: "Pending",
    items: [{ foodName: "Salmon", quantity: 1 }],
  },
  {
    id: 22,
    orderDate: "2024-06-07T18:30:00Z",
    status: "Canceled",
    items: [{ foodName: "Shrimp", quantity: 3 }],
  },
  {
    id: 23,
    orderDate: "2024-06-07T20:00:00Z",
    status: "Delivered",
    items: [
      { foodName: "Fries", quantity: 2 },
      { foodName: "Soda", quantity: 2 },
    ],
  },
  {
    id: 24,
    orderDate: "2024-06-08T10:00:00Z",
    status: "Pending",
    items: [{ foodName: "Eggs", quantity: 5 }],
  },
  {
    id: 25,
    orderDate: "2024-06-08T13:45:00Z",
    status: "Delivered",
    items: [{ foodName: "Toast", quantity: 2 }],
  },
  {
    id: 26,
    orderDate: "2024-06-08T17:20:00Z",
    status: "Canceled",
    items: [
      { foodName: "Pizza", quantity: 1 },
      { foodName: "Fries", quantity: 1 },
    ],
  },
  {
    id: 27,
    orderDate: "2024-06-08T20:00:00Z",
    status: "Delivered",
    items: [{ foodName: "Burger", quantity: 2 }],
  },
  {
    id: 28,
    orderDate: "2024-06-09T09:30:00Z",
    status: "Pending",
    items: [{ foodName: "Croissant", quantity: 3 }],
  },
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "menu" | "orders" | "stock" | "restaurant information"
  >("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);
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
   
    const grouped: Record<string, Record<string, number>> = {};

    orders.forEach((order) => {
      const date = new Date(order.orderDate).toLocaleDateString("en-US");
      if (!grouped[date])
        grouped[date] = { Delivered: 0, Pending: 0, Canceled: 0 };
      grouped[date][order.status] += 1;
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
  useEffect(() => {
    setOrders(mockOrders);
  }, []);
  const toggleExpand = (id: number) => {
    setExpandedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
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

            <Tab.Pane eventKey="orders">
              {errorOrders && <Alert variant="danger">{errorOrders}</Alert>}

              {loadingOrders ? (
                <Spinner animation="border" />
              ) : orders.length === 0 ? (
                <p className="text-center">No orders found.</p>
              ) : (
                <>
                  <h4>Orders Bar Chart</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getLineChartDataByStatus()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="Delivered"
                        fill="#4caf50"
                        name="Delivered"
                      />
                      <Bar dataKey="Pending" fill="#ff9800" name="Pending" />
                      <Bar dataKey="Canceled" fill="#f44336" name="Canceled" />
                    </BarChart>
                  </ResponsiveContainer>

                  <h4 className="mt-4">Order Status Line Chart</h4>
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
                      />
                      <Line
                        type="monotone"
                        dataKey="Pending"
                        stroke="#ff9800"
                      />
                      <Line
                        type="monotone"
                        dataKey="Canceled"
                        stroke="#f44336"
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <h4 className="mt-4">Orders Table with Dropdown</h4>
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
                              onClick={() => toggleExpand(order.id)}
                              style={{
                                cursor: "pointer",
                                background: "#f7f7f7",
                              }}
                            >
                              <td>{order.id}</td>
                              <td>
                                {new Date(order.orderDate).toLocaleString()}
                              </td>
                              <td>{order.status}</td>
                              <td>{order.items.length}</td>
                            </tr>
                            {expandedOrderIds.includes(order.id) &&
                              order.items.map((item, idx) => (
                                <tr
                                  key={`${order.id}-${idx}`}
                                  style={{
                                    backgroundColor:
                                      order.status === "Delivered"
                                        ? "#e6f4ea" // سبز کم‌رنگ
                                        : order.status === "Pending"
                                        ? "#fff4e5" // نارنجی کم‌رنگ
                                        : "#fdecea", // قرمز کم‌رنگ
                                  }}
                                >
                                  <td
                                    colSpan={2}
                                    style={{ paddingLeft: "2rem" }}
                                  >
                                    {item.foodName}
                                  </td>
                                  <td colSpan={2}>Qty: {item.quantity}</td>
                                </tr>
                              ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </Table>
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
