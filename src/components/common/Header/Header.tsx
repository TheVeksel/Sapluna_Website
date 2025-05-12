import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import Button from "../buttons/button";
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
          <Button color="transparent">
            <a style={{ color: "white" }} href="https://app.sapluna.com/">
              <div className="header__nav-buttons-login">
                <p>Log in</p>
                <img src="/img/icons/account-icon.png" alt="img" />
              </div>
            </a>
          </Button>
          {/* <Button>Tilaa demo</Button> */}
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
