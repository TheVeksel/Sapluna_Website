import React, { useState } from "react";
import "./PricingPage.scss"; 

// Define available packages with base pricing and extra costs
const packages = [
  { name: "SOLO, kuukausipaketti", basePrice: 94, owners: 1, producers: 1, extraOwner: 50, extraProducer: 10 },
  { name: "TEAM, kuukausipaketti", basePrice: 143, owners: 1, producers: 1, extraOwner: 50, extraProducer: 10 },
  { name: "SOLO, vuosipaketti", basePrice: 940, owners: 1, producers: 1, extraOwner: 50, extraProducer: 10 },
  { name: "TEAM, vuosipaketti", basePrice: 1430, owners: 1, producers: 1, extraOwner: 50, extraProducer: 10 }
];

const PricingCalculator: React.FC = () => {
  const [owners, setOwners] = useState<number>(1);
  const [producers, setProducers] = useState<number>(1);
  const [billingPeriod, setBillingPeriod] = useState<number>(1); // 1 = kuukausi, 12 = vuosi

  // Function to calculate the best pricing option
  const calculatePrice = () => {
    let bestPackage = null;
    let lowestPrice = Infinity;

    for (const pkg of packages) {
      if ((owners > 1 || producers > 1) && pkg.name.includes("SOLO")) continue;

      const extraOwners = Math.max(0, owners - pkg.owners);
      const extraProducers = Math.max(0, producers - pkg.producers);
      let totalPrice = pkg.basePrice + extraOwners * pkg.extraOwner + extraProducers * pkg.extraProducer;
      if (pkg.name.includes("vuosipaketti")) totalPrice = totalPrice * Math.min(billingPeriod, 10);
      else totalPrice *= billingPeriod;

      if (totalPrice < lowestPrice) {
        lowestPrice = totalPrice;
        bestPackage = pkg;
      }
    }
    return bestPackage ? { name: bestPackage.name, price: lowestPrice } : null;
  };

  const bestOption = calculatePrice();

  return (
    <section>
      <h1>TESTIVERSIO,ULKONÄKÖ VIELÄ MUUTTUU</h1>
      <div className="pricing-container">
        <h2>Hintalaskuri</h2>
        <label>Omistajien määrä: {owners}</label>
        <input type="range" min="1" max="20" value={owners} onChange={(e) => setOwners(Number(e.target.value))} />
        
        <label>Tuottajien määrä: {producers}</label>
        <input type="range" min="1" max="50" value={producers} onChange={(e) => setProducers(Number(e.target.value))} />
        
        <label>Laskutuskausi:</label>
        <select value={billingPeriod} onChange={(e) => setBillingPeriod(Number(e.target.value))}>
          <option value={1}>Kuukausi</option>
          <option value={12}>Vuosi</option>
        </select>
        
        {bestOption ? (
          <div className="pricing-result">
            <p>Paras vaihtoehto: <strong>{bestOption.name}</strong></p>
            <p>Hinta: <strong>{bestOption.price} €</strong></p>
          </div>
        ) : (
          <p>Ei saatavilla olevia paketteja</p>
        )}
      </div>
    </section>
  );
};

export default PricingCalculator;
