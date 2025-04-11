import { useEffect } from "react";

type PlanKey = "solo" | "team" | "enterprise";
type BillingType = "monthly" | "yearly";

const PRICES = {
  solo: 94,          
  team: {
    base: 94,        
    perOmistaja: 50, 
    perTuottaja: 10  
  }
}

export default function PricingCalculator({
  tuottaja,
  omistaja,
  billing,
  onHighlightChange,
  onPriceChange,
}: {
  tuottaja: number;
  omistaja: number;
  billing: BillingType;
  onHighlightChange: (plan: PlanKey) => void;
  onPriceChange: (price: number | null) => void;
}) {
  useEffect(() => {
    const plan: PlanKey = 
      tuottaja > 50 || omistaja > 20 ? "enterprise" :
      tuottaja + omistaja <= 2 ? "solo" : "team";

    let price: number | null = null;
    
    if (plan === "solo") {
      price = PRICES.solo;
    } 
    else if (plan === "team") {
      price = PRICES.team.base;
      
      if (omistaja > 1) {
        price += (omistaja - 1) * PRICES.team.perOmistaja;
      }
      
      if (tuottaja > 1) {
        price += (tuottaja - 1) * PRICES.team.perTuottaja;
      }
    }

    if (price !== null && billing === "yearly") {
      price *= 10;
    }

    onHighlightChange(plan);
    onPriceChange(price);
  }, [tuottaja, omistaja, billing, onHighlightChange, onPriceChange]);

  return null;
}