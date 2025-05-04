import { useState } from "react";
import styles from "../../HomePage.module.css";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}

const bestOnesData: Restaurant[] = [
  {
    id: 1,
    name: "Restaurant A",
    location: "City A",
    rating: 3,
    image: "Rectangle 754.png",
  },
  {
    id: 2,
    name: "Restaurant B",
    location: "City B",
    rating: 4,
    image: "Rectangle 754.png",
  },
  {
    id: 3,
    name: "Restaurant C",
    location: "City C",
    rating: 5,
    image: "Rectangle 754.png",
  },
  {
    id: 4,
    name: "Restaurant D",
    location: "City D",
    rating: 2,
    image: "Rectangle 754.png",
  },
];

const BestOnesSection = () => {
  const [startIndex, setStartIndex] = useState<number>(0);

  const next = () => {
    if (startIndex < bestOnesData.length - 2) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleItems = bestOnesData.slice(startIndex, startIndex + 2);

  return (
    <section className={styles["best-ones-section"]}>
      <h2 className={styles["best-ones-title"]}>The Best Ones</h2>
      <div className={styles["slider-wrapper"]}>
        <button className={styles["arrow-left"]} onClick={prev}>
          &lt;
        </button>
        <div className={styles["best-ones-container"]}>
          {visibleItems.map((item) => (
            <div key={item.id} className={styles["best-ones-item"]}>
              <div className={styles["image-box"]}>
                <img src={item.image} alt="restaurant" />
              </div>
              <div className={styles.info}>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>{item.location}</p>
                <p>{"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles["arrow-right"]} onClick={next}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default BestOnesSection; 