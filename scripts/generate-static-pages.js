import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Directory dist does not exist. Run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

// Dados dos Guias para pré-renderização estática
const GUIDES = [
  {
    slug: 'como-calcular-piso-e-porcelanato',
    title: 'Como Calcular Piso e Porcelanato sem Erros e Evitar Desperdício',
    description: 'Aprenda a calcular a metragem quadrada de piso e porcelanato, margem de perda técnica (reta vs diagonal), número de caixas, rodapés e argamassa necessária.',
    category: 'Pisos e Revestimentos',
    h1: 'Como Calcular Piso e Porcelanato sem Erros e Evitar Desperdício',
    bodyText: `
      <h2>1. Medição correta da área do cômodo</h2>
      <p>O primeiro passo para não errar na compra de pisos e porcelanatos é medir com exatidão a área útil do ambiente. Para cômodos regulares (quadrados ou retangulares), multiplique comprimento pela largura (ex: 3,50m × 4,20m = 14,70 m²).</p>
      <h2>2. Margens de perda recomendadas</h2>
      <p>A ABNT recomenda adicionar margem técnica conforme o tipo de assentamento: Paginação Reta (10%), Paginação Diagonal (15% a 20%), Espinha de Peixe (12% a 15%) e Peças Grandes (>80x80cm: 12% a 15%).</p>
      <h2>3. Cálculo do número de caixas</h2>
      <p>Divida a área total com perda pela metragem contida na caixa informada pelo fabricante e arredonde sempre para cima.</p>
      <h2>4. Rodapés e soleiras</h2>
      <p>Calcule o perímetro total descontando portas. Se for recortar as peças do piso para fazer rodapé, adicione a metragem linear proporcional.</p>
      <h2>5. Argamassa e Rejunte</h2>
      <p>Para porcelanato, use sempre argamassa AC-II ou AC-III (nunca AC-I). Em peças acima de 30x30cm, realize dupla colagem.</p>
    `
  },
  {
    slug: 'traco-de-concreto-para-laje-viga-fundacao',
    title: 'Traço de Concreto em Latas: Tabela Prática para Lajes, Vigas e Sapatas | ObraCalcula',
    description: 'Descubra a proporção correta de cimento, areia e brita em latas de 18L para concreto de sapatas, pilares, lajes e contrapiso segundo a ABNT NBR 6118.',
    category: 'Estrutura e Concreto',
    h1: 'Traço de Concreto: Tabela Prática de Proporções em Latas para Lajes, Vigas e Sapatas',
    bodyText: `
      <h2>1. Proporções recomendadas em latas de 18L por saco de cimento de 50kg</h2>
      <p>• <strong>Pilares e Vigas (25 MPa):</strong> 1 saco cimento + 4 latas areia + 5,5 latas brita 1 + 1,5 a 2 latas água.</p>
      <p>• <strong>Lajes Maciças e Pré-moldadas (20 a 25 MPa):</strong> 1 saco cimento + 4 latas areia + 5,5 latas brita 1 + 1,5 a 2 latas água.</p>
      <p>• <strong>Sapatas e Fundação (20 MPa):</strong> 1 saco cimento + 4,5 latas areia + 6 latas brita 1 + 2 latas água.</p>
      <p>• <strong>Contrapiso e Calçadas (15 MPa):</strong> 1 saco cimento + 6 latas areia + 6 latas brita + 2,5 latas água.</p>
      <h2>2. A importância da cura úmida</h2>
      <p>O concreto atinge sua resistência ao longo de 28 dias. Molhe as superfícies concretadas ao menos 3 vezes ao dia nos primeiros 7 dias para evitar fissuras por retração plástica.</p>
    `
  },
  {
    slug: 'quantidade-de-tijolos-e-blocos-por-metro-quadrado',
    title: 'Quantos Tijolos por Metro Quadrado (m²)? Tabela Baiano e Blocos | ObraCalcula',
    description: 'Descubra a quantidade exata de tijolos baianos de 6 ou 8 furos e blocos de concreto por metro quadrado de parede, já deduzindo vãos de portas e janelas.',
    category: 'Alvenaria e Construção',
    h1: 'Quantos Tijolos ou Blocos por Metro Quadrado de Parede? Guia com Vãos e Perdas',
    bodyText: `
      <h2>1. Rendimento por metro quadrado de parede</h2>
      <p>• Tijolo Baiano 8 furos (9x19x19 cm): 25 a 27 peças por m².</p>
      <p>• Tijolo Baiano 6 furos (9x14x19 cm): 35 a 38 peças por m².</p>
      <p>• Bloco de Concreto 14x19x39 cm: 12,5 blocos por m².</p>
      <p>• Tijolo Maciço Comum (5x10x20 cm): cerca de 80 peças por m².</p>
      <h2>2. Dedução de portas e janelas</h2>
      <p>Calcule a área bruta da alvenaria (comprimento × altura) e deduza a área de portas e janelas antes de multiplicar pelo rendimento unitário. Adicione 8% a 10% de margem de quebra.</p>
    `
  },
  {
    slug: 'como-calcular-tinta-para-paredes-e-tetos',
    title: 'Como Calcular Tinta para Pintura de Paredes e Tetos | ObraCalcula',
    description: 'Calcule quantos litros, galões de 3,6L ou latas de 18L de tinta comprar para sua casa. Aprenda o rendimento real por demão e preparação de reboco novo.',
    category: 'Pintura e Acabamento',
    h1: 'Como Calcular Tinta para Pintura de Paredes: Rendimento por Litro e Demãos',
    bodyText: `
      <h2>1. Cálculo de área real de pintura</h2>
      <p>Multiplique o perímetro total das paredes pela altura do pé-direito e deduza portas e janelas. Adicione a área do teto caso vá pintá-lo.</p>
      <h2>2. Rendimento por demão</h2>
      <p>Tintas acrílicas standard rendem em média de 10 a 12 m² por litro por demão. Paredes novas ou repinturas com mudança de cor exigem de 2 a 3 demãos.</p>
      <h2>3. Aplicação de selador</h2>
      <p>Em reboco novo, a aplicação prévia de 1 demão de selador acrílico uniformiza a absorção e evita o consumo excessivo de tinta de acabamento.</p>
    `
  },
  {
    slug: 'tipos-de-argamassa-ac1-ac2-ac3',
    title: 'Tipos de Argamassa Colante AC-I, AC-II e AC-III: Guia Prático | ObraCalcula',
    description: 'Entenda as diferenças entre as argamassas colantes AC1, AC2 e AC3 segundo a norma NBR 14081. Saiba qual comprar para porcelanatos, áreas externas e piscinas.',
    category: 'Revestimentos e Argamassa',
    h1: 'Tipos de Argamassa Colante (AC-I, AC-II e AC-III): Onde Usar Cada Uma',
    bodyText: `
      <h2>1. Argamassa AC-I</h2>
      <p>Indicada para ambientes internos e secos, com revestimentos cerâmicos convencionais. Não deve ser usada em porcelanatos nem em áreas externas.</p>
      <h2>2. Argamassa AC-II</h2>
      <p>Possui aditivos que resistem à umidade e dilatações térmicas moderadas. Indicada para áreas externas, banheiros, cozinhas e lavanderias.</p>
      <h2>3. Argamassa AC-III</h2>
      <p>Alta aderência e flexibilidade. Uso obrigatório para porcelanatos de grandes formatos (>60x60cm), piso sobre piso, fachadas e piscinas.</p>
    `
  },
  {
    slug: 'quantos-sacos-de-cimento-por-metro-quadrado',
    title: 'Quantos Sacos de Cimento por Metro Quadrado? Guia Completo | ObraCalcula',
    description: 'Descubra quantos sacos de cimento de 50kg comprar para contrapiso, reboco paulista, assentamento de tijolos e calçadas com tabelas de consumo do SINAPI.',
    category: 'Cimento e Massas',
    h1: 'Quantos Sacos de Cimento Comprar? Guia para Contrapiso, Reboco e Alvenaria',
    bodyText: `
      <h2>1. Consumo para contrapiso (espessura 3 a 5 cm)</h2>
      <p>Consome-se em média 0,25 a 0,30 sacos de 50kg por metro quadrado de contrapiso autonivelante ou farofa.</p>
      <h2>2. Consumo para reboco e chapisco</h2>
      <p>Chapisco consome cerca de 0,08 sacos/m². Reboco com massa mista de 1,5 a 2 cm consome cerca de 0,15 sacos/m².</p>
      <h2>3. Cuidados no armazenamento</h2>
      <p>Armazene o cimento sobre estrados a 15 cm do piso, afastado 30 cm de paredes e com empilhamento máximo de 10 sacos sob cobertura impermeável.</p>
    `
  }
];

// 10 Calculadoras Canônicas
const CALCULATORS = [
  {
    slug: 'calculadora-de-piso',
    name: 'Calculadora de Piso e Porcelanato',
    title: 'Calculadora de Piso e Porcelanato — Calcule Metragem e Caixas | ObraCalcula',
    description: 'Calcule a metragem quadrada total de piso cerâmico ou porcelanato, número de caixas e margem de perda recomendada (5% a 15%) conforme a paginação.',
    category: 'Pisos e Revestimentos',
  },
  {
    slug: 'calculadora-de-tijolos',
    name: 'Calculadora de Tijolos e Blocos',
    title: 'Calculadora de Tijolos e Blocos de Concreto por m² | ObraCalcula',
    description: 'Descubra a quantidade exata de tijolos baianos de 6 ou 8 furos e blocos de concreto por metro quadrado de parede com dedução de vãos.',
    category: 'Alvenaria e Construção',
  },
  {
    slug: 'calculadora-de-tinta',
    name: 'Calculadora de Tinta para Paredes',
    title: 'Calculadora de Tinta para Paredes e Tetos — Litros e Latas | ObraCalcula',
    description: 'Saiba quantos litros, galões de 3,6L ou latas de 18L de tinta acrílica comprar para pintura interna ou externa de acordo com as demãos.',
    category: 'Pintura e Acabamento',
  },
  {
    slug: 'calculadora-de-concreto',
    name: 'Calculadora de Concreto e Traço',
    title: 'Calculadora de Concreto e Traço — Volume em m³ e Latas | ObraCalcula',
    description: 'Calcule o volume em metros cúbicos (m³) de concreto para lajes, vigas, pilares e sapatas, com sacos de cimento, areia e brita em latas.',
    category: 'Estrutura e Fundação',
  },
  {
    slug: 'calculadora-de-cimento',
    name: 'Calculadora de Cimento',
    title: 'Calculadora de Cimento — Sacos de 50kg para Obra | ObraCalcula',
    description: 'Estime com precisão a quantidade de sacos de cimento de 50kg necessários para contrapiso, reboco, assentamento e fundações residenciais.',
    category: 'Estrutura e Massas',
  },
  {
    slug: 'calculadora-de-argamassa',
    name: 'Calculadora de Argamassa Colante',
    title: 'Calculadora de Argamassa Colante (AC1, AC2, AC3) | ObraCalcula',
    description: 'Saiba a quantidade de sacos de 20kg de argamassa colante para assentamento de pisos cerâmicos e porcelanatos.',
    category: 'Revestimentos e Argamassa',
  },
  {
    slug: 'calculadora-de-telhas',
    name: 'Calculadora de Telhas e Coberturas',
    title: 'Calculadora de Telhas Cerâmicas e Fibrocimento | ObraCalcula',
    description: 'Calcule a quantidade de telhas cerâmicas (colonial, portuguesa, romana) ou de fibrocimento por área de cobertura considerando a inclinação.',
    category: 'Coberturas e Telhados',
  },
  {
    slug: 'calculadora-de-rejunte',
    name: 'Calculadora de Rejunte',
    title: 'Calculadora de Rejunte Cimentício e Epóxi em kg | ObraCalcula',
    description: 'Cálculo em quilos (kg) de rejunte cimentício ou epóxi com base no tamanho das peças cerâmicas e na largura da junta.',
    category: 'Pisos e Revestimentos',
  },
  {
    slug: 'calculadora-de-rodape',
    name: 'Calculadora de Rodapé',
    title: 'Calculadora de Rodapé — Metros Lineares e Barras | ObraCalcula',
    description: 'Calcule a metragem linear de rodapé necessária para seus cômodos, descontando portas e vãos com margem de segurança.',
    category: 'Pisos e Revestimentos',
  },
  {
    slug: 'calculadora-de-massa-corrida',
    name: 'Calculadora de Massa Corrida',
    title: 'Calculadora de Massa Corrida e Acrílica — Latas e Sacos | ObraCalcula',
    description: 'Calcule a quantidade de massa corrida PVA ou acrílica para emassar paredes e tetos antes da pintura.',
    category: 'Pintura e Acabamento',
  }
];

// Páginas Institucionais e Gerais
const STATIC_PAGES = [
  {
    slug: 'calculadoras',
    title: 'Todas as Calculadoras de Materiais de Construção | ObraCalcula',
    description: 'Catálogo completo com mais de 10 calculadoras online e gratuitas para estimar pisos, tijolos, tintas, concreto, cimento, telhas e argamassa.',
    h1: 'Todas as Calculadoras de Materiais de Construção',
    bodyText: '<p>Explore nossa suíte completa de ferramentas gratuitas desenvolvidas conforme normas ABNT e índices SINAPI para orçar sua obra sem sobrar nem faltar.</p>'
  },
  {
    slug: 'guias',
    title: 'Guias Técnicos e Dicas de Construção Civil — ObraCalcula',
    description: 'Confira guias práticos, artigos técnicos, normas e tabelas de consumo de materiais para construir ou reformar sem desperdício.',
    h1: 'Guias e Artigos Práticos de Construção e Reforma',
    bodyText: '<p>Artigos técnicos completos elaborados com base nas normas da ABNT e tabelas oficiais do SINAPI para orientar sua compra no depósito e garantir a segurança estrutural da sua obra.</p>'
  },
  {
    slug: 'materiais',
    title: 'Tabela de Rendimento de Materiais de Construção — ObraCalcula',
    description: 'Consulte o rendimento médio, embalagens comerciais e margens de perda recomendadas para os principais materiais da construção civil brasileira.',
    h1: 'Tabela de Rendimento de Materiais de Construção',
    bodyText: '<p>Referência técnica de rendimentos médios de mercado para porcelanatos, tijolos baianos, tintas acrílicas, cimento Portland e argamassas colantes.</p>'
  },
  {
    slug: 'como-funciona',
    title: 'Como Funciona o ObraCalcula — Metodologia e Dicas',
    description: 'Entenda como nossas calculadoras transformam medidas brutas de ambientes em listas práticas de compras para depósitos e lojas de materiais.',
    h1: 'Como Funciona a Plataforma ObraCalcula',
    bodyText: '<p>Nossas calculadoras aplicam coeficientes técnicos de consumo baseados no SINAPI e nas normas da ABNT para fornecer quantidades exatas de compra.</p>'
  },
  {
    slug: 'sobre',
    title: 'Sobre o ObraCalcula — Quem Somos e Nossa Missão',
    description: 'Conheça o ObraCalcula: plataforma independente que ajuda brasileiros a calcular materiais de construção e reformar com economia e precisão.',
    h1: 'Sobre o ObraCalcula',
    bodyText: '<p>O ObraCalcula nasceu da necessidade de simplificar orçamentos na construção civil brasileira, reduzindo os 20% a 30% de desperdício comum em obras residenciais.</p>'
  },
  {
    slug: 'contato',
    title: 'Contato e Suporte Técnico — ObraCalcula',
    description: 'Fale com a equipe do ObraCalcula para tirar dúvidas sobre cálculos, sugerir novos materiais ou relatar problemas.',
    h1: 'Contato e Suporte Técnico',
    bodyText: '<p>Envie sua mensagem ou dúvida técnica sobre cálculos para nossa equipe pelo e-mail oficial de atendimento.</p>'
  },
  {
    slug: 'termos',
    title: 'Termos de Uso — ObraCalcula',
    description: 'Leia os Termos de Uso do ObraCalcula. Plataforma 100% gratuita para estimativas informativas de materiais de construção.',
    h1: 'Termos de Uso da Plataforma',
    bodyText: '<p>O ObraCalcula é um serviço de cálculo estimativo gratuito. Os valores obtidos servem como referência prática e não substituem o projeto executivo assinado por profissional habilitado (engenheiro ou arquiteto).</p>'
  },
  {
    slug: 'privacidade',
    title: 'Política de Privacidade — ObraCalcula',
    description: 'Conheça nossa Política de Privacidade em conformidade com a LGPD e políticas de transparência do Google AdSense e Analytics.',
    h1: 'Política de Privacidade e Cookies',
    bodyText: '<p>Respeitamos a sua privacidade. Esta política descreve como tratamos dados de navegação, cookies técnicos essenciais e cookies de publicidade de parceiros como o Google AdSense.</p>'
  }
];

function generatePage(pageUrl, title, description, contentHtml) {
  const targetDir = path.join(distDir, pageUrl);
  fs.mkdirSync(targetDir, { recursive: true });

  let pageHtml = templateHtml;

  // Substitui Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);

  // Substitui Meta Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${description}" />`
  );

  // Injeta Canonical Tag
  const canonicalTag = `<link rel="canonical" href="https://obracalcula.com.br/${pageUrl}" />`;
  if (!pageHtml.includes('rel="canonical"')) {
    pageHtml = pageHtml.replace('</head>', `  ${canonicalTag}\n</head>`);
  } else {
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/, canonicalTag);
  }

  // Substitui o miolo do <main> dentro de #root
  const mainRegex = /<main style="max-width: 1100px; margin: 0 auto; padding: 2.5rem 1.5rem; line-height: 1.7; color: #334155;">.*?<\/main>/s;
  const newMain = `<main style="max-width: 1100px; margin: 0 auto; padding: 2.5rem 1.5rem; line-height: 1.7; color: #334155;">
    <section style="margin-bottom: 2.5rem;">
      ${contentHtml}
    </section>
  </main>`;

  if (mainRegex.test(pageHtml)) {
    pageHtml = pageHtml.replace(mainRegex, newMain);
  }

  const outFilePath = path.join(targetDir, 'index.html');
  fs.writeFileSync(outFilePath, pageHtml, 'utf-8');
  console.log(`[Static Pre-render] Generated: /${pageUrl}/index.html`);
}

// 1. Gera Calculadoras Canônicas
CALCULATORS.forEach(calc => {
  const content = `
    <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.25rem 0.5rem; border-radius: 0.375rem;">
      ${calc.category}
    </span>
    <h1 style="font-size: 2.2rem; font-weight: 900; color: #0f172a; margin: 0.75rem 0 1rem 0;">
      ${calc.name}
    </h1>
    <p style="font-size: 1.1rem; color: #475569; margin-bottom: 1.5rem;">
      ${calc.description}
    </p>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
      <h2 style="font-size: 1.3rem; font-weight: 800; color: #082949; margin-bottom: 0.75rem;">
        Como Calcular Passo a Passo
      </h2>
      <p>Utilize a calculadora interativa acima para inserir as dimensões em metros do seu ambiente e obtenha a lista exata com margem de perda recomendada pela ABNT.</p>
    </div>
  `;
  generatePage(calc.slug, calc.title, calc.description, content);
});

// 2. Gera Páginas Institucionais
STATIC_PAGES.forEach(page => {
  const content = `
    <h1 style="font-size: 2.2rem; font-weight: 900; color: #0f172a; margin-bottom: 1rem;">
      ${page.h1}
    </h1>
    <div style="font-size: 1.05rem; color: #475569; line-height: 1.8;">
      ${page.bodyText}
    </div>
  `;
  generatePage(page.slug, page.title, page.description, content);
});

// 3. Gera Artigos / Guias
GUIDES.forEach(guide => {
  const content = `
    <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.25rem 0.5rem; border-radius: 0.375rem;">
      ${guide.category} • Guia Técnico
    </span>
    <h1 style="font-size: 2.2rem; font-weight: 900; color: #0f172a; margin: 0.75rem 0 1rem 0;">
      ${guide.h1}
    </h1>
    <p style="font-size: 1.1rem; color: #475569; margin-bottom: 2rem;">
      ${guide.description}
    </p>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; color: #334155; line-height: 1.8;">
      ${guide.bodyText}
    </div>
  `;
  generatePage(`guias/${guide.slug}`, guide.title, guide.description, content);
});

console.log('✅ Static pre-rendering successfully completed for all routes!');
