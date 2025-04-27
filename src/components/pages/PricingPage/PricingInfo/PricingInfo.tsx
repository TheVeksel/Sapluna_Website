import { useGetPostBySlugQuery } from "../../../../api/wpApi";
import Loader from "../../../common/Loader";
import "./PricingInfo.scss";

interface PricingData {
  block: {
    text1: { title: string; text: string };
    text2: { title: string; text: string };
    text3: { title: string; text: string };
    text4: { title: string; text: string };
    text5: { title: string; text: string };
    text6: { title: string; text: string };
  };
  text_under_block: {
    title: string;
    text: string;
  }
}


export default function PricingInfo() {
  const { data, isLoading } = useGetPostBySlugQuery("pricing-page");
  const acf = data?.[0]?.acf as PricingData;

  if (isLoading) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  if(!acf) return null;

  const blockItems = Object.values(acf.block || {}) as {
    title?: string;
    text?:string;
  }[];

  const { title, text} = acf?.text_under_block || {};


  return (
    <section className="pricing-info" style={{ paddingTop: "0" }}>
      <div className="pricing-info-wrap">
        <h2 className="pricing-info__title">Lupaamme:</h2>
        <div className="pricing-info__highlights">
          {blockItems.map((item, i) => (
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
      </div>
        <h2 className="pricing-info-textbox-title">{title}</h2>
      <div className="pricing-info-textbox">
        <p>{text}</p>
      </div>
    </section>
  );
}
