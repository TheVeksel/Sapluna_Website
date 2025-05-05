import "./DemoCTA.scss";
import BoockButton from "../../../../common/buttons/boockButton";

export default function DemoCTA() {
  return (
    <section className="democta">
      <h3 className="democta__subtitle">
        Haluatko tutustua Saplunaan tarkemmin?
      </h3>
      <h1 className="democta__title">Varaa esittely:</h1>
      <BoockButton>Varaa esittely</BoockButton>
    </section>
  );
}
