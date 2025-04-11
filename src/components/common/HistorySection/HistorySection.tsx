// src/components/common/HistorySection/HistorySection.tsx
import "./HistorySection.scss";
import { useGetAllPostsQuery } from "../../../api/wpApi";

export default function HistorySection() {
  const { data, isLoading } = useGetAllPostsQuery();
  if (isLoading) return null;

  const historyPost = data?.find((post) => post.slug === "sapluna-history");
  const historyInfo = historyPost?.acf?.sapluna_history;

  const { history_image, history_title, history_text } = historyInfo || {};

  return (
    <div className="solutions__about-container">
      <div className="solutions__about-image">
        <img src={history_image} alt="img" />
      </div>
      <div className="solutions__about-content">
        <h2>{history_title}</h2>
        <p>{history_text}</p>
      </div>
    </div>
  );
}