import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

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
  const isLive = adsense.enabled && !!adsense.publisherId && !!adsense.slots.inContent;

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

  // Durante a fase de análise do Google AdSense ou quando desativado, NÃO renderizar caixas falsas ou placeholders
  // para evitar violação de política do Google sobre rótulos enganosos ou conteúdo em construção.
  return null;
};
