import "./HistorySection.scss";
import { useGetAllPostsQuery } from "../../../api/wpApi";

interface HistorySectionProps {
  slug: string;
}

export default function HistorySection({ slug }: HistorySectionProps) {

  const { data, isLoading } = useGetAllPostsQuery();
  if (isLoading) return null;

  const historyPost = data?.find((post) => post.slug === slug);
  const historyInfo = historyPost?.acf?.sapluna_history;

  const { history_image, history_title, history_text } = historyInfo || {};
console.log(history_image)
  return (
    <div className="solutions__about-container">
      <div className="solutions__about-image">
        <img src={history_image} alt="image" />
      </div>
      <div className="solutions__about-content">
        <h2>{history_title}</h2>
        <p>{history_text}</p>
      </div>
    </div>
  );
}