import styles from "../../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../pages/AuthContext";
import { CategoryType } from "../../components/AdvancedSearch/types";

const CategoriesSection = () => {
  const navigate = useNavigate();
  const { setActiveTab } = useContext(AuthContext);
  const handleNavigation = (label: CategoryType) => {
    setActiveTab(label); // ✅ Update the active tab globally
    navigate("./advanced-search"); // Example navigation
  };
  return (
    <section className={styles["categories-section"]}>
      {[
        { src: "restaurant.png", label: "Restaurant",  },
        { src: "fast food.png", label: "Fast Food" },
        { src: "coffee shop.png", label: "Coffee Shop" },
        { src: "juice and ice cream.png", label: "Juice and Ice cream" },
        { src: "confectionary.png", label: "Confectionary" },
        { src: "fruits.png", label: "Fruits" },
      ].map((item, index) => (
        <button
          key={index}
          className={`${styles["category-item"]} ${styles["fade-in-up"]} ${
            styles[`delay-${index + 1}`]
          }`}
          onClick={() => handleNavigation(item.label as CategoryType)}
          
        >
          <img
            className={styles["cat-item-image"]}
            src={item.src}
            alt={item.label}
          />
          <p>{item.label}</p>
          
        </button>
      ))}
    </section>
  );
};

export default CategoriesSection;
