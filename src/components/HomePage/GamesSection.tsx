import { useState } from "react";
import styles from "../../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";

interface GameItem {
  title: string;
  image: string;
  route: string;
}

const games: GameItem[] = [
  {
    title: "Guess the Hidden Dish",
    image: "/dish.png",
    route: "/games/guess-the-dish",
  },
  {
    title: "2048 Puzzle",
    image: "/2048.png",
    route: "https://play2048.co/",
  },
  {
    title: "Tetris Classic",
    image: "/teris.png",
    route: "https://tetris.com/play-tetris",
  },
  {
    title: "Minesweeper",
    image: "/mines.png",
    route: "https://minesweeperonline.com",
  },
];

const GamesSection: React.FC = () => {
  const [dishScore, setDishScore] = useState<number>(0);
  const [puzzle2048Score, setPuzzle2048Score] = useState<number>(0);
  const [tetrisScore, setTetrisScore] = useState<number>(0);
  const [minesScore, setMinesScore] = useState<number>(0);

  const navigate = useNavigate();

  const handleCardClick = (gameTitle: string, route: string) => {
  // Update score based on title (same logic)
  if (gameTitle.includes("Guess the Hidden Dish")) {
    setDishScore((prev) => prev + 1);
  } else if (gameTitle.includes("2048")) {
    setPuzzle2048Score((prev) => prev + 1);
  } else if (gameTitle.includes("Tetris")) {
    setTetrisScore((prev) => prev + 1);
  } else if (gameTitle.includes("Minesweeper")) {
    setMinesScore((prev) => prev + 1);
  }

  // Open all games (even internal routes) in a new tab
  if (route.startsWith("/")) {
    window.open(`${window.location.origin}${route}`, "_blank");
  } else {
    window.open(route, "_blank");
  }
};

  const totalScore = dishScore + puzzle2048Score + tetrisScore + minesScore;

  return (
    <section className={styles["games-section"]}>
      <div className={styles["games-header"]}>
        <h2 className={styles["games-title"]}>🎮 Explore Fun Games</h2>
        <p className={styles["score"]}>Total Score: {totalScore}</p>
      </div>
      <div className={styles["games-container"]}>
        {games.map((game, index) => {
          let titleColor = "orange";

          if (game.title.includes("2048")) titleColor = "#8B4513";
          else if (game.title.includes("Tetris")) titleColor = "#FFA500";
          else if (game.title.includes("Minesweeper")) titleColor = "#1E90FF";

          return (
            <div
              key={index}
              className={styles["game-card"]}
              onClick={() => handleCardClick(game.title, game.route)}
              role="button"
            >
              <div className={styles["image-box"]}>
                <img src={game.image} alt={game.title} />
                <div className={styles["overlay"]}>
                  <p
                    className={styles["game-title"]}
                    style={{ color: titleColor }}
                  >
                    {game.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GamesSection;
