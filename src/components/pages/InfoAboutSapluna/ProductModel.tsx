import "./ProductModel.scss";
import { useGetAllPostsQuery, useGetPostBySlugQuery } from "../../../api/wpApi";
import HistorySection from "../../common/HistorySection/HistorySection";
import Title from "../../common/title/Title";
import Button from "../../common/buttons/button";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useState, useEffect } from "react";

export default function ProductModel() {
  const { slug } = useParams<{ slug: string }>();
    const {
      data: allPosts,
      isLoading: isAllLoading,
      isFetching: isAllFetching,
    } = useGetAllPostsQuery();
    const {
      data: singlePostData,
      isLoading: isSingleLoading,
      isFetching: isSingleFetching,
    } = useGetPostBySlugQuery(slug || "", {
      skip: !!allPosts?.find((post) => post.slug === slug),
    });
    const [showLoader, setShowLoader] = useState(true);
  
    useEffect(() => {
      let timer: NodeJS.Timeout;
  
      setShowLoader(true);
  
      const isLoading =
        isAllLoading || isAllFetching || isSingleLoading || isSingleFetching;
      if (isLoading) {
        // Waiting
      } else {
        timer = setTimeout(() => setShowLoader(false), 400);
      }
  
      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [slug, isAllLoading, isAllFetching, isSingleLoading, isSingleFetching]);
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
    if (!post) return <p>Post not found</p>;
  
    const acfData = post.acf?.[slug];
    const {
      title_1,
      title_2,
      text_1,
      ["text_1-2"]: text_1_2,
      text_2,
      ["text_2-2"]: text_2_2,
    } = acfData?.main_titles || {};
  
    return (
      <section className="solutions">
        <div className="wrapper">
          <Title>Kuinka tämä ratkaisu auttaa tätä asiakastyyppiä</Title>
          <div className="solutions__container">
            <div className="solutions__item">
              <h3>{title_1}</h3>
              <p>{text_1}</p>
              <p>{text_1_2}</p>
            </div>
            <div className="solutions__item">
              <h3>{title_2}</h3>
              <p>{text_2}</p>
              <p>{text_2_2}</p>
            </div>
          </div>
          <div className="solutions__button-container">
            <Button color="#fc8437">Varaa esittely</Button>
          </div>
          <HistorySection slug={slug} />
        </div>
        {/* <Form /> */}
      </section>
    );
  }
