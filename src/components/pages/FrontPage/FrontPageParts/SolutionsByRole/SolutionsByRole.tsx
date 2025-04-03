import SubTitle from "../../../../common/subtitle/SubTitle";
import Title from "../../../../common/title/Title";
import "./SolutionsByRole.scss";
import SolutionsCard from "./SolutionsCard";
export default function SolutionsByRole() {
  return (
    <section className="solutions">
      <div className="wrapper">
        <div className="heading">
          <Title>Ratkaisut roolien mukaan:</Title>
          <SubTitle>Lorem ipsum dolor sit amet consectetur.</SubTitle>
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
