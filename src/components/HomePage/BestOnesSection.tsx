import { useState, useEffect, useRef } from "react";
import styles from "../../styles/HomePage.module.css";
import { api } from "../../utils/api"; // Adjust the path if necessary

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  cover_image: string;
  delivery_cost:number;
}

const BestOnesSection = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerView = 2;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchTopRestaurants = async () => {
      try {
        const data = await api.get("/api/restaurants/top/?n=5");
        console.log(data)
        setRestaurants(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRestaurants();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [restaurants]);

  const maxIndex = Math.max(0, restaurants.length - itemsPerView);

  const next = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  if (loading) return <p>Loading top restaurants...</p>;
  if (error) return <p>Error: {error}</p>;

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
            {restaurants.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${styles["best-ones-item"]} ${styles["fade-in-on-scroll"]}`}
              >
                <div className={styles["image-box"]}>
                  <img src={item.cover_image} alt={item.name} />
                </div>
                <div className={styles.info}>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>
                    <strong>{item.delivery_cost}</strong>
                  </p>
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
