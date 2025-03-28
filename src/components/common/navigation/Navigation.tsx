import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../button";

interface NavigationProps {
  onClose?: () => void;
}

export default function Navigation({ onClose }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const DropDownRef = useRef<HTMLUListElement>(null);

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

  const handleToggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => {
      if (prev === menu) {
        return null;
      }
      return menu;
    });
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
              <Link to="/ratkaisut/mallituotanto" onClick={handleLinkClick}>
                Mallituotanto-menetelmä
              </Link>
            </li>
            <li>
              <Link to="/ratkaisut/tapahtumapaikalle" onClick={handleLinkClick}>
                Tapahtumapaikalle
              </Link>
            </li>
            <li>
              <Link
                to="/ratkaisut/tapahtumantuottajalle"
                onClick={handleLinkClick}
              >
                Tapahtuman tuottajalle
              </Link>
            </li>
            <li>
              <Link to="/ratkaisut/Omistajalle" onClick={handleLinkClick}>
                Omistajalle
              </Link>
            </li>
            <li>
              <Link
                to="/ratkaisut/palveluntoimittajalle"
                onClick={handleLinkClick}
              >
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
              <Link to="/tuote/työskentely" onClick={handleLinkClick}>
                Työskentely ABC
              </Link>
            </li>
            <li>
              <Link to="/tuote/tietoturva " onClick={handleLinkClick}>
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
              <Link to="/palvelut/muotoilupalvelu" onClick={handleLinkClick}>
                Muotoilupalvelu
              </Link>
            </li>
            <li>
              <Link to="/palvelut/koulutukset" onClick={handleLinkClick}>
                Koulutukset
              </Link>
            </li>
            <li>
              <Link to="/palvelut/työpajat" onClick={handleLinkClick}>
                Työpajat
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Button
          color="transparent"
          onClick={() => handleToggleDropdown("ajankohtaista")}
        >
          {"Ajankohtaista " + (openDropdown === "ajankohtaista" ? "▲" : "▼")}
        </Button>
        {openDropdown === "ajankohtaista" && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/ajankohtaista/blogi" onClick={handleLinkClick}>
                Blogi
              </Link>
            </li>
            <li>
              <Link to="/ajankohtaista/tiedotteet" onClick={handleLinkClick}>
                Tiedotteet
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
      <Button
          color="transparent"
          onClick={() => handleToggleDropdown("hinnoittelu")}
        >
          <Link to="/hinnoittelu" onClick={onClose}>
          Hinnoittelu
          </Link>
        </Button>
      </li>
      <li>
        <Button
          color="transparent"
          onClick={() => handleToggleDropdown("meistä")}
        >
          <Link to="/meistä" onClick={onClose}>
            Meistä
          </Link>
        </Button>
      </li>
    </ul>
  );
}
