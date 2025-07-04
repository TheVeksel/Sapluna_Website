import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import {
  removeItem,
  CartItem,
  updateQuantity,
} from "../../../store/slices/cartSlice";
import "./Cart.scss";
import { Link } from "react-router-dom";
import Button from "../../common/buttons/button";

interface CouponState {
  code: string;
  discount: number;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const hasLicenseInCart = cartItems.some((item) => item.type === "license");

  // Promo code state
  const [coupon, setCoupon] = useState<string>("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isUsed, setIsUsed] = useState<boolean>(false);

  useEffect(() => {
    const savedCoupon = sessionStorage.getItem("cart_coupon");
    if (savedCoupon) {
      try {
        const parsedCoupon: CouponState = JSON.parse(savedCoupon);
        setCoupon(parsedCoupon.code);
        setDiscountAmount(parsedCoupon.discount);
        setCouponSuccess(`Kuponki "${parsedCoupon.code}" aktivoitu!`);
      } catch (e) {
        console.error("Failed to parse saved coupon", e);
        sessionStorage.removeItem("cart_coupon");
      }
    }
  }, []);

  const sessionId = useMemo(() => {
    let id = sessionStorage.getItem("checkout_session_id");
    if (!id) {
      id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      sessionStorage.setItem("checkout_session_id", id);
    }
    return id;
  }, []);

  // Calculate total price
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum: number, item: CartItem) =>
          sum + item.price * (item.quantity ?? 1),
        0
      ),
    [cartItems]
  );

  // Total after discount
  const total = useMemo(
    () => Math.max(subtotal - discountAmount, 0),
    [subtotal, discountAmount]
  );

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "X-Session-ID": sessionId,
  });

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setCouponError("Anna voimassa oleva kuponkikoodi.");
      return;
    }

    setCouponError(null);
    setCouponSuccess(null);
    setIsApplying(true);
    setIsUsed(true);

    try {
      const requestData = {
        code: coupon.trim(),
        cartItems: cartItems.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity || 1,
          type: item.type,
        })),
      };

      const headers = getHeaders();

      const response = await axios.post(
        `http://localhost:3001/api/apply-coupon`,
        requestData,
        { headers }
      );

      const { message, discount } = response.data;

      if (discount > 0) {
        const successMsg = message || "Kuponki aktivoitu!";
        setCouponSuccess(successMsg);
        setDiscountAmount(discount);

        const couponState: CouponState = {
          code: coupon.trim(),
          discount: discount,
        };
        sessionStorage.setItem("cart_coupon", JSON.stringify(couponState));
      } else {
        setCouponError(message || "Kuponki ei voimassa");
        sessionStorage.removeItem("cart_coupon");
      }
    } catch (error: unknown) {
      setDiscountAmount(0);
      sessionStorage.removeItem("cart_coupon");
      setIsUsed(false);

      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || error.message;
        setCouponError(msg || "Palvelinvirhe");
      } else {
        setCouponError("Tuntematon virhe");
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleDecrement = (item: CartItem) => {
    if (item.type === "product") {
      const currentQuantity = item.quantity ?? 1;
      if (currentQuantity > 1) {
        dispatch(
          updateQuantity({ id: item.id, quantity: currentQuantity - 1 })
        );
      }
    }
  };

  const handleIncrement = (item: CartItem) => {
    if (item.type === "product") {
      const currentQuantity = item.quantity ?? 1;
      dispatch(updateQuantity({ id: item.id, quantity: currentQuantity + 1 }));
    }
  };

  return (
    <section className="productCart">
      <div className="wrapper">
        <div className="productCart__container">
          <div className="productCart__content">
            <div className="productCart__items">
              {cartItems.length === 0 ? (
                <div className="emptyCart">
                  <div className="emptyCart__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fc8437"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="10" cy="20.5" r="1" />
                      <circle cx="18" cy="20.5" r="1" />
                      <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                    </svg>
                  </div>
                  <h3 className="emptyCart__title">Ostoskori on tyhjä</h3>
                  <p className="emptyCart__text">
                    Sinulla ei ole vielä tuotteita ostoskorissa
                  </p>
                  <Link
                    to="/verkkokauppa"
                    className="emptyCart__button btn btn--primary"
                  >
                    Jatka ostoksia
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item: CartItem) => {
                    const itemQuantity = item.quantity ?? 1;
                    const itemTotalPrice = item.price * itemQuantity;

                    return (
                      <div key={item.id} className="productCartItem">
                        <div className="productCartItem__image">
                          {item.type === "license" ? (
                            <img src="/img/photos/license.png" alt="license" />
                          ) : (
                            <img src={item.image} alt="product" />
                          )}
                        </div>
                        <div className="productCartItem__info">
                          <h3 className="productCartItem__name">
                            {item.name}{" "}
                            {item.type === "license" ? "lisenssi" : null}
                          </h3>
                          <div className="productCartItem__price">
                            {item.price.toFixed(2)} €
                          </div>
                          {item.type === "product" && (
                            <div className="productCartItem__quantity">
                              <button
                                className="productCartItem__quantity-btn"
                                onClick={() => handleDecrement(item)}
                                disabled={itemQuantity <= 1}
                              >
                                -
                              </button>
                              <span className="productCartItem__quantity-value">
                                {itemQuantity}
                              </span>
                              <button
                                className="productCartItem__quantity-btn"
                                onClick={() => handleIncrement(item)}
                              >
                                +
                              </button>
                            </div>
                          )}
                          {item.type === "license" && (
                            <Link to="/hinnoittelu#plans">
                              <Button
                                onClick={() => handleRemove(item.id)}
                                color="#fc8437"
                              >
                                Vaihda lisenssi
                              </Button>
                            </Link>
                          )}
                        </div>
                        <div className="productCartItem__total">
                          {itemTotalPrice.toFixed(2)} €
                        </div>
                        <button
                          className="productCartItem__remove"
                          onClick={() => handleRemove(item.id)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  <div className="productCartSummary__promote">
                    <Link to="/verkkokauppa">
                      <Button color="#fc8437">Jatka ostoksia</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="productCart__summary">
                <div className="productCartSummary">
                  <h3 className="productCartSummary__title">Yhteenveto</h3>
                  <div className="productCartSummary__row">
                    <span>
                      Tuotteet (
                      {cartItems.reduce(
                        (sum, item) => sum + (item.quantity ?? 1),
                        0
                      )}
                      )
                    </span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="productCartSummary__row">
                      <span>Alennus</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="productCartSummary__row productCartSummary__row--total">
                    <span>Kokonaissumma</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>

                  <Link to="/checkout">
                    <button className="productCartSummary__checkout btn btn--primary">
                      Siirry kassalle
                    </button>
                  </Link>
                </div>
                {!hasLicenseInCart && (
                  <div className="productCartSummary__promote">
                    <Link to="/hinnoittelu">
                      <Button color="#fc8437">
                        Tutustu Saplunan lisenssiin
                      </Button>
                    </Link>
                  </div>
                )}
                {/* Promo code input */}
                <div>
                  <div className="productCartSummary__coupon">
                    <input
                      type="text"
                      placeholder="Syötä promokoodi"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={isApplying}
                      className="coupon-input"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isUsed}
                      className="coupon-btn"
                    >
                      Käytä kuponki
                    </button>
                  </div>
                  {couponError && (
                    <p className="coupon-message error">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="coupon-message success">{couponSuccess}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
