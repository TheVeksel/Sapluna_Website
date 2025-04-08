import { useGetHistoryQuery } from "../../../api/endpoints/history";
import "./HistorySection.scss";

export default function HistorySection() {
  const { data } = useGetHistoryQuery();
  const historyInfo = data?.[0]?.acf?.sapluna_history;

  const { history_image, history_title, history_text } = historyInfo || {};


  return (
    <>
      <div className="solutions__about-container">
        <div className="solutions__about-image">
          <img src={history_image} alt="img" />
        </div>
        <div className="solutions__about-content">
          <h2>{history_title}</h2>
          <p>{history_text}</p>
        </div>
      </div>
    </>
  );
}
