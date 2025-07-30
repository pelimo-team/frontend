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
  RestaurantInformation,
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
  >("restaurant information"); // Default to restaurant information tab
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState<number[]>([]);
  const [managerStatus, setManagerStatus] = useState<ManagerStatus>({
    is_manager: false,
    manager_pending: false,
    manager_status: "",
    has_restaurant: false,
    can_access_admin_panel: false,
  });
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

  useEffect(() => {
    const fetchManagerStatus = async () => {
      // Check if user is logged in
      if (!token) {
        navigate("/login");
        setLoadingStatus(false);
        return;
      }

      try {
        const response = await api.get("accounts/manager-status/");
        const status: ManagerStatus = response.data;
        setManagerStatus(status);

        // If user is not a manager and not pending approval, redirect to home
        if (!status.is_manager && !status.manager_pending) {
          navigate("/");
          setLoadingStatus(false);
          return;
        }

        // If user is a manager but can't access admin panel, only show restaurant info
        if (status.is_manager && !status.can_access_admin_panel) {
          setActiveTab("restaurant information");
        }

      } catch (error) {
        console.error("Error fetching manager status:", error);
        navigate("/login");
        setLoadingStatus(false);
        return;
      }
      setLoadingStatus(false);
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
    if (activeTab === "menu" && managerStatus.can_access_admin_panel) fetchMenuItems();
    if (activeTab === "orders" && managerStatus.can_access_admin_panel) fetchOrders();
  }, [activeTab, managerStatus]);

  useEffect(() => {
    if (managerStatus.can_access_admin_panel) {
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

  if (loadingStatus) {
    return <Loading />;
  }

  // Access control logic
  const isManager = managerStatus.is_manager;
  const isPending = managerStatus.manager_pending;
  const canAccessAdminPanel = managerStatus.can_access_admin_panel;

  // If manager is pending approval, allow access but disable interactions
  const shouldDisableInteractions = isPending;
  
  // If manager can't access admin panel, only show restaurant info
  const shouldShowOnlyRestaurantInfo = isManager && !canAccessAdminPanel;

  // Determine which tabs should be disabled for navigation
  const getDisabledTabs = () => {
    if (shouldShowOnlyRestaurantInfo) {
      return ["menu", "orders", "stock"];
    }
    return [];
  };

  const disabledTabs = getDisabledTabs();

  return (
    <AdminContainer
      activeTab={activeTab}
      onTabSelect={(tab) => {
        // Allow switching to all tabs when pending, but prevent switching to disabled tabs for other cases
        if (!disabledTabs.includes(tab as any)) {
          setActiveTab(tab as any);
        }
      }}
      shouldDisableTabs={shouldShowOnlyRestaurantInfo}
      username={username}
      currentTime={currentTime}
      disabledTabs={disabledTabs}
    >
      {/* Show stats only if user has full access */}
      {canAccessAdminPanel && (
        <StatsCards
          menuItemsCount={menuItems.length}
          ordersCount={orders.length}
          loading={loading}
          loadingOrders={loadingOrders}
        />
      )}

      {/* Show manager status banner for pending users */}
      {isPending && (
        <div className="manager-status-banner pending">
          <div className="banner-content">
            <div className="banner-icon">
              <svg className="warning-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="banner-text">
              <p className="banner-message">
                Your manager application is pending approval. Some features are limited until your application is approved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Show limited access message for managers without admin panel access */}
      {shouldShowOnlyRestaurantInfo && (
        <div className="manager-status-banner info">
          <div className="banner-content">
            <div className="banner-icon">
              <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="banner-text">
              <p className="banner-message">
                You have limited access. You can only manage restaurant information.
              </p>
            </div>
          </div>
        </div>
      )}

      <Tab.Pane eventKey="menu">
        <Panel title="Menu Management" disabled={shouldShowOnlyRestaurantInfo} icon="coffee">
          <MenuManagement
            menuItems={menuItems}
            formData={formData}
            editId={editId}
            error={error}
            disabled={shouldDisableInteractions || shouldShowOnlyRestaurantInfo}
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
          disabled={shouldShowOnlyRestaurantInfo}
          icon="shopping-cart"
        >
          <OrdersHistory
            orders={orders}
            expandedOrderIds={expandedOrderIds}
            errorOrders={errorOrders}
            loadingOrders={loadingOrders}
            onToggleExpand={toggleExpand}
            disabled={shouldDisableInteractions || shouldShowOnlyRestaurantInfo}
          />
        </Panel>
      </Tab.Pane>

      <Tab.Pane eventKey="stock">
        <Panel title="Stock Management" disabled={shouldShowOnlyRestaurantInfo} icon="package">
          <StockManagement 
            menuItems={menuItems} 
            loading={loading} 
            disabled={shouldDisableInteractions || shouldShowOnlyRestaurantInfo}
          />
        </Panel>
      </Tab.Pane>

      <Tab.Pane eventKey="restaurant information">
        <RestaurantInformation disabled={shouldDisableInteractions} />
      </Tab.Pane>
    </AdminContainer>
  );
};

export default Admin;
