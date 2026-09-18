import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  ChevronRight, 
  Calculator, 
  AlertTriangle, 
  Lightbulb, 
  Info,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { getGuideBySlug, GUIDES_DATABASE } from '../data/guidesData';
import { FAQAccordion } from '../components/common/FAQAccordion';

export const GuideDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  useEffect(() => {
    if (guide) {
      document.title = guide.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', guide.metaDescription);
      }
    }
  }, [guide]);

  if (!guide) {
    return <Navigate to="/404" replace />;
  }

  const relatedGuides = GUIDES_DATABASE.filter(g => g.slug !== guide.slug).slice(0, 3);

  const renderCallout = (callout: { type: 'tip' | 'warning' | 'info'; title: string; text: string }) => {
    if (callout.type === 'warning') {
      return (
        <div className="my-6 p-5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-950">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <strong className="block font-bold">{callout.title}</strong>
            <p className="text-rose-900 leading-relaxed">{callout.text}</p>
          </div>
        </div>
      );
    }
    if (callout.type === 'tip') {
      return (
        <div className="my-6 p-5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-950">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <strong className="block font-bold">{callout.title}</strong>
            <p className="text-amber-900 leading-relaxed">{callout.text}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="my-6 p-5 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-3 text-sky-950">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <strong className="block font-bold">{callout.title}</strong>
          <p className="text-sky-900 leading-relaxed">{callout.text}</p>
        </div>
      </div>
    );
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600">Início</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/guias" className="hover:text-brand-600">Guias & Artigos</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-[220px] sm:max-w-none">
          {guide.shortTitle}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-md border border-brand-100">
            {guide.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> {guide.readTime}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">•</span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5" /> Atualizado em 18 de setembro de 2026
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-sans tracking-tight leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {guide.summary}
        </p>

        {/* Author box */}
        <div className="pt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{guide.author.name}</p>
            <p className="text-[11px] text-slate-500">{guide.author.role} • Revisão Técnica ABNT/SINAPI</p>
          </div>
        </div>
      </header>

      {/* CTA to Calculator (if available) */}
      {guide.calculatorSlug && (
        <aside className="p-5 bg-gradient-to-r from-brand-900 to-brand-800 text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-accent-300">
              Ferramenta Gratuita
            </span>
            <h3 className="text-base font-bold text-white">
              Prefere calcular automaticamente?
            </h3>
            <p className="text-xs text-slate-300">
              Acesse a {guide.calculatorName} e tenha o resultado em menos de 30 segundos.
            </p>
          </div>
          <Link
            to={`/${guide.calculatorSlug}`}
            className="px-5 py-2.5 bg-accent-500 hover:bg-accent-400 active:bg-accent-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm flex items-center gap-2 flex-shrink-0"
          >
            <Calculator className="w-4 h-4" />
            <span>Abrir Calculadora</span>
          </Link>
        </aside>
      )}

      {/* Table of Contents */}
      <nav aria-label="Sumário do Artigo" className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-600" />
          Tópicos deste Guia
        </h2>
        <ul className="space-y-2 text-sm">
          {guide.tableOfContents.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-brand-700 hover:text-brand-900 hover:underline font-medium flex items-center gap-1.5"
              >
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Sections */}
      <div className="space-y-10 text-slate-700 leading-relaxed text-base">
        {guide.contentSections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-2 border-b border-slate-100 pb-2">
              {section.heading}
            </h2>

            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {para}
              </p>
            ))}

            {section.callout && renderCallout(section.callout)}

            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3.5 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3.5 text-slate-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* FAQs Section */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Perguntas Frequentes sobre {guide.shortTitle}
          </h2>
          <FAQAccordion items={guide.faqs} />
        </section>
      )}

      {/* Related Guides */}
      <section className="pt-8 border-t border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Outros Guias Recomendados</h3>
          <Link to="/guias" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedGuides.map((rel) => (
            <Link
              key={rel.slug}
              to={`/guias/${rel.slug}`}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-card transition-all group flex flex-col justify-between space-y-2"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors mt-2 line-clamp-2">
                  {rel.title}
                </h4>
              </div>
              <span className="text-xs text-brand-600 font-semibold inline-flex items-center gap-1 pt-2">
                Ler artigo <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};
