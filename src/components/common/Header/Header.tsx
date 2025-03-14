import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
        <Link to="/"><Logo /></Link>
      </div>
      <nav className={`header__nav ${isOpen ? "active" : ""}`}>
        <Navigation onClose={() => setIsOpen(false)} />
      </nav>
      <div className="header__buttons">
        <button className="header__button">Tilaa demo</button>
      </div>

      {/* Burger button */}
      <button className="header__menu-button" onClick={() => setIsOpen(!isOpen)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </header>
  );
}
