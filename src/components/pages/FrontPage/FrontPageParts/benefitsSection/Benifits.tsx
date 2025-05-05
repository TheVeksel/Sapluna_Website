import "./Benifits.scss";
import H1Title from "../../../../common/title/Title";
import BoockButton from "../../../../common/buttons/boockButton";

export default function Benefits() {
  return (
    <section className="benifits">
      <div className="wrapper">
        <div className="heading">
          <H1Title>MITEN MALLITUOTANTO TOIMII?</H1Title>
        </div>
        <div className="benifits__content-wrapper">
          <div className="benifits__content">
            <h2 className="benifits__content-title">
              Hallinnoi tietoa ja toimintaa.
            </h2>
            <p className="benifits__content-text">
              Saplunassa projekti koostuu hallinnoitavista kokonaisuuksista –
              kuten ohjelmahauista, vapaaehtoisten rekrytoinneista,
              myyntipaikkojen varauksista, kutsuvieraiden tiedoista ja projektin
              aikataulutuksesta. Asioita on paljon.
            </p>
            <p className="benifits__content-text">
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
          <div className="benifits__content">
            <h2 className="benifits__content-title">
              Mitä hyötyä on mallituotannosta Saplunan avulla?
            </h2>
            <ul>
              <li className="benifits__content-text">
                Projektin toteutus on tehokkaampaa ja säästät aikaa
              </li>
              <li className="benifits__content-text">
                Työ ei ole henkilöriippuvaista
              </li>
              <li className="benifits__content-text">
                Uusien ihmisten perehdyttäminen helpottuu ja tiimityö vahvistuu
              </li>
              <li className="benifits__content-text">
                Stressi vähenee, kun tiedät etukäteen oikean toimintatavan
              </li>
              <li className="benifits__content-text">
                Asiakaspalvelu sujuvoituu ja asiakkaan luottamus kasvaa
              </li>
              <li className="benifits__content-text">
                Voit parantaa malleja kokemusten karttuessa ja pyytää näkökulmia
              </li>
              <li className="benifits__content-text">
                Päätät itse, kuka käsittelee projektisi tietoja ja miten
              </li>
              <li className="benifits__content-text">
                Näet reaaliaikaisesti projektin tilanteen ja seuraavat tehtävät
              </li>
              <li className="benifits__content-text">
                Voit osoittaa jälkeenpäin, miten projekti on toteutettu
              </li>
              <li className="benifits__content-text">
                Projektitiedolla on taloudellista ja toiminnallista arvoa, kun
                se on hyödynnettävissä
              </li>
              <p className="benifits__content-text-p">
                Ihmiset ja ohjelmistot erillään?
              </p>
              <p className="benifits__content-text-p">
                Sapluna tuo tiimin ja tiedon sujuvasti yhteen.
              </p>
            </ul>
          </div>
        </div>
        <BoockButton color="#fc8437">Varaa esittely</BoockButton>
      </div>
    </section>
  );
}
