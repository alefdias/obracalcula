import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CalculatorMeta, getRelatedCalculators } from '../../data/calculatorRegistry';
import { FAQAccordion } from './FAQAccordion';
import { AdPlaceholder } from './AdPlaceholder';

interface SEOSectionProps {
  calculator: CalculatorMeta;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ calculator }) => {
  const related = getRelatedCalculators(calculator.id, 3);

  return (
    <div className="mt-12 pt-8 border-t border-slate-200 space-y-10">
      {/* How to calculate step by step */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-brand-50 text-brand-600 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Como calcular a quantidade de {calculator.shortTitle.toLowerCase()}?
          </h2>
        </div>

        <p className="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
          Calcular materiais de construção com precisão é a chave para evitar duas dores de cabeça frequentes na obra:
          parar o trabalho por falta de material ou gastar dinheiro à toa com sobras e entulho. Siga o passo a passo abaixo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculator.howToSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {idx + 1}
              </span>
              <p className="text-sm text-slate-700 font-medium leading-snug pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips Section */}
      {calculator.tips && calculator.tips.length > 0 && (
        <section className="bg-amber-50/60 p-6 sm:p-8 rounded-2xl border border-amber-200/70">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-950">
              Dicas de Mestre para Economizar na Compra
            </h3>
          </div>

          <div className="space-y-3">
            {calculator.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-amber-900/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publicidade Discreta In-Content */}
      <AdPlaceholder slot="in-content" category={calculator.name} />

      {/* FAQ Accordion */}
      {calculator.faqList && calculator.faqList.length > 0 && (
        <FAQAccordion items={calculator.faqList} />
      )}

      {/* Internal Links: Related Calculators */}
      {related.length > 0 && (
        <section className="pt-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span>Outras calculadoras que você pode precisar</span>
            <Link to="/calculadoras" className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(rel => (
              <Link
                key={rel.id}
                to={`/${rel.slug}`}
                className="group p-4 bg-white rounded-xl border border-slate-200/90 hover:border-brand-300 hover:shadow-card transition-all"
              >
                <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                  {rel.categoryLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors mt-2">
                  {rel.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
