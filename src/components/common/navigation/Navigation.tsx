import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../buttons/button";

interface NavigationProps {
  onClose?: () => void;
}

export default function Navigation({ onClose }: NavigationProps) {
  // Tracks which dropdown is open; null means none
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Ref used to detect outside clicks
  const DropDownRef = useRef<HTMLUListElement>(null);

  // Closes dropdown when clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        DropDownRef.current &&
        !DropDownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggles dropdown menu; closes if already open
  const handleToggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleLinkClick = () => {
    setOpenDropdown(null);
    if (onClose) {
      onClose();
    }
  };

  return (
    <ul ref={DropDownRef}>
      <li>
        <Button
          color="transparent"
          onClick={() => handleToggleDropdown("ratkaisut")}
        >
          {"Ratkaisut " + (openDropdown === "ratkaisut" ? "▲" : "▼")}
        </Button>
        {openDropdown === "ratkaisut" && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/ratkaisut/tapahtumapaikka" onClick={handleLinkClick}>
                Tapahtumapaikalle
              </Link>
            </li>
            <li>
              <Link to="/ratkaisut/tuottaja" onClick={handleLinkClick}>
                Tapahtuman tuottajalle
              </Link>
            </li>
            <li>
              <Link to="/ratkaisut/omistaja" onClick={handleLinkClick}>
                Omistajalle
              </Link>
            </li>
            <li>
              <Link to="/ratkaisut/toimittaja" onClick={handleLinkClick}>
                Palvelun toimittajalle
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Button
          color="transparent"
          onClick={() => handleToggleDropdown("tuote")}
        >
          {"Tuote " + (openDropdown === "tuote" ? "▲" : "▼")}
        </Button>
        {openDropdown === "tuote" && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/tuote/tietoa" onClick={handleLinkClick}>
                Tietoa Saplunasta
              </Link>
            </li>
            <li>
              <Link to="/tuote/ominaisuudet" onClick={handleLinkClick}>
                Ominaisuudet
              </Link>
            </li>
            <li>
              <Link to="/tuote/tyoskentely" onClick={handleLinkClick}>
                Työskentely ABC
              </Link>
            </li>
            <li>
              <Link to="/tuote/tietoturva" onClick={handleLinkClick}>
                Tietoturva
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Button
          color="transparent"
          onClick={() => handleToggleDropdown("palvelut")}
        >
          {"Palvelut " + (openDropdown === "palvelut" ? "▲" : "▼")}
        </Button>
        {openDropdown === "palvelut" && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/palvelut/muotoilu" onClick={handleLinkClick}>
                Muotoilupalvelu
              </Link>
            </li>
            <li>
              <Link to="/palvelut/koulutukset" onClick={handleLinkClick}>
                Koulutukset
              </Link>
            </li>
            <li>
              <Link to="/palvelut/valmennukset" onClick={handleLinkClick}>
                Valmennukset
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link to="/ajankohtaista/blogi" onClick={handleLinkClick}>
          <Button color="transparent">Ajankohtaista</Button>
        </Link>
      </li>
      <li>
        <Link to="/hinnoittelu" onClick={onClose} className="nav-link">
          <Button color="transparent">Hinnoittelu</Button>
        </Link>
      </li>
      <li>
        <Link to="/meista" onClick={onClose} className="nav-link">
          <Button color="transparent">Meistä</Button>
        </Link>
      </li>
    </ul>
  );
}
