import "./ContentWithImage.scss";
export default function ContentWithImage() {
  return (
    <section className="contentWithImage">
      <div className="contentWithImage__text">
        <p>Otsikko ominaisuuksista jotka auttavat tapahtumien organisoinnissa
        </p>
      </div>
      <div className="contentWithImage__image">
        <img src="img/photos/työskentelytilaa.png" alt="img" />
      </div>
    </section>
  );
}
