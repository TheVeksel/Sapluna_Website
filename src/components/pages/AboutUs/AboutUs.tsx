import "./AboutUs.scss";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";
import HistorySection from "../../common/HistorySection/HistorySection";
import { useGetPosts } from "../../../hooks/useGetPosts";

export default function AboutUs() {
  // Getting data via hook
  const slug = "meista";
  const [showLoader, setShowLoader] = useState(true);
  const { data, isLoading, isFetching } = useGetPosts(slug || "");
  //control loading animation
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

  
// Destructuring with fallback for uncommon ACF key names
  const titleOfPage = data?.acf?.title_of_page || "No title";
  const acfData = data?.acf?.[slug];
  const {
    title_1,
    ["title_1-2"]: title_1_2,
    title_2,
    ["title_2-2"]: title_2_2,
    text_1,
    ["text_1-2"]: text_1_2,
    text_2,
    ["text_2-2"]: text_2_2,
  } = acfData?.main_titles || {};

  return (
    <div className="about-us">
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">{titleOfPage}</h1>
          {text_1 && <p className="hero-subtitle">{text_1}</p>}
        </div>
      </section>

      <div className="wrapper">
        <section className="about-content">
          <div className="container">
            <div className="content-grid">
              <div className="content-block">
                {title_1 && <h2 className="block-title">{title_1}</h2>}
                {text_1 && <p className="block-text large">{text_1}</p>}

                {title_1_2 && <h3 className="block-subtitle">{title_1_2}</h3>}
                {text_1_2 && <p className="block-text">{text_1_2}</p>}
              </div>

              <div className="content-block">
                {title_2 && <h2 className="block-title">{title_2}</h2>}
                {text_2 && <p className="block-text large">{text_2}</p>}

                {title_2_2 && <h3 className="block-subtitle">{title_2_2}</h3>}
                {text_2_2 && <p className="block-text">{text_2_2}</p>}
              </div>
            </div>
          </div>
        </section>

        <HistorySection slug={slug} />
      </div>
    </div>
  );
}
