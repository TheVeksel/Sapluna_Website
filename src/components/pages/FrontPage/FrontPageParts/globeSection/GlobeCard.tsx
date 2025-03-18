import "./GlobeSection.scss";
interface GlobeCardProps {
  title: string;
  text: string;
}

export default function GlobeCard({ title, text }: GlobeCardProps) {
  return (
    <li className="globecard">
      <div className="globecard__img">
        <img src="img/photos/Globe.png" alt="img" />
      </div>
      <h3 className="globecard__title">
        {title}
      </h3>
      <p className="globecard__text">
        {text}
      </p>
    </li>
  )
}