// Google Analytics & Google Ads Event Tracking Utility

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetIdOrAction: string,
      configOrParams?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Registra uma visualização de página no Google Analytics
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
};

/**
 * Registra um evento de cálculo realizado em qualquer calculadora
 */
export const trackCalculation = (
  calculatorSlug: string,
  calculatorName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calculate_material', {
      event_category: 'Calculators',
      calculator_id: calculatorSlug,
      calculator_name: calculatorName,
      ...params,
    });
  }
};

/**
 * Registra quando o usuário copia a lista de materiais para a área de transferência
 */
export const trackCopyResult = (calculatorSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'copy_result', {
      event_category: 'User Engagement',
      calculator_id: calculatorSlug,
    });
  }
};

/**
 * Registra quando o usuário compartilha a lista no WhatsApp
 */
export const trackShareWhatsApp = (calculatorSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share_whatsapp', {
      event_category: 'User Engagement',
      calculator_id: calculatorSlug,
    });
  }
};

/**
 * Registra quando o usuário clica em uma recomendação de compra / parceiro
 */
export const trackPartnerClick = (partnerName: string, category: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'partner_outbound_click', {
      event_category: 'Monetization',
      partner_name: partnerName,
      product_category: category,
    });
  }
};
