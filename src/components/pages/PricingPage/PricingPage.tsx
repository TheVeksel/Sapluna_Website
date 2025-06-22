import { useState, useEffect, useRef, useMemo } from "react";
import "./PricingPage.scss";
import PricingCalculator from "./PricingCalculator";
import PricingInfo from "./PricingInfo/PricingInfo";
import PricingContact from "./PricingInfo/PricingContacts";
import TariffTable from "./Pricingtable/TariffTable";
import OrderPopUp from "./PopUps/OrderPopUp";
import { useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import { useGetPostBySlugQuery } from "../../../api/wpApi";

type PlanKey = "solo" | "team" | "enterprise";

interface PlanFeatures {
  key: string;
  features: string[];
}

export default function PricingPage() {
  // Billing type: false = monthly, true = yearly
  const [isYearly, setIsYearly] = useState(false);
  const [highlightPlan, setHighlightPlan] = useState<PlanKey>("solo");
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [tuottaja, setTuottaja] = useState(1); // Producers
  const [omistaja, setOmistaja] = useState(1); // Owners
  const [arePlansVisible, setArePlansVisible] = useState(false);
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [pricingPlans, setPricingPlans] = useState<
    {
      name: string;
      key: PlanKey;
      features: string[];
    }[]
  >([]);

  const location = useLocation();
  const { isLoading } = useGetPostBySlugQuery("pricing-page");

  useEffect(() => {
    if (location.hash === "#plans") {
      const scrollToTarget = () => {
        const element = document.getElementById("plans");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // try again until it appears
          setTimeout(scrollToTarget, 100);
        }
      };

      scrollToTarget();
    }
  }, [location]);

  // Refs to elements for scroll and focus handling
  const plansRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const closeFirstRef = useRef<HTMLButtonElement>(null);

  // Observer to detect if plan cards are in the viewport
  useEffect(() => {
    if (!plansRef.current || pricingPlans.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => setArePlansVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(plansRef.current);

    return () => observer.disconnect();
  }, [pricingPlans]);

  // Disable background scroll when a popup is open
  useEffect(() => {
    document.body.style.overflow = isFirstPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFirstPopupOpen]);

  // Auto focus the close button when first popup opens
  useEffect(() => {
    if (isFirstPopupOpen) closeFirstRef.current?.focus();
  }, [isFirstPopupOpen]);

  // Popup control functions
  const openFirstPopup = () => setIsFirstPopupOpen(true);
  const closeFirstPopup = () => setIsFirstPopupOpen(false);

  // Handle features loaded from PricingInfo component
  const handleFeaturesLoaded = (features: PlanFeatures[]) => {
    if (!features || !Array.isArray(features)) return;
    const newPricingPlans = features.map((plan) => ({
      name: plan.key.charAt(0).toUpperCase() + plan.key.slice(1),
      key: plan.key as PlanKey,
      features: plan.features.filter((f) => f),
    }));
    setPricingPlans(newPricingPlans);
  };

  // Determine billing type and selected plan
  const billingType = isYearly ? "yearly" : "monthly";
  const selectedPlan = pricingPlans.find((p) => p.key === highlightPlan);

  // Generate pricing cards dynamically
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
                  ? "Ota yhteyttä myyntiin"
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
              Tilaa
            </button>

            <ul className="pricing-section__card-features">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button
              className="readmore-button"
              onClick={() =>
                tableRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Lue lisää
            </button>
          </div>
        );
      }),
    [highlightPlan, tuottaja, omistaja, finalPrice, billingType, pricingPlans]
  );

  if (isLoading) {
    return (
      <section style={{ minHeight: "100vh" }}>
        <Loader />
      </section>
    );
  }

  return (
    <section className="pricing-section">
      <div className="wrapper">
        {/* Load features from WP */}
        <PricingInfo onFeaturesLoaded={handleFeaturesLoaded} />

        <h2 className="pricing-section__title" id="plans">
          Valitse sinulle sopiva paketti
        </h2>

        {/* Billing type toggle */}
        <div className="pricing-section__billing-toggle">
          <span className="pricing-section__billing-toggle-label">
            Kuukausi
          </span>
          <label className="pricing-section__billing-toggle-switch">
            <input
              type="checkbox"
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <span />
          </label>
          <span className="pricing-section__billing-toggle-label">Vuosi</span>
        </div>

        {/* Plan cards */}
        <div className="pricing-section__grid" ref={plansRef}>
          {cards}
        </div>

        {/* Price calculator */}
        <PricingCalculator
          tuottaja={tuottaja}
          omistaja={omistaja}
          billing={billingType}
          onHighlightChange={setHighlightPlan}
          onPriceChange={setFinalPrice}
        />

        {/* Sliders for producers and owners */}
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
                    "--fill-percent": `${Math.min(
                      100,
                      (tuottaja / 51) * 100
                    )}%`,
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
                    "--fill-percent": `${Math.min(
                      100,
                      (omistaja / 21) * 100
                    )}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>

        {/* Contact form */}
        <PricingContact />

        {isFirstPopupOpen && (
          <OrderPopUp
            selectedPlan={selectedPlan}
            finalPrice={finalPrice}
            billingType={billingType}
            closeFirstPopup={closeFirstPopup}
            closeFirstRef={closeFirstRef}
            licenseType={highlightPlan}
            omistaja={omistaja}
            tuottaja={tuottaja}
          />
        )}
        <TariffTable ref={tableRef} />
      </div>
    </section>
  );
}
