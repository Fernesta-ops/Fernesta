import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster } from "sonner";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollProgress from "./Components/ScrollProgress";
import StrategyAuditWidget from "./Components/StrategyAuditWidget";
import StructuredData from "./Components/StructuredData";
import BreadcrumbTrail from "./Components/BreadcrumbTrail";
import BackToTop from "./Components/BackToTop";
import ConversionDock from "./Components/ConversionDock";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ClientelePage = lazy(() => import("./pages/ClientelePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function App() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const suppressGlobalCtas = location.pathname === "/contact-us";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
            initial={prefersReducedMotion ? undefined : "initial"}
            animate={prefersReducedMotion ? undefined : "animate"}
            exit={prefersReducedMotion ? undefined : "exit"}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Suspense fallback={<div className="route-loading">Loading page...</div>}>
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
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
      {!suppressGlobalCtas && <StrategyAuditWidget />}
      {!suppressGlobalCtas && <ConversionDock />}
      <BackToTop />
    </div>
  );
}

export default App;
