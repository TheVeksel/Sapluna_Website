import { useGetProductBySlugQuery } from "../../../api/wpApi";
import { useEffect } from "react";
import LocalLoader from "../../common/LocalLoader";

type PlanKey = "solo" | "team" | "enterprise";
type BillingType = "monthly" | "yearly";

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
  const { data, isLoading } = useGetProductBySlugQuery("hinnoittelu"); 
  const acf = data?.[0]?.acf;

  useEffect(() => {
    if (!acf) return;

    const solo = parseFloat(acf?.solo_price || 0);
    const teamBase = parseFloat(acf?.team_base_price || 0);
    const perTuottaja = parseFloat(acf?.price_per_tuottaja || 0);
    const perOmistaja = parseFloat(acf?.price_per_omistaja || 0);

    const plan: PlanKey =
      tuottaja > 50 || omistaja > 20 ? "enterprise" :
      tuottaja + omistaja <= 2 ? "solo" : "team";

    let price: number | null = null;

    if (plan === "solo") {
      price = solo;
    } else if (plan === "team") {
      price = teamBase;
      if (tuottaja > 1) price += (tuottaja - 1) * perTuottaja;
      if (omistaja > 1) price += (omistaja - 1) * perOmistaja;
    }

    if (price && billing === "yearly") price *= 10;

    onHighlightChange(plan);
    onPriceChange(price);
  }, [tuottaja, omistaja, billing, acf, onHighlightChange, onPriceChange]);

  if (isLoading) return <LocalLoader></LocalLoader>

  return null;
}
