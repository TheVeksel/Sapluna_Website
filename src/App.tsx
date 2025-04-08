import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Reset.css";
import "./styles/main.scss";
import Header from "./components/common/Header/Header";
import FrontPage from "./components/pages/FrontPage/FrontPage";
import Footer from "./components/common/footer/Footer";
import UnderDevelopment from "./components/common/underDevelopment/UnderDevelopment";
import ScrollToTop from "./components/common/ScrollToTop";
import { useEffect } from "react";
import PricingPage from "./components/pages/PricingPage/PricingPage";
import SolutionsModel from "./components/pages/SolutionsPage/SolutionsModel";
import ProductModel from "./components/pages/InfoAboutSapluna/ProductModel";

export default function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  
  return (
    <Provider store={store}>
    <div className="main-container">
      <Router>
        <ScrollToTop/>
        <Header />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<FrontPage />} />

          {/* Ratkaisut */}
          <Route path="/ratkaisut/:slug" element={<SolutionsModel />} />

          {/* Tuote */}
          <Route path="/tuote/:slug" element={<ProductModel />} />
          <Route path="/tuote/ominaisuudet" element={<UnderDevelopment />} />

          {/* Palvelut */}
          <Route path="/palvelut/muotoilupalvelu" element={<UnderDevelopment />} />
          <Route path="/palvelut/koulutukset" element={<UnderDevelopment />} />
          <Route path="/palvelut/työpajat" element={<UnderDevelopment />} />

          {/* Ajankohtaista */}
          <Route path="/ajankohtaista/blogi" element={<UnderDevelopment />} />
          <Route path="/ajankohtaista/tiedotteet" element={<UnderDevelopment />} />

          {/* Meistä */}
          <Route path="/meistä" element={<UnderDevelopment />} />

          {/* Verkkokauppa */}
          <Route path="/hinnoittelu" element={<PricingPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </Provider>
  );
}