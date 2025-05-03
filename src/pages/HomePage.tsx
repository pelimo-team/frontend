import { useState, useRef, useEffect } from "react";
import styles from "../HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

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

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
}

function HomePage() {
  const navigate = useNavigate();

  // اسلایدر Hero
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

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const bestOnesData: Restaurant[] = [
    {
      id: 1,
      name: "Restaurant A",
      location: "City A",
      rating: 3,
      image: "Rectangle 754.png",
    },
    {
      id: 2,
      name: "Restaurant B",
      location: "City B",
      rating: 4,
      image: "Rectangle 754.png",
    },
    {
      id: 3,
      name: "Restaurant C",
      location: "City C",
      rating: 5,
      image: "Rectangle 754.png",
    },
    {
      id: 4,
      name: "Restaurant D",
      location: "City D",
      rating: 2,
      image: "Rectangle 754.png",
    },
  ];
  const [searchText, setSearchText] = useState<string>("");

  const [startIndex, setStartIndex] = useState<number>(0);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const next = () => {
    if (startIndex < bestOnesData.length - 2) {
      setStartIndex(startIndex + 1);
    }
  };
  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleItems = bestOnesData.slice(startIndex, startIndex + 2);
  return (
    <div className={styles["home-container"]}>
      {/* هدر */}
      <header className={styles["home-header"]}>
        {/* ستون 1: Login | Sign up */}
        <div className={styles["header-left"]}>
          <a href="/login" className={styles["login-link"]}>
            Login
          </a>
          <span> | </span>
          <a href="/signup" className={styles["signup-link"]}>
            Sign up
          </a>
        </div>

        {/* ستون 2: فیلد Address */}
        <div className={styles["address-search"]}>
          <img
            src="search1.png"
            alt="search"
            className={styles["magnify-icon1"]}
          />
          <input type="text" placeholder="Address ..." />
          <img
            src="mdi_location.png"
            alt="location"
            className={styles["loc-icon"]}
          />
        </div>

        {/* ستون 3: لوگو */}
        <div className={styles["header-logo"]}>
          <img src="Logo.png" alt="PELIMO" />
        </div>

        {/* ستون 4: فیلد Search */}
        <div className={styles["search-box"]} ref={searchBoxRef}>
          <img
            src="search1.png"
            alt="search"
            className={styles["magnify-icon2"]}
          />
          <input
            type="text"
            placeholder="Search ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setShowSearch(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                navigate(
                  `/advanced-search?query=${encodeURIComponent(searchText)}`
                );
              }
            }}
          />

          <img src="Icon1.png" alt="filter" className={styles["filter-icon"]} />

          {showSearch && (
            <div className={styles["search-popup"]} ref={popupRef}>
              <Search />
            </div>
          )}
        </div>

        {/* ستون 5: منوی همبرگر */}
        <div className={styles["menu-icon"]}>
          <img src="Offcanvas Menu.png" alt="Menu" />
        </div>
      </header>

      {/* سکشن هیرو */}
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

      {/* سکشن دسته‌بندی‌ها (Categories) */}
      <section className={styles["categories-section"]}>
        <div className={styles["category-item"]}>
          <img src="restaurant.png" alt="Restaurant" />
          <p>RESTAURANT</p>
        </div>
        <div className={styles["category-item"]}>
          <img src="fast food.png" alt="Fast Food" />
          <p>FAST FOOD</p>
        </div>
        <div className={styles["category-item"]}>
          <img src="coffee shop.png" alt="Coffee Shop" />
          <p>COFFEE SHOP</p>
        </div>
        <div className={styles["category-item"]}>
          <img src="juice and ice cream.png" alt="Juice and Ice Cream" />
          <p>JUICE AND ICE CREAM</p>
        </div>
        <div className={styles["category-item"]}>
          <img src="confectionary.png" alt="Confectionary" />
          <p>CONFECTIONARY</p>
        </div>
        <div className={styles["category-item"]}>
          <img src="fruits.png" alt="Fruits" />
          <p>FRUITS</p>
        </div>
      </section>

      {/* سکشن The Best Ones */}
      <section className={styles["best-ones-section"]}>
        <h2 className={styles["best-ones-title"]}>The Best Ones</h2>
        <div className={styles["slider-wrapper"]}>
          <button className={styles["arrow-left"]} onClick={prev}>
            &lt;
          </button>
          <div className={styles["best-ones-container"]}>
            {visibleItems.map((item) => (
              <div key={item.id} className={styles["best-ones-item"]}>
                <div className={styles["image-box"]}>
                  <img src={item.image} alt="restaurant" />
                </div>
                <div className={styles.info}>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>{item.location}</p>
                  <p>{"★".repeat(item.rating) + "☆".repeat(5 - item.rating)}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={styles["arrow-right"]} onClick={next}>
            &gt;
          </button>
        </div>
      </section>

      {/* سکشن The Games */}
      <section className={styles["games-section"]}>
        <h2 className={styles["games-title"]}>The Games</h2>
        <div className={styles["games-container"]}>
          <div className={styles["games-item"]}>
            <div className={styles["image-box"]}>
              <img src="Rectangle 754.png" alt="restaurant image" />
            </div>
            <div className={styles.info}>
              <p>name</p>
              <p>location</p>
              <p>★★★★★</p>
            </div>
          </div>
          <div className={styles["games-item"]}>
            <div className={styles["image-box"]}>
              <img src="Rectangle 754.png" alt="restaurant image" />
            </div>
            <div className={styles.info}>
              <p>name</p>
              <p>location</p>
              <p>★★★★★</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer جدید (فقط یک تصویر) */}
      <footer className={styles["pelimo-footer"]}>
        <img src="Footer.png" alt="Footer" />
      </footer>
    </div>
  );
}

export default HomePage;
