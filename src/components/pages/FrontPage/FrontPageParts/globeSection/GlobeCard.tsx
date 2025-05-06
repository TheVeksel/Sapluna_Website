import "./GlobeSection.scss";
interface GlobeCardProps {
  title: string;
  text: string;
}

interface GlobeCardProps {
  title: string;
  text: string;
  image?: string;
}

export default function GlobeCard({ title, text, image }: GlobeCardProps) {
  return (
    <li className="globecard">
      {image && <img src={image} alt={title} className="globecard__image" />}
      <h3 className="globecard__title">{title}</h3>
      <p className="globecard__text">{text}</p>
    </li>
  );
}