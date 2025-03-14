import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Reset.css";
import "./styles/main.scss";
import Header from "./components/common/Header/Header";
import FrontPage from "./components/pages/FrontPage/FrontPage";
import NotFound from "./components/common/NotFound";
import Footer from "./components/common/footer/Footer";
import Page from "./components/pages/LandingPage";

export default function App() {
  return (
    <div className="main-container"> 
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/landing/:slug" element={<Page/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
