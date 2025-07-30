import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";
import { useCart } from "../Cart/UseCart";

import { AuthContext } from "../../pages/AuthContext";

const Header = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // ✅ Correct usage of Context
  const [searchText, setSearchText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    logout(); // خروج کاربر
    clearCart(); // پاک کردن سبد خرید
    navigate("/login"); // هدایت به صفحه ورود
    localStorage.removeItem("canvasBlocks")
    localStorage.removeItem("canvasRecipes")
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles["home-header"]}>
      <div>
        <div className={styles["wave"]}></div>
        <div className={styles["wave"]}></div>
        <div className={styles["wave"]}></div>
      </div>
      <div className={styles["header-left"]}>
        {isLoggedIn ? (
          <>
            <div className={styles["profile-button"]} ref={dropdownRef}>
              <button
                className={styles["home-profile"]}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  className={styles["profile-icon"]}
                  src="./profile-white.png"
                  alt="profile"
                />
              </button>
              {showDropdown && (
                <div
                  className={styles["profile-dropdown-content"]}
                  style={{ display: showDropdown ? "block" : "none" }}
                >
                  <a
                    className={styles["first-line"]}
                    onClick={() => navigate("/userprofile")}
                  >
                    profile
                  </a>
                  <a className={styles["secend-line"]} onClick={handleLogout}>
                    logout
                  </a>
                  <a
                    className={styles["third-line"]}
                    onClick={() => {
                      
                      navigate("/wallet");
                    }}
                  >
                    wallet
                  </a>
                  <a
                    className={styles["fourth-line"]}
                    onClick={() => {
                      
                      navigate("/cart");
                    }}
                  >
                    shopping cart
                  </a>
                  <a
                    className={styles["fifth-line"]}
                    onClick={() => {
                      
                      navigate("/");
                    }}
                  >
                    order history
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <a href="/login" className={styles["login-link"]}>
              Login
            </a>
            <span> | </span>
            <a href="/signup" className={styles["signup-link"]}>
              Sign up
            </a>
            
          </>
        )}
      </div>

      <div className={styles["header-logo"]}>
        <img src="Logo_white.png" alt="PELIMO" />
      </div>
      <div className={styles["search-container"]}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className={styles["search-input"]}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigate(
                `/advanced-search?query=${encodeURIComponent(searchText)}`
              );
            }
          }}
        />
        <a href="#" className={styles["search-btn"]}>
          <img src="./search.png" alt="magnify" />
        </a>
      </div>
    </header>
  );
};

export default Header;
