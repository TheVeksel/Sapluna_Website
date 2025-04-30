import "./DemoCTA.scss";
import Button from "../../../../common/button";

export default function DemoCTA() {
  return (
    <section className="democta">
      <h3 className="democta__subtitle">
        Haluatko tutustua Saplunaan tarkemmin?
      </h3>
      <h1 className="democta__title">Varaa esittely:</h1>
      <Button color="#FFC59F">Varaa esittely</Button>
    </section>
  );
}
