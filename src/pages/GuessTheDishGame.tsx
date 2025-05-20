import React, { useEffect, useState } from "react";
import "../styles/GuessTheDishGame.css";

type Dish = {
  name: string;
  image: string;
};

type DishOption = Dish & { correct: boolean };

const allDishes: Dish[] = [
  { name: "پیتزا", image: "pizza.jpg" },
  { name: "قرمه سبزی", image: "ghorme.png" },
  { name: "برگر", image: "burger.jpg" },
  { name: "پاستا", image: "pasta.jpg" },
  { name: "زرشک‌پلو", image: "zereshk.jpg" },
  { name: "لازانیا", image: "/assets/lasagna.jpg" },
  { name: "کباب کوبیده", image: "/assets/kabab.jpg" },
  { name: "سوپ جو", image: "/assets/soup.jpg" },
  { name: "شنیتسل", image: "/assets/schnitzel.jpg" },
  { name: "خوراک لوبیا", image: "/assets/lobia.jpg" },
];

function getRandomQuestion(): { options: DishOption[], correctDish: Dish } {
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

  return (
    <div className="guess-game">
      <h2>🍽 حدس غذای مخفی</h2>
      <div className="score-timer">
        <p>⏱ {timer} ثانیه</p>
        <p>⭐️ امتیاز: {score}</p>
      </div>
      {correctDish && (
        <img
          src={correctDish.image}
          alt="حدس بزن"
          onLoad={() => setImageLoaded(true)}
          className={`main-image ${
          imageLoaded ? (showImage ? "reveal" : "blurred") : "hidden"
          }`}
        />
      )}
      <p className="question">این چه غذاییه؟</p>
      <div className="options">
        {options.map((dish, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(dish.correct)}
            disabled={answered}
            className={answered && dish.correct ? "correct" : ""}
          >
            {dish.name}
          </button>
        ))}
      </div>
      {answered && (
        <div className="result">
          <p>{isCorrect ? "آفرین! درست گفتی! 🎉" : "اشتباه بود 😢"}</p>
          <button onClick={loadNewQuestion}>سؤال بعدی</button>
        </div>
      )}
    </div>
  );
};

export default GuessTheDishGame;
