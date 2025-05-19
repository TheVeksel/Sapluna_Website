import { Link } from "react-router-dom";
import {
  useGetAllBlogPostsQuery,
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
} from "../../../../api/wpApi";
import "./BlogPage.scss";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";

type Post = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  acf: {
    title_of_page?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: { id: number; name: string; taxonomy: string }[][];
  };
};

export default function BlogPage() {
  const slug = "ajankohtaista";
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError,
  } = useGetAllBlogPostsQuery();
  const { data: allPosts, isLoading: isAllLoading } = useGetAllPostsQuery();
  const { data: singlePostData, isLoading: isSingleLoading } =
    useGetPostBySlugQuery(slug || "", {
      skip: !!allPosts?.find((post) => post.slug === slug),
    });
  const [showLoader, setShowLoader] = useState(true);
  const loading = isPostsLoading || isSingleLoading || isAllLoading;

  
  useEffect(() => {
    let timer: NodeJS.Timeout;

    setShowLoader(true);
    if (!loading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);


  const post =
    allPosts?.find((post) => post.slug === slug) || singlePostData?.[0];
  const titleOfPage = post?.acf?.texts.page_title || "No title";



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
        <h1>{titleOfPage}</h1>
        <ul className="blogi-list">
          {(posts as Post[])?.map((post) => {
            const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const terms = post._embedded?.["wp:term"]?.flat() || [];
            const tags = terms.filter((term) => term.taxonomy === "post_tag");

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
                  {tags.length > 0 && (
                    <ul className="tags">
                      {tags.slice(0, 3).map((tag) => (
                        <li key={tag.id} className="tag">
                          {tag.name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="card__bottom">
                    <p className="date">
                      {new Date(post.date).toLocaleDateString("fi-FI")}
                    </p>
                    <p className="read">Lue artikkeli ➔</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
