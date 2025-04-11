import { useState, useEffect, useRef } from "react";
import "./PricingPage.scss";
import PricingCalculator from "./Pricingcalculator";

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
      tag: "Suosituin",
    },
  ];

  const billingType = isYearly ? "yearly" : "monthly";

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
              {plan.tag && (
                <div className="pricing-section__card-tag">{plan.tag}</div>
              )}

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

              <button className="pricing-section__card-btn">Kokeile</button>

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
    </section>
  );
}
