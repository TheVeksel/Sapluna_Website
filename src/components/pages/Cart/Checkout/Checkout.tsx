import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import axios from "axios";
import "./Checkout.scss";
import { CartItem } from "../../../../store/slices/cartSlice";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const cartItems = useSelector(
  (state: RootState) => state.cart.items
) as CartItem[];

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  yTunnus: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
});

const [termsAccepted, setTermsAccepted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!termsAccepted) {
    return;
  }

  const orderData = {
    billing: {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      address_1: formData.address,
      address_2: "",
      city: formData.city,
      state: formData.state,
      postcode: formData.postcode,
      country: formData.country,
    },
    meta_data: [{ key: "y_tunnus", value: formData.yTunnus }],
    line_items: cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity || 1,
      type: item.type,
      tuottaja: item.tuottaja,
      omistaja: item.omistaja,
      billing: item.billingType,
    })),
  };

  try {
    // Создать заказ и получить URL для оплаты одним запросом
    const { data: orderResponse } = await axios.post(
      "http://localhost:3001/api/process-order",
      orderData
    );
    console.log("Order response:", orderResponse);

    // Проверяем, что заказ создан успешно и получен URL для оплаты
    if (orderResponse.success && orderResponse.redirectUrl) {
      console.log("Redirecting to payment URL:", orderResponse.redirectUrl);
      // Редирект на страницу оплаты Paytrail
      window.location.href = orderResponse.redirectUrl;
    } else {
      console.error("URL для редиректа не получен:", orderResponse);
      // Здесь можно показать сообщение об ошибке пользователю
    }
  } catch (error) {
    console.error("Ошибка при обработке заказа:", error);
    // Здесь можно показать сообщение об ошибке пользователю
  }
};
  return (
    <section className="checkoutPage">
      <div className="wrapper">
        <h1>Ostoksen tiedot</h1>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formGroup">
              <input
                type="text"
                placeholder="Etunimi *"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                placeholder="Sukunimi *"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <input
              type="email"
              placeholder="Sähköposti *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="formGroup">
            <input
              type="tel"
              placeholder="Puhelinnumero *"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="formRow">
            <div className="formGroup">
              <input
                type="text"
                placeholder="Kaupunki *"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                placeholder="Postinumero *"
                value={formData.postcode}
                onChange={(e) =>
                  setFormData({ ...formData, postcode: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder="Osoite *"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder="Yritys *"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
            />
          </div>

          <div className="formGroup">
            <input
              type="text"
              placeholder="Y-tunnus *"
              value={formData.yTunnus}
              onChange={(e) =>
                setFormData({ ...formData, yTunnus: e.target.value })
              }
              required
            />
          </div>

          <div className="formGroup termsCheckbox">
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />{" "}
              Hyväksyn <Link to="/tilausehdot">tilausehdot</Link>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={!termsAccepted}
          >
            Maksamaan
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;