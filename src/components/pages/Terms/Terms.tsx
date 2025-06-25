
import { useGetBlogPostBySlugQuery } from "../../../api/wpApi";
import Loader from "../../common/Loader";

const Terms: React.FC = () => {
  const slug = "tilausehdot";
  const { data, isLoading, isError } = useGetBlogPostBySlugQuery(slug);

  if (isLoading) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <div className="wrapper">
          <h1>Tilausehdot</h1>
          <p>Ehtoja ei löytynyt. Yritä myöhemmin uudelleen.</p>
        </div>
      </section>
    );
  }

  const post = data[0] as {
    title: { rendered: string };
    content: { rendered: string };
    date: string;
  };

  return (
    <section className="blog-single">
      <div className="wrapper">
        <h1
          className="main-title"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <p className="date">
          {new Date(post.date).toLocaleDateString("fi-FI")}
        </p>

        <article
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </section>
  );
};

export default Terms;
