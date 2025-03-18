import "./SolutionsByRole.scss"
interface CardProps {
  number: string;
  title?: string;
  text: string;
}

export default function SolutionsCard({ number, title, text }: CardProps) {
  return (
    <div className="solutionscard">
      <span className="solutionscard__number">{number}</span>
      <div className="solutionscard__info">
      <img className="solutionscard__info-icon" src="/img/icons/ticket.png" alt="img" />
        <h5 className="solutionscard__info-title">{title}</h5>
        <p className="solutionscard__info-text">{text}</p>
      </div>
    </div>
  );
}
