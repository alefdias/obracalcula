import { ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdSenseBlock } from './AdSenseBlock';

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
    return (
      <section
        aria-label="Dicas de Compra e Economia"
        className={`my-8 p-6 bg-gradient-to-br from-slate-50 to-brand-50/40 border border-slate-200/80 rounded-2xl ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-brand-100 text-brand-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-slate-800">Boas Práticas ao Comprar no Depósito</h4>
              <p className="text-xs text-slate-500">Recomendações técnicas para não perder dinheiro nem atrasar o cronograma</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-brand-100/80 text-brand-800 rounded-full hidden sm:inline-block">
            Dicas de Obra
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-brand-600 mb-1.5">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Frete e Entrega</span>
            </div>
            <p className="text-sm font-bold text-slate-800">Agrupe Itens Pesados</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Compre cimento, areia, brita e blocos no mesmo pedido para negociar frete único gratuito com caminhão fechado.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-brand-600 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Acabamentos</span>
            </div>
            <p className="text-sm font-bold text-slate-800">Confira Lote e Bitola</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Em pisos e porcelanatos, exija caixas do mesmo lote de fabricação para evitar variações de tonalidade e tamanho.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-brand-600 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wide">Armazenamento</span>
            </div>
            <p className="text-sm font-bold text-slate-800">Validade do Cimento</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Sacos de cimento têm validade média de 30 dias. Armazene sobre estrados de madeira protegidos da umidade do chão.
            </p>
          </div>
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
