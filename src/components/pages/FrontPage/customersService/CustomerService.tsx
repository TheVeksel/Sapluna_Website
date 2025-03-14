import "./CustomerService.scss"
import H1Title from "../../../common/h1title/h1Titlte";
import SolutionsCard from "../FrontPageParts/SolutionsByRole/SolutionsCard";

export default function CustomerService() {
  return (
    <section className="customerService">
      <div className="wrapper">
        <H1Title>Tähän otsikko eri palveluista asiakkaille</H1Title>
        <div className="customerService__cardbox">
          <SolutionsCard
            number={"1."}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></SolutionsCard>
          <SolutionsCard
            number={"2."}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></SolutionsCard>
          <SolutionsCard
            number={"3."}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          ></SolutionsCard>
        </div>
      </div>
    </section>
  );
}
