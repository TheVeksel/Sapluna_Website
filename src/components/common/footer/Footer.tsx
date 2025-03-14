import Button from "../button";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-info">
          <div className="footer__content-logo">
            <Logo />
          </div>
          <p>Sapluna systems Oy</p>
          <p>Y-Tunnus 3495688-7</p>
          <div className="footer__adress">
            Kauppakatu 39, Crazy Town 40100 Jyväskylä
          </div>
          <a href="tel:0400645435">040 064 5435</a>
          <a href="mailto:sales@opens.fi">sales@opens.fi</a>
          <a href="https://www.facebook.com/feelbeatoy/">Facebook</a>
          <a href="https://www.instagram.com/feelbeat_official/">Instagram</a>
          <a href="https://www.linkedin.com/company/feelbeat/?originalSubdomain=fi">
            LinkedIn
          </a>
        </div>
        <div className="footer__nav">
          <Navigation />
        </div>
        <div className="more__info">
          <Button color="#fc8437">Varaa esittely ➜</Button>
          <Button color="#fc8437">Lataa demo ➜</Button>
        </div>
      </div>
      <div className="companies">
        <img src="/img/photos/image5.png" alt="img" />
        <img src="/img/photos/image6.png" alt="img" />
        <img src="/img/photos/image7.png" alt="img" />
      </div>
      <div className="footer__underline">
        <p>tietosuojaseloste</p>
        <p className="footer__underline-year">(c) Sapluna 2024</p>
      </div>
    </footer>
  );
}
