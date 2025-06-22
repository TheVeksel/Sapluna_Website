import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useShopData } from '../../../hooks/useShopData';
import ShopAside from './ShopAside';
import ShopBanner from './ShopBanner';
import ProductCard from './ProductCard';
import LocalLoader from '../../common/LocalLoader';
import './Shop.scss';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    filteredCategories,
    currentCategory,
    filteredProducts,
    searchQuery,
    isProductsLoading,
    isCategoriesLoading,
    handleSearchChange,
    handleAddToCart,
  } = useShopData({ categorySlug: slug });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  return (
    <section className="shop">
      <ShopAside
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        categories={filteredCategories}
        isCategoriesLoading={isCategoriesLoading}
        activeSlug={slug}
      />

      <div className="shop__main-content">
        <ShopBanner category={currentCategory} />

        <div className="shop__container">
          <div className="shop__products">
            {isProductsLoading ? (
              <LocalLoader />
            ) : filteredProducts.length === 0 ? (
              <div className="shop__no-products">
                <p>Tuotteita ei löytynyt</p>
                {!currentCategory && (
                  <p className="shop__category-not-found">
                    Luokkaa ei löytynyt
                  </p>
                )}
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
