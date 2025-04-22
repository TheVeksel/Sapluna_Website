import { useGetPostBySlugQuery } from "../../../../api/wpApi";
import LocalLoader from "../../../common/LocalLoader";
import "./PricingInfo.scss";

interface PricingData {
  first_block: {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    text6: string;
  };
  second_block: {
    text1: { title: string; text: string };
    text2: { title: string; text: string };
    text3: { title: string; text: string };
    text4: { title: string; text: string };
    text5: { title: string; text: string };
    text6: { title: string; text: string };
  };
}


export default function PricingInfo() {
  const { data, isLoading } = useGetPostBySlugQuery("pricing-page");
  const acf = data?.[0]?.acf as PricingData;

  if (isLoading) return <LocalLoader/>
  if(!acf) return null;

  const firstBlockTexts = Object.values(acf.first_block || {});
  const secondBlockItems = Object.values(acf.second_block || {}) as {
    title?: string;
    text?:string;
  }[];
  console.log(firstBlockTexts);
  console.log('DATA:', data);


  return (
    <section className="pricing-info" style={{ paddingTop: "0" }}>
      <div className="pricing-info__top-section">
        <div className="pricing-info__intro">
          <h2 className="pricing-info__title">Lupaamme, että:</h2>
        </div>
        <ul className="pricing-info__promise-list">
          {firstBlockTexts.map((text, i) => (
            <li key={i} className="pricing-info__promise-item">
              <span className="pricing-info__icon">✔</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pricing-info__highlights">
        {secondBlockItems.map((item, i) => (
          <div key={i} className="pricing-info__highlight-card">
            <span className="pricing-info__icon-large">✔</span>
            <div className="pricing-info__highlight-content">
              <strong className="pricing-info__highlight-title">
                {item.title}
              </strong>
              <p className="pricing-info__highlight-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
