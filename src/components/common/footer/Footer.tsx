import { useGetContactsQuery } from "../../../api/endpoints/contacts";
import "./footer.scss";
import Button from "../button";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import Socials from "../socials/socials";
import Loader from "../Loader";

export default function Footer() {
  const { data, isLoading } = useGetContactsQuery();
  const contactInfo = data?.[0]?.acf?.contact_info;

  if (isLoading) return <Loader/>;
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-info">
          <div className="footer__content-logo">
            <Logo logocolor="orange" />
          </div>
          <p>Sapluna systems Oy</p>
          <p>Y-Tunnus 3495688-7</p>
          <div className="footer__adress">
            {contactInfo?.address}
          </div>
          <a href={`tel:${contactInfo?.phone_number}`}>
            {contactInfo?.phone_number}
          </a>
          <a href={`mailto:${contactInfo?.email}`}>
            {contactInfo?.email}
          </a>
          <Socials />
        </div>
        <div className="footer__nav">
          <Navigation />
        </div>
        <div className="more__info">
          <Button color="#fc8437">Varaa esittely ➜</Button>
          {/* <Button color="#fc8437">Lataa demo ➜</Button> */}
        </div>
      </div>
      {/* <div className="companies">
        <img src="/img/photos/image5.png" alt="img" />
        <img src="/img/photos/image6.png" alt="img" />
        <img src="/img/photos/image7.png" alt="img" />
      </div> */}
      <div className="footer__underline">
        <p>tietosuojaseloste</p>
        <p className="footer__underline-year">(c) Sapluna 2024</p>
      </div>
    </footer>
  );
}
