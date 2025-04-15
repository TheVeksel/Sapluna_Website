import { useState, useEffect, useRef } from "react";
import "./PricingPage.scss";
import PricingCalculator from "./PricingCalculator";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [highlightPlan, setHighlightPlan] = useState<
    "solo" | "team" | "enterprise"
  >("solo");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [tuottaja, setTuottaja] = useState(1);
  const [omistaja, setOmistaja] = useState(1);
  const plansRef = useRef<HTMLDivElement>(null);
  const [arePlansVisible, setArePlansVisible] = useState(false);
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);

  const openFirstPopup = () => setIsFirstPopupOpen(true);
  const closeFirstPopup = () => setIsFirstPopupOpen(false);
  const openSecondPopup = () => setIsSecondPopupOpen(true);
  const closeSecondPopup = () => setIsSecondPopupOpen(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setArePlansVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (plansRef.current) {
      observer.observe(plansRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pricingPlans = [
    {
      name: "Solo",
      key: "solo",
      features: [
        "1 käyttäjä",
        "Perustoiminnot",
        "Sähköpostituki",
        "Ei tiimitoimintoja",
      ],
    },
    {
      name: "Team",
      key: "team",
      features: [
        "Tiimien hallinta",
        "Etusijainen tuki",
        "Yhteistyöominaisuudet",
      ],
    },
    {
      name: "Enterprise",
      key: "enterprise",
      features: [
        "Oma tilivastaava",
        "Räätälöidyt integraatiot",
        "Premium-tuki",
      ],
    },
  ];

  const billingType = isYearly ? "yearly" : "monthly";

  // Найдем текущий подсвеченный план
  const selectedPlan = pricingPlans.find((plan) => plan.key === highlightPlan);

  return (
    <section className="pricing-section">
      <h2 className="pricing-section__title">Valitse sinulle sopiva paketti</h2>

      <div className="pricing-section__billing-toggle">
        <span className="pricing-section__billing-toggle-label">Kuukausi</span>
        <label className="pricing-section__billing-toggle-switch">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <span></span>
        </label>
        <span className="pricing-section__billing-toggle-label">Vuosi</span>
      </div>

      <div className="pricing-section__grid" ref={plansRef}>
        {pricingPlans.map((plan, index) => {
          const isActive = plan.key === highlightPlan;
          const showContact =
            plan.key === "enterprise" ||
            (plan.key === "team" && (tuottaja > 50 || omistaja > 20));

          return (
            <div
              key={index}
              className={`pricing-section__card${
                isActive ? " pricing-section__card--highlight" : ""
              }`}
            >
              <div className="pricing-section__card-name">{plan.name}</div>

              {isActive && (
                <div className="pricing-section__card-price">
                  {showContact ? (
                    "Ota yhteyttä hinnoitteluun"
                  ) : finalPrice !== null ? (
                    <>
                      €{finalPrice}
                      <span>
                        {" "}
                        / {billingType === "yearly" ? "vuosi" : "kk"}
                      </span>
                    </>
                  ) : null}
                </div>
              )}

              <button
                className="pricing-section__card-btn"
                onClick={openFirstPopup}
                disabled={!isActive}
              >
                Kokeile
              </button>

              <ul className="pricing-section__card-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <PricingCalculator
        tuottaja={tuottaja}
        omistaja={omistaja}
        billing={billingType}
        onHighlightChange={setHighlightPlan}
        onPriceChange={setFinalPrice}
      />

      <div
        className={`pricing-section__sliders ${
          arePlansVisible ? "pricing-section__sliders--visible" : ""
        }`}
      >
        <div className="pricing-section__slider">
          <div className="pricing-section__slider-label">
            Tuottajat
            <span>{tuottaja > 50 ? ">50" : tuottaja}</span>
          </div>
          <div className="pricing-section__slider-container">
            <input
              type="range"
              min="1"
              max="51"
              value={tuottaja > 50 ? 51 : tuottaja}
              onChange={(e) => {
                const value = Number(e.target.value);
                setTuottaja(value === 51 ? 51 : value);
              }}
              className="pricing-section__slider-input"
              style={
                {
                  "--fill-percent": `${Math.min(100, (tuottaja / 51) * 100)}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        <div className="pricing-section__slider">
          <div className="pricing-section__slider-label">
            Omistajat
            <span>{omistaja > 20 ? ">20" : omistaja}</span>
          </div>
          <div className="pricing-section__slider-container">
            <input
              type="range"
              min="1"
              max="21"
              value={omistaja > 20 ? 21 : omistaja}
              onChange={(e) => {
                const value = Number(e.target.value);
                setOmistaja(value === 21 ? 21 : value);
              }}
              className="pricing-section__slider-input"
              style={
                {
                  "--fill-percent": `${Math.min(100, (omistaja / 21) * 100)}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>

      {isFirstPopupOpen && (
        <div className="pricing-popup">
          <div className="pricing-popup__overlay" onClick={closeFirstPopup}></div>
          <div className="pricing-popup__content">
            <div className="pricing-popup__header">
              <h3 className="pricing-popup__title">Valitsit tämän paketin</h3>
              <button className="pricing-popup__close" onClick={closeFirstPopup}>×</button>
            </div>
            <div className="pricing-popup__plan">
              <div className="pricing-popup__plan-name">{selectedPlan?.name}</div>
              <div className="pricing-popup__plan-price">
                {finalPrice !== null ? (
                  <>
                    €{finalPrice} / {billingType === "yearly" ? "vuosi" : "kk"}
                  </>
                ) : (
                  "Hinta ei saatavilla"
                )}
              </div>
              <ul className="pricing-popup__plan-features">
                {selectedPlan?.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="pricing-popup__add-to-cart">Lisää ostoskoriin</button>
            </div>
            <div className="pricing-popup__additional-services">
              <h4>Lisäpalvelut</h4>
              <div className="pricing-popup__service-item">
                <span>Palvelun nimi lyhyesti</span>
                <div className="pricing-popup__service-actions">
                  <button className="pricing-popup__more-info" onClick={openSecondPopup}>Lue lisää</button>
                  <button className="pricing-popup__cart">Ostokorin</button>
                </div>
              </div>
              <div className="pricing-popup__service-item">
                <span>Palvelun nimi lyhyesti</span>
                <div className="pricing-popup__service-actions">
                  <button className="pricing-popup__more-info" onClick={openSecondPopup}>Lue lisää</button>
                  <button className="pricing-popup__cart">Ostokorin</button>
                </div>
              </div>
              <div className="pricing-popup__service-item">
                <span>Palvelun nimi lyhyesti</span>
                <div className="pricing-popup__service-actions">
                  <button className="pricing-popup__more-info" onClick={openSecondPopup}>Lue lisää</button>
                  <button className="pricing-popup__cart">Ostokorin</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSecondPopupOpen && (
        <div className="pricing-popup">
          <div className="pricing-popup__overlay" onClick={closeSecondPopup}></div>
          <div className="pricing-popup__content">
            <div className="pricing-popup__header">
              <h3 className="pricing-popup__title">Tietoa tästä palvelusta</h3>
              <button className="pricing-popup__close" onClick={closeSecondPopup}>×</button>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className="pricing-popup__back-btn" onClick={closeSecondPopup}>Takaisin</button>
          </div>
        </div>
      )}
    </section>
  );
}