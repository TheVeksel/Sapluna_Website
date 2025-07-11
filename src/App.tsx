import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Reset.css"; //Resets annoying styles by default like list style etc.
import "./styles/main.scss";
import { usePrefetch as useWpApiPrefetch } from "./api/wpApi";
import Header from "./components/common/Header/Header";
import FrontPage from "./components/pages/FrontPage/FrontPage";
import Footer from "./components/common/footer/Footer";
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
import BlogPage from "./components/pages/Topical/BlogPage/BlogPage";
import BlogPost from "./components/pages/Topical/BlogPage/SinglePost/BlogPost";
import Cart from "./components/pages/Cart/Cart";
import Checkout from "./components/pages/Cart/Checkout/Checkout";
import Shop from "./components/pages/Shop/Shop";
import CategoryPage from "./components/pages/Shop/CategoryPage";
import ProductPage from "./components/pages/Shop/ProductPage/ProductPage";
import Terms from "./components/pages/Terms/Terms";

export default function App() {
  return (
    <Provider store={store}>
      {/*Redux toolkit query*/}
      <div className="main-container">
        <Router>
          <ScrollToTop />
          <Header />
          <BoockingPopup />
          <main>
            <Routes>
              <Route path="/" element={<FrontPagePrefetch />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* Solutions */}
              <Route path="/ratkaisut/:slug" element={<SolutionsModel />} />
              {/* Product */}
              <Route path="/tuote/:slug" element={<ProductModel />} />
              <Route path="/tuote/ominaisuudet" element={<FeaturesPage />} />
              {/* Services */}
              <Route path="/palvelut/:slug" element={<ServicesModel />} />
              {/* Topical */}
              <Route path="/ajankohtaista/blogi" element={<BlogPage />} />
              <Route path="/ajankohtaista/blogi/:slug" element={<BlogPost />} />
              {/* About us */}
              <Route path="/meista" element={<AboutUs />} />
              {/* Pricing page */}
              <Route path="/hinnoittelu" element={<PricingPage />} />
              <Route path="/verkkokauppa" element={<Shop />} />
              <Route path="/tuoteryhma/:slug" element={<CategoryPage />} />
              <Route path="/verkkokauppa/tuote/:slug" element={<ProductPage />} />
              {/*Other pages*/}
              <Route path="/tietosuojaseloste" element={<PrivicyStatement />} />
              <Route path="/tilausehdot" element={<Terms />} />
              <Route path="/payment-success" element={<Terms />} />
              <Route path="/payment-cancel" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

//Requests data from the server while the user is on the home page
function FrontPagePrefetch() {
  const prefetchAllPosts = useWpApiPrefetch("getAllPosts");

  useEffect(() => {
    window.history.scrollRestoration = "manual"; // Prevent automatic scroll restoration after navigation
    prefetchAllPosts(undefined, { ifOlderThan: 3600 }); // Avoid refetching if cache is recent
  }, [prefetchAllPosts]);

  return <FrontPage />;
}
