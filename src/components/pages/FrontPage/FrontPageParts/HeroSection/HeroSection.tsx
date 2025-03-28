import Button from "../../../../common/button";
import "./HeroSection.scss";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <img src="/img/photos/heroes-2.jpg" alt="img" className="hero-section__phoneimg" />
        <h2 className="hero-section__title">
          Mallinnamme vakioituja toimintasuunnitelmia
        </h2>
        <div className="hero-section__text-container">
          <p className="hero-section__text-block">
            Mallituotanto on menetelmä, jolla projekti toteutetaan ennalta
            määritellyn mallin mukaisesti
          </p>

          <div className="hero-section__divider"></div>

          <p className="hero-section__text-block">
            Sapluna on SaaS-ohjelmisto, jolla rakennetaan projektimalleja ja
            hallinnoidaan projektien toteutusta
          </p>
        </div>
        <div className="button__box">
          <Button>Varaa esittely</Button>
          {/* <Button>Tai tilaa demo</Button> */}
        </div>
    </section>
  );
}
