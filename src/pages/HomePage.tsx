import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Paintbrush, 
  Grid, 
  Hammer, 
  Home as HomeIcon,
  ShieldCheck,
  TrendingUp,
  RotateCcw,
  Boxes,
  Package,
  Container,
  LayoutGrid,
  Bot,
  Zap
} from 'lucide-react';
import { CALCULATORS, CATEGORIES, CalculatorMeta } from '../data/calculatorRegistry';
import { getCalculationHistory, HistoryItem } from '../hooks/useCalculatorStorage';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { parseNaturalLanguageQuery, matchCalculatorsFlexible } from '../utils/nlpParser';

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

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Quanto Material — Calcule Quanto Material Você Precisa para sua Obra | ObraCalcula';
    setHistory(getCalculationHistory());

    const onHistoryUpdated = () => {
      setHistory(getCalculationHistory());
    };
    window.addEventListener('obracalcula_history_updated', onHistoryUpdated);
    return () => window.removeEventListener('obracalcula_history_updated', onHistoryUpdated);
  }, []);

  // NLP Interpretation
  const nlpResult = useMemo(() => {
    return parseNaturalLanguageQuery(searchQuery);
  }, [searchQuery]);

  // Filtered calculators with flexible multi-word matching
  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory === 'todas'
        ? CALCULATORS
        : CALCULATORS.filter(c => c.category === selectedCategory);
    }
    const matched = matchCalculatorsFlexible(searchQuery, CALCULATORS);
    if (selectedCategory === 'todas') return matched;
    return matched.filter(c => c.category === selectedCategory);
  }, [searchQuery, selectedCategory]);

  const featuredCalculators = CALCULATORS.filter(c => c.popular);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlpResult.hasMatch && nlpResult.calculator) {
      if (nlpResult.inferredParams) {
        try {
          const storageKey = `calculaobra_inputs_${nlpResult.calculator.id}`;
          const existing = localStorage.getItem(storageKey);
          const parsed = existing ? JSON.parse(existing) : {};
          localStorage.setItem(storageKey, JSON.stringify({ ...parsed, ...nlpResult.inferredParams }));
        } catch (err) {
          console.warn('Erro ao pré-preencher parâmetros:', err);
        }
      }
      navigate(`/${nlpResult.calculator.slug}`);
      return;
    }

    if (filteredCalculators.length > 0) {
      navigate(`/${filteredCalculators[0].slug}`);
    } else {
      navigate(`/calculadoras?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleApplyNlpAndGo = () => {
    if (nlpResult.calculator) {
      if (nlpResult.inferredParams) {
        try {
          const storageKey = `calculaobra_inputs_${nlpResult.calculator.id}`;
          const existing = localStorage.getItem(storageKey);
          const parsed = existing ? JSON.parse(existing) : {};
          localStorage.setItem(storageKey, JSON.stringify({ ...parsed, ...nlpResult.inferredParams }));
        } catch (err) {}
      }
      navigate(`/${nlpResult.calculator.slug}`);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-navy-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-accent-400">
            <Sparkles className="w-4 h-4" />
            <span>Busca Inteligente & Linguagem Natural</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-sans">
            Calcule quanto material você precisa para sua obra
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Informe as medidas do ambiente ou digite sua dúvida como no WhatsApp e descubra a quantidade aproximada de materiais para comprar.
          </p>

          {/* Smart Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex.: quantos piso preciso 50m ou tinta para quarto 4x3"
                className="w-full pl-12 pr-28 sm:pr-36 py-4 sm:py-5 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-accent-400/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 sm:px-6 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Calcular</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Exemplos:</span>
              <button
                type="button"
                onClick={() => setSearchQuery('quantos piso preciso 50m')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                "quantos piso preciso 50m"
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('tinta para quarto 4x3')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                "tinta quarto 4x3"
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('tijolos para muro de 10 metros por 2.8')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                "muro 10x2.8 tijolos"
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('concreto para laje 8x5')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                "laje 8x5 concreto"
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* NLP INSTANT ASSISTANT CARD (Appears when natural language is typed) */}
        {nlpResult.hasMatch && nlpResult.instantResult && (
          <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-navy-950 text-white p-6 sm:p-7 rounded-3xl border-2 border-accent-400 shadow-2xl animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-accent-500 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-400 block">
                    Cálculo Instantâneo Inteligente
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {nlpResult.interpretedText}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyNlpAndGo}
                className="btn-accent text-sm py-2.5 px-5 shadow-lg whitespace-nowrap self-start sm:self-auto"
              >
                <span>Abrir calculadora completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-2">
                <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Estimativa Recomendada:</span>
                <div className="text-2xl sm:text-3xl font-black text-white font-sans text-accent-300">
                  {nlpResult.instantResult.headline}
                </div>
                <p className="text-sm text-slate-200">
                  {nlpResult.instantResult.subline}
                </p>
              </div>

              <div className="sm:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                {nlpResult.instantResult.details.map((d, didx) => (
                  <div key={didx} className="flex items-center justify-between py-1 border-b border-white/10 last:border-none">
                    <span className="text-slate-300">{d.label}:</span>
                    <span className="font-bold text-white text-right">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RECENT CALCULATIONS / RESUME BANNER */}
        {history.length > 0 && !searchQuery.trim() && (
          <section className="bg-white p-5 sm:p-6 rounded-2xl border border-brand-200 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Continuar Cálculo Anterior</h3>
              </div>
              <span className="text-xs text-slate-400">Salvo no seu navegador</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {history.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/calculadora-de-${item.calculatorId}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200/80 hover:border-brand-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-brand-700 block group-hover:text-brand-800">
                      {item.calculatorName}
                    </span>
                    <p className="text-xs text-slate-600 mt-1 font-medium line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-brand-600 mt-2 inline-flex items-center gap-1">
                    Abrir cálculo <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEARCH RESULTS IF SEARCHING */}
        {searchQuery.trim() && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
              <span>Calculadoras encontradas para "{searchQuery}"</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-brand-600 hover:text-brand-800 font-semibold"
              >
                Limpar busca
              </button>
            </h2>

            {filteredCalculators.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
                Nenhuma calculadora encontrada para este termo. Tente buscar por "piso", "tinta", "cimento" ou "tijolo".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.id}
                    to={`/${calc.slug}`}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400 hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-brand-50 rounded-xl">
                          {ICON_MAP[calc.iconName] || <Hammer className="w-6 h-6 text-brand-600" />}
                        </div>
                        <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                          {calc.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {calc.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{calc.estimatedTimeSec}s para calcular
                      </span>
                      <span className="text-brand-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                        Calcular →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CALCULADORAS EM DESTAQUE */}
        {!searchQuery.trim() && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                  Mais Utilizadas
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
                  Calculadoras em Destaque
                </h2>
              </div>
              <Link
                to="/calculadoras"
                className="text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                Ver todas ({CALCULATORS.length}) <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  to={`/${calc.slug}`}
                  className="bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-brand-500 hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-slate-50 group-hover:bg-brand-50 rounded-xl inline-block transition-colors mb-3.5">
                      {ICON_MAP[calc.iconName] || <Hammer className="w-6 h-6 text-brand-600" />}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-400">Gratuito</span>
                    <span className="font-bold text-brand-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Calcular <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* AD / PARTNER BANNER */}
        <AdPlaceholder slot="top-banner" />

        {/* CATEGORIAS — ENCONTRE SUA CALCULADORA */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-accent-50 px-2.5 py-1 rounded-md">
              Catálogo Completo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
              Encontre sua calculadora por categoria
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-900 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grid of calculators in selected category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCalculators.map((calc) => (
              <Link
                key={calc.id}
                to={`/${calc.slug}`}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-card transition-all duration-150 group flex items-start gap-4"
              >
                <div className="p-3 bg-slate-50 group-hover:bg-brand-50 rounded-xl flex-shrink-0 transition-colors">
                  {ICON_MAP[calc.iconName] || <Hammer className="w-5 h-5 text-brand-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
                    {calc.categoryLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors mt-0.5 truncate">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA O CALCULAOBRA */}
        <section className="bg-gradient-to-br from-brand-900 to-navy-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Rápido e Preciso
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
              Como o ObraCalcula ajuda você a economizar
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              O desperdício na construção civil brasileira chega a 20% do orçamento total por falta de cálculo exato. 
              No ObraCalcula você descobre em menos de 30 segundos quanto comprar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-slate-950 font-black text-sm flex items-center justify-center">1</span>
                <h4 className="text-base font-bold text-white">Escolha a Ferramenta</h4>
                <p className="text-xs text-slate-300">Piso, tinta, tijolos, cimento, concreto, argamassa ou telhas.</p>
              </div>

              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-slate-950 font-black text-sm flex items-center justify-center">2</span>
                <h4 className="text-base font-bold text-white">Informe as Medidas</h4>
                <p className="text-xs text-slate-300">Digite o tamanho do cômodo, das peças e vãos sem fórmulas difíceis.</p>
              </div>

              <div className="space-y-2">
                <span className="w-8 h-8 rounded-full bg-accent-500 text-slate-950 font-black text-sm flex items-center justify-center">3</span>
                <h4 className="text-base font-bold text-white">Receba a Lista Pronta</h4>
                <p className="text-xs text-slate-300">Resultado em caixas, sacos de 50kg, latas ou milheiros para levar ao depósito.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AFFILIATE STORES */}
        <AdPlaceholder slot="affiliate-products" />
      </div>
    </div>
  );
};
