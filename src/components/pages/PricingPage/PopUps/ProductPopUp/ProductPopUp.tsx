import { RefObject } from "react";
import { Product } from "../OrderPopUp";
import "./ProductPopUp.scss";
import AddToCartButton from "../../../../common/buttons/AddToCart/AddToCartButton";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../../store/slices/cartSlice";

interface ProductPopUpProps {
  closePopup: () => void;
  closeRef?: RefObject<HTMLButtonElement | null>;
  product: Product;
}

export default function ProductPopUp({
  closePopup,
  product,
}: ProductPopUpProps) {
  const hasDiscount = product.acf.alennus !== "Off";
  const oldPrice = parseFloat(product.acf.hinta);
  const newPrice = parseFloat(product.acf.alennushinta);
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  const dispatch = useDispatch();

  const handleAddToCart = (item: Product) => {
    const price =
      item.acf.alennus !== "Off"
        ? parseFloat(item.acf.alennushinta)
        : parseFloat(item.acf.hinta);

    dispatch(
      addItem({
        id: item.id,
        name: item.title.rendered,
        price,
        type: "product",
        image: item.acf.image,
        quantity: 1,
      })
    );
  };

  return (
    <div
      className="product-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="product-modal__backdrop" onClick={closePopup} />

      <div className="product-modal__content" tabIndex={-1}>
        <div className="product-modal__wrapper">
          <div className="product-modal__image-wrapper">
            <img
              src={product.acf.image}
              alt={product.title.rendered}
              className="product-modal__image"
              loading="lazy"
            />
          </div>

          <div className="product-modal__info">
            <h2 id="modal-title" className="product-modal__title">
              {product.title.rendered}
            </h2>

            <div
              className="product-modal__description"
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />

            <div className="product-modal__price">
              {hasDiscount ? (
                <span className="product-modal__price-wrapper">
                  <span className="product-modal__price-old">
                    €{product.acf.hinta}
                  </span>
                  <div className="product-modal__price-new-block">
                    <span className="product-modal__price-new">
                      €{product.acf.alennushinta}
                    </span>
                    <p className="product-modal__price-discount">
                      -{discount}%{" "}
                    </p>
                  </div>
                </span>
              ) : (
                <span className="product-modal__price-normal">
                  €{product.acf.hinta}
                </span>
              )}
            </div>

            <AddToCartButton
              key={product.id}
              product={product}
              onAddToCart={(item) => {
                handleAddToCart(item as Product);
              }}
              size="big"
            />

            <button
              className="product-modal__back"
              onClick={closePopup}
              type="button"
            >
              Takaisin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
