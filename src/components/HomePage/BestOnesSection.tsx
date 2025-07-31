import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";
import { api } from "../../utils/api";

interface Restaurant {
  id: number;
  name: string;
  city: string;
  average_rating: number;
  cover_image: string;
  delivery_cost: number;
  logo: string;
}

const BestOnesSection = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const itemsPerView = windowWidth < 768 ? 1 : 2;
  const maxIndex = Math.max(0, restaurants.length - itemsPerView);

  useEffect(() => {
    const fetchTopRestaurants = async () => {
      try {
        const data = await api.get("/api/restaurants/top/?n=5");
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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const next = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  if (loading) return <p>Loading top restaurants...</p>;
  if (error) return <p>Error: {error}</p>;

  const cardWidth = windowWidth < 768 ? 100 : 50;

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
            style={{ transform: `translateX(-${startIndex * cardWidth}%)` }}
          >
            {restaurants.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${styles["best-ones-item"]} ${styles["fade-in-on-scroll"]}`}
                onClick={() => navigate(`/restaurant/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="image-box"
                  style={{
                    width: "100%",
                    height: windowWidth < 768 ? "18rem" : "30rem",
                  }}
                >
                  <div className={styles.info}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={item.cover_image}
                        alt={`${item.name} cover`}
                        style={{
                          width: "100%",
                          height: windowWidth < 768 ? "18rem" : "30rem",
                          objectFit: "cover",
                          borderRadius: "1%",
                          border: "2px solid #ccc",
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.info}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <img
      src={item.logo}
      alt={`${item.name} logo`}
      style={{
        width: windowWidth < 500 ? "2.5rem" : windowWidth < 768 ? "3.5rem" : "5rem",
        height: windowWidth < 500 ? "2.5rem" : windowWidth < 768 ? "3.5rem" : "5rem",
        objectFit: "cover",
        borderRadius: "50%",
        border: "2px solid #ccc",
        flexShrink: 0,
      }}
    />
    <strong style={{ fontSize: "1.2rem" }}>{item.name}</strong>
  </div>

  <div style={{ marginTop: "0.5rem" }}>
    <p
      style={{
        color: "#f7b538",
        fontSize:
          windowWidth < 500
            ? "1.2rem"
            : windowWidth < 768
            ? "1.8rem"
            : "2.5rem",
        letterSpacing:
          windowWidth < 500
            ? "1px"
            : windowWidth < 768
            ? "2px"
            : "3px",
        margin: 0,
      }}
    >
      {[...Array(5)]
        .map((_, i) => (i < item.average_rating ? "★" : "☆"))
        .join("")}
    </p>
    <p
      style={{
        color: "#4c956c",
        fontSize:
          windowWidth < 500
            ? "1rem"
            : windowWidth < 768
            ? "1.4rem"
            : "1.8rem",
        margin: 0,
        fontWeight: 600,
      }}
    >
      {item.average_rating}
    </p>
  </div>
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
