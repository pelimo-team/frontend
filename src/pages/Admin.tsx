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
      setError("خطا در دریافت CSRF token");
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
        setError("خطا در دریافت اطلاعات کاربر");
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
      setError("خطا در دریافت منو");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders(null);
    try {
      setOrders([]); // فقط mock است، قابل توسعه
    } catch {
      setErrorOrders("خطا در دریافت سفارشات");
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
      setError("خطا در ذخیره اطلاعات غذا.");
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
      setError("خطا در حذف غذا.");
    }
  };

  const formatShamsiDate = (date: Date) => {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
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
            <div>تعداد غذاهای موجود</div>
            <div className="icon">🍽️</div>
          </div>
          <div className="stats-card">
            <div>{loadingOrders ? <Spinner animation="border" /> : orders.length}</div>
            <div>تعداد سفارشات ثبت شده</div>
            <div className="icon">🛒</div>
          </div>
        </section>

        <Tab.Container activeKey={activeTab} onSelect={k => setActiveTab(k as any)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item><Nav.Link eventKey="menu">مدیریت منو</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="orders">تاریخچه سفارشات</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="stock">موجودی</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="menu">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="food-form">
                <Form.Group className="mb-3">
                  <Form.Label>نام غذا</Form.Label>
                  <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>قیمت</Form.Label>
                  <Form.Control type="number" name="price" min="0" value={formData.price ?? ""} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>آپلود عکس</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
                  {formData.image && (
                    typeof formData.image === "string" ? (
                      <img src={formData.image} alt="preview" className="food-preview" style={{ maxWidth: "150px", marginTop: "8px" }} />
                    ) : (
                      <img src={URL.createObjectURL(formData.image)} alt="preview" className="food-preview" style={{ maxWidth: "150px", marginTop: "8px" }} />
                    )
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>امتیاز</Form.Label>
                  <Form.Control type="number" name="rate" min="0" step="0.1" max={5} value={formData.rate ?? ""} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>موجودی</Form.Label>
                  <Form.Control type="number" name="quantity" min="0" value={formData.quantity ?? ""} onChange={handleChange} />
                </Form.Group>
                <Form.Check className="mb-2" type="checkbox" label="موجود" name="availability" checked={formData.availability} onChange={handleChange} />
                <Form.Check className="mb-2" type="checkbox" label="پرفروش" name="bestseller" checked={formData.bestseller} onChange={handleChange} />
                <Form.Check className="mb-2" type="checkbox" label="در تخفیف" name="onsale" checked={formData.onsale} onChange={handleChange} />
                <Button type="submit">{editId !== null ? "ذخیره تغییرات" : "افزودن غذا"}</Button>
              </Form>

              <hr />
              {/* جدول منو */}
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>نام</th>
                    <th>قیمت</th>
                    <th>موجودی</th>
                    <th>امتیاز</th>
                    <th>موجود</th>
                    <th>پرفروش</th>
                    <th>در تخفیف</th>
                    <th>عملیات</th>
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
                        <Button size="sm" variant="warning" onClick={() => handleEdit(item)}>ویرایش</Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => item.id && handleDelete(item.id)}>حذف</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>

            <Tab.Pane eventKey="orders">
              {errorOrders && <Alert variant="danger">{errorOrders}</Alert>}
              {loadingOrders ? <Spinner animation="border" /> : (
                orders.length === 0 ? <p className="text-center">سفارشی ثبت نشده است.</p> : (
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>نام غذا</th>
                        <th>تعداد</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.foodName}</td>
                          <td>{order.quantity}</td>
                          <td>{new Date(order.orderDate).toLocaleString("fa-IR")}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="stock">
              {loading ? <Spinner animation="border" /> : (
                menuItems.length === 0 ? <p className="text-center">غذایی موجود نیست.</p> : (
                  <Table striped hover responsive>
                    <thead>
                      <tr><th>نام غذا</th><th>موجودی</th></tr>
                    </thead>
                    <tbody>
                      {menuItems.map(item => (
                        <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td></tr>
                      ))}
                    </tbody>
                  </Table>
                )
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </main>

      <aside className="sidebar">
        <div className="username">
          <h2>{username}</h2>
          <div className="time">
            {currentTime.toLocaleTimeString("fa-IR", { hour12: false })}
            <br />
            {formatShamsiDate(currentTime)}
          </div>
        </div>

        <ul>
          <li onClick={() => setActiveTab("menu")} className={activeTab === "menu" ? "active" : ""}><FiCoffee /><span>مدیریت منو</span></li>
          <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}><FiShoppingCart /><span>تاریخچه سفارشات</span></li>
          <li onClick={() => setActiveTab("stock")} className={activeTab === "stock" ? "active" : ""}><FiPackage /><span>موجودی</span></li>
        </ul>
      </aside>
    </div>
  );
};

export default Admin;
