import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "../styles/RestaurantPage.css";
import {
  Cart,
  Comment,
  MenuItem,
  Restaurant,
} from "../components/Restaurant/types";
import RestaurantHeader from "../components/Restaurant/RestaurantHeader";
import RestaurantBanner from "../components/Restaurant/RestaurantBanner";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantTabs from "../components/Restaurant/RestaurantTabs";
import MenuSection from "../components/Restaurant/MenuSection";
import CommentsSection from "../components/Restaurant/CommentsSection";
import RestaurantFooter from "../components/Restaurant/RestaurantFooter";

// تعریف نوع برای شهر
interface City {
  id: number;
  name: string;
  province: string;
}

function getCsrfToken(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
}

function RestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const [activeTab, setActiveTab] = useState<"menu" | "comments">("menu");
  const [cart, setCart] = useState<Cart>({});
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}/`);
        const data = await res.json();
        setRestaurant(data);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await fetch(`/api/pages/cities/`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    fetchRestaurant();
    fetchCities();
  }, [restaurantId]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}/menu/`);
        const data = await res.json();
        setMenuItems(data.menu_items || []);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}/reviews/`);
        const data = await res.json();
        setComments(data.results || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [restaurantId]);

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

    document.querySelectorAll(".menu-item-card").forEach((item) => {
      observer.observe(item);
    });

    const handleScroll = () => {
      setIsHeaderCompact(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  const getCartItemCount = (): number =>
    Object.values(cart).reduce((a, b) => a + b, 0);

  const handleAddToCart = async (itemId: string): Promise<void> => {
    try {
      await fetch("/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({
          menu_item_id: itemId,
          quantity: 1,
        }),
        credentials: "include",
      });

      const currentQuantity = cart[itemId] || 0;
      setCart((prev) => ({
        ...prev,
        [itemId]: currentQuantity + 1,
      }));

      setShowCartAnimation(true);
      setTimeout(() => setShowCartAnimation(false), 800);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const averageRating = useMemo(() => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return parseFloat((total / comments.length).toFixed(1));
  }, [comments]);

  const cityName = useMemo(() => {
    return cities.find((c) => c.id === restaurant?.city)?.name || "";
  }, [cities, restaurant?.city]);

  if (!restaurant) {
    return <div className="loading">در حال دریافت اطلاعات رستوران...</div>;
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

      <RestaurantBanner image={restaurant.cover_image} name={restaurant.name} />

      <RestaurantInfo
        name={restaurant.name}
        location={cityName}
        description={restaurant.description}
        rating={averageRating}
      />

      <RestaurantTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="tab-content py-5">
        <div className="container">
          <MenuSection
            items={menuItems}
            visibleItems={visibleItems}
            onAddToCart={handleAddToCart}
            isActive={activeTab === "menu"}
          />

          <CommentsSection
            comments={comments}
            isActive={activeTab === "comments"}
          />
        </div>
      </section>

      <RestaurantFooter />
    </div>
  );
}

export default RestaurantPage;
