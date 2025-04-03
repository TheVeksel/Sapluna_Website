import "./CustomerService.scss";
import Title from "../../../../common/title/Title";
import SolutionsCard from "../SolutionsByRole/SolutionsCard";
import SubTitle from "../../../../common/subtitle/SubTitle";

export default function CustomerService() {
  return (
    <section className="customerService">
      <div className="wrapper">
        <div className="heading">
          <Title>Tähän otsikko eri palveluista asiakkaille</Title>
          <SubTitle>Lorem ipsum dolor sit amet consectetur.</SubTitle>
        </div>
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
