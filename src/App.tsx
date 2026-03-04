import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
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
import NotFoundPage from "./pages/NotFoundPage";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <StructuredData />
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <BreadcrumbTrail />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/clientele" element={<ClientelePage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
      <StrategyAuditWidget />
      <ConversionDock />
      <BackToTop />
    </div>
  );
}

export default App;
