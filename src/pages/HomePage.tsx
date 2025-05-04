import styles from "../HomePage.module.css";
import Header from "../components/HomePage/Header";
import HeroSection from "../components/HomePage/HeroSection";
import CategoriesSection from "../components/HomePage/CategoriesSection";
import BestOnesSection from "../components/HomePage/BestOnesSection";
import GamesSection from "../components/HomePage/GamesSection";
import Footer from "../components/HomePage/Footer";

function HomePage() {
  return (
    <div className={styles["home-container"]}>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <BestOnesSection />
      <GamesSection />
      <Footer />
    </div>
  );
}

export default HomePage;
