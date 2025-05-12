import { useGetContactsQuery } from "../../../api/endpoints/contacts";
import "./footer.scss";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import Socials from "../socials/socials";
import LocalLoader from "../LocalLoader";
import BoockButton from "../buttons/boockButton";
import { Link } from "react-router-dom";

export default function Footer() {
  const { data, isLoading } = useGetContactsQuery();
  const contactInfo = data?.[0]?.acf?.contact_info;

  if (isLoading) return <LocalLoader />;
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-info">
          <div className="footer__content-logo">
            <Logo logocolor="orange" />
          </div>
          <p>Sapluna Systems Oy</p>
          <p>Y-Tunnus 3495688-7</p>
          <div className="footer__adress">{contactInfo?.address}</div>
          <a href={`tel:${contactInfo?.phone_number}`}>
            {contactInfo?.phone_number}
          </a>
          <a href={`mailto:${contactInfo?.emails.contact_email}`}>
            {contactInfo?.emails.contact_email}
          </a>
          <Socials />
        </div>
        <div className="footer__nav">
          <Navigation />
        </div>
        <div className="more__info">
          <BoockButton color="#fc8437">Varaa esittely ➜</BoockButton>
          {/* <Button color="#fc8437">Lataa demo ➜</Button> */}
        </div>
      </div>
      {/* <div className="companies">
        <img src="/img/photos/image5.png" alt="img" />
        <img src="/img/photos/image6.png" alt="img" />
        <img src="/img/photos/image7.png" alt="img" />
      </div> */}
      <div className="footer__underline">
        <Link to="/tietosuojaseloste"><p>Tietosuojaseloste</p></Link>
        <p className="footer__underline-year">(c) Sapluna 2024</p>
      </div>
    </footer>
  );
}
