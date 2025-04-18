import "./PricingInfo.scss";

const promises = [
  "Emme koskaan nosta aktiivisena olevien uusiutuvien tilausten hintoja.",
  "Vaikka päättäisit tilauksen, voit aina palata takaisin ja jatkaa tietojesi hyödyntämistä.",
  "Jos mielesi muuttuu, voit perua ohjelmistotilauksesi 14 vrk:n aikana tilauksesta ilman perusteluja.",
  "Uusiutuvissa tilauksissa saat muistutuksen uusinnasta hyvissä ajoin.",
  "Voit keskeyttää tilauksen uusinnan sen ollessa aktiivisena.",
  "Palvelujen pidempi toimitusaika oikeuttaa ilmoitettuun alennettuun hintaan.",
];

const highlights = [
  {
    title: "Hinnat pysyvät ennallaan",
    text: "Emme koskaan korota aktiivisten ja jatkuvien tilausten hintoja.",
  },
  {
    title: "Tietosi säilyvät",
    text: "Jos päätät lopettaa tilauksesi, voit aina palata myöhemmin ja jatkaa siitä, mihin jäit.",
  },
  {
    title: "Riskitön kokeilu",
    text: "Voit perua ohjelmistotilauksesi 14 päivän kuluessa ilman selittelyjä.",
  },
  {
    title: "Selkeät muistutukset",
    text: "Saat hyvissä ajoin ilmoituksen tilauksesi uusimisesta.",
  },
  {
    title: "Joustava hallinta",
    text: "Voit keskeyttää tilauksen uusinnan milloin tahansa tilauksen ollessa aktiivinen.",
  },
  {
    title: "Edullisempi hinta",
    text: "Palvelujen pidempi toimitusaika oikeuttaa alennettuun hintaan.",
  },
];

export default function PricingInfo() {
  return (
    <section className="pricing-info" style={{ paddingTop: "0" }}>
      <div className="pricing-info__top-section">
        <div className="pricing-info__intro">
          <h2 className="pricing-info__title">Lupaamme, että:</h2>
        </div>
        <ul className="pricing-info__promise-list">
          {promises.map((text, i) => (
            <li key={i} className="pricing-info__promise-item">
              <span className="pricing-info__icon">✔</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pricing-info__highlights">
        {highlights.map((h, i) => (
          <div key={i} className="pricing-info__highlight-card">
            <span className="pricing-info__icon-large">✔</span>
            <div className="pricing-info__highlight-content">
              <strong className="pricing-info__highlight-title">
                {h.title}
              </strong>
              <p className="pricing-info__highlight-text">{h.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
