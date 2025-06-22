import { useParams, Link, useLocation } from "react-router-dom";
import { useGetBlogPostBySlugQuery } from "../../../../../api/wpApi";
import Loader from "../../../../common/Loader";
import "./BlogPost.scss";
import ShareButtons from "../../../../common/buttons/share/ShareButtons";

export default function BlogPost() {
  // Get the slug from the URL
  const { slug } = useParams<{ slug: string }>();

  // Fetch post data based on slug
  const { data, isLoading, isError } = useGetBlogPostBySlugQuery(slug || "");

  // Get the current page URL for share buttons
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}`;

  if (isLoading) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  // Handle errors or missing post
  if (isError || !data?.length) {
    return <p>Virhe postin latauksessa tai sitä ei löytynyt.</p>;
  }

  const post = data[0] as {
    title: { rendered: string };
    content: { rendered: string };
    date: string;
  };

  return (
    <section className="blog-single">
      <div className="wrapper">
        <div className="blog-single__toppart">
          {/* Link back to blog overview */}
          <Link to="/ajankohtaista/blogi" className="back-link">
            ← Takaisin blogiin
          </Link>

          <div className="blog-single__share">
            <ShareButtons title={post.title.rendered} url={fullUrl} />
            <div></div>
          </div>
        </div>

        <h1
          className="main-title"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Post date formatted in Finnish locale */}
        <p className="date">
          {new Date(post.date).toLocaleDateString("fi-FI")}
        </p>

        {/* Post content (HTML from WordPress) */}
        <article
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="blog-single__share-bottom">
          <ShareButtons title={post.title.rendered} url={fullUrl} />
        </div>
      </div>
    </section>
  );
}
