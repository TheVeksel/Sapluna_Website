import { useState, useMemo } from "react";

// Props definition for BlogFilters
type BlogFiltersProps = {
  posts: BlogPost[];
  children: (filteredPosts: BlogPost[]) => React.ReactNode;
};

// Term type used for tags and categories
type Term = {
  id: number;
  name: string;
  taxonomy: string;
};

// Blog post type structure
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
  const [sortOption, setSortOption] = useState<boolean>(true); // true = newest first
  const [tagFilter, setTagFilter] = useState<Record<string, boolean>>({});

  // Extract all unique tags from posts
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

  // Initialize tag filter state (only once)
  useMemo(() => {
    if (allTags.length > 0 && Object.keys(tagFilter).length === 0) {
      const initialTagFilter: Record<string, boolean> = {};
      allTags.forEach((tag) => {
        initialTagFilter[tag] = false;
      });
      setTagFilter(initialTagFilter);
    }
  }, [allTags, tagFilter]);

  // Filter and sort posts based on search and selected tags
  const filteredPosts = useMemo(() => {
    return [...posts]
      .filter((post) => {
        // Match search query with title
        const matchesSearch = post.title.rendered
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Extract post tags
        const terms = post._embedded?.["wp:term"]?.flat() || [];
        const postTags = terms
          .filter((term) => term.taxonomy === "post_tag")
          .map((tag) => tag.name);

        // Get selected tags from tagFilter
        const selectedTags = Object.entries(tagFilter)
          .filter(([, isSelected]) => isSelected)
          .map(([tag]) => tag);

        // Match if at least one selected tag is present
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

  // Toggle single tag selection
  const handleTagToggle = (tag: string) => {
    setTagFilter((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  // Toggle sort order between newest and oldest
  const toggleSortOption = () => {
    setSortOption((prev) => !prev);
  };

  return (
    <>
      <div className="filters-container">
        {/* Sort toggle control */}
        <div className="sort-toggle" onClick={toggleSortOption}>
          <span>
            {sortOption === true ? "Uusimmat ensin" : "Vanhimmat ensin"}
          </span>
          <span className={`sort-arrow ${sortOption === true ? "up" : "down"}`}>
            ↑
          </span>
        </div>

        {/* Search and tag filters */}
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

          {/* Tag filter buttons */}
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

      {/* Render filtered posts via render props */}
      {children(filteredPosts)}
    </>
  );
};
