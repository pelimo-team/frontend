import Menu from "../../pages/Menu";
import CommentsSection from "../../pages/CommentsSection";

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface RestaurantContentProps {
  activeTab: "menu" | "comments";
  menuCategories: Category[];
  cart: Record<string, number>;
  updateCart: (itemId: string, newQuantity: number) => Promise<void>;
  isAuthenticated: boolean;
  restaurantId: number;
}

const RestaurantContent = ({
  activeTab,
  menuCategories,
  cart,
  updateCart,
  isAuthenticated,
  restaurantId,
}: RestaurantContentProps) => {
  if (activeTab === "menu") {
    if (menuCategories.length > 0) {
      return (
        <Menu
          categories={menuCategories}
          cart={cart}
          updateCart={updateCart}
          isAuthenticated={isAuthenticated}
        />
      );
    }
    return <div className="menu-empty">منو در دسترس نیست</div>;
  }

  return <CommentsSection restaurantId={restaurantId} />;
};

export default RestaurantContent; 