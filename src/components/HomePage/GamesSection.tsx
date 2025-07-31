import { useState, useEffect } from "react";
import "../../styles/GamesSectin.css";
import { api } from "../../utils/api";
import { useScore } from "../contexts/GameScoreContext";
import { useNavigate } from "react-router-dom"; // import your context hook

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
  const { setTotalScore } = useScore();

  const [backendScore, setBackendScore] = useState(0);
  const [localStorageBonus, setLocalStorageBonus] = useState(0);
  const [, setLastSyncedScore] = useState(0);
  const navigate = useNavigate();
  const totalScore = backendScore + localStorageBonus;

  // Sync local totalScore to context whenever it changes
  useEffect(() => {
    setTotalScore(totalScore);
  }, [totalScore, setTotalScore]);

  const handleCardClick = (route: string) => {
    if (route !== "/games/guess-the-dish") {
      setLocalStorageBonus((prev) => prev + 1);
    }

    if (route.startsWith("/")) {
      window.open(`${window.location.origin}${route}`, "_blank");
    } else {
      window.open(route, "_blank");
    }
  };

  useEffect(() => {
    async function fetchAndMergeScores() {
      try {
        const dishScoreFromGame = localStorage.getItem("dishGameScore");
        const localScore = dishScoreFromGame
          ? parseInt(dishScoreFromGame, 10)
          : 0;

        const res = await api.get("/api/accounts/game-score/");
        const backend = res.game_score ?? 0;

        setBackendScore(backend);

        if (!isNaN(localScore) && localScore > 0) {
          setLocalStorageBonus(localScore);
          localStorage.removeItem("dishGameScore");
        }
      } catch (error) {
        console.error("Failed to fetch or merge scores:", error);
      }
    }

    fetchAndMergeScores();
  }, []);

  useEffect(() => {
    if (localStorageBonus > 0) {
      const combinedScore = backendScore + localStorageBonus;

      api
        .put("/api/accounts/game-score/", { score: combinedScore })
        .then(() => {
          setBackendScore(combinedScore);
          setLocalStorageBonus(0);
          setLastSyncedScore(combinedScore);
        })
        .catch((err) => {
          console.error("Failed to update game score:", err);
        });
    }
  }, [localStorageBonus, backendScore]);

  return (
    <section id="games-section" className="games-section">
      <div className="games-header">
        <h2 className="games-title">🎮 Explore Fun Games</h2>
        {/* Use contextTotalScore or totalScore interchangeably here */}
        <h2 onClick={() => navigate("/wallet")} style={{ cursor: "pointer" }}>
          🎮 Total Score : {totalScore}
        </h2>
      </div>

      <div className="games-container">
        {games.map((game, index) => {
          let titleColor = "#fec89a";

          if (game.title.includes("2048")) titleColor = "#efe6dd";
          else if (game.title.includes("Tetris")) titleColor = "#b5e48c";
          else if (game.title.includes("Minesweeper")) titleColor = "#ffd60a";

          return (
            <div
              key={index}
              className="game-card"
              onClick={() => handleCardClick(game.route)}
              role="button"
            >
              <div className="image-box">
                <img src={game.image} alt={game.title} />
                <div className="overlay">
                  <p className="game-title" style={{ color: titleColor }}>
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
