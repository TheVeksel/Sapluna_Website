import "./PromotionSection.scss";
import Title from "../../../../common/title/Title";

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
          <img src="img/photos/team.png" alt="img" />
        </div>
      </div>
    </section>
  );
}
