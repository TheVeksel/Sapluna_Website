import CustomerService from "./FrontPageParts/customersService/CustomerService";
import Benefits from "./FrontPageParts/benefitsSection/Benifits";
import HeroSection from "./FrontPageParts/HeroSection/HeroSection";
import SolutionsByRole from "./FrontPageParts/SolutionsByRole/SolutionsByRole";
import ContentWithImage from "./FrontPageParts/сontentWithImage/ContentWithImage";
import GlobeSection from "./FrontPageParts/globeSection/GlobeSection";
import DemoCTA from "./FrontPageParts/demoCTA/DemoCTA";

export default function FrontPage() {
  return (
    <main>
      <HeroSection />
      <SolutionsByRole/>
      <Benefits/>
      <CustomerService/>
      <ContentWithImage/>
      <GlobeSection/>
      <DemoCTA/>
    </main>
  );
}
