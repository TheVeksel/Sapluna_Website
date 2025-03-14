import "./Benifits.scss"
import Button from "../../../../common/button";
import H1Title from "../../../../common/h1title/h1Titlte";


export default function Benefits() {
  return (
    <section className="benifits">
      <div className="wrapper">
        <div className="benifits__heading">
          <H1Title>Mitä hyötyä on mallituotannosta?</H1Title>
        </div>
        <div className="benifits__content-wrapper">
          <div className="benifits__content">
            <h2 className="benifits__content-title">
              Yhteinen tekeminen edellyttää yhteistä ymmärrystä
            </h2>
            <p className="benifits__content-text">
              Roolit, päivittäis- ja tilapäistoiminta, prosessi, vastuut ipsum
              dolor sit amet, consectetur adipiscing elit. Fusce in pharetra
              sem. Ut hendrerit varius odio aliquet ullamcorper. Nullam lacinia
              leo risus, quis consectetur sapien accumsan id.
            </p>
            <p className="benifits__content-text">
              Cras ullamcorper, neque et interdum lobortis, risus ex tincidunt
              risus, vel ornare magna velit sit amet libero. Duis at massa non
              dolor aliquet placerat nec non ipsum. Vivamus et semper ante. Cras
              commodo congue ex, id dapibus magna ornare non.
            </p>
          </div>
          <div className="benifits__content">
            <h2 className="benifits__content-title">
              Vakioinnista saatavat hyödyt yms.
            </h2>
            <p className="benifits__content-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in
              pharetra sem. Ut hendrerit varius odio aliquet ullamcorper. Nullam
              lacinia leo risus, quis consectetur sapien accumsan id.
            </p>
            <p className="benifits__content-text">
              Cras ullamcorper, neque et interdum lobortis, risus ex tincidunt
              risus, vel ornare magna velit sit amet libero. Duis at massa non
              dolor aliquet placerat nec non ipsum. Vivamus et semper ante. Cras
              commodo congue ex, id dapibus magna ornare non.
            </p>
          </div>
        </div>
        <Button color="#fc8437">Varaa esittely</Button>
      </div>
    </section>
  );
}
