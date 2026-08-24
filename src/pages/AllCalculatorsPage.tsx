import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  ArrowRight, 
  Hammer, 
  Paintbrush, 
  Grid, 
  Layers, 
  Home as HomeIcon,
  Boxes,
  Package,
  Container,
  LayoutGrid
} from 'lucide-react';
import { CALCULATORS, CATEGORIES } from '../data/calculatorRegistry';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { matchCalculatorsFlexible } from '../utils/nlpParser';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-6 h-6 text-brand-600" />,
  Boxes: <Boxes className="w-6 h-6 text-amber-600" />,
  Paintbrush: <Paintbrush className="w-6 h-6 text-indigo-600" />,
  Layers: <Layers className="w-6 h-6 text-blue-600" />,
  Package: <Package className="w-6 h-6 text-emerald-600" />,
  Container: <Container className="w-6 h-6 text-cyan-600" />,
  Home: <HomeIcon className="w-6 h-6 text-orange-600" />,
  Grid: <Grid className="w-6 h-6 text-purple-600" />,
  Ruler: <Hammer className="w-6 h-6 text-rose-600" />,
  Brush: <Paintbrush className="w-6 h-6 text-teal-600" />,
};

export const AllCalculatorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'todas';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  useEffect(() => {
    document.title = 'Todas as Calculadoras de Construção e Reforma — ObraCalcula';
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'todas') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredCalculators = React.useMemo(() => {
    let list = matchCalculatorsFlexible(searchQuery, CALCULATORS);
    if (selectedCategory !== 'todas') {
      list = list.filter(c => c.category === selectedCategory);
    }
    return list;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Title */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
          Ferramentas da Obra
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Todas as Calculadoras de Construção e Reforma
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Encontre a calculadora ideal para descobrir a quantidade exata de tijolos, pisos, tintas, argamassa, cimento, concreto, telhas ou rejunte para sua obra.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar calculadora (ex.: quantos piso preciso 50m, tijolo, laje...)"
            className="input-field pl-12 pr-4 py-3.5 text-sm sm:text-base"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'todas'
              ? CALCULATORS.length
              : CALCULATORS.filter(c => c.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-brand-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Cards Grid */}
      {filteredCalculators.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <p className="text-base font-semibold text-slate-700">
            Nenhuma calculadora encontrada para os filtros selecionados.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todas');
            }}
            className="btn-secondary text-xs"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCalculators.map((calc) => (
            <Link
              key={calc.id}
              to={`/${calc.slug}`}
              className="p-6 bg-white rounded-2xl border-2 border-slate-200/90 hover:border-brand-500 hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-50 group-hover:bg-brand-50 rounded-xl transition-colors">
                    {ICON_MAP[calc.iconName] || <Hammer className="w-6 h-6 text-brand-600" />}
                  </div>
                  <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                    {calc.categoryLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {calc.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {calc.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{calc.estimatedTimeSec}s
                </span>
                <span className="text-brand-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                  Calcular Agora <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Ad Placeholder */}
      <AdPlaceholder slot="bottom-banner" />
    </div>
  );
};
