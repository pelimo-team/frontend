import styles from "../../styles/HomePage.module.css";

const CategoriesSection = () => {
  return (
    <section className={styles["categories-section"]}>
      {[
        { src: "restaurant.png", label: "RESTAURANT" },
        { src: "fast food.png", label: "FAST FOOD" },
        { src: "coffee shop.png", label: "COFFEE SHOP" },
        { src: "juice and ice cream.png", label: "JUICE AND ICE CREAM" },
        { src: "confectionary.png", label: "CONFECTIONARY" },
        { src: "fruits.png", label: "FRUITS" },
      ].map((item, index) => (
        <div
          key={index}
          className={`${styles["category-item"]} ${styles["fade-in-up"]} ${styles[`delay-${index + 1}`]}`}
        >
          <img src={item.src} alt={item.label} />
          <p>{item.label}</p>
        </div>
      ))}
    </section>
  );
};

export default CategoriesSection;
