import styles from "../../HomePage.module.css";

const CategoriesSection = () => {
  return (
    <section className={styles["categories-section"]}>
      <div className={styles["category-item"]}>
        <img src="restaurant.png" alt="Restaurant" />
        <p>RESTAURANT</p>
      </div>
      <div className={styles["category-item"]}>
        <img src="fast food.png" alt="Fast Food" />
        <p>FAST FOOD</p>
      </div>
      <div className={styles["category-item"]}>
        <img src="coffee shop.png" alt="Coffee Shop" />
        <p>COFFEE SHOP</p>
      </div>
      <div className={styles["category-item"]}>
        <img src="juice and ice cream.png" alt="Juice and Ice Cream" />
        <p>JUICE AND ICE CREAM</p>
      </div>
      <div className={styles["category-item"]}>
        <img src="confectionary.png" alt="Confectionary" />
        <p>CONFECTIONARY</p>
      </div>
      <div className={styles["category-item"]}>
        <img src="fruits.png" alt="Fruits" />
        <p>FRUITS</p>
      </div>
    </section>
  );
};

export default CategoriesSection; 