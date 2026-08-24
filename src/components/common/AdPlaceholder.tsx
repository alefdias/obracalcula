import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { AdSenseBlock } from './AdSenseBlock';
import { trackPartnerClick } from '../../utils/analytics';

interface AdPlaceholderProps {
  slot: 'top-banner' | 'in-content' | 'after-result' | 'bottom-banner' | 'affiliate-products' | 'sidebar';
  className?: string;
  category?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slot,
  className = '',
  category = 'Materiais de Construção',
}) => {
  if (slot === 'affiliate-products') {
    const handlePartnerClick = (partner: string) => {
      trackPartnerClick(partner, category);
    };

    return (
      <section
        aria-label="Onde comprar materiais com desconto"
        className={`my-8 p-5 bg-gradient-to-br from-slate-50 to-brand-50/40 border border-slate-200/80 rounded-2xl ${className}`}
      >
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
          <a
            href="https://www.leroymerlin.com.br"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handlePartnerClick('Leroy Merlin')}
            className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-400 hover:shadow-md transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">Leroy Merlin</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Pisos e Revestimentos</p>
            <p className="text-xs text-slate-500 mt-0.5">Até 15% OFF no PIX e pronta entrega</p>
          </a>

          <a
            href="https://www.telhanorte.com.br"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handlePartnerClick('Telhanorte')}
            className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-400 hover:shadow-md transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">C&C / Telhanorte</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Tintas e Argamassas</p>
            <p className="text-xs text-slate-500 mt-0.5">Frete grátis e cupons de primeira compra</p>
          </a>

          <a
            href="https://www.google.com/search?q=deposito+materiais+construcao+proximo"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handlePartnerClick('Depósito Local')}
            className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-400 hover:shadow-md transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">Depósito Direto</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-800 mt-2">Cimento, Areia e Blocos</p>
            <p className="text-xs text-slate-500 mt-0.5">Cotação rápida de caminhão fechado</p>
          </a>
        </div>
      </section>
    );
  }

  // Mapeia para AdSenseBlock correspondente
  const slotTypeMap: Record<string, 'header-banner' | 'in-content' | 'after-result' | 'sidebar' | 'footer-banner'> = {
    'top-banner': 'header-banner',
    'in-content': 'in-content',
    'after-result': 'after-result',
    'sidebar': 'sidebar',
    'bottom-banner': 'footer-banner',
  };

  return (
    <AdSenseBlock
      slotType={slotTypeMap[slot] || 'in-content'}
      className={className}
      category={category}
    />
  );
};
