import { useNavigate } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";

interface Slide {
  text?: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
  position: number;
  bg: string;
}

const slides: Slide[] = [
  {
    position: 1,
    bg: "linear-gradient(135deg, #D4B7A3, #945436)",
    text: 'Use "DIY" Create your Own Food',
    description:
      'With "DIY" you can design your food with existed elements and find the most relative food and restaurant to your designed.',
    image: "/Transparent PNGs_ Delicious Pizza Variety.png",
    buttonText: "Go to DIY",
    link: "/model",
  },
  {
    position: 2,
    bg: "linear-gradient(135deg, #D4B7A3, #945436)",
    text: "Play Games, Earn Discounts, Charge your Wallet",
    description: "Earn money with playing!",
    image: "/game console.png",
    buttonText: "Go to Games",
    link: "/games",
  },
  {
    position: 3,
    bg: "linear-gradient(135deg, #D4B7A3, #945436)",
    text: "Stayed up late and feeling hungry?",
    description:
      "Don't worry — these restaurants stayed open late just for you!🍔✨ Get ready for a delicious midnight bite!",
    image: "/shabgard-cat.png",
    buttonText: "Go to Night Walker",
    link: "/night-walker",
  },
  {
    position: 4,
    bg: "linear-gradient(135deg, #D4B7A3, #945436)",
    text: "Not in the mood to choose?",
    description:
      "Let's play a game! Leave it to luck and pick today's meal at random!🍱💡 A new flavor every time, a new excitement every time!",
    image: "/accidental-Homepage2.png",
    buttonText: "Go to Accidental",
    link: "/advance-tasadofi",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles["hero-section"]}>
      <div
        className={styles["slider"]}
        style={{
          // CSS Variables need to be cast to CSSProperties using '--' syntax as string keys
          ["--width" as any]: "26rem",
          ["--height" as any]: "30rem",
          ["--quantity" as any]: "4",
        }}
      >
        <div className={styles["list"]}>
          {slides.map((slide) => (
            <div
              key={slide.position}
              className={styles["item"]}
              style={{ ["--position" as any]: `${slide.position}` }}
            >
              <div className={styles["card"]} style={{ background: slide.bg }}>
                <img src={slide.image} alt="card" />
                <p className={styles["card-text"]}>{slide.text}</p>
                <p className={styles["card-description"]}>
                  {slide.description}
                </p>
                <button
                  className={styles["hero-button"]}
                  onClick={() => {
                    if (slide.link === "/games") {
                      setTimeout(() => {
                        const section =
                          document.getElementById("games-section");
                        section?.scrollIntoView({ behavior: "smooth" });
                      }, 100); // Adjust delay if needed
                    } else {
                      navigate(slide.link);
                    }
                  }}
                >
                  <p className={styles["card-button-text"]}>
                    {slide.buttonText}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
