import React from 'react';
import { Tag, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface AdPlaceholderProps {
  slot: 'top-banner' | 'in-content' | 'after-result' | 'bottom-banner' | 'affiliate-products';
  className?: string;
  category?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slot,
  className = '',
  category = 'Materiais de Construção',
}) => {
  if (slot === 'affiliate-products') {
    return (
      <div className={`my-8 p-5 bg-gradient-to-br from-slate-50 to-brand-50/40 border border-slate-200/80 rounded-2xl ${className}`}>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-100 text-brand-700 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Onde comprar com desconto</h4>
              <p className="text-xs text-slate-500">Ofertas de lojas parceiras e depósitos credenciados</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-200/70 text-slate-600 rounded">
            Parceiros
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">Leroy Merlin</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Pisos e Revestimentos</p>
            <p className="text-xs text-slate-500 mt-0.5">Até 15% OFF no PIX</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">C&C / Telhanorte</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Tintas e Acessórios</p>
            <p className="text-xs text-slate-500 mt-0.5">Frete grátis na sua região</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">Depósito Direto</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Cimento e Agregados</p>
            <p className="text-xs text-slate-500 mt-0.5">Cotação rápida de caminhão</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner my-6 p-4 rounded-xl border border-dashed border-slate-300/80 bg-slate-50/50 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[90px] ${className}`}>
      <span className="absolute top-2 right-2 text-[9px] uppercase font-bold text-slate-400 tracking-wider">
        Publicidade
      </span>
      <Tag className="w-4 h-4 text-slate-300 mb-1" />
      <p className="text-xs font-medium text-slate-400">
        Espaço reservado para anúncios (Google AdSense / Anunciantes)
      </p>
      <span className="text-[10px] text-slate-400">
        Relevante para {category}
      </span>
    </div>
  );
};
