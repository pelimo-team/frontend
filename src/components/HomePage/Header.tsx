import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";
import Search from "../../pages/Search";

const Header = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
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

  return (
    <header className={styles["home-header"]}>
      <div className={styles["header-left"]}>
        <a href="/login" className={styles["login-link"]}>
          Login
        </a>
        <span> | </span>
        <a href="/signup" className={styles["signup-link"]}>
          Sign up
        </a>
      </div>

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

      <div className={styles["header-logo"]}>
        <img src="Logo.png" alt="PELIMO" />
      </div>

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
              navigate(`/advanced-search?query=${encodeURIComponent(searchText)}`);
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

      <div className={styles["menu-icon"]}>
        <img src="Offcanvas Menu.png" alt="Menu" />
      </div>
    </header>
  );
};

export default Header; 