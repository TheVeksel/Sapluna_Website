import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../common/buttons/AddToCart/AddToCartButton";
import { Product } from "../PricingPage/PopUps/OrderPopUp";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  const originalPrice = parseFloat(product.acf?.hinta || "0");
  const hasDiscount = product.acf?.alennus === "On";
  const discountPrice = parseFloat(product.acf?.alennushinta || "0");
  const currentPrice = hasDiscount ? discountPrice : originalPrice;
  const discountPercentage = hasDiscount && originalPrice > 0
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="shop__product-card">
      <div className="shop__product-image">
        {product.acf?.image && (
          <img
            src={product.acf.image}
            alt={product.title?.rendered || "Product"}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        <div className="shop__product-overlay">
          <Link to={`/verkkokauppa/tuote/${product.slug}`} className="shop__quick-view">
            Lue lisää
          </Link>
        </div>
      </div>

      <div className="shop__product-info">
        <h4 className="shop__product-title">
          {product.title?.rendered || "No name"}
        </h4>

        <div className="shop__product-price-section">
          {hasDiscount && originalPrice > 0 ? (
            <>
              <span className="shop__product-original-price">
                {originalPrice.toFixed(2)} €
              </span>
              <div className="shop__product-discount-container">
                <span className="shop__product-discount-price">
                  {discountPrice.toFixed(2)} €
                </span>
                <span className="shop__product-discount-badge">
                  -{discountPercentage}%
                </span>
              </div>
            </>
          ) : (
            <span className="shop__product-current-price">
              {currentPrice.toFixed(2)} €
            </span>
          )}
        </div>

        <AddToCartButton
          size="medium"
          product={product}
          onAddToCart={(item) => onAddToCart(item as Product)}
        />

        <Link
          to={`/verkkokauppa/tuote/${product.slug}`}
          className="shop__product-read-more-button"
        >
          Lue lisää
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
