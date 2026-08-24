import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CookieConsent } from './components/common/CookieConsent';
import { HomePage } from './pages/HomePage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { MaterialsGuidePage } from './pages/MaterialsGuidePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useScrollToTop } from './hooks/useScrollToTop';
import { trackPageView } from './utils/analytics';

const AppContent: React.FC = () => {
  useScrollToTop();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculadoras" element={<AllCalculatorsPage />} />
          
          {/* Specific Canonical SEO Routes */}
          <Route path="/calculadora-de-piso" element={<CalculatorDetailPage forcedSlug="calculadora-de-piso" />} />
          <Route path="/calculadora-de-tijolos" element={<CalculatorDetailPage forcedSlug="calculadora-de-tijolos" />} />
          <Route path="/calculadora-de-tinta" element={<CalculatorDetailPage forcedSlug="calculadora-de-tinta" />} />
          <Route path="/calculadora-de-concreto" element={<CalculatorDetailPage forcedSlug="calculadora-de-concreto" />} />
          <Route path="/calculadora-de-cimento" element={<CalculatorDetailPage forcedSlug="calculadora-de-cimento" />} />
          <Route path="/calculadora-de-argamassa" element={<CalculatorDetailPage forcedSlug="calculadora-de-argamassa" />} />
          <Route path="/calculadora-de-telhas" element={<CalculatorDetailPage forcedSlug="calculadora-de-telhas" />} />
          <Route path="/calculadora-de-rejunte" element={<CalculatorDetailPage forcedSlug="calculadora-de-rejunte" />} />
          <Route path="/calculadora-de-rodape" element={<CalculatorDetailPage forcedSlug="calculadora-de-rodape" />} />
          <Route path="/calculadora-de-massa-corrida" element={<CalculatorDetailPage forcedSlug="calculadora-de-massa-corrida" />} />

          {/* Dynamic Slug Route */}
          <Route path="/:slug" element={<CalculatorDetailPage />} />

          {/* Informational & Institutional Pages */}
          <Route path="/materiais" element={<MaterialsGuidePage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
