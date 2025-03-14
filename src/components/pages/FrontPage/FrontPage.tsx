import CustomerService from "./customersService/CustomerService";
import Benefits from "./FrontPageParts/benefitsSection/Benifits";
import HeroSection from "./FrontPageParts/HeroSection/HeroSection";
import SolutionsByRole from "./FrontPageParts/SolutionsByRole/SolutionsByRole";

export default function FrontPage() {
  return (
    <main>
      <HeroSection />
      <SolutionsByRole/>
      <Benefits/>
      <CustomerService/>
    </main>
  );
}
