import "./SolutionsByRole.scss"
interface CardProps {
  number: string;
  title?: string;
  text: string;
}

export default function SolutionsCard({ number, title, text }: CardProps) {
  return (
    <div className="card">
      <span className="card__number">{number}</span>
      <div className="card__info">
      <img className="card__info-icon" src="/img/icons/ticket.png" alt="img" />
        <h5 className="card__info-title">{title}</h5>
        <p className="card__info-text">{text}</p>
      </div>
    </div>
  );
}
