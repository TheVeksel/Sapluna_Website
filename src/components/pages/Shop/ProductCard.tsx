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

  const formatPrice = (price: string | number) => {
    const numPrice = parseFloat(String(price));
    return isNaN(numPrice) ? "0" : numPrice.toLocaleString("fi-FI");
  };
console.log(product.slug)
  return (
    <div className="shop__product-card">
      <div className="shop__product-image">
        {product.acf?.image && (
          <img
            src={product.acf.image}
            alt={product.title?.rendered || "Товар"}
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

        <p className="shop__product-price">
          {formatPrice(product.acf?.hinta || 0)} €
        </p>

        <AddToCartButton
          size="medium"
          product={product}
          onAddToCart={(item) => {
            onAddToCart(item as Product);
          }}
        />

        <Link to={`/verkkokauppa/tuote/${product.slug}`} className="shop__read-more-button">
          Lue lisää
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
