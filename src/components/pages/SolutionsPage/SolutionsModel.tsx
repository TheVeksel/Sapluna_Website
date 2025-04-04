import "./SolutionsModel.scss";
import Title from "../../common/title/Title";
import Button from "../../common/button";
import { useGetPageContentQuery } from "../../../api/endpoints/solutions";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";
import Form from "../../common/form/Form";

export default function SolutionsTemplate() {
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
    console.log("acfData:", acfData);
    console.log("sapluna_history:", acfData?.sapluna_history);
  
    const { title_1, title_2, text_1, text_2 } = acfData?.main_titles || {};
    const { history_image, history_title, history_text } = acfData?.sapluna_history || {};
    console.log("history_image:", history_image);
    console.log("history_image.url:", history_image);
  return (
    <section className="solutions">
      <div className="wrapper">
        <Title>Kuinka tämä ratkaisu auttaa tätä asiakastyyppiä</Title>
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

        <div className="solutions__about-container">
          <div className="solutions__about-image">
            <img
              src={history_image}
              alt="img"
            />
          </div>
          <div className="solutions__about-content">
            <h2>{history_title}</h2>
            <p>
              {history_text}
            </p>
          </div>
        </div>
      </div>
        <Form/>
    </section>
  );
}
