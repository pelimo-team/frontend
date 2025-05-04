import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../RestaurantPage.css";
import { api } from "../utils/api";
import RestaurantHeader from "../components/Restaurant/RestaurantHeader";
import RestaurantBanner from "../components/Restaurant/RestaurantBanner";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantTabs from "../components/Restaurant/RestaurantTabs";
import RestaurantContent from "../components/Restaurant/RestaurantContent";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  image?: string;
  logo?: string;
}

interface MenuResponse {
  categories?: Category[];
}

const Restaurant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant: initialRestaurant } = location.state || {};
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant>(
    initialRestaurant || ({} as Restaurant)
  );
  const [menuCategories, setMenuCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<"menu" | "comments">("menu");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    fetchRestaurantData();
    fetchCart();
  }, [id]);

  const checkAuthStatus = async () => {
    try {
      await api.get("/api/accounts/user/");
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const fetchRestaurantData = async () => {
    setLoading(true);
    setError(null);
    try {
      let restaurantData = initialRestaurant;
      if (!restaurantData) {
        const response = await api.get(`/api/restaurants/${id}/`);
        restaurantData = response;
      }
      setRestaurant(restaurantData);

      const menuResponse = await api.get(`/api/restaurants/${id}/menu/`);
      if (menuResponse) {
        if (
          "categories" in menuResponse &&
          Array.isArray(menuResponse.categories)
        ) {
          setMenuCategories(menuResponse.categories);
        } else if (Array.isArray(menuResponse)) {
          const categoriesMap = menuResponse.reduce((acc, item) => {
            const categoryId = item.category?.id?.toString() || "0";
            const categoryName = item.category?.name || "Other";
            if (!acc[categoryId]) {
              acc[categoryId] = {
                id: categoryId,
                name: categoryName,
                items: [],
              };
            }
            acc[categoryId].items.push({
              id: item.id.toString(),
              name: item.name,
              description: item.description || "",
              price: item.price,
              image: item.image,
            });
            return acc;
          }, {} as Record<string, Category>);
          setMenuCategories(Object.values(categoriesMap));
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load restaurant data"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const cartData = await api.get("/api/cart/");
      const cartState: Record<string, number> = {};
      if (cartData && cartData.items) {
        cartData.items.forEach((item: any) => {
          cartState[item.menu_item.id.toString()] = item.quantity;
        });
      }
      setCart(cartState);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateCart = async (itemId: string, newQuantity: number) => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      const currentQty = cart[itemId] || 0;

      if (newQuantity === 0) {
        const cartData = await api.get("/api/cart/");
        const itemToDelete = cartData.items.find(
          (item: any) => item.menu_item.id.toString() === itemId
        );
        if (itemToDelete) {
          await api.delete(`/api/cart/item/${itemToDelete.id}/delete/`);
        }
      } else if (currentQty === 0) {
        await api.post("/api/cart/add/", {
          restaurant_id: id,
          menu_item_id: itemId,
          quantity: newQuantity,
        });
      } else {
        const cartData = await api.get("/api/cart/");
        const itemToUpdate = cartData.items.find(
          (item: any) => item.menu_item.id.toString() === itemId
        );
        if (itemToUpdate) {
          await api.patch(`/api/cart/item/${itemToUpdate.id}/`, {
            quantity: newQuantity,
          });
        }
      }

      setCart((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));

      await fetchCart();
    } catch (err) {
      console.error("Error updating cart:", err);
      if (err instanceof Error && err.message === "Authentication required") {
        navigate("/login");
      }
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const cartItemCount = Object.values(cart).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="restaurant-page restaurant-container-fluid p-0">
      <RestaurantHeader
        restaurantName={restaurant.name}
        restaurantLogo={restaurant.logo}
        cartItemCount={cartItemCount}
      />
      <RestaurantBanner image={restaurant.image} name={restaurant.name} />
      <RestaurantInfo
        name={restaurant.name}
        location={restaurant.location}
        rating={restaurant.rating}
      />
      <RestaurantTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <RestaurantContent
        activeTab={activeTab}
        menuCategories={menuCategories}
        cart={cart}
        updateCart={updateCart}
        isAuthenticated={isAuthenticated}
        restaurantId={Number(id)}
      />
    </div>
  );
};

export default Restaurant;
