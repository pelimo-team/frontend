import { useState, useEffect, useRef } from "react";
import styles from "../../styles/HomePage.module.css";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}

const bestOnesData: Restaurant[] = [
  { id: 1, name: "Restaurant A", location: "City A", rating: 3, image: "Rectangle 754.png" },
  { id: 2, name: "Restaurant B", location: "City B", rating: 4, image: "Rectangle 754.png" },
  { id: 3, name: "Restaurant C", location: "City C", rating: 5, image: "Rectangle 754.png" },
  { id: 4, name: "Restaurant D", location: "City D", rating: 2, image: "Rectangle 754.png" },
];

const BestOnesSection = () => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerView = 2;
  const maxIndex = bestOnesData.length - itemsPerView;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const next = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className={styles["best-ones-section"]}>
      <h2 className={styles["best-ones-title"]}>The Best Ones</h2>
      <div className={styles["slider-wrapper"]}>
        <button
          className={styles["arrow-left"]}
          onClick={prev}
          disabled={startIndex === 0}
        >
          &lt;
        </button>

        <div className={styles["best-ones-viewport"]}>
          <div
            className={styles["best-ones-slider"]}
            style={{ transform: `translateX(-${startIndex * 50}%)` }}
          >
            {bestOnesData.map((item, index) => (
              <div
                key={item.id}
                ref={el => (cardRefs.current[index] = el)}
                className={`${styles["best-ones-item"]} ${styles["fade-in-on-scroll"]}`}
              >
                <div className={styles["image-box"]}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.info}>
                  <p><strong>{item.name}</strong></p>
                  <p>{item.location}</p>
                  <p>{"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles["arrow-right"]}
          onClick={next}
          disabled={startIndex >= maxIndex}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default BestOnesSection;
