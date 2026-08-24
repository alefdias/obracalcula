import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Home, ArrowRight, Search } from 'lucide-react';
import { CALCULATORS } from '../data/calculatorRegistry';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <div className="w-16 h-16 bg-brand-50 text-brand-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
        <Calculator className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-bold text-accent-600 uppercase tracking-wider">Erro 404</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Calculadora não encontrada
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
          A página ou calculadora que você procurou não existe ou mudou de endereço.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" />
          <span>Voltar para o Início</span>
        </Link>
        <Link to="/calculadoras" className="btn-secondary">
          <span>Ver todas as calculadoras</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Suggested calculators */}
      <div className="pt-8 text-left border-t border-slate-200">
        <h3 className="text-sm font-bold text-slate-700 mb-3">
          Calculadoras Populares:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CALCULATORS.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              to={`/${c.slug}`}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-xs transition-all flex items-center justify-between text-sm font-semibold text-slate-800"
            >
              <span>{c.name}</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          ))}
        </div>
      </div>

      {/* Publicidade Discreta */}
      <AdPlaceholder slot="bottom-banner" category="Construção" />
    </div>
  );
};
