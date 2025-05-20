import styles from "../../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

interface GameItem {
  title: string;
  image: string;
  route: string;
}

const games: GameItem[] = [
  {
    title: "حدس غذای مخفی",
    image: "/images/guess-the-dish.jpg",
    route: "/games/guess-the-dish",
  },
  {
    title: "سریع‌ترین سفارش",
    image: "/images/fast-order.jpg",
    route: "/games/fast-order",
  },
  {
    title: "پازل منوی غذا",
    image: "/images/menu-puzzle.jpg",
    route: "/games/menu-puzzle",
  },
  {
    title: "چی می‌خوای بخوری؟",
    image: "/images/what-to-eat.jpg",
    route: "/games/what-to-eat",
  },
];

const GamesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className={styles["games-section"]}>
      <h2 className={styles["games-title"]}>🎮 بازی‌های خوشمزه</h2>
      <div className={styles["games-container"]}>
        {games.map((game, index) => (
          <div
            key={index}
            className={styles["game-card"]}
            onClick={() => handleCardClick(game.route)}
            role="button"
          >
            <div className={styles["image-box"]}>
              <img src={game.image} alt={game.title} />
            </div>
            <div className={styles["info"]}>
              <p>{game.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GamesSection; 