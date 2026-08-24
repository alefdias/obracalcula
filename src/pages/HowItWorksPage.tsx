import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Ruler, 
  Percent, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

export const HowItWorksPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Como Funciona o ObraCalcula — Metodologia e Dicas';
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
          Metodologia & Economia
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
          Como Funciona o ObraCalcula
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Entenda como nossas calculadoras transformam medidas brutas de ambientes em listas práticas de compras para depósitos e lojas de materiais.
        </p>
      </div>

      {/* 3 Step Flow */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">O Fluxo em 3 Etapas Simples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Medição do Ambiente</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Você só precisa de uma trena para medir comprimento, largura e altura do espaço. Caso haja portas e janelas, o ObraCalcula desconta os vãos automaticamente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">Aplicação de Fórmulas Reais</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Não usamos chutes ou valores aleatórios. Nossos algoritmos utilizam as fórmulas oficiais da ABNT, SINAPI e rendimentos médios dos principais fabricantes nacionais.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Conversão em Embalagens</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O resultado é convertido diretamente em unidades comerciais vendidas no balcão: caixas de piso, sacos de cimento de 50kg, latas de 18L e galões de 3,6L.
            </p>
          </div>
        </div>
      </section>

      {/* Margem de Desperdício explicada */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <Percent className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Por que adicionar margem de desperdício?</h2>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          Toda obra sofre perdas naturais. Comprar apenas a metragem exata e exata pode fazer a obra parar por falta de meia caixa de piso ou uma lata de tinta:
        </p>

        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <span><strong>5% de perda:</strong> Indicado para tintas, vernizes e lajes planas em formas metálicas.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <span><strong>10% de perda:</strong> Recomendado para assentamento reto de pisos cerâmicos, tijolos, blocos de concreto e cimento.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <span><strong>15% a 20% de perda:</strong> Obrigatório para pisos em assentamento diagonal, peças grandes com muitos recortes de pilares e telhados de 4 águas.</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center bg-brand-950 text-white p-8 rounded-2xl space-y-4">
        <h3 className="text-2xl font-black font-sans">Pronto para começar seu cálculo?</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Escolha uma das calculadoras gratuitas do ObraCalcula e monte sua lista de materiais em segundos.
        </p>
        <div>
          <Link to="/calculadoras" className="btn-accent inline-flex">
            <span>Ver todas as calculadoras</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <AdPlaceholder slot="bottom-banner" />
    </div>
  );
};
