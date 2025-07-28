import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Tab } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import {
  AdminContainer,
  Panel,
  Loading,
  StatsCards,
  ManagerStatusBanner,
  MenuManagement,
  OrdersHistory,
  StockManagement,
  RestaurantInformation
} from "../components/admin";

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
  foodName: string;
  quantity: number;
};

type Order = {
  id: number;
  created_at: string;
  status: "paid" | "done";
  items: OrderItem[];
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

type ManagerStatus = {
  is_manager: boolean;
  manager_pending: boolean;
  manager_status: string;
  has_restaurant: boolean;
  can_access_admin_panel: boolean;
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "menu" | "orders" | "stock" | "restaurant information"
  >("menu");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);
  const [managerStatus, setManagerStatus] = useState<ManagerStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

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

  // Fetch manager status on component mount
  useEffect(() => {
    const fetchManagerStatus = async () => {
      try {
        const response = await api.get("accounts/manager-status/");
        const status: ManagerStatus = response.data;
        setManagerStatus(status);
        
        // Handle redirect logic - redirect if manager_pending is false
        if (!status.manager_pending && !status.is_manager) {
          navigate('/');
          return;
        }
      } catch (error) {
        console.error("Error fetching manager status:", error);
        setError("Error fetching manager status");
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchManagerStatus();
  }, [navigate]);

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
    if (activeTab === "menu" && managerStatus?.is_manager) fetchMenuItems();
    if (activeTab === "orders" && managerStatus?.is_manager) fetchOrders();
  }, [activeTab, managerStatus]);

  useEffect(() => {
    if (managerStatus?.is_manager) {
      fetchOrders();
    }
  }, [managerStatus]);

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
      const response = await api.get("cart/manager/orders/");
      setOrders(response.data.results || response.data);
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

  // Loading state while checking manager status
  if (loadingStatus) {
    return <Loading />;
  }

  const isManager = managerStatus?.is_manager || false;
  const isPending = managerStatus?.manager_pending || false;
  const shouldDisableTabs = isPending && !isManager;

  return (
    <AdminContainer
      activeTab={activeTab}
      onTabSelect={(tab) => setActiveTab(tab as any)}
      shouldDisableTabs={shouldDisableTabs}
      username={username}
      currentTime={currentTime}
    >
      <StatsCards
        menuItemsCount={menuItems.length}
        ordersCount={orders.length}
        loading={loading}
        loadingOrders={loadingOrders}
      />

      <ManagerStatusBanner
        isPending={isPending}
        isManager={isManager}
      />

      <Tab.Pane eventKey="menu">
        <Panel
          title="Menu Management"
          disabled={shouldDisableTabs}
          icon="coffee"
        >
          <MenuManagement
            menuItems={menuItems}
            formData={formData}
            editId={editId}
            error={error}
            disabled={shouldDisableTabs}
            onFormDataChange={handleChange}
            onSubmit={handleSubmit}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Panel>
      </Tab.Pane>

      <Tab.Pane eventKey="orders">
        <Panel
          title="Orders History"
          disabled={shouldDisableTabs}
          icon="shopping-cart"
        >
          <OrdersHistory
            orders={orders}
            expandedOrderIds={expandedOrderIds}
            errorOrders={errorOrders}
            loadingOrders={loadingOrders}
            onToggleExpand={toggleExpand}
          />
        </Panel>
      </Tab.Pane>

      <Tab.Pane eventKey="stock">
        <Panel
          title="Stock Management"
          disabled={shouldDisableTabs}
          icon="package"
        >
          <StockManagement
            menuItems={menuItems}
            loading={loading}
          />
        </Panel>
      </Tab.Pane>

      <Tab.Pane eventKey="restaurant information">
        <RestaurantInformation
          restaurantInfo={restaurantInfo}
          restaurantTypes={restaurantTypes}
          onRestaurantInfoChange={handleRestaurantInfoChange}
          onSubmit={handleRestaurantInfoSubmit}
        />
      </Tab.Pane>
    </AdminContainer>
  );
};

export default Admin;
