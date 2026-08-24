import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Home, ShieldCheck, Clock, Share2 } from 'lucide-react';
import { getCalculatorBySlug, CalculatorMeta } from '../data/calculatorRegistry';
import { SEOSection } from '../components/common/SEOSection';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

// Import all calculators
import { FloorCalculator } from '../calculators/floor/FloorCalculator';
import { BrickCalculator } from '../calculators/bricks/BrickCalculator';
import { PaintCalculator } from '../calculators/paint/PaintCalculator';
import { ConcreteCalculator } from '../calculators/concrete/ConcreteCalculator';
import { CementCalculator } from '../calculators/cement/CementCalculator';
import { MortarCalculator } from '../calculators/mortar/MortarCalculator';
import { RoofCalculator } from '../calculators/roof/RoofCalculator';
import { GroutCalculator } from '../calculators/grout/GroutCalculator';
import { BaseboardCalculator } from '../calculators/baseboard/BaseboardCalculator';
import { SpackleCalculator } from '../calculators/spackle/SpackleCalculator';

interface CalculatorDetailPageProps {
  forcedSlug?: string;
}

export const CalculatorDetailPage: React.FC<CalculatorDetailPageProps> = ({ forcedSlug }) => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = forcedSlug || slug || '';
  
  // Clean slug if it has leading slash or "calculadora-de-" prefix
  const cleanSlug = activeSlug.replace(/^\//, '');
  const calculator = getCalculatorBySlug(cleanSlug);

  useEffect(() => {
    if (calculator) {
      document.title = calculator.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', calculator.metaDescription);
      }
    }
  }, [calculator]);

  if (!calculator) {
    return <Navigate to="/404" replace />;
  }

  const renderCalculatorComponent = (id: string) => {
    switch (id) {
      case 'piso':
        return <FloorCalculator />;
      case 'tijolos':
        return <BrickCalculator />;
      case 'tinta':
        return <PaintCalculator />;
      case 'concreto':
        return <ConcreteCalculator />;
      case 'cimento':
        return <CementCalculator />;
      case 'argamassa':
        return <MortarCalculator />;
      case 'telhas':
        return <RoofCalculator />;
      case 'rejunte':
        return <GroutCalculator />;
      case 'rodape':
        return <BaseboardCalculator />;
      case 'massa-corrida':
        return <SpackleCalculator />;
      default:
        return <FloorCalculator />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/calculadoras?cat=${calculator.category}`} className="hover:text-brand-600">
          {calculator.categoryLabel}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
          {calculator.shortTitle}
        </span>
      </nav>

      {/* Page Heading (H1 & Subtitle) */}
      <div className="space-y-2.5 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100">
            {calculator.categoryLabel}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> Leva menos de {calculator.estimatedTimeSec} segundos
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight">
          {calculator.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {calculator.detailedDescription}
        </p>
      </div>

      {/* Main Calculator Interactive Component */}
      <section aria-label="Formulário de Cálculo">
        {renderCalculatorComponent(calculator.id)}
      </section>

      {/* Affiliate recommendations */}
      <AdPlaceholder slot="affiliate-products" category={calculator.categoryLabel} />

      {/* SEO Section (How-To, Pro Tips, FAQs, Internal Links) */}
      <SEOSection calculator={calculator} />

      {/* Bottom AdSense slot */}
      <AdPlaceholder slot="bottom-banner" category={calculator.name} />
    </div>
  );
};
