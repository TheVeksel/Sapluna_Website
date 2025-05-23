import { useState, useMemo } from "react";

type BlogFiltersProps = {
  posts: BlogPost[];
  children: (filteredPosts: BlogPost[]) => React.ReactNode;
};

type Term = {
  id: number;
  name: string;
  taxonomy: string;
};

type BlogPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  acf?: {
    category?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: Term[][];
  };
};

export const BlogFilters = ({ posts, children }: BlogFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<boolean>(true);
  const [tagFilter, setTagFilter] = useState<Record<string, boolean>>({});

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      const terms = post._embedded?.["wp:term"]?.flat() || [];
      terms
        .filter((term) => term.taxonomy === "post_tag")
        .forEach((tag) => tags.add(tag.name));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Initialize tag filter
  useMemo(() => {
    if (allTags.length > 0 && Object.keys(tagFilter).length === 0) {
      const initialTagFilter: Record<string, boolean> = {};
      allTags.forEach((tag) => {
        initialTagFilter[tag] = false;
      });
      setTagFilter(initialTagFilter);
    }
  }, [allTags, tagFilter]);

  // Filtering and sorting posts
  const filteredPosts = useMemo(() => {
    return [...posts]
      .filter((post) => {
        // Search
        const matchesSearch = post.title.rendered
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Filter by tags
        const terms = post._embedded?.["wp:term"]?.flat() || [];
        const postTags = terms
          .filter((term) => term.taxonomy === "post_tag")
          .map((tag) => tag.name);

        const selectedTags = Object.entries(tagFilter)
          .filter(([, isSelected]) => isSelected)
          .map(([tag]) => tag);

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => postTags.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOption === true ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchQuery, sortOption, tagFilter]);

  const handleTagToggle = (tag: string) => {
    setTagFilter((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const toggleSortOption = () => {
    setSortOption((prev) => !prev);
  };

  return (
    <>
      <div className="filters-container">
        <div className="sort-toggle" onClick={toggleSortOption}>
          <span>
            {sortOption === true ? "Uusimmat ensin" : "Vanhimmat ensin"}
          </span>
          <span className={`sort-arrow ${sortOption === true ? "up" : "down"}`}>
            ↑
          </span>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="search">Hae:</label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Etsi postauksista..."
            />
          </div>

          {allTags.length > 0 && (
            <div className="filter-group">
              <label>Suodata tunnisteilla:</label>
              <div className="tag-filters">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-filter ${tagFilter[tag] ? "active" : ""}`}
                    onClick={() => handleTagToggle(tag)}
                    type="button"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {children(filteredPosts)}
    </>
  );
};
