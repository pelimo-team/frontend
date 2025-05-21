import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/RestaurantPage.css";
import { api } from "../utils/api";
import RestaurantHeader from "../components/Restaurant/RestaurantHeader";
import RestaurantBanner from "../components/Restaurant/RestaurantBanner";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantTabs from "../components/Restaurant/RestaurantTabs";
<<<<<<< HEAD
import MenuSection from "../components/Restaurant/MenuSection";
import CommentsSection from "../components/Restaurant/CommentsSection";
import RestaurantFooter from "../components/Restaurant/RestaurantFooter";

function RestaurantPage() {
  // State management
  const [activeTab, setActiveTab] = useState<"menu" | "comments">("menu");
  const [cart, setCart] = useState<Cart>({});
  const [showCartAnimation, setShowCartAnimation] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isHeaderCompact, setIsHeaderCompact] = useState<boolean>(false);

  // Mock data
  const restaurant: Restaurant = {
    id: 1,
    name: "رستوران نمونه",
    location: "تهران، خیابان ولیعصر",
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    logo: "https://via.placeholder.com/100x100?text=Logo",
  };

  const menuCategories: MenuCategory[] = [
    {
      id: "1",
      name: "پیش‌غذا",
      items: [
        {
          id: "101",
          name: "سوپ جو",
          description: "سوپ خوشمزه با جو و سبزیجات تازه",
          price: 25000,
          image:
            "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "102",
          name: "سالاد فصل",
          description: "سالادی تازه و رنگارنگ",
          price: 20000,
          image:
            "https://images.pexels.com/photos/1546896/pexels-photo-1546896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
    },
    {
      id: "2",
      name: "غذای اصلی",
      items: [
        {
          id: "201",
          name: "چلوکباب",
          description: "چلوکباب با گوشت تازه و زعفران",
          price: 70000,
          image:
            "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "202",
          name: "قرمه سبزی",
          description: "خورشت قرمه سبزی با طعم اصیل ایرانی",
          price: 60000,
          image:
            "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "203",
          name: "میرزا قاسمی",
          description: "غذای خوشمزه شمالی با بادمجان کبابی و تخم مرغ",
          price: 55000,
          image:
            "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
    },
    {
      id: "3",
      name: "دسر",
      items: [
        {
          id: "301",
          name: "بستنی سنتی",
          description: "بستنی زعفرانی سنتی با مغز پسته",
          price: 35000,
          image:
            "https://images.pexels.com/photos/5060484/pexels-photo-5060484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "302",
          name: "باقلوا",
          description: "باقلوای تازه با عسل و پسته",
          price: 40000,
          image:
            "https://images.pexels.com/photos/13203692/pexels-photo-13203692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
    },
  ];

  const comments: Comment[] = [
    {
      id: 1,
      user: "علی رضایی",
      date: "1402/08/12",
      rating: 5,
      text:
        "غذاها خیلی خوشمزه بودند و سرویس‌دهی عالی بود. حتماً دوباره به این رستوران مراجعه می‌کنم.",
    },
    {
      id: 2,
      user: "سارا محمدی",
      date: "1402/07/25",
      rating: 4,
      text: "کیفیت غذاها بسیار خوب بود. فقط کمی در سرو غذا تأخیر داشتند.",
    },
    {
      id: 3,
      user: "محمد کریمی",
      date: "1402/07/10",
      rating: 4.5,
      text: "فضای رستوران بسیار دلنشین و غذاها لذیذ بودند. پیشنهاد می‌کنم حتماً امتحان کنید.",
    },
  ];

  // Scroll observation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
=======
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

// interface MenuResponse {
//   categories?: Category[];
// }

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
>>>>>>> parent of a43bf4e (Redesigned Restaurant page UI and connected Add/Edit Food page to backend)
        });
      }
      setCart(cartState);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

<<<<<<< HEAD
    // Observe menu items
    document.querySelectorAll(".menu-item-card").forEach((item) => {
      observer.observe(item);
    });

    // Header scroll effect
    const handleScroll = () => {
      setIsHeaderCompact(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab]);

  // Get total cart items
  const getCartItemCount = (): number =>
    Object.values(cart).reduce((a, b) => a + b, 0);

  // Add item to cart
  const handleAddToCart = (itemId: string): void => {
    const currentQuantity = cart[itemId] || 0;
    setCart((prev) => ({
      ...prev,
      [itemId]: currentQuantity + 1,
    }));
    
    // Trigger cart animation
    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 800);
  };

=======
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

>>>>>>> parent of a43bf4e (Redesigned Restaurant page UI and connected Add/Edit Food page to backend)
  return (
    <div className="restaurant-page restaurant-container-fluid p-0">
      <RestaurantHeader
        restaurantName={restaurant.name}
        restaurantLogo={restaurant.logo}
        cartItemCount={cartItemCount}
      />
<<<<<<< HEAD

      <RestaurantBanner
        image={restaurant.image}
        name={restaurant.name}
      />

=======
      <RestaurantBanner image={restaurant.image} name={restaurant.name} />
>>>>>>> parent of a43bf4e (Redesigned Restaurant page UI and connected Add/Edit Food page to backend)
      <RestaurantInfo
        name={restaurant.name}
        location={restaurant.location}
        rating={restaurant.rating}
      />
<<<<<<< HEAD

      <RestaurantTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <section className="tab-content py-5">
        <div className="container">
          <MenuSection
            categories={menuCategories}
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
=======
      <RestaurantTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <RestaurantContent
        activeTab={activeTab}
        menuCategories={menuCategories}
        cart={cart}
        updateCart={updateCart}
        isAuthenticated={isAuthenticated}
        restaurantId={Number(id)}
      />
>>>>>>> parent of a43bf4e (Redesigned Restaurant page UI and connected Add/Edit Food page to backend)
    </div>
  );
};

<<<<<<< HEAD
export default RestaurantPage;
=======
export default Restaurant;
>>>>>>> parent of a43bf4e (Redesigned Restaurant page UI and connected Add/Edit Food page to backend)
