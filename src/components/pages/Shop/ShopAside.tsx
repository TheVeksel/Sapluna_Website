import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import LocalLoader from "../../common/LocalLoader";
import { ProductCategory } from "../../../api/wpApi";

interface ShopAsideProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: ProductCategory[];
  isCategoriesLoading: boolean;
  activeSlug?: string;
}

export default function ShopAside({
  searchQuery,
  onSearchChange,
  categories,
  isCategoriesLoading,
  activeSlug,
}: ShopAsideProps) {
  return (
    <aside className="shop__sidebar">
      <div className="shop__search">
        <input
          type="text"
          placeholder="Etsi tuotteita..."
          value={searchQuery}
          onChange={onSearchChange}
          className="shop__search-input"
        />
        <svg className="shop__search-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </div>

      <nav className="shop__categories">
        <h3>Tuoteryhmät</h3>
        {isCategoriesLoading ? (
          <LocalLoader />
        ) : (
          <ul className="shop__categories-list">
            {categories.map((cat) => (
              <li key={cat.id} className="shop__category-item">
                <Link
                  to={cat.slug !== "tuotteet" ? `/tuoteryhma/${cat.slug}` : `/verkkokauppa`}
                  className={`shop__category-link ${
                    cat.slug === activeSlug || 
                    (cat.slug === "tuotteet" && !activeSlug) ? 'active' : ''
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}