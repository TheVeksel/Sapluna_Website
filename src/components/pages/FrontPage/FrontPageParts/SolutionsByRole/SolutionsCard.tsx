import { Link } from "react-router-dom";
import "./SolutionsByRole.scss";

interface CardProps {
  number: string;
  title?: string;
  text: string;
  subpage: string;
  slug: string;
}

export default function SolutionsCard({ number, title, text, subpage, slug }: CardProps) {
  return (
    <Link to={`/${subpage}/${slug}`} className="solutionscard">
      <span className="solutionscard__number">{number}</span>
      <div className="solutionscard__info">
        <img className="solutionscard__info-icon" src="/img/icons/ticket.png" alt="img" />
        <h5 className="solutionscard__info-title">{title}</h5>
        <p className="solutionscard__info-text">{text}</p>
      </div>
      <svg
        className="solutionscard__arrow"
        width="96"
        height="24"
        viewBox="0 0 96 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H90M90 12L86 8M90 12L86 16"
          stroke="#FFDAB9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}