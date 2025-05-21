import styles from "../../styles/HomePage.module.css";

const GamesSection = () => {
  return (
    <section id = "game-section" className={styles["games-section"]}>
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
  );
};

export default GamesSection; 