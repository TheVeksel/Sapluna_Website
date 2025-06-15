import { useState, useEffect, useRef, RefObject } from "react";
import { useGetAllProductsQuery } from "../../../../api/wpApi";
import ProductPopUp from "./ProductPopUp/ProductPopUp";
import LocalLoader from "../../../common/LocalLoader";
import AddToCartButton from "../../../common/buttons/AddToCart/AddToCartButton";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../store/slices/cartSlice";

interface OrderPopUpProps {
  selectedPlan?: {
    name?: string;
    features?: string[];
  };
  finalPrice: number | null;
  billingType: string;
  closeFirstPopup: () => void;
  closeFirstRef: RefObject<HTMLButtonElement | null>;
  licenseType: "solo" | "team" | "enterprise";
  tuottaja:number;
  omistaja: number;
}
export interface License {
  id: number;
  licenseType: "solo" | "team" | "enterprise";
  finalPrice: number;
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
  licenseType,
  omistaja,
  tuottaja,
}: OrderPopUpProps) {
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const closeSecondRef = useRef<HTMLButtonElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading, isError } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (item: Product | License) => {
    if ("licenseType" in item) {
      dispatch(
        addItem({
          id: item.id,
          name: `${item.licenseType}`,
          price: item.finalPrice,
          type: "license",
          omistaja: omistaja,
          tuottaja: tuottaja,
        })
      );
    } else {
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
    }
  };

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
            <AddToCartButton
              product={
                {
                  id: 8468,
                  licenseType: licenseType,
                  finalPrice: finalPrice || 0,
                } as License
              }
              onAddToCart={handleAddToCart}
              size="medium"
            />
          </div>


          <div className="pricing-popup__additional-services">
            <h4>Lisäpalvelut</h4>
          {isLoading ? <LocalLoader /> : null}
            {products?.map((product) => (
              <div key={product.id} className="pricing-popup__service-item">
                <span>{product.title.rendered}</span>
                {product.acf.alennus !== "Off" ? (
                  <span style={{color: '#fc8437', fontWeight: '700'}}>€{product.acf.alennushinta}</span>
                ) : (
                  <span style={{color: '#fc8437', fontWeight: '700'}}>€{product.acf.hinta}</span>
                )}

                <div className="pricing-popup__service-actions">
                  <button
                    className="pricing-popup__more-info"
                    onClick={() => openProductPopup(product)}
                  >
                    Lue lisää
                  </button>
                  <AddToCartButton
                    product={
                      {
                        id: product.id,
                        slug: product.slug,
                        title: product.title,
                        content: product.content,
                        acf: product.acf,
                      } as Product
                    }
                    onAddToCart={handleAddToCart}
                    size="small"
                  />
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
