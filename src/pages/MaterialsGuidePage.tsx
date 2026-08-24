import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Lightbulb, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { MATERIALS_DATABASE } from '../data/materialsDatabase';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const MaterialsGuidePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  React.useEffect(() => {
    document.title = 'Tabela de Rendimento de Materiais de Construção — ObraCalcula';
  }, []);

  const categories = ['todas', ...Array.from(new Set(MATERIALS_DATABASE.map(m => m.category)))];

  const filteredMaterials = MATERIALS_DATABASE.filter(m => {
    const matchesCat = selectedCategory === 'todas' || m.category === selectedCategory;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.usefulTip.toLowerCase().includes(q);

    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
          Referência Técnica Oficial
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Tabela de Rendimento de Materiais de Construção
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Consulte o rendimento médio, embalagens comerciais e margens de perda recomendadas para os principais materiais da construção civil brasileira (normas ABNT e SINAPI).
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar material (ex: cimento, tijolo, argamassa...)"
            className="input-field pl-11 py-2.5 text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat === 'todas' ? 'Todos os Materiais' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Table & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-card transition-all"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                {mat.category}
              </span>
              <h3 className="text-base font-bold text-slate-900">{mat.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{mat.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Embalagem:</span>
                <span className="font-semibold text-slate-800 text-right">{mat.commercialPacking}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Rendimento Médio:</span>
                <span className="font-bold text-brand-700 text-right">{mat.averageYield}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">Margem de Perda:</span>
                <span className="font-semibold text-accent-700 text-right">{mat.recommendedLossMargin}</span>
              </div>
              {mat.mixRatio && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Traço Sugerido:</span>
                  <span className="font-mono text-[11px] text-slate-700 text-right">{mat.mixRatio}</span>
                </div>
              )}
            </div>

            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-900">
              <div className="flex items-start gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="font-medium">{mat.usefulTip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slot="bottom-banner" />
    </div>
  );
};
