import { useParams } from "react-router-dom";
import "./FeaturesPage.scss";
import Title from "../../../common/title/Title";
import {
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
} from "../../../../api/wpApi";
import Loader from "../../../common/Loader";
import { useState, useEffect } from "react";

interface FeatureCard {
  image: string;
  title: string;
  text: string;
}

export default function FeaturesPage() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: postFromAll,
    isLoading: isAllLoading,
    isFetching: isAllFetching,
  } = useGetAllPostsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      data: data?.find((post) => post.slug === slug),
      isLoading,
      isFetching,
    }),
  });

  const {
    data: singlePostArray,
    isLoading: isSingleLoading,
    isFetching: isSingleFetching,
  } = useGetPostBySlugQuery(slug || "", {
    skip: !!postFromAll,
  });

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setShowLoader(true);

    const isLoading = isAllLoading || isSingleLoading;

    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => clearTimeout(timer);
  }, [slug, isAllLoading, isAllFetching, isSingleLoading, isSingleFetching]);

  if (showLoader) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  const post = postFromAll || singlePostArray?.[0];

  if (!post) {
    return (
      <section className="features" style={{ minHeight: "100vh" }}>
        <div className="wrapper">
          <Title>Ominaisuudet</Title>
          <p>Postia ei löytynyt.</p>
        </div>
      </section>
    );
  }

  const cards: FeatureCard[] = post?.acf?.features
    ? Object.values(post.acf.features) as FeatureCard[]
    : [];

  return (
    <section className="features">
      <div className="wrapper">
        <Title>Ominaisuudet</Title>

        {cards.length > 0 ? (
          <ul className="features__cardlist">
            {cards.map((card, index) => (
              <li key={index} className="features__cardlist-item">
                <img
                  src={card.image}
                  alt={card.title}
                  className="features__cardlist-item-image"
                  loading="lazy"
                />
                <h3 className="features__cardlist-item-title">
                  {card.title}
                </h3>
                <p className="features__cardlist-item-text">
                  {card.text}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Ominaisuuksia ei löytynyt.</p>
        )}
      </div>
    </section>
  );
}
