import { Link } from "react-router-dom";
import { useGetAllBlogPostsQuery } from "../../../../api/wpApi";
import "./BlogPage.scss";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";

export default function BlogPage() {
  const { data: posts, isLoading, isError } = useGetAllBlogPostsQuery();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    setShowLoader(true);
    if (isLoading) {
      // Waiting
    } else {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  if (showLoader) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  if (isError) return <p>Virhe ladattaessa blogipostauksia.</p>;
  return (
    <section className="blogi-page">
      <div className="wrapper">
        <h1>Blogi</h1>
        <ul className="blogi-list">
          {posts?.map((post) => {
            const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <li key={post.id} className="blogi-item">
                <Link to={`/ajankohtaista/blogi/${post.slug}`}>
                  {img ? (
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="thumbnail"
                    />
                  ) : (
                    <div className="thumbnail-placeholder">No image</div> 
                  )}
                  <h2
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="date">
                    {new Date(post.date).toLocaleDateString("fi-FI")}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
