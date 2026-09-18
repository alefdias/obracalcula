export interface GuideArticle {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  calculatorSlug?: string;
  calculatorName?: string;
  tableOfContents: { id: string; title: string }[];
  contentSections: {
    id: string;
    heading: string;
    paragraphs: string[];
    callout?: {
      type: 'tip' | 'warning' | 'info';
      title: string;
      text: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const GUIDES_DATABASE: GuideArticle[] = [
  {
    slug: 'como-calcular-piso-e-porcelanato',
    title: 'Como Calcular Piso e Porcelanato sem Erros e Evitar Desperdício',
    shortTitle: 'Cálculo de Piso e Porcelanato',
    metaTitle: 'Como Calcular Piso e Porcelanato: Guia Passo a Passo sem Erros | ObraCalcula',
    metaDescription: 'Aprenda a calcular a metragem quadrada de piso e porcelanato, margem de perda técnica (reta vs diagonal), número de caixas, rodapés e argamassa necessária.',
    category: 'Pisos e Revestimentos',
    categorySlug: 'pisos',
    readTime: '7 min de leitura',
    publishedAt: '2026-08-15',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Guia prático e completo com fórmulas, tabelas de perda técnica e exemplos passo a passo para calcular a quantidade exata de pisos cerâmicos e porcelanatos para sua reforma.',
    calculatorSlug: 'calculadora-de-piso',
    calculatorName: 'Calculadora de Piso e Porcelanato',
    tableOfContents: [
      { id: 'medicao-area', title: '1. Medição correta da área do cômodo' },
      { id: 'margem-perda', title: '2. Margens de perda: paginação reta vs diagonal' },
      { id: 'calculo-caixas', title: '3. Como calcular o número de caixas' },
      { id: 'rodapes-soleiras', title: '4. Rodapés e soleiras no cálculo' },
      { id: 'exemplo-pratico', title: '5. Exemplo prático de cálculo (sala de 20 m²)' },
      { id: 'dicas-deposito', title: '6. Dicas de ouro na hora de comprar no depósito' },
    ],
    contentSections: [
      {
        id: 'medicao-area',
        heading: '1. Medição correta da área do cômodo',
        paragraphs: [
          'O primeiro passo para não errar na compra de pisos e porcelanatos é medir com exatidão a área útil do ambiente. Para cômodos regulares (quadrados ou retangulares), basta multiplicar o comprimento pela largura com o auxílio de uma trena metálica ou trena a laser.',
          'Em ambientes com formatos irregulares, em "L" ou com vãos de escadas e armários embutidos, a recomendação dos mestres de obras é subdividir o espaço em quadrantes imaginários simples (Retângulo A e Retângulo B), calcular a área individual de cada um e somá-las no final.',
          'Lembre-se sempre de anotar as medidas em metros. Por exemplo: um quarto com 3,50 metros de largura por 4,20 metros de comprimento tem uma área líquida de 14,70 metros quadrados (3,50 × 4,20 = 14,70 m²).'
        ],
      },
      {
        id: 'margem-perda',
        heading: '2. Margens de perda: paginação reta vs diagonal',
        paragraphs: [
          'Durante o assentamento, diversas peças precisam ser cortadas para se ajustarem aos cantos, ralos, portas e rodapés. Esses cortes geram retalhos que nem sempre podem ser reaproveitados. Por isso, nunca compre apenas a metragem exata da medição.',
          'A Associação Brasileira de Normas Técnicas (ABNT) e os principais fabricantes recomendam adicionar uma margem percentual de segurança que varia de acordo com o padrão de paginação escolhido:',
        ],
        table: {
          headers: ['Tipo de Paginação', 'Perda Média Recomendada', 'Motivo Técnico'],
          rows: [
            ['Reta / Convencional (alinhada)', '10%', 'Cortes simples nas bordas e cantos retos.'],
            ['Diagonal (45 graus)', '15% a 20%', 'Cortes triangulares em todo o perímetro geram alto refugo.'],
            ['Espinha de Peixe / Transpassada', '12% a 15%', 'Sobreposição de peças exige ajustes contínuos de junta.'],
            ['Peças Grandes (> 80x80cm)', '12% a 15%', 'Cada peça quebrada ou cortada errada representa grande perda de m².'],
          ]
        },
        callout: {
          type: 'warning',
          title: 'Guarde sempre 1 ou 2 caixas de sobra',
          text: 'Além da perda da obra, guarde pelo menos uma caixa fechada na garagem ou depósito. Se precisar quebrar o chão no futuro por um vazamento hidráulico, você jamais encontrará o mesmo lote de cor e tamanho no comércio.'
        }
      },
      {
        id: 'calculo-caixas',
        heading: '3. Como calcular o número de caixas',
        paragraphs: [
          'Pisos e revestimentos cerâmicos não são vendidos por metro quadrado solto, mas sim em caixas fechadas. A metragem por caixa varia enormemente conforme o modelo (ex: caixas de 1,44 m², 1,80 m², 2,16 m² ou 2,40 m²).',
          'A fórmula fundamental para encontrar o número de caixas é: (Área Total com Perda) ÷ (Metragem por Caixa do Fabricante). Como as lojas não vendem meia caixa, o resultado deve ser sempre arredondado para o próximo número inteiro superior.',
        ]
      },
      {
        id: 'rodapes-soleiras',
        heading: '4. Rodapés e soleiras no cálculo',
        paragraphs: [
          'Se você pretende fazer os rodapés cortando o próprio piso cerâmico ou porcelanato, precisa calcular a metragem linear das paredes (perímetro), descontando as portas, e adicionar esse consumo à área de piso.',
          'Normalmente, rodapés têm entre 7 cm e 15 cm de altura. Se preferir rodapés de poliestireno ou madeira, eles são orçados separadamente em barras lineares (geralmente de 2,40 metros de comprimento). Soleiras de portas também são compradas em granito ou mármore sob medida.',
        ]
      },
      {
        id: 'exemplo-pratico',
        heading: '5. Exemplo prático de cálculo (sala de 20 m²)',
        paragraphs: [
          'Vamos a uma simulação real para você entender como aplicar as regras na prática:',
          '• Área medida da sala: 4,00 m × 5,00 m = 20,00 m²',
          '• Paginação escolhida: Alinhamento reto (margem recomendada de 10%)',
          '• Área total com perda: 20,00 × 1,10 = 22,00 m²',
          '• Piso escolhido: Porcelanato 60x60 cm com caixa contendo 1,80 m²',
          '• Divisão: 22,00 ÷ 1,80 = 12,22 caixas',
          '• Resultado final: Você deve comprar 13 caixas fechadas, totalizando 23,40 m² de piso entregue.',
        ]
      },
      {
        id: 'dicas-deposito',
        heading: '6. Dicas de ouro na hora de comprar no depósito',
        paragraphs: [
          '1. Exija o mesmo número de lote: Todas as caixas devem ter rigorosamente o mesmo código de lote e tonalidade impresso na embalagem. Fabricantes diferentes produzem variações visíveis de cor entre fornadas.',
          '2. Compre argamassa compatível: Porcelanatos exigem argamassa colante AC-II ou AC-III (nunca use AC-I em porcelanato, pois a peça soltará em poucos meses).',
          '3. Verifique o rejunte: O espaçamento da junta (1mm, 1,5mm ou 2mm) é determinado pelo fabricante na caixa. Quanto menor a junta, menos rejunte você consome.',
        ]
      }
    ],
    faqs: [
      {
        question: 'Por que o porcelanato exige mais margem de perda que a cerâmica comum?',
        answer: 'Porque as placas de porcelanato são geralmente maiores (60x60, 80x80, 120x60cm). Quando o assentador faz um corte em diagonal ou contorno de tubo, um pedaço maior da peça é inutilizado, gerando maior percentual de refugo.',
      },
      {
        question: 'Posso usar argamassa AC-I para assentar porcelanato?',
        answer: 'Não. A argamassa AC-I possui aderência mecânica e serve apenas para pisos cerâmicos tradicionais com alta absorção de água. O porcelanato tem absorção quase nula e necessita de aditivos químicos poliméricos presentes nas argamassas AC-II e AC-III.',
      },
      {
        question: 'Quanto tempo devo esperar para pisar no piso recém-assentado?',
        answer: 'O tempo médio de cura para tráfego leve de pessoas é de 48 a 72 horas após o assentamento. A aplicação do rejunte deve ser feita somente após 72 horas para que a umidade da argamassa evapore completamente.',
      }
    ]
  },
  {
    slug: 'traco-de-concreto-para-laje-viga-fundacao',
    title: 'Traço de Concreto: Tabela Prática de Proporções em Latas para Lajes, Vigas e Sapatas',
    shortTitle: 'Traço de Concreto em Latas',
    metaTitle: 'Traço de Concreto em Latas: Tabela Prática para Lajes, Vigas e Sapatas | ObraCalcula',
    metaDescription: 'Descubra a proporção correta de cimento, areia e brita em latas de 18L para concreto de sapatas, pilares, lajes e contrapiso segundo a ABNT NBR 6118.',
    category: 'Estrutura e Concreto',
    categorySlug: 'concreto',
    readTime: '8 min de leitura',
    publishedAt: '2026-08-20',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Aprenda a dosar cimento, areia média, brita e água em latas de 18 litros com tabelas de resistência FCK e recomendações de cura para garantir a solidez da sua estrutura.',
    calculatorSlug: 'calculadora-de-concreto',
    calculatorName: 'Calculadora de Concreto e Traço',
    tableOfContents: [
      { id: 'o-que-e-traco', title: '1. O que é o traço de concreto e por que ele importa' },
      { id: 'tabela-latas', title: '2. Tabela de traço em latas de 18L por saco de cimento' },
      { id: 'fator-agua', title: '3. O fator água/cimento e o risco de excesso de água' },
      { id: 'vibracao-cura', title: '4. Adensamento e a importância vital da cura úmida' },
      { id: 'concreto-usinado', title: '5. Quando compensa contratar caminhão de concreto usinado' },
    ],
    contentSections: [
      {
        id: 'o-que-e-traco',
        heading: '1. O que é o traço de concreto e por que ele importa',
        paragraphs: [
          'O traço de concreto é a proporção matemática entre os seus quatro ingredientes fundamentais: cimento (aglomerante), areia (agregado miúdo), brita (agregado graúdo) e água (ativador químico da hidratação).',
          'Na construção civil brasileira, a resistência à compressão do concreto é medida em Megapascals (MPa). Elementos de sustentação estrutural, como vigas, pilares e lajes, exigem concreto com no mínimo 20 a 25 MPa segundo a norma técnica ABNT NBR 6118. Fazer um traço "no olho" coloca em risco a vida dos moradores e pode causar fissuras, flechas excessivas ou colapso.',
        ]
      },
      {
        id: 'tabela-latas',
        heading: '2. Tabela de traço em latas de 18L por saco de cimento',
        paragraphs: [
          'Nos canteiros de obras residenciais sem usina própria, a medição padronizada mais confiável é feita utilizando a tradicional lata metálica de tinta de 18 litros como unidade volumétrica para cada 1 saco de cimento de 50 kg.',
          'Abaixo está a tabela de dosagem prática consolidada pelo SINAPI e manuais de engenharia:',
        ],
        table: {
          headers: ['Elemento da Obra', 'Resistência Estimada', 'Cimento (Saco 50kg)', 'Areia (Latas 18L)', 'Brita 1 (Latas 18L)', 'Água (Latas 18L)'],
          rows: [
            ['Pilares e Vigas de Sustentação', '25 MPa', '1 saco', '4 latas', '5,5 latas', '1,5 a 2 latas'],
            ['Lajes Maciças ou Pré-Moldadas', '20 a 25 MPa', '1 saco', '4 latas', '5,5 latas', '1,5 a 2 latas'],
            ['Sapatas e Blocos de Fundação', '20 MPa', '1 saco', '4,5 latas', '6 latas', '2 latas'],
            ['Contrapiso e Calçadas', '15 MPa', '1 saco', '6 latas', '6 latas', '2,5 latas'],
            ['Concreto Magro (fundo de vala)', '10 MPa', '1 saco', '8 latas', '8 latas', '3 latas'],
          ]
        },
        callout: {
          type: 'tip',
          title: 'Ordem correta de colocar na betoneira',
          text: 'Coloque primeiro metade da água na betoneira, depois toda a brita (para limpar o tambor), em seguida o saco de cimento, a areia e finalmente o restante da água aos poucos até atingir a consistência plástica ideal.'
        }
      },
      {
        id: 'fator-agua',
        heading: '3. O fator água/cimento e o risco de excesso de água',
        paragraphs: [
          'O erro mais comum cometido por ajudantes e pedreiros inexperientes é colocar água em excesso para deixar a massa "mole" e fácil de puxar na enxada ou desempenadeira.',
          'Cada litro de água além do necessário evapora durante a secagem, deixando microporos e vazios no interior do concreto endurecido. O excesso de água reduz drasticamente a resistência mecânica final em até 50%, favorece infiltrações e acelera a corrosão da armadura de ferro.',
        ]
      },
      {
        id: 'vibracao-cura',
        heading: '4. Adensamento e a importância vital da cura úmida',
        paragraphs: [
          'Adensamento: Durante o lançamento do concreto nas fôrmas, utilize um vibrador de imersão (ou martele levemente as laterais das tábuas de madeira) para expulsar bolhas de ar e garantir que o concreto envolva completamente as barras de aço (evitando as famosas "bicheiras").',
          'Cura Úmida: O cimento não seca por evaporação; ele endurece por reação química contínua que consome água durante 28 dias. Molhe o concreto com mangueira pelo menos 3 vezes ao dia durante os primeiros 7 dias consecutivos após a concretagem (ou cubra com lona preta ou sacos de estopa molhados). A cura correta evita 90% das trincas superficiais.',
        ]
      },
      {
        id: 'concreto-usinado',
        heading: '5. Quando compensa contratar caminhão de concreto usinado',
        paragraphs: [
          'Para volumes a partir de 3 ou 4 metros cúbicos (m³), como na concretagem de lajes de teto, contratar um caminhão betoneira de concreto usinado com bomba costuma ser mais barato, infinitamente mais rápido e estruturalmente mais seguro do que bater centenas de latas manualmente na betoneira.',
          'A concretagem manual em grandes volumes corre o risco de juntas frias (quando um trecho seca antes de o outro ser lançado), comprometendo a amarração monolítica da laje.',
        ]
      }
    ],
    faqs: [
      {
        question: 'Quantos sacos de cimento vão em 1 metro cúbico (m³) de concreto?',
        answer: 'Em média, são necessários de 6,5 a 7,5 sacos de cimento de 50 kg para produzir 1 metro cúbico (1.000 litros) de concreto estrutural de 20 a 25 MPa.',
      },
      {
        question: 'Qual a diferença entre brita 0, brita 1 e brita 2?',
        answer: 'A brita 0 (pedrisco) tem grãos menores (4,8 a 9,5 mm) e é usada em vigotas e tubos finos. A brita 1 (9,5 a 19 mm) é o tamanho padrão ideal para vigas, colunas e lajes residenciais. A brita 2 (19 a 25 mm) é utilizada em sapatas e pisos pesados.',
      },
      {
        question: 'Quantos dias devo esperar para desformar lajes e vigas?',
        answer: 'O escoramento inferior de lajes e vigas deve ser mantido por no mínimo 21 a 28 dias para permitir que o concreto atinja sua capacidade de carga projetada. As laterais de tábuas de vigas e pilares podem ser removidas com segurança após 3 a 7 dias.',
      }
    ]
  },
  {
    slug: 'quantidade-de-tijolos-e-blocos-por-metro-quadrado',
    title: 'Quantos Tijolos ou Blocos por Metro Quadrado de Parede? Guia com Vãos e Perdas',
    shortTitle: 'Tijolos por Metro Quadrado',
    metaTitle: 'Quantos Tijolos por Metro Quadrado (m²)? Tabela Baiano e Blocos | ObraCalcula',
    metaDescription: 'Descubra a quantidade exata de tijolos baianos de 6 ou 8 furos e blocos de concreto por metro quadrado de parede, já deduzindo vãos de portas e janelas.',
    category: 'Alvenaria e Construção',
    categorySlug: 'alvenaria',
    readTime: '6 min de leitura',
    publishedAt: '2026-08-25',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Aprenda a calcular milheiros de tijolos, blocos cerâmicos e de concreto por m² de alvenaria com tabelas SINAPI, cálculo de argamassa de assentamento e margens de quebra.',
    calculatorSlug: 'calculadora-de-tijolos',
    calculatorName: 'Calculadora de Tijolos e Blocos',
    tableOfContents: [
      { id: 'tipos-tijolos', title: '1. Principais tipos de tijolos e blocos no Brasil' },
      { id: 'tabela-rendimento', title: '2. Tabela de consumo por metro quadrado (m²)' },
      { id: 'deducao-vaos', title: '3. Como deduzir portas e janelas sem errar' },
      { id: 'argamassa-assentamento', title: '4. Quantidade de argamassa para assentar alvenaria' },
      { id: 'exemplo-parede', title: '5. Exemplo prático de cálculo de uma parede completa' },
    ],
    contentSections: [
      {
        id: 'tipos-tijolos',
        heading: '1. Principais tipos de tijolos e blocos no Brasil',
        paragraphs: [
          'Na alvenaria convencional residencial, o tijolo cerâmico furado (popularmente conhecido como "tijolo baiano") e o bloco de concreto são os elementos mais utilizados para vedação e fechamento de cômodos.',
          'Cada material possui dimensões padronizadas que alteram diretamente o número de unidades por metro quadrado e a espessura final da parede acabada com reboco.',
        ]
      },
      {
        id: 'tabela-rendimento',
        heading: '2. Tabela de consumo por metro quadrado (m²)',
        paragraphs: [
          'Considerando juntas médias de argamassa de assentamento de 1,0 cm a 1,5 cm entre os blocos, veja a quantidade média consumida por metro quadrado de parede:',
        ],
        table: {
          headers: ['Tipo de Tijolo / Bloco', 'Dimensões (L x A x C)', 'Posição na Parede', 'Peças por m²', 'Margem de Quebra'],
          rows: [
            ['Tijolo Baiano 8 furos', '9 x 19 x 19 cm', 'Deitado (espelho 1/2 tijolo)', '25 a 27 peças', '10%'],
            ['Tijolo Baiano 6 furos', '9 x 14 x 19 cm', 'Deitado (1/2 tijolo)', '35 a 38 peças', '10%'],
            ['Tijolo Maciço Comum', '5 x 10 x 20 cm', 'Espelho (1/2 vez)', '80 peças', '8%'],
            ['Bloco de Concreto 14x19x39', '14 x 19 x 39 cm', 'Padrão alinhado', '12,5 peças', '5% a 8%'],
            ['Bloco de Concreto 09x19x39', '9 x 19 x 39 cm', 'Vedação estreita', '12,5 peças', '5% a 8%'],
          ]
        }
      },
      {
        id: 'deducao-vaos',
        heading: '3. Como deduzir portas e janelas sem errar',
        paragraphs: [
          'Para não orçar tijolos a mais, calcule a área total bruta da parede (Comprimento × Altura) e desconte a área líquida dos vãos de esquadrias:',
          '• Porta padrão de quarto (0,80 m × 2,10 m): desconte 1,68 m²',
          '• Porta de banheiro (0,70 m × 2,10 m): desconte 1,47 m²',
          '• Janela de quarto padrão (1,20 m × 1,00 m): desconte 1,20 m²',
          '• Janela de sala (1,50 m × 1,20 m): desconte 1,80 m²',
          'Área Líquida da Parede = Área Bruta − Soma das Áreas dos Vãos.',
        ]
      },
      {
        id: 'argamassa-assentamento',
        heading: '4. Quantidade de argamassa para assentar alvenaria',
        paragraphs: [
          'Além dos tijolos, você precisará de argamassa mista para assentar cada fiada. O traço clássico recomendado é de 1 lata de cimento : 2 latas de cal hidratada : 8 latas de areia média.',
          'Em média, consome-se cerca de 15 a 18 kg de argamassa fresca por metro quadrado de alvenaria com tijolo baiano de 8 furos, com juntas de 1,2 cm.',
        ]
      },
      {
        id: 'exemplo-parede',
        heading: '5. Exemplo prático de cálculo de uma parede completa',
        paragraphs: [
          'Suponha uma parede de quarto com 4,00 m de comprimento e 2,80 m de altura, contendo uma janela de 1,20 m × 1,00 m:',
          '1. Área bruta: 4,00 m × 2,80 m = 11,20 m²',
          '2. Vão da janela: 1,20 m × 1,00 m = 1,20 m²',
          '3. Área líquida a cobrir: 11,20 m² − 1,20 m² = 10,00 m²',
          '4. Escolha do tijolo: Baiano 8 furos (rendimento de 26 peças/m²)',
          '5. Quantidade sem perda: 10,00 × 26 = 260 tijolos',
          '6. Adição de 10% de perda: 260 × 1,10 = 286 tijolos.',
        ]
      }
    ],
    faqs: [
      {
        question: 'O que é melhor: tijolo baiano cerâmico ou bloco de concreto?',
        answer: 'O tijolo cerâmico oferece melhor conforto térmico e é mais leve, ideal para estruturas convencionais com vigas e pilares. O bloco de concreto é mais resistente, requer menos argamassa de reboco e permite construir alvenaria estrutural sem vigas.',
      },
      {
        question: 'Quantos tijolos vem em um milheiro?',
        answer: 'Um milheiro corresponde exatamente a 1.000 unidades de tijolos ou blocos, sendo a unidade comercial padrão de venda em olarias e depósitos de materiais com desconto por volume.',
      }
    ]
  },
  {
    slug: 'como-calcular-tinta-para-paredes-e-tetos',
    title: 'Como Calcular Tinta para Pintura de Paredes: Rendimento por Litro e Demãos',
    shortTitle: 'Cálculo de Tinta para Paredes',
    metaTitle: 'Como Calcular Tinta para Pintura de Paredes e Tetos | ObraCalcula',
    metaDescription: 'Calcule quantos litros, galões de 3,6L ou latas de 18L de tinta comprar para sua casa. Aprenda o rendimento real por demão e preparação de reboco novo.',
    category: 'Pintura e Acabamento',
    categorySlug: 'pintura',
    readTime: '6 min de leitura',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Guia completo para calcular a quantidade exata de tinta acrílica ou látex para paredes internas, fachadas e tetos, com dicas de diluição e escolha de rolos.',
    calculatorSlug: 'calculadora-de-tinta',
    calculatorName: 'Calculadora de Tinta para Paredes',
    tableOfContents: [
      { id: 'area-pintura', title: '1. Como calcular a área real de pintura' },
      { id: 'rendimento-tinta', title: '2. Rendimento médio de tintas acrílicas e látex' },
      { id: 'demaos-necessarias', title: '3. Quantas demãos são necessárias em cada caso' },
      { id: 'preparacao-superficie', title: '4. Selador acrílico vs fundo preparador' },
      { id: 'latas-vs-galoes', title: '5. Galão de 3,6L ou lata de 18L: qual escolher?' },
    ],
    contentSections: [
      {
        id: 'area-pintura',
        heading: '1. Como calcular a área real de pintura',
        paragraphs: [
          'Para pintar um ambiente completo, meça o perímetro somado de todas as paredes e multiplique pelo pé-direito (altura do teto ao chão). Depois, desconte a área das portas e janelas.',
          'Se for pintar o teto, calcule a área do piso do cômodo e adicione à conta. Por exemplo: um quarto com paredes somando 40 m² mais 12 m² de teto tem uma área de pintura total de 52 m².',
        ]
      },
      {
        id: 'rendimento-tinta',
        heading: '2. Rendimento médio de tintas acrílicas e látex',
        paragraphs: [
          'De acordo com as normas da ABRAFATI (Associação Brasileira dos Fabricantes de Tintas), o rendimento médio das tintas padrão imobiliário em superfícies seladas é:',
          '• Tinta Acrílica Premium: 12 m² a 14 m² por litro por demão',
          '• Tinta Acrílica Standard: 10 m² a 12 m² por litro por demão',
          '• Tinta Econômica / Látex PVA: 8 m² a 10 m² por litro por demão',
        ],
        callout: {
          type: 'info',
          title: 'Atenção ao rendimento na lata',
          text: 'Muitos fabricantes indicam na embalagem o rendimento "acabado" (com 2 demãos inclusas) enquanto outros indicam o rendimento "por demão". Leia sempre as letras miúdas na embalagem do fabricante para não comprar a metade do necessário.'
        }
      },
      {
        id: 'demaos-necessarias',
        heading: '3. Quantas demãos são necessárias em cada caso',
        paragraphs: [
          '• Parede nova com reboco curado e selado: 2 a 3 demãos.',
          '• Repintura com a mesma tonalidade (apenas renovação): 2 demãos.',
          '• Troca de cor escura para cor clara (ex: parede vermelha pintada de branco): 3 a 4 demãos.',
        ]
      },
      {
        id: 'preparacao-superficie',
        heading: '4. Selador acrílico vs fundo preparador',
        paragraphs: [
          'Nunca passe tinta diretamente sobre o reboco novo cru! O reboco cru é extremamente poroso e absorvente: ele "beberá" litros de tinta cara de acabamento.',
          'Aplique antes 1 demão farta de Selador Acrílico em reboco novo. O selador uniformiza a absorção e faz a tinta de acabamento render até 40% a mais, economizando centenas de reais no custo final da obra.',
        ]
      },
      {
        id: 'latas-vs-galoes',
        heading: '5. Galão de 3,6L ou lata de 18L: qual escolher?',
        paragraphs: [
          'No Brasil, as tintas são comercializadas em três volumes principais: Lata de 18 litros, Galão de 3,6 litros e Quarto de 900 ml.',
          'Comparando o preço por litro, comprar uma lata de 18L costuma ser cerca de 25% a 35% mais barato por litro do que comprar cinco galões individuais de 3,6L. Para pintar cômodos inteiros, a lata de 18L é quase sempre a escolha mais econômica.',
        ]
      }
    ],
    faqs: [
      {
        question: 'Posso usar tinta de parede interna na fachada externa?',
        answer: 'Não. Tintas látex PVA comuns não suportam sol, chuva e intempéries. Para fachadas e áreas externas, use sempre tinta Acrílica Total ou Tinta Emborrachada impermeabilizante.',
      },
      {
        question: 'Quanto tempo devo esperar entre uma demão e outra?',
        answer: 'Em média, aguarde de 3 a 4 horas de intervalo entre demãos para secagem ao toque e evaporação dos solventes da tinta acrílica à base de água.',
      }
    ]
  },
  {
    slug: 'tipos-de-argamassa-ac1-ac2-ac3',
    title: 'Tipos de Argamassa Colante (AC-I, AC-II e AC-III): Onde Usar Cada Uma',
    shortTitle: 'Tipos de Argamassa AC1, AC2, AC3',
    metaTitle: 'Tipos de Argamassa Colante AC-I, AC-II e AC-III: Guia Prático | ObraCalcula',
    metaDescription: 'Entenda as diferenças entre as argamassas colantes AC1, AC2 e AC3 segundo a norma NBR 14081. Saiba qual comprar para porcelanatos, áreas externas e piscinas.',
    category: 'Revestimentos e Argamassa',
    categorySlug: 'argamassa',
    readTime: '7 min de leitura',
    publishedAt: '2026-09-05',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Comparativo definitivo entre os tipos de argamassa colante industrializada para assentamento de pisos, porcelanatos, pastilhas e revestimento em fachadas.',
    calculatorSlug: 'calculadora-de-argamassa',
    calculatorName: 'Calculadora de Argamassa',
    tableOfContents: [
      { id: 'norma-argamassas', title: '1. Classificação técnica segundo a norma ABNT NBR 14081' },
      { id: 'argamassa-ac1', title: '2. Argamassa AC-I (Interiores)' },
      { id: 'argamassa-ac2', title: '3. Argamassa AC-II (Exteriores e Áreas Molhadas)' },
      { id: 'argamassa-ac3', title: '4. Argamassa AC-III e AC-III-E (Alta Performance)' },
      { id: 'consumo-sacos', title: '5. Consumo médio de sacos de 20 kg por metro quadrado' },
    ],
    contentSections: [
      {
        id: 'norma-argamassas',
        heading: '1. Classificação técnica segundo a norma ABNT NBR 14081',
        paragraphs: [
          'A argamassa colante industrializada (vendida pronta em sacos de 20 kg) é composta por cimento Portland, areia com granulometria controlada e aditivos químicos poliméricos que conferem retenção de água e aderência.',
          'A Associação Brasileira de Normas Técnicas classifica a argamassa colante em três classes principais de acordo com sua resistência à tração e flexibilidade.',
        ]
      },
      {
        id: 'argamassa-ac1',
        heading: '2. Argamassa AC-I (Interiores)',
        paragraphs: [
          'Indicação: Exclusiva para ambientes internos secos ou moderadamente úmidos (salas, quartos, corredores).',
          'Tipos de Peça: Cerâmicas comuns de média e alta absorção de água.',
          'Onde NÃO usar: Nunca use AC-I em áreas externas, garagens, fachadas, churrasqueiras ou para assentar qualquer tipo de porcelanato.',
        ]
      },
      {
        id: 'argamassa-ac2',
        heading: '3. Argamassa AC-II (Exteriores e Áreas Molhadas)',
        paragraphs: [
          'Indicação: Áreas internas e externas sujeitas a variações climáticas moderadas, sol, chuva e umidade constante (banheiros, cozinhas, lavanderias, varandas e calçadas residenciais).',
          'Tipos de Peça: Pisos cerâmicos em geral e porcelanatos de pequeno a médio porte em áreas internas.',
        ]
      },
      {
        id: 'argamassa-ac3',
        heading: '4. Argamassa AC-III e AC-III-E (Alta Performance)',
        paragraphs: [
          'Indicação: É a argamassa colante mais resistente do mercado, altamente flexível e com adesividade química superior.',
          'Usos obrigatórios: Grandes formatos de porcelanato (60x60, 80x80, 120x60 cm ou maiores), assentamento de piso sobre piso, fachadas prediais, saunas e piscinas aquecidas.',
        ],
        callout: {
          type: 'warning',
          title: 'Porcelanatos em piso sobre piso',
          text: 'Se você vai assentar porcelanato novo por cima de um piso cerâmico antigo sem quebrar o chão, use exclusivamente a argamassa colante específica rotulada como "Piso sobre Piso / AC-III".'
        }
      },
      {
        id: 'consumo-sacos',
        heading: '5. Consumo médio de sacos de 20 kg por metro quadrado',
        paragraphs: [
          'O consumo de argamassa depende do dente da desempenadeira metálica utilizada pelo pedreiro:',
          '• Colagem simples (peças de até 30x30 cm): cerca de 4 a 5 kg/m² (1 saco de 20kg rende 4 a 5 m²).',
          '• Dupla colagem (peças maiores que 30x30 cm, com argamassa no contrapiso e no verso da peça): cerca de 8 a 9 kg/m² (1 saco de 20kg rende cerca de 2,2 a 2,5 m²).',
        ]
      }
    ],
    faqs: [
      {
        question: 'O que é a dupla colagem e quando ela é obrigatória?',
        answer: 'A dupla colagem consiste em aplicar argamassa tanto no contrapiso quanto no verso da peça com a desempenadeira denteada. A norma NBR 13753 torna a dupla colagem obrigatória para qualquer placa cerâmica ou porcelanato com área superficial maior que 900 cm² (aproximadamente 30x30 cm).',
      },
      {
        question: 'Posso usar argamassa que sobrou do dia anterior?',
        answer: 'Não. Após misturada com água, a argamassa colante tem um tempo de vida útil no balde de aproximadamente 2 a 2,5 horas. Passado esse período, o cimento inicia a pega e a argamassa perde suas propriedades de aderência, devendo ser descartada.',
      }
    ]
  },
  {
    slug: 'quantos-sacos-de-cimento-por-metro-quadrado',
    title: 'Quantos Sacos de Cimento Comprar? Guia para Contrapiso, Reboco e Alvenaria',
    shortTitle: 'Consumo de Cimento por m²',
    metaTitle: 'Quantos Sacos de Cimento por Metro Quadrado? Guia Completo | ObraCalcula',
    metaDescription: 'Descubra quantos sacos de cimento de 50kg comprar para contrapiso, reboco paulista, assentamento de tijolos e calçadas com tabelas de consumo do SINAPI.',
    category: 'Cimento e Massas',
    categorySlug: 'cimento',
    readTime: '7 min de leitura',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-18',
    author: {
      name: 'Equipe Técnica ObraCalcula',
      role: 'Engenharia e Construção Civil',
    },
    summary: 'Consumo prático de sacos de cimento de 50 kg para cada etapa da sua obra, diferenças entre os tipos de cimento CP-II e CP-III e regras de conservação contra umidade.',
    calculatorSlug: 'calculadora-de-cimento',
    calculatorName: 'Calculadora de Cimento',
    tableOfContents: [
      { id: 'tipos-cimento', title: '1. Tipos de cimento Portland no mercado nacional' },
      { id: 'cimento-contrapiso', title: '2. Consumo de cimento para contrapiso (espessura 3 a 5 cm)' },
      { id: 'cimento-reboco', title: '3. Consumo de cimento para chapisco e reboco' },
      { id: 'cimento-alvenaria', title: '4. Consumo para assentamento de alvenaria' },
      { id: 'armazenamento-obra', title: '5. Como armazenar sacos de cimento na obra sem empedrar' },
    ],
    contentSections: [
      {
        id: 'tipos-cimento',
        heading: '1. Tipos de cimento Portland no mercado nacional',
        paragraphs: [
          'No Brasil, o cimento mais vendido para obras residenciais é o CP II (Cimento Portland Composto), com as variantes CP II-E (com escória), CP II-Z (com pozolana) e CP II-F (com fíler calcário).',
          'Para fundações e áreas com maresia ou solos úmidos, o cimento CP III (alto-forno) ou CP IV (pozolânico) oferece excelente impermeabilidade e resistência a sulfatos.',
        ]
      },
      {
        id: 'cimento-contrapiso',
        heading: '2. Consumo de cimento para contrapiso (espessura 3 a 5 cm)',
        paragraphs: [
          'O contrapiso é a camada de argamassa farofa niveladora executada sobre a laje ou terra compactada para receber o piso cerâmico ou laminado.',
          'Com traço usual de 1 saco de cimento para 4 a 5 latas de areia média (espessura média de 3 cm), consome-se cerca de 0,25 a 0,30 sacos de cimento de 50 kg por metro quadrado.',
          'Em uma casa com 100 m² de área útil de piso, serão necessários cerca de 25 a 30 sacos de 50 kg de cimento apenas para os contrapisos.',
        ]
      },
      {
        id: 'cimento-reboco',
        heading: '3. Consumo de cimento para chapisco e reboco',
        paragraphs: [
          '• Chapisco: Camada rugosa de fixação direta na parede (traço 1:3). Consumo: cerca de 0,08 sacos por m².',
          '• Emboço e Reboco Único (massa mista com cal): Espessura de 1,5 a 2 cm. Consumo: cerca de 0,15 sacos de cimento por m² de parede.',
        ]
      },
      {
        id: 'cimento-alvenaria',
        heading: '4. Consumo para assentamento de alvenaria',
        paragraphs: [
          'Para assentar 1 metro quadrado de alvenaria com tijolo baiano de 8 furos (junta de 1,2 cm), consome-se cerca de 0,10 sacos de cimento de 50 kg em argamassa mista com cal hidratada.',
        ]
      },
      {
        id: 'armazenamento-obra',
        heading: '5. Como armazenar sacos de cimento na obra sem empedrar',
        paragraphs: [
          'O cimento é ávido por água: o menor contato com o ar úmido ou o chão frio faz com que ele empedre e perca sua capacidade aglomerante.',
          '1. Nunca empilhe sacos diretamente no chão de terra ou concreto: utilize estrados ou paletes de madeira elevados a pelo menos 15 cm do piso.',
          '2. Não encoste as pilhas nas paredes da casa: deixe um espaço livre de 30 cm para circulação de ar.',
          '3. Cubra com lona plástica impermeável e respeite a altura máxima de empilhamento de até 10 sacos.',
        ]
      }
    ],
    faqs: [
      {
        question: 'Qual o prazo de validade de um saco de cimento de 50 kg?',
        answer: 'A maioria dos fabricantes nacionais estipula o prazo de validade em 30 a 60 dias a contar da data de fabricação impressa na lateral da sacaria.',
      },
      {
        question: 'O cimento empedrado pode ser peneirado e aproveitado?',
        answer: 'Não. Os torrões duros indicam que o cimento já reagiu quimicamente com a umidade do ar e hidratou. Peneirar esses grãos resulta em uma massa sem nenhuma resistência mecânica.',
      }
    ]
  }
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES_DATABASE.find(g => g.slug === slug);
}
