import React, { useEffect, useState } from "react";
import "../styles/GuessTheDishGame.css";

type Dish = {
  name: string;
  image: string;
};

type DishOption = Dish & { correct: boolean };

const allDishes: Dish[] = [
  { name: "pizza", image: "pizza.jpg" },
  { name: "ghorme sabzi", image: "ghorme.png" },
  { name: "burger", image: "burger.jpg" },
  { name: "pasta", image: "pasta.jpg" },
  { name: "zereshk polo", image: "zereshk.jpg" },
  { name: "lasagna", image: "lasagna.jpg" },
  { name: "kabab", image: "kabab.jpg" },
  { name: "soup", image: "soup.jpg" },
  { name: "schnitzel", image: "schnitzel.jpg" },
  { name: "lobia", image: "lobia.jpg" },
];

function getRandomQuestion(): { options: DishOption[]; correctDish: Dish } {
  const shuffled = [...allDishes].sort(() => 0.5 - Math.random());
  const correctDish = shuffled[0];
  const otherOptions = shuffled.slice(1, 4);
  const options: DishOption[] = [...otherOptions, { ...correctDish, correct: true }]
    .map(opt => ({ ...opt, correct: opt.name === correctDish.name }))
    .sort(() => 0.5 - Math.random());

  return { options, correctDish };
}

const GuessTheDishGame: React.FC = () => {
  const [options, setOptions] = useState<DishOption[]>([]);
  const [correctDish, setCorrectDish] = useState<Dish | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [timer, setTimer] = useState(15);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [gameExited, setGameExited] = useState(false);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  useEffect(() => {
    if (answered) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleAnswer(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [answered]);

  const loadNewQuestion = () => {
    const { options, correctDish } = getRandomQuestion();
    setOptions(options);
    setCorrectDish(correctDish);
    setAnswered(false);
    setIsCorrect(null);
    setShowImage(false);
    setImageLoaded(false);
    setTimer(15);
  };

  const handleAnswer = (correct: boolean) => {
    setAnswered(true);
    setShowImage(true);
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const saveScoreToAPI = async (score: number) => {
    try {
      await fetch('https://api.example.com/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });
    } catch (error) {
      console.error('Error saving points:', error);
    }
  };

  const handleExit = () => {
    if (score > 0) saveScoreToAPI(score);
    setGameExited(true);
  };

  return (
    <div className="guess-game">
      {!gameExited ? (
        <>
          <div className="game-header">
            <h2>🍽 Guess The Food</h2>
            <div className="controls">
              <button className="exit-button" onClick={handleExit}>
                exit
              </button>
              <div className="score-timer">
                <span>⭐️Score {score}</span>
                <span>⏱ {timer}second</span>
              </div>
            </div>
          </div>

          <div className="game-content">
            <div className="image-container">
              {correctDish && (
                <img
                  src={correctDish.image}
                  alt="Guess"
                  className={`main-image ${showImage ? "reveal" : "blurred"}`}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>

            <div className="options-container">
              <p className="question">What food is this?</p>
              <div className="options-grid">
                {options.map((dish, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(dish.correct)}
                    disabled={answered}
                    className={`
                      option-button 
                      ${answered ? (dish.correct ? "correct" : "incorrect") : ""}
                    `}
                  >
                    {dish.name}
                  </button>
                ))}
              </div>

              {answered && (
                <div className="result">
                  <p>{isCorrect ? "Well done! You were right!🎉" : `😢Wrong! The right food: ${correctDish?.name}`}</p>
                  <button className="next-button" onClick={loadNewQuestion}>
                    Next question
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="exit-screen">
          <h3>Game over!</h3>
          <p>Your final score: {score}</p>
          <button className="restart-button" onClick={() => setGameExited(false)}>
            Replay
          </button>
        </div>
      )}
    </div>
  );
};

export default GuessTheDishGame;