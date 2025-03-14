import { Link } from "react-router-dom";

interface NavigationProps {
  onClose?: () => void;
}

export default function Navigation({ onClose }:NavigationProps) {
  return (
    <ul>
      <li><Link to="/" onClick={onClose}>Etusivu</Link></li>
      <li><Link to="/solutions" onClick={onClose}>Ratkaisut</Link></li>
      <li><Link to="/services" onClick={onClose}>Tuote</Link></li>
      <li><Link to="/shop" onClick={onClose}>Palvelut</Link></li>
      <li><Link to="/news" onClick={onClose}>Työpajat</Link></li>
      <li><Link to="/news" onClick={onClose}>Ajankohtaista</Link></li>
      <li><a href="https://opens.tawk.help/" onClick={onClose}>Tuki</a></li>
    </ul>
  );
}