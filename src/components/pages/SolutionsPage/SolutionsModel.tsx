import "./SolutionsModel.scss";
import Title from "../../common/title/Title";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";
import HistorySection from "../../common/HistorySection/HistorySection";
import BoockButton from "../../common/buttons/boockButton";
import { useGetPosts } from "../../../hooks/useGetPosts";

// Define interface for main_titles structure
interface MainTitles {
  title_1?: string;
  "title_1-2"?: string;
  title_2?: string;
  "title_2-2"?: string;
  text_1?: string;
  "text_1-2"?: string;
  text_2?: string;
  "text_2-2"?: string;
}

export default function SolutionsModel() {
  const { slug } = useParams<{ slug: string }>();
  const [showLoader, setShowLoader] = useState(true);
  
  const { data, isLoading, isFetching } = useGetPosts(slug || "");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setShowLoader(true);
    const loading = isLoading || isFetching;
    if (!loading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, isFetching, slug]);

  //exceptions
  if (!slug) return <p>No slug provided</p>;
  if (showLoader) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }
  if (!data) return <p>Post not found</p>;
  
  // Destructuring with fallback for uncommon ACF key names
  const titleOfPage = data.acf?.title_of_page || "No title";
  const acfData = data.acf?.[slug];
  const mainTitles = (acfData as { main_titles?: MainTitles })?.main_titles || {};
  
  const {
    title_1,
    ["title_1-2"]: title_1_2,
    title_2,
    ["title_2-2"]: title_2_2,
    text_1,
    ["text_1-2"]: text_1_2,
    text_2,
    ["text_2-2"]: text_2_2,
  } = mainTitles;

  return (
    <section className="solutions">
      <div className="wrapper">
        {/* Fix children type by ensuring single string child */}
        <Title>{titleOfPage as string}</Title>

        <div className="solutions__rows">
          <div className="solutions__items">
            <h3>{title_1}</h3>
            <p>{text_1}</p>
          </div>
          <div className="solutions__items">
            <h3>{title_2}</h3>
            <p>{text_2}</p>
          </div>
        </div>

        <div className="solutions__rows">
          <div className="solutions__items">
            {title_1_2 && <h3>{title_1_2}</h3>}
            {text_1_2 && <p>{text_1_2}</p>}
          </div>
          <div className="solutions__items">
            {title_2_2 && <h3>{title_2_2}</h3>}
            {text_2_2 && <p>{text_2_2}</p>}
          </div>
        </div>

        <div className="solutions__button-container">
          <BoockButton color="#fc8437">Varaa esittely</BoockButton>
        </div>

        <HistorySection slug={slug} />
      </div>
    </section>
  );
}