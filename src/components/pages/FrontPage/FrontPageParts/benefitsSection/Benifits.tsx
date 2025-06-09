import { useState } from "react";
import "./Benefits.scss";
import H1Title from "../../../../common/title/Title";
import BoockButton from "../../../../common/buttons/boockButton";

export default function Benefits() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <section className="benefits">
      <div className="wrapper">
        <div className="heading">
          <H1Title>Miten mallituotanto toimii?</H1Title>
        </div>

        <div className="benefits__content-wrapper">
          <div className="benefits__content">
            <button
              className="content-header"
              onClick={() => setIsFirstOpen(prev => !prev)}

            >
              <h2 className="benefits__content-title">
                Hallinnoi tietoa ja toimintaa
              </h2>
              <span className="toggle-icon">
                {isFirstOpen ? "▲" : "▼"}
              </span>
            </button>

            <div className={`content-body ${isFirstOpen ? "expanded" : ""}`}>
              <div className="text-container">
                <p className={`benefits__content-text ${isFirstOpen ? "" : "closed"}`}>
                  Saplunassa projekti koostuu hallinnoitavista kokonaisuuksista –
                  kuten ohjelmahauista, vapaaehtoisten rekrytoinneista,
                  myyntipaikkojen varauksista, kutsuvieraiden tiedoista ja projektin
                  aikataulutuksesta. Asioita on paljon.
                </p>
                    <p className={`benefits__content-text ${isFirstOpen ? "" : "closed"}`}>
                      Saplunassa ei ainoastaan kerätä tietoa, vaan asiat myös etenevät.
                      Esimerkiksi voit toteuttaa ohjelmahakuja ja ilmoittautumisia,
                      tehdä valinnat, dokumentoida tuotantotiedot, laatia aikataulun ja
                      julkaista sen verkkosivullesi. Tämä on ohjelmaprosessi. Projekti
                      koostuu useista prosesseista, joiden etenemistä hallitaan
                      keskitetysti. Koko projekti voidaan tallentaa malliksi tulevia
                      toteutuksia varten – kaikki on valmiina seuraavassa projektissasi.
                      Näin kattavasti et ole aiemmin pystynyt projektejasi
                      hallinnoimaan. Mieti, mitä prosesseja sinun projekteihisi kuuluu?
                    </p>
              </div>
            </div>
          </div>

          <div className="benefits__content">
            <button
              className="content-header"
              onClick={() => setIsSecondOpen(prev => !prev)}

              aria-expanded={isSecondOpen}
            >
              <h2 className="benefits__content-title">
                Mitä hyötyä on mallituotannosta Saplunan avulla?
              </h2>
              <span className="toggle-icon">
                {isSecondOpen ? "▲" : "▼"}
              </span>
            </button>

            <div className={`content-body ${isSecondOpen ? "expanded" : ""}`}>
              <div className="text-container">
                <ul className="benefits-list">
                  {[
                    "Projektin toteutus on tehokkaampaa ja säästät aikaa",
                    "Työ ei ole henkilöriippuvaista",
                    "Uusien ihmisten perehdyttäminen helpottuu ja tiimityö vahvistuu",
                    "Stressi vähenee, kun tiedät etukäteen oikean toimintatavan",
                    "Asiakaspalvelu sujuvoituu ja asiakkaan luottamus kasvaa",
                    "Voit parantaa malleja kokemusten karttuessa ja pyytää näkökulmia",
                    "Päätät itse, kuka käsittelee projektisi tietoja ja miten",
                    "Näet reaaliaikaisesti projektin tilanteen ja seuraavat tehtävät",
                    "Voit osoittaa jälkeenpäin, miten projekti on toteutettu",
                    "Projektitiedolla on taloudellista ja toiminnallista arvoa, kun se on hyödynnettävissä"
                  ] 
                    .map((item, index) => (
                      <li key={index} className="benefits__content-text">
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <BoockButton color="#fc8437">Varaa esittely</BoockButton>
      </div>
    </section>
  );
}
