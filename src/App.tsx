import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollProgress from "./Components/ScrollProgress";
import StrategyAuditWidget from "./Components/StrategyAuditWidget";
import StructuredData from "./Components/StructuredData";
import BreadcrumbTrail from "./Components/BreadcrumbTrail";
import BackToTop from "./Components/BackToTop";
import ConversionDock from "./Components/ConversionDock";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ClientelePage from "./pages/ClientelePage";
import ContactPage from "./pages/ContactPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <StructuredData />
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <BreadcrumbTrail />
        <div key={location.pathname} className="route-fade">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/clientele" element={<ClientelePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <StrategyAuditWidget />
      <ConversionDock />
      <BackToTop />
    </div>
  );
}

export default App;
