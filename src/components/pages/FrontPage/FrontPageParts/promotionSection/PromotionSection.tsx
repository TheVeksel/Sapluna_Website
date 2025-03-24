import "./PromotionSection.scss"
import Socials from "../../../../common/socials/socials";
import Title from "../../../../common/title/Titlte";
import SubTitle from "../../../../common/subtitle/SubTitle";

export default function PromotionSection() {
  return (
    <section className="promotion">
      <div className="wrapper">
        <div className="heading">
          <Title>Otsikko Saplunasta</Title>
        </div>
        <p className="promotion__text">
          Teksti Saplunasta Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Ducimus, voluptates, ipsam nam ex, consequuntur quia laboriosam
        </p>
        <div className="promotion__video">
          <img src="img/photos/team.png" alt="img" /></div>
      </div>
      <div className="promotion__socials">
        <SubTitle>Tutustu sosiaalisen median kanaviimme</SubTitle>
        <Socials/>
      </div>
    </section>
  );
}
