import React, { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../store/slices/cartSlice";
import { useGetShopProductBySlugQuery } from "../../../../api/wpApi";
import { Product } from "../../PricingPage/PopUps/OrderPopUp";
import Loader from "../../../common/Loader";
import "./ProductPage.scss";
import AddToCartButton from "../../../common/buttons/AddToCart/AddToCartButton";

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const { data, isLoading, error, isFetching } = useGetShopProductBySlugQuery(
    slug!,
    {
      skip: !slug,
    }
  );

  const product = data?.[0] || null;

  const handleAddToCart = useCallback(
    (product: Product) => {
      try {
        const originalPrice = parseFloat(product.acf?.hinta || "0");
        const hasDiscount = product.acf?.alennus === "On";
        const discountPrice = parseFloat(product.acf?.alennushinta || "0");
        const price = hasDiscount ? discountPrice : originalPrice;

        dispatch(
          addItem({
            id: product.id,
            name: product.title?.rendered || "Product without name",
            price,
            type: "product",
            image: product.acf?.image || "",
            quantity: 1,
          })
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    [dispatch]
  );

  if (isLoading || isFetching) {
    return (
      <section style={{ height: "100vh" }}>
        <Loader />
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-page">
        <div className="product-page__container">
          <div className="product-page__error">
            <h1>Tuotetta ei löytynyt</h1>
            <p>Haettu tuote ei ole saatavilla tai sitä ei ole olemassa.</p>
            <Link to="/verkkokauppa" className="product-page__back-link">
              Palaa kauppaan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const originalPrice = parseFloat(String(product.acf?.hinta || ""));
  const hasDiscount = product.acf?.alennus === "On";
  const discountPrice = parseFloat(String(product.acf?.alennushinta || ""));
  const currentPrice = hasDiscount ? discountPrice : originalPrice;

  return (
    <section className="product-page">
      <div className="product-page__container">
        <nav className="product-page__breadcrumbs">
          <Link to="/verkkokauppa" className="product-page__breadcrumb-link">
            Kauppa
          </Link>
          <span className="product-page__breadcrumb-separator">/</span>
          <span className="product-page__breadcrumb-current">
            {product.title?.rendered || "Tuote"}
          </span>
        </nav>

        <div className="product-page__content">
          <div className="product-page__image-section">
            {product.acf?.image ? (
              <img
                src={product.acf.image}
                alt={product.title?.rendered || "Tuote"}
                className="product-page__image"
              />
            ) : (
              <div className="product-page__image-placeholder">
                <span>Ei kuvaa</span>
              </div>
            )}
          </div>

          <div className="product-page__info-section">
            <div className="product-page__header">
              <h1 className="product-page__title">
                {product.title?.rendered || "Tuote"}
              </h1>

              <div className="product-page__price-section">
                {hasDiscount && originalPrice > 0 ? (
                  <>
                    <span className="product-page__original-price">
                      {originalPrice.toFixed(2)} €
                    </span>
                    <div className="product-page__discount-container">
                      <span className="product-page__discount-price">
                        {currentPrice.toFixed(2)} €
                      </span>
                      <span className="product-page__discount-badge">
                        -
                        {Math.round(
                          ((originalPrice - currentPrice) / originalPrice) * 100
                        )}
                        %
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="product-page__current-price">
                    {currentPrice.toFixed(2)} €
                  </span>
                )}
              </div>
            </div>

            {product.content?.rendered && (
              <div className="product-page__description">
                <h2>Kuvaus</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.content.rendered,
                  }}
                />
              </div>
            )}

            <div className="product-page__actions">
              <AddToCartButton
                size="big"
                product={product}
                onAddToCart={(item) => {
                  handleAddToCart(item as Product);
                }}
              />
            </div>

            <div className="product-page__meta">
              <div className="product-page__meta-item">
                <span className="product-page__meta-label">Tuote ID:</span>
                <span className="product-page__meta-value">{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;