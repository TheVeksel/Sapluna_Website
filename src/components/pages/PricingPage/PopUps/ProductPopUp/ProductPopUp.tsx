import { RefObject } from "react";
import { Product } from "../OrderPopUp";
import "./ProductPopUp.scss"

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
                <>
                  <span className="product-modal__price-old">
                    €{product.acf.hinta}
                  </span>
                  <span className="product-modal__price-new">
                    €{product.acf.alennushinta}
                  </span>
                </>
              ) : (
                <span className="product-modal__price-normal">
                  €{product.acf.hinta}
                </span>
              )}
            </div>

            <button className="product-modal__add-to-cart" type="button">
              Lisää ostoskoriin
            </button>

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
