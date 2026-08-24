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
    // Quando você tiver seu ID de editor, altere aqui: ex: 'ca-pub-1234567890123456'
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
    // Mude para true quando sua conta for aprovada para exibir anúncios reais
    enabled: false,
    // Slots de anúncios padrão
    slots: {
      headerBanner: '1234567890',
      inContent: '2345678901',
      afterResult: '3456789012',
      sidebar: '4567890123',
      footerBanner: '5678901234',
    },
  },

  // Configurações do Google Analytics / Google Ads
  analytics: {
    // ID do Google Analytics 4 (ex: 'G-XXXXXXXXXX')
    measurementId: '',
    // ID de conversão do Google Ads (ex: 'AW-XXXXXXXXX')
    googleAdsId: '',
  },
};
