import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import BoockButton from "../buttons/boockButton";

export default function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header" ref={hamburgerRef}>
      <div className="header__logo">
        <Link to="/">
          <Logo logocolor="black" />
        </Link>
      </div>
      <nav className={`header__nav ${isBurgerOpen ? "active" : ""}`}>
        <Navigation onClose={() => setIsBurgerOpen(false)} />
        <div className="header__nav-buttons">
          <a style={{ color: "white" }} href="https://app.sapluna.com/">
              <div className="header__nav-buttons-login">
                <p>Log in</p>
                <img src="/img/icons/account-icon.png" alt="img" />
              </div>
            </a>
            <Link to="/cart">
          <button onClick={() => setIsBurgerOpen(false)}>
              <div className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  width="22"
                  height="22"
                  fill="currentColor"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </div>
          </button>
            </Link>
          {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
          
            
          <BoockButton>Varaa esittely</BoockButton>
        </div>
      </nav>
      <button
        className="header__menu-button"
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </header>
  );
}
