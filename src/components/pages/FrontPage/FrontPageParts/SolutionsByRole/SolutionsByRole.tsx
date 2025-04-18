import SubTitle from "../../../../common/subtitle/SubTitle";
import Title from "../../../../common/title/Title";
import "./SolutionsByRole.scss";
import SolutionsCard from "./SolutionsCard";
export default function SolutionsByRole() {
  return (
    <section className="solutionsrole">
      <div className="wrapper">
        <div className="heading">
          <Title>Ratkaisut roolien mukaan:</Title>
          <SubTitle>Lorem ipsum dolor sit amet consectetur.</SubTitle>
        </div>
        <div className="solutionsrole__cardbox">
          <SolutionsCard
            number={"1."}
            title="Tapahtuman omistaja:"
            text="Kun tilaat tapahtumien tuotantoa"
            subpage="ratkaisut"
            slug="tapahtumapaikka"
          />
          <SolutionsCard
            number={"2."}
            title="Tapahtuman tuottaja:"
            text="Kun suunnittelet ja toteutat tapahtumia"
            subpage="ratkaisut"
            slug="tuottaja"
          />
          <SolutionsCard
            number={"3."}
            title="Tapahtumapaikka:"
            text="Kun paikassasi järjestetään tapahtumia"
            subpage="ratkaisut"
            slug="omistaja"
          />
          <SolutionsCard
            number={"4."}
            title="Palvelujen tuottaja:"
            text="Kun toimitat palvelua tapahtuman järjestäjälle"
            subpage="ratkaisut"
            slug="toimittaja"
          />
        </div>
      </div>
    </section>
  );
}
