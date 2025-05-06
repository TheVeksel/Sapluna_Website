import "./FeaturesPage.scss";
import Title from "../../../common/title/Title";
import Loader from "../../../common/Loader";
import { useFeaturesCards } from "../../../../hooks/useFeatureCards";
import { useGetAllPostsQuery, useGetPostBySlugQuery } from "../../../../api/wpApi";

export default function FeaturesPage() {
  const { cards, isLoading } = useFeaturesCards();
  const slug = "ominaisuudet"

  const {
      data: postFromAll,
    } = useGetAllPostsQuery(undefined, {
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        data: data?.find((post) => post.slug === slug),
        isLoading,
        isFetching,
      }),
    });
  
    const {
      data: singlePostArray,
    } = useGetPostBySlugQuery(slug || "", {
      skip: !!postFromAll,
    });

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
  if (isLoading) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  return (
    <section className="features">
      <div className="wrapper">
        <Title>{post?.acf?.title_of_page}</Title>
        <div className="features__text">
          <p>{post?.acf?.text}</p>
        </div>
        <ul className="features__cardlist">
          {cards.map((card, index) => (
            <li key={index} className="features__cardlist-item">
              <img
                src={card.image}
                alt={card.title}
                className="features__cardlist-item-image"
                loading="lazy"
              />
              <h3 className="features__cardlist-item-title">{card.title}</h3>
              <p className="features__cardlist-item-text">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}