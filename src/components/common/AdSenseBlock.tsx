import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { Tag, Sparkles, Layout } from 'lucide-react';

interface AdSenseBlockProps {
  slotType?: 'header-banner' | 'in-content' | 'after-result' | 'sidebar' | 'footer-banner';
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  category?: string;
}

export const AdSenseBlock: React.FC<AdSenseBlockProps> = ({
  slotType = 'in-content',
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  category = 'Materiais de Construção',
}) => {
  const { adsense } = SITE_CONFIG;
  const isLive = adsense.enabled && adsense.publisherId && !adsense.publisherId.includes('XXXX');

  const resolvedSlotId =
    slotId ||
    (slotType === 'header-banner'
      ? adsense.slots.headerBanner
      : slotType === 'after-result'
      ? adsense.slots.afterResult
      : slotType === 'sidebar'
      ? adsense.slots.sidebar
      : slotType === 'footer-banner'
      ? adsense.slots.footerBanner
      : adsense.slots.inContent);

  useEffect(() => {
    if (isLive) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn('AdSense script error:', e);
      }
    }
  }, [isLive, resolvedSlotId]);

  if (isLive) {
    return (
      <aside aria-label="Espaço Publicitário" className={`ad-sense-container my-6 text-center overflow-hidden min-h-[90px] ${className}`}>
        <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1">
          Publicidade
        </span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsense.publisherId}
          data-ad-slot={resolvedSlotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </aside>
    );
  }

  // Descrições e dimensões discretas do slot para visualização em desenvolvimento
  const getSlotDetails = () => {
    switch (slotType) {
      case 'header-banner':
        return {
          title: 'Publicidade Contextual',
          size: 'Banner Superior (728x90 / Responsivo)',
          minHeight: 'min-h-[80px] sm:min-h-[90px]',
        };
      case 'sidebar':
        return {
          title: 'Publicidade Lateral',
          size: 'Banner Lateral (300x250 / 300x600)',
          minHeight: 'min-h-[220px] sm:min-h-[260px]',
        };
      case 'after-result':
        return {
          title: 'Publicidade de Materiais & Ofertas',
          size: 'Banner Pós-Cálculo (336x280 / Responsivo)',
          minHeight: 'min-h-[100px] sm:min-h-[120px]',
        };
      case 'footer-banner':
        return {
          title: 'Publicidade Contextual',
          size: 'Banner Inferior (728x90 / Responsivo)',
          minHeight: 'min-h-[80px] sm:min-h-[90px]',
        };
      default:
        return {
          title: 'Publicidade Contextual',
          size: 'Bloco de Conteúdo (300x250 / 336x280)',
          minHeight: 'min-h-[80px] sm:min-h-[100px]',
        };
    }
  };

  const details = getSlotDetails();

  return (
    <aside
      aria-label="Espaço Publicitário Discreto"
      className={`ad-preview my-6 p-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-200 ${details.minHeight} ${className}`}
    >
      <div className="flex items-center gap-1.5 text-slate-400 mb-1">
        <Tag className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
          Publicidade • {details.title}
        </span>
      </div>

      <p className="text-xs text-slate-500 max-w-md font-medium">
        Espaço Google AdSense ({details.size})
      </p>
      <span className="text-[10px] text-slate-400 mt-0.5">
        Anúncios automáticos contextuais para {category}
      </span>
    </aside>
  );
};
