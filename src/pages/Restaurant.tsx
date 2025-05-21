import React, { useState, useEffect } from "react";
import "../styles/RestaurantPage.css";
import { Cart, Comment, MenuCategory, Restaurant } from "../components/Restaurant/types";
import RestaurantHeader from "../components/Restaurant/RestaurantHeader";
import RestaurantBanner from "../components/Restaurant/RestaurantBanner";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantTabs from "../components/Restaurant/RestaurantTabs";
import MenuSection from "../components/Restaurant/MenuSection";
import CommentsSection from "../components/Restaurant/CommentsSection";
import RestaurantFooter from "../components/Restaurant/RestaurantFooter";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api"; // فرض بر اینه که axios یا هر ابزاری برای api هست

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"menu" | "comments">("menu");
  const [cart, setCart] = useState<Cart>({});
  const [showCartAnimation, setShowCartAnimation] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isHeaderCompact, setIsHeaderCompact] = useState<boolean>(false);

  // داده‌های اصلی
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // وضعیت لودینگ و خطا
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // بررسی وضعیت احراز هویت (اختیاری)
  const checkAuthStatus = async () => {
    try {
      await api.get("/api/accounts/user/");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // واکشی داده‌ها
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // واکشی اطلاعات رستوران
      const restaurantResp = await api.get(`/api/restaurants/${id}/`);
      setRestaurant(restaurantResp.data);

      // واکشی منو
      const menuResp = await api.get(`/api/restaurants/${id}/menu/`);
      let categoriesData: MenuCategory[] = [];

      if (Array.isArray(menuResp.data.categories)) {
        categoriesData = menuResp.data.categories;
      } else if (Array.isArray(menuResp.data)) {
        // اگر ساختار متفاوت بود اینجا تبدیل کن
        const categoriesMap = menuResp.data.reduce((acc: Record<string, MenuCategory>, item: any) => {
          const catId = item.category?.id?.toString() || "0";
          const catName = item.category?.name || "دسته‌بندی دیگر";
          if (!acc[catId]) {
            acc[catId] = { id: catId, name: catName, items: [] };
          }
          acc[catId].items.push({
            id: item.id.toString(),
            name: item.name,
            description: item.description || "",
            price: item.price,
            image: item.image,
          });
          return acc;
        }, {});
        categoriesData = Object.values(categoriesMap);
      }
      setMenuCategories(categoriesData);

      // واکشی نظرات (اگر API نظرات داری)
      const commentsResp = await api.get(`/api/restaurants/${id}/comments/`);
      setComments(commentsResp.data || []);

      // بررسی احراز هویت
      await checkAuthStatus();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "خطا در بارگذاری اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  // افکت اسکرول و مشاهده آیتم‌ها (مثل کد اول)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".menu-item-card").forEach((item) => observer.observe(item));

    const handleScroll = () => {
      setIsHeaderCompact(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab, menuCategories]);

  // تعداد کل آیتم‌های سبد خرید
  const getCartItemCount = (): number => Object.values(cart).reduce((a, b) => a + b, 0);

  // افزودن به سبد خرید
  const handleAddToCart = (itemId: string): void => {
    const currentQuantity = cart[itemId] || 0;
    setCart((prev) => ({
      ...prev,
      [itemId]: currentQuantity + 1,
    }));

    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 800);
  };

  if (loading) {
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="error-message">خطا: {error}</div>;
  }

  if (!restaurant) {
    return <div>رستوران پیدا نشد</div>;
  }

  return (
    <div className="restaurant-page" dir="rtl">
      <RestaurantHeader
        logo={restaurant.logo}
        restaurantName={restaurant.name}
        cartItemCount={getCartItemCount()}
        showCartAnimation={showCartAnimation}
        isCompact={isHeaderCompact}
      />

      <RestaurantBanner image={restaurant.image} name={restaurant.name} />

      <RestaurantInfo name={restaurant.name} location={restaurant.location} rating={restaurant.rating} />

      <RestaurantTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="tab-content py-5">
        <div className="container">
          <MenuSection
            categories={menuCategories}
            visibleItems={visibleItems}
            onAddToCart={handleAddToCart}
            isActive={activeTab === "menu"}
          />

          <CommentsSection comments={comments} isActive={activeTab === "comments"} />
        </div>
      </section>

      <RestaurantFooter />
    </div>
  );
}

export default RestaurantPage;
