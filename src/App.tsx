import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Reset.css";
import "./styles/main.scss";
import { usePrefetch as useWpApiPrefetch } from "./api/wpApi";
import Header from "./components/common/Header/Header";
import FrontPage from "./components/pages/FrontPage/FrontPage";
import Footer from "./components/common/footer/Footer";
import UnderDevelopment from "./components/common/underDevelopment/UnderDevelopment";
import ScrollToTop from "./components/common/ScrollToTop";
import { useEffect } from "react";
import PricingPage from "./components/pages/PricingPage/PricingPage";
import SolutionsModel from "./components/pages/SolutionsPage/SolutionsModel";
import ProductModel from "./components/pages/InfoAboutSapluna/ProductModel";
import FeaturesPage from "./components/pages/InfoAboutSapluna/Features/FeaturesPage";
import BoockingPopup from "./components/common/boockingPopup/boockingPopup";
import ServicesModel from "./components/pages/Services/ServicesModel";
import PrivicyStatement from "./components/pages/otherPages/PrivicyStatement/PrivacyStatement";
import AboutUs from "./components/pages/AboutUs/AboutUs";

export default function App() {
  return (
    <Provider store={store}>
      <div className="main-container">
        <Router>
          <ScrollToTop />
          <Header />
          <BoockingPopup />
          <main>
            <Routes>
              <Route path="/" element={<FrontPagePrefetch />} />
              {/* Solutions */}
              <Route path="/ratkaisut/:slug" element={<SolutionsModel />} />
              {/* Product */}
              <Route path="/tuote/:slug" element={<ProductModel />} />
              <Route path="/tuote/ominaisuudet" element={<FeaturesPage />} />
              {/* Services */}
              <Route path="/palvelut/:slug" element={<ServicesModel />} />
              {/* Topical */}
              <Route path="/ajankohtaista/blogi" element={<UnderDevelopment />} />
              <Route
                path="/ajankohtaista/tiedotteet"
                element={<UnderDevelopment />}
              />
              {/* About us */}
              <Route path="/meista" element={<AboutUs />} />
              {/* Pricing page */}
              <Route path="/hinnoittelu" element={<PricingPage />} />
              {/*Other pages*/}
              <Route path="/tietosuojaseloste" element={<PrivicyStatement/>}/>
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

function FrontPagePrefetch() {
  const prefetchAllPosts = useWpApiPrefetch("getAllPosts");

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    prefetchAllPosts(undefined, { ifOlderThan: 3600 });
  }, [prefetchAllPosts]);

  return <FrontPage />;
}
