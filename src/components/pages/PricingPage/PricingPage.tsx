import { useState, useEffect, useRef, useMemo } from "react";
import "./PricingPage.scss";
import PricingCalculator from "./PricingCalculator";
import PricingInfo from "./PricingInfo/PricingInfo";

type PlanKey = "solo" | "team" | "enterprise";

function usePricingState() {
  const [isYearly, setIsYearly] = useState(false);
  const [highlightPlan, setHighlightPlan] = useState<PlanKey>("solo");
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
      ([entry]) => setArePlansVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (plansRef.current) observer.observe(plansRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow =
      isFirstPopupOpen || isSecondPopupOpen ? "hidden" : "";
  }, [isFirstPopupOpen, isSecondPopupOpen]);

  return {
    isYearly,
    setIsYearly,
    highlightPlan,
    setHighlightPlan,
    finalPrice,
    setFinalPrice,
    tuottaja,
    setTuottaja,
    omistaja,
    setOmistaja,
    plansRef,
    arePlansVisible,
    isFirstPopupOpen,
    openFirstPopup,
    closeFirstPopup,
    isSecondPopupOpen,
    openSecondPopup,
    closeSecondPopup,
  };
}

export default function PricingPage() {
  const {
    isYearly,
    setIsYearly,
    highlightPlan,
    setHighlightPlan,
    finalPrice,
    setFinalPrice,
    tuottaja,
    setTuottaja,
    omistaja,
    setOmistaja,
    plansRef,
    arePlansVisible,
    isFirstPopupOpen,
    openFirstPopup,
    closeFirstPopup,
    isSecondPopupOpen,
    openSecondPopup,
    closeSecondPopup,
  } = usePricingState();

  const closeFirstRef = useRef<HTMLButtonElement>(null);
  const closeSecondRef = useRef<HTMLButtonElement>(null);


  // focus management
  useEffect(() => {
    if (isFirstPopupOpen) closeFirstRef.current?.focus();
  }, [isFirstPopupOpen]);

  useEffect(() => {
    if (isSecondPopupOpen) closeSecondRef.current?.focus();
  }, [isSecondPopupOpen]);

  const pricingPlans = useMemo(
    () => [
      {
        name: "Solo",
        key: "solo" as PlanKey,
        features: ["1 käyttäjä", "Perustoiminnot", "Sähköpostituki", "Ei tiimitoimintoja"],
      },
      {
        name: "Team",
        key: "team" as PlanKey,
        features: ["Tiimien hallinta", "Etusijainen tuki", "Yhteistyöominaisuudet"],
      },
      {
        name: "Enterprise",
        key: "enterprise" as PlanKey,
        features: ["Oma tilivastaava", "Räätälöidyt integraatiot", "Premium-tuki"],
      },
    ],
    []
  );

  const billingType = isYearly ? "yearly" : "monthly";
  const selectedPlan = pricingPlans.find((p) => p.key === highlightPlan);

  const cards = useMemo(
    () =>
      pricingPlans.map((plan) => {
        const isActive = plan.key === highlightPlan;
        const showContact =
          plan.key === "enterprise" ||
          (plan.key === "team" && (tuottaja > 50 || omistaja > 20));

        return (
          <div
            key={plan.key}
            className={`pricing-section__card${
              isActive ? " pricing-section__card--highlight" : ""
            }`}
          >
            <div className="pricing-section__card-name">{plan.name}</div>

            {isActive && (
              <div className="pricing-section__card-price">
                {showContact
                  ? "Ota yhteyttä hinnoitteluun"
                  : finalPrice !== null && (
                      <>
                        €{finalPrice}
                        <span>
                          {" "}
                          / {billingType === "yearly" ? "vuosi" : "kk"}
                        </span>
                      </>
                    )}
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
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        );
      }),
    [pricingPlans, highlightPlan, tuottaja, omistaja, finalPrice, billingType, openFirstPopup]
  );

  return (
    <section className="pricing-section">
      <PricingInfo/>
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
        {cards}
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
            Tuottajat<span>{tuottaja > 50 ? ">50" : tuottaja}</span>
          </div>
          <div className="pricing-section__slider-container">
            <input
              type="range"
              min="1"
              max="51"
              value={tuottaja > 50 ? 51 : tuottaja}
              onChange={(e) => {
                const v = Number(e.target.value);
                setTuottaja(v === 51 ? 51 : v);
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
            Omistajat<span>{omistaja > 20 ? ">20" : omistaja}</span>
          </div>
          <div className="pricing-section__slider-container">
            <input
              type="range"
              min="1"
              max="21"
              value={omistaja > 20 ? 21 : omistaja}
              onChange={(e) => {
                const v = Number(e.target.value);
                setOmistaja(v === 21 ? 21 : v);
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
        <div
          className="pricing-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div
            className="pricing-popup__overlay"
            onClick={closeFirstPopup}
          ></div>
          <div className="pricing-popup__content">
            <div className="pricing-popup__header">
              <h3
                id="popup-title"
                className="pricing-popup__title"
              >
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
              <div className="pricing-popup__plan-name">
                {selectedPlan?.name}
              </div>
              <div className="pricing-popup__plan-price">
                {finalPrice !== null
                  ? `€${finalPrice} / ${
                      billingType === "yearly" ? "vuosi" : "kk"
                    }`
                  : "Hinta ei saatavilla"}
              </div>
              <ul className="pricing-popup__plan-features">
                {selectedPlan?.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <button className="pricing-popup__add-to-cart">
                Lisää ostoskoriin
              </button>
            </div>

            <div className="pricing-popup__additional-services">
              <h4>Lisäpalvelut</h4>
              {[1, 2, 3].map((id) => (
                <div key={id} className="pricing-popup__service-item">
                  <span>Palvelun nimi lyhyesti</span>
                  <div className="pricing-popup__service-actions">
                    <button
                      className="pricing-popup__more-info"
                      onClick={openSecondPopup}
                    >
                      Lue lisää
                    </button>
                    <button className="pricing-popup__cart">
                      Ostoskoriin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSecondPopupOpen && (
        <div
          className="pricing-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-popup-title"
        >
          <div
            className="pricing-popup__overlay"
            onClick={closeSecondPopup}
          ></div>
          <div className="pricing-popup__content">
            <div className="pricing-popup__header">
              <h3
                id="service-popup-title"
                className="pricing-popup__title"
              >
                Tietoa tästä palvelusta
              </h3>
              <button
                ref={closeSecondRef}
                className="pricing-popup__close"
                onClick={closeSecondPopup}
              >
                ×
              </button>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              className="pricing-popup__back-btn"
              onClick={closeSecondPopup}
            >
              Takaisin
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
