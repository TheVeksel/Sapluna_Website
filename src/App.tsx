import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Reset.css";
import "./styles/main.scss";
import Header from "./components/common/Header/Header";
import FrontPage from "./components/pages/FrontPage/FrontPage";
import Footer from "./components/common/footer/Footer";
import UnderDevelopment from "./components/common/underDevelopment/UnderDevelopment";

export default function App() {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<FrontPage />} />

          {/* Ratkaisut */}
          <Route path="/ratkaisut/mallituotanto" element={<UnderDevelopment />} />
          <Route path="/ratkaisut/tapahtumapaikalle" element={<UnderDevelopment />} />
          <Route path="/ratkaisut/tapahtumantuottajalle" element={<UnderDevelopment />} />
          <Route path="/ratkaisut/Omistajalle" element={<UnderDevelopment />} />
          <Route path="/ratkaisut/palveluntoimittajalle" element={<UnderDevelopment />} />

          {/* Tuote */}
          <Route path="/tuote/tietoa" element={<UnderDevelopment />} />
          <Route path="/tuote/ominaisuudet" element={<UnderDevelopment />} />
          <Route path="/tuote/työskentely" element={<UnderDevelopment />} />
          <Route path="/tuote/tietoturva" element={<UnderDevelopment />} />
          <Route path="/tuote/roadmap" element={<UnderDevelopment />} />

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
          <Route path="/verkkokauppa/hinnoittelu" element={<UnderDevelopment />} />
          <Route path="/verkkokauppa/verkkokauppa" element={<UnderDevelopment />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}