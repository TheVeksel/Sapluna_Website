import "./CustomerService.scss";
import Title from "../../../../common/title/Title";
import SolutionsCard from "../SolutionsByRole/SolutionsCard";
import SubTitle from "../../../../common/subtitle/SubTitle";

export default function CustomerService() {
  return (
    <section className="customerService">
      <div className="wrapper">
        <div className="heading">
          <Title>Ratkaisu tarpeesi mukaan</Title>
          <SubTitle>Saat meiltä myös palvelua mallien laatimiseen:</SubTitle>
        </div>
        <div className="customerService__cardbox">
          <SolutionsCard
            number={"1."}
            text="Sapluna-lisenssi: Laadi itse projektimalleja – rajattomasti. "
            subpage="hinnoittelu"
            slug=""
          ></SolutionsCard>
          <SolutionsCard
            number={"2."}
            text="Projektin muotoilupalvelu: Mallinnamme projektisi toteutuksen valmiiksi pohjaksi Saplunaan."
            subpage="palvelut"
            slug="koulutukset"
          ></SolutionsCard>
          <SolutionsCard
            number={"3."}
            text="Mallituotantovalmennus: Autamme tiimiäsi rakentamaan yhteisen, tehokkaan toimintatavan."
            subpage="palvelut"
            slug="tyopajat"
          ></SolutionsCard>
        </div>
      </div>
    </section>
  );
}
