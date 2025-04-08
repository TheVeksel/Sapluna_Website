import "./ProductModel.scss";
import { useGetPageContentQuery } from "../../../api/endpoints/solutions";
import HistorySection from "../../common/HistorySection/HistorySection";
import Title from "../../common/title/Title";
import Button from "../../common/button";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";

export default function ProductModel() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isFetching } = useGetPageContentQuery(slug || "");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading || isFetching) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFetching]);

  if (!slug) return <p>No slug provided</p>;
  if (showLoader)
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );

    const acfData = data?.[0]?.acf?.[slug];
  
    const { title_1, title_2, text_1, text_2 } = acfData?.main_titles || {};
  return (
    <section className="solutions">
      <div className="wrapper">
        <Title>Tietoa Saplunasta tai muu teksti</Title>
        <div className="solutions__container">
          <div className="solutions__item">
            <h3>{title_1}</h3>
            <p>{text_1}</p>
          </div>
          <div className="solutions__item">
            <h3>{title_2}</h3>
            <p>{text_2}</p>
          </div>
        </div>
        <div className="solutions__button-container">
          <Button color="#fc8437">Varaa esittely</Button>
        </div>

        <HistorySection/>
      </div>
    </section>
  );
}
