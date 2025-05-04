import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../HomePage.module.css";

interface Slide {
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    title1: 'Use "DIY" Create your Own Food',
    description:
      'With "DIY" you can design your food with existed elements and find the most relative food and restaurant to your designed.',
    image: "/Transparent PNGs_ Delicious Pizza Variety.png",
    buttonText: "Go to DIY",
    link: "/",
  },
  {
    title2: "Play Games, Earn Discounts, Charge your Wallet",
    description: "Earn money with playing!",
    image: "/game console.png",
    buttonText: "Go to Games",
    link: "/games",
  },
  {
    title3: "Stayed up late and feeling hungry?",
    description:
      "Don't worry — these restaurants stayed open late just for you!🍔✨ Get ready for a delicious midnight bite!",
    image: "/shabgard-cat.png",
    buttonText: "Go to Night Walker",
    link: "/night-walker",
  },
  {
    title4: "Not in the mood to choose?",
    description:
      "Let's play a game! Leave it to luck and pick today's meal at random!🍱💡 A new flavor every time, a new excitement every time!",
    image: "/accidental-Homepage2.png",
    buttonText: "Go to Accidental",
    link: "/advance-tasadofi",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className={styles["hero-section"]}>
      <button className={styles["arrow-left"]} onClick={prevSlide}>
        &lt;
      </button>

      <div className={styles["slides-viewport"]}>
        <div
          className={styles["slides-wrapper"]}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className={styles.slide} key={idx}>
              <div className={styles["hero-content"]}>
                {slide.title1 && (
                  <h1 className={styles.title1}>{slide.title1}</h1>
                )}
                {slide.title2 && (
                  <h1 className={styles.title2}>{slide.title2}</h1>
                )}
                {slide.title3 && (
                  <h1 className={styles.title3}>{slide.title3}</h1>
                )}
                {slide.title4 && (
                  <h1 className={styles.title4}>{slide.title4}</h1>
                )}
                <p className={styles.description}>{slide.description}</p>
                <button
                  className={styles["hero-button"]}
                  onClick={() => navigate(slide.link)}
                >
                  {slide.buttonText}
                </button>
              </div>
              <div className={styles["hero-image"]}>
                <img src={slide.image} alt={`Slide ${idx + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={styles["arrow-right"]} onClick={nextSlide}>
        &gt;
      </button>
    </section>
  );
};

export default HeroSection; 