import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Search, ShieldCheck, ChevronRight, Calculator, FileText } from 'lucide-react';
import { GUIDES_DATABASE } from '../data/guidesData';

export const GuidesListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  useEffect(() => {
    document.title = 'Guias Técnicos e Dicas de Construção Civil — ObraCalcula';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Confira guias práticos, artigos técnicos, normas e tabelas de consumo de materiais para construir ou reformar sem desperdício.'
      );
    }
  }, []);

  const categories = ['todas', ...Array.from(new Set(GUIDES_DATABASE.map(g => g.category)))];

  const filteredGuides = GUIDES_DATABASE.filter(guide => {
    const matchesCat = selectedCategory === 'todas' || guide.category === selectedCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      guide.title.toLowerCase().includes(query) ||
      guide.summary.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600">Início</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Guias & Artigos</span>
      </nav>

      {/* Header Section */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          Acervo Técnico Educativo
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-sans tracking-tight">
          Guias e Artigos Práticos de Construção e Reforma
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Artigos elaborados com base nas normas da ABNT e tabelas oficiais do SINAPI para ajudar você a orçar materiais, evitar desperdício de dinheiro e entender as boas práticas da obra.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar guia por assunto (ex: piso, cimento, concreto, tijolo)..."
            className="input-field pl-11 py-2.5 text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'todas' ? 'Todos os Guias' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.slug}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-400 hover:shadow-card transition-all duration-200 flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-6 space-y-3.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                  {guide.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                <Link to={`/guias/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              {guide.calculatorSlug && (
                <Link
                  to={`/${guide.calculatorSlug}`}
                  className="text-xs font-semibold text-slate-500 hover:text-brand-600 inline-flex items-center gap-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculadora</span>
                </Link>
              )}
              <Link
                to={`/guias/${guide.slug}`}
                className="text-xs font-bold text-brand-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 ml-auto"
              >
                Ler Guia Completo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Trust Banner */}
      <section className="bg-gradient-to-br from-brand-900 to-navy-950 text-white p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-accent-400" />
          <h3 className="text-xl font-bold font-sans">Conteúdo Técnico Baseado em Normas Oficiais</h3>
        </div>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Nossos artigos são estruturados de acordo com as especificações da <strong>ABNT</strong> (Associação Brasileira de Normas Técnicas) e parâmetros do <strong>SINAPI</strong> (Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil), garantindo informações seguras tanto para engenheiros quanto para proprietários que estão reformando a casa própria.
        </p>
      </section>
    </div>
  );
};
