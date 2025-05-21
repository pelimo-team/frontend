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
            "/Restaurant Mock/1.jpeg",
        },
        {
          id: "102",
          name: "سالاد فصل",
          description: "سالادی تازه و رنگارنگ",
          price: 20000,
          image:
            "/Restaurant Mock/2.webp",
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
            "/Restaurant Mock/3.jpeg",
        },
        {
          id: "202",
          name: "قرمه سبزی",
          description: "خورشت قرمه سبزی با طعم اصیل ایرانی",
          price: 60000,
          image:
            "/Restaurant Mock/4.jpeg",
        },
        {
          id: "203",
          name: "میرزا قاسمی",
          description: "غذای خوشمزه شمالی با بادمجان کبابی و تخم مرغ",
          price: 55000,
          image:
            "/Restaurant Mock/5.jpeg",
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
            "/Restaurant Mock/6.webp",
        },
        {
          id: "302",
          name: "باقلوا",
          description: "باقلوای تازه با عسل و پسته",
          price: 40000,
          image:
            "/Restaurant Mock/7.jpg",
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
        });
      },
      { threshold: 0.1 }
    );

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

  return (
    <div className="restaurant-page" dir="rtl">
      <RestaurantHeader
        logo={restaurant.logo}
        restaurantName={restaurant.name}
        cartItemCount={getCartItemCount()}
        showCartAnimation={showCartAnimation}
        isCompact={isHeaderCompact}
      />

      <RestaurantBanner
        image={restaurant.image}
        name={restaurant.name}
      />

      <RestaurantInfo
        name={restaurant.name}
        location={restaurant.location}
        rating={restaurant.rating}
      />

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
    </div>
  );
}

export default RestaurantPage;