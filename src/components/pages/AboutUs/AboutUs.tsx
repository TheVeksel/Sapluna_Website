import "./AboutUs.scss";
import { useGetAllPostsQuery, useGetPostBySlugQuery } from "../../../api/wpApi";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";
import HistorySection from "../../common/HistorySection/HistorySection";

export default function AboutUs() {
  const slug = "meista";
  const { data: allPosts, isLoading: isAllLoading } = useGetAllPostsQuery();
  const { data: singlePostData, isLoading: isSingleLoading } =
    useGetPostBySlugQuery(slug || "", {
      skip: !!allPosts?.find((post) => post.slug === slug),
    });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    setShowLoader(true);

    const isLoading = isAllLoading || isSingleLoading;
    if (isLoading) {
      // Waiting
    } else {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAllLoading, isSingleLoading]);
  
  if (!slug) return <p>No slug provided</p>;
  if (showLoader) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  const post =
    allPosts?.find((post) => post.slug === slug) || singlePostData?.[0];

  const titleOfPage = post?.acf?.title_of_page || "No title";
  const acfData = post?.acf?.[slug];
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
  );
}