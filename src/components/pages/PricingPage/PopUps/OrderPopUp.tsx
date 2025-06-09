import { useState, useEffect, useRef, RefObject } from "react";
import { useGetAllProductsQuery } from "../../../../api/wpApi";
import ProductPopUp from "./ProductPopUp/ProductPopUp";
import LocalLoader from "../../../common/LocalLoader";

interface OrderPopUpProps {
  selectedPlan?: {
    name?: string;
    features?: string[];
  };
  finalPrice: number | null;
  billingType: string;
  closeFirstPopup: () => void;
  closeFirstRef: RefObject<HTMLButtonElement | null>;
}

export interface Product {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    hinta: string;
    alennus: string;
    alennushinta: string;
    image: string;
  };
}

export default function OrderPopUp({
  selectedPlan,
  finalPrice,
  billingType,
  closeFirstPopup,
  closeFirstRef,
}: OrderPopUpProps) {
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const closeSecondRef = useRef<HTMLButtonElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  const openProductPopup = (product: Product) => {
    setSelectedProduct(product);
    setIsProductPopupOpen(true);
  };

  const closeProductPopup = () => {
    setIsProductPopupOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (isProductPopupOpen) {
      closeSecondRef.current?.focus();
    }
  }, [isProductPopupOpen]);

  if (isError) {
    return (
      <div className="pricing-popup">Virhe lisäpalvelujen latauksessa</div>
    );
  }

  return (
    <>
      <div
        className="pricing-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div
          className="pricing-popup__overlay"
          onClick={(e) => {
            e.stopPropagation();
            closeFirstPopup();
          }}
        ></div>

        <div className="pricing-popup__content">
          <div className="pricing-popup__header">
            <h3 id="popup-title" className="pricing-popup__title">
              Valitsit tämän paketin
            </h3>
            <button
              ref={closeFirstRef}
              className="pricing-popup__close"
              onClick={closeFirstPopup}
            >
              ×
            </button>
          </div>

          <div className="pricing-popup__plan">
            <div className="pricing-popup__plan-name">{selectedPlan?.name}</div>
            <div className="pricing-popup__plan-price">
              {finalPrice !== null
                ? `€${finalPrice} / ${
                    billingType === "yearly" ? "vuosi" : "kk"
                  }`
                : "Hinta ei saatavilla"}
            </div>
            <ul className="pricing-popup__plan-features">
              {selectedPlan?.features?.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="pricing-popup__add-to-cart">
              Lisää ostoskoriin
            </button>
          </div>

          {isLoading ? <LocalLoader /> : null}

          <div className="pricing-popup__additional-services">
            <h4>Lisäpalvelut</h4>
            {products?.map((product) => (
              <div key={product.id} className="pricing-popup__service-item">
                <span>{product.title.rendered}</span>
                <div className="pricing-popup__service-actions">
                  <button
                    className="pricing-popup__more-info"
                    onClick={() => openProductPopup(product)}
                  >
                    Lue lisää
                  </button>
                  <button className="pricing-popup__cart">Ostoskoriin</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isProductPopupOpen && selectedProduct && (
        <ProductPopUp
          closePopup={closeProductPopup}
          product={selectedProduct}
        />
      )}
    </>
  );
}
