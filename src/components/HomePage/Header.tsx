import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/HomePage.module.css";
import { useCart } from "../Cart/UseCart";
import { api } from "../../utils/api";

import { AuthContext } from "../../pages/AuthContext";

const Header = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // ✅ Correct usage of Context
  const [searchText, setSearchText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isManager, setIsManager] = useState(false);
  const [isManagerPending, setIsManagerPending] = useState(false);
  const handleLogout = () => {
    logout(); // خروج کاربر
    clearCart(); // پاک کردن سبد خرید
    navigate("/login"); // هدایت به صفحه ورود
    localStorage.removeItem("canvasBlocks");
    localStorage.removeItem("canvasRecipes");
    localStorage.removeItem("activeTab");
    localStorage.removeItem("searchMode");
    localStorage.removeItem("searchText");
  };
  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/api/accounts/manager-status/")
        .then((data) => {
          setIsManager(data.is_manager);
          setIsManagerPending(data.manager_pending);
        })
        .catch((err) => {
          console.error("Failed to fetch manager status", err);
          setIsManager(false);
          setIsManagerPending(false)
        });
    }
  }, [isLoggedIn]);

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
                    onClick={() => {
                      if (isManager || isManagerPending) {
                        navigate("/admin");
                      } else {
                        navigate("/userprofile");
                      }
                      setShowDropdown(false); // optionally close dropdown after click
                    }}
                  >
                    profile
                  </a>
                  <a className={styles["secend-line"]} onClick={handleLogout}>
                    logout
                  </a>
                  
    {!isManager && !isManagerPending && (
      <>
        <a
          className={styles["third-line"]}
          onClick={() => {
            navigate("/wallet");
            setShowDropdown(false);
          }}
        >
          wallet
        </a>
        <a
          className={styles["fourth-line"]}
          onClick={() => {
            navigate("/cart");
            setShowDropdown(false);
          }}
        >
          shopping cart
        </a>
        <a
          className={styles["fifth-line"]}
          onClick={() => {
            navigate("/orders");
            setShowDropdown(false);
          }}
        >
          Order detail
        </a>
      </>
    )}
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
          placeholder="Search restaurant..."
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
