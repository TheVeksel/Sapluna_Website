import H1Title from "../../../../common/h1title/h1Titlte";
import "./SolutionsByRole.scss";
import SolutionsCard from "./SolutionsCard";
export default function SolutionsByRole() {
  return (
    <section className="solutions">
      <div className="wrapper">
        <div className="solutions__heading">
          <H1Title>Ratkaisut roolien mukaan:</H1Title>
        </div>
        <div className="solutions__cardbox">
          <SolutionsCard
            number={"1."}
            title="Tapahtuman omistaja:"
            text="Kun tilaat tapahtumien tuotantoa"
          />
          <SolutionsCard
            number={"2."}
            title="Tapahtuman tuottaja:"
            text="Kun suunnittelet ja toteutat tapahtumia"
          />
          <SolutionsCard
            number={"3."}
            title="Tapahtumapaikka:"
            text="Kun paikassasi järjestetään tapahtumia"
          />
          <SolutionsCard
            number={"4."}
            title="Palvelujen tuottaja:"
            text="Kun toimitat palvelua tapahtuman järjestäjälle"
          />
        </div>
      </div>
    </section>
  );
}
