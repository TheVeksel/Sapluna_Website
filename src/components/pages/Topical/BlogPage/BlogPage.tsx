import { Link } from "react-router-dom";
import {
  useGetAllBlogPostsQuery,
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
} from "../../../../api/wpApi";
import "./BlogPage.scss";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";
import { BlogFilters } from "./Filters/BlogFilters";

export default function BlogPage() {
  const slug = "ajankohtaista"; 
//Getting list of all blog posts via RTK Query
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError,
  } = useGetAllBlogPostsQuery();

  const { data: allPosts, isLoading: isAllLoading } = useGetAllPostsQuery();
  const { data: singlePostData, isLoading: isSingleLoading } =
    useGetPostBySlugQuery(slug || "", {
      skip: !!allPosts?.find((post) => post.slug === slug),//skip if already fetched
    });

  const [showLoader, setShowLoader] = useState(true);

  // Combined loading state
  const loading = isPostsLoading || isSingleLoading || isAllLoading;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setShowLoader(true);

    // Small delay for smoother transition (avoids flash of content)
    if (!loading) {
      timer = setTimeout(() => setShowLoader(false), 400);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  // Select the post that contains ACF page content (title, text)
  const post =
    allPosts?.find((post) => post.slug === slug) || singlePostData?.[0];

  // Get ACF text content from the post
  const acf = post?.acf?.texts || "No title";

  if (showLoader) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  // Error handling
  if (isError) return <p>Virhe ladattaessa blogipostauksia.</p>; 
  if (!posts) return <p>Ei postauksia.</p>; 

  return (
    <section className="blogi-page">
      <div className="wrapper">
        <h1>{acf.page_title}</h1>

        <div className="blogi-page__textbox">
          <p>{acf.text}</p>
        </div>

        {/* Filter component: provides filteredPosts as render prop */}
        <BlogFilters posts={posts}>
          {(filteredPosts) => (
            <>
              <ul className="blogi-list">
                {filteredPosts.map((post) => {
                  // Featured image via WP REST API `_embedded`
                  const img =
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                  // Get all terms (tags, categories) from embedded data
                  const terms = post._embedded?.["wp:term"]?.flat() || [];

                  // Filter only tags
                  const tags = terms.filter(
                    (term) => term.taxonomy === "post_tag"
                  );

                  // Custom ACF category
                  const category = post.acf?.category;

                  // Optional background color mapping by category name
                  const categories: Record<string, string> = {
                    Blogit: "#00bdff",
                    Ajankohtaista: "#f63030",
                  };

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

                        {/* Custom category badge (with optional color) */}
                        {category && (
                          <span
                            className="acf-category"
                            style={{ backgroundColor: categories[category] }}
                          >
                            {category}
                          </span>
                        )}

                        <h2
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />

                        {/* Post tags (max 3 shown) */}
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

              {/* If no posts match the filters */}
              {filteredPosts.length === 0 && (
                <p className="no-results">
                  Ei tuloksia valituilla suodattimilla.
                </p>
              )}
            </>
          )}
        </BlogFilters>
      </div>
    </section>
  );
}
