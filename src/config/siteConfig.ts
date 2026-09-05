export const SITE_CONFIG = {
  name: 'ObraCalcula',
  title: 'Quanto Material — Calcule Quanto Material Você Precisa para sua Obra | ObraCalcula',
  description: 'Descubra exatamente quanto material de construção comprar para sua obra ou reforma residencial: piso, tinta, tijolos, cimento, concreto, argamassa e telhas. Grátis e sem cadastro.',
  domain: 'obracalcula.com.br',
  url: 'https://obracalcula.com.br',
  contactEmail: 'devalefdias44@gmail.com',
  supportEmail: 'devalefdias44@gmail.com',
  version: '2.0.0',

  // Configurações do Google AdSense
  adsense: {
    publisherId: 'ca-pub-6262635109806028',
    // Manter false durante a fase de aprovação para evitar caixas de anúncios vazias.
    // O Google avaliará o site através do script oficial no <head> e Anúncios Automáticos.
    // Após a aprovação, mude para true.
    enabled: false,
    slots: {
      headerBanner: '4591509327',   // ObraCalcula - Header Banner
      inContent: '6312162408',      // ObraCalcula - In Content
      afterResult: '8802594370',    // ObraCalcula - After Result
      sidebar: '7489512708',        // ObraCalcula - Sidebar
      footerBanner: '4050734643',   // ObraCalcula - Footer Banner
      footerBanner2: '7672968233',   // ObraCalcula - Footer Banner 2
      footerBanner3: '2237186027',   // ObraCalcula - Footer Banner 3 (reserva)
    },
  },

  // Configurações do Google Analytics / Google Ads
  analytics: {
    // ID do Google Analytics 4 (ex: 'G-XXXXXXXXXX')
    measurementId: 'G-0XXEV7H9JE',
    // ID de conversão do Google Ads (ex: 'AW-XXXXXXXXX')
    googleAdsId: '',
  },
};
