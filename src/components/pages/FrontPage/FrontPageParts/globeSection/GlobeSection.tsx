import "./GlobeSection.scss";
import GlobeCard from "./GlobeCard";
import { useFeaturesCards } from "../../../../../hooks/useFeatureCards";
import LocalLoader from "../../../../common/LocalLoader";
import Button from "../../../../common/buttons/button";
import { Link } from "react-router-dom";

export default function GlobeSection() {
  const { cards, isLoading } = useFeaturesCards();

  if (isLoading) {
    return <LocalLoader/>
  }

  const firstSixCards = cards.slice(0, 6); 

  return (
    <section className="globe">
      <div className="wrapper">
        <h2 className="globe__title">
        Monipuoliset ominaisuudet
        </h2>
        <ul className="globe__list">
          {firstSixCards.map((card, index) => (
            <GlobeCard
              key={index}
              title={card.title}
              text={card.text}
              image={card.image}
            />
          ))}
        </ul>
        <Link to="/tuote/ominaisuudet"><div className="globe__buttonbox"><Button color="#fc8437">Katso ne kaikki</Button></div></Link>
      </div>
    </section>
  );
}