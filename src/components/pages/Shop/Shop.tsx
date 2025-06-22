import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useShopData } from '../../../hooks/useShopData';
import ShopAside from './ShopAside';
import ShopBanner from './ShopBanner';
import ProductCard from './ProductCard';
import Loader from '../../common/Loader';
import LocalLoader from '../../common/LocalLoader';
import './Shop.scss';

const Shop: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? Number(id) : 140; // Default category

  const {
    filteredCategories,
    currentCategory,
    filteredProducts,
    searchQuery,
    isProductsLoading,
    isCategoriesLoading,
    handleSearchChange,
    handleAddToCart,
  } = useShopData({ categoryId });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  };

  if (isCategoriesLoading && filteredCategories.length === 0) {
    return (
      <section style={{ height: "100vh" }}>
        <Loader />
      </section>
    );
  }

  return (
    <section className="shop">
      <ShopAside
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        categories={filteredCategories}
        isCategoriesLoading={isCategoriesLoading}
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

export default Shop;