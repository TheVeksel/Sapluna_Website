import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { removeItem, CartItem } from "../../../store/slices/cartSlice";
import "./cart.scss";
import { Link } from "react-router-dom";
import Button from "../../common/buttons/button";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
console.log(cartItems)
  const totalPrice = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };
console.log (cartItems)
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
                  <Link to="/" className="emptyCart__button btn btn--primary">
                    Jatka ostoksia
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="productCartItem">
                      <div className="productCartItem__image">
                        {item.type === "license" ? (
                          <img
                            src="/img/photos/license.png"
                            alt="license"
                          ></img>
                        ) : (
                          <img src={item.image} alt="license" />
                        )}
                      </div>
                      <div className="productCartItem__info">
                        <h3 className="productCartItem__name">{item.name} {item.type === "license" ? "lisenssi" : null}</h3>
                        <div className="productCartItem__price">
                          {item.price.toFixed(2)} €
                        </div>
                        <div className="productCartItem__license-amount">
                          {item.name === "team" ? (
                            <div>
                              <span>Omistaja:{item.omistaja}</span>
                              <span>Tuottaja:{item.tuottaja}</span>
                            </div>
                          ) : null}
                        </div>
                        {item.type === "license" ? (
                          <Link to="/hinnoittelu#plans">
                            <Button
                              onClick={() => handleRemove(item.id)}
                              color="#fc8437"
                            >
                              Vaihda lisenssi
                            </Button>
                          </Link>
                        ) : null}
                      </div>
                      <div className="productCartItem__total">
                        {item.price.toFixed(2)} €
                      </div>
                      <button
                        className="productCartItem__remove"
                        onClick={() => handleRemove(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="productCart__summary">
                <div className="productCartSummary">
                  <h3 className="productCartSummary__title">Yhteenveto</h3>
                  <div className="productCartSummary__row">
                    <span>Tuotteet ({cartItems.length})</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="productCartSummary__row productCartSummary__row--total">
                    <span>Kokonaissumma</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                  <button className="productCartSummary__checkout btn btn--primary">
                    Siirry kassalle
                  </button>
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
