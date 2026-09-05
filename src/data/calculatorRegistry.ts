export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  category: 'construcao' | 'pisos' | 'pintura' | 'cobertura' | 'reforma';
  categoryLabel: string;
  iconName: string;
  description: string;
  detailedDescription: string;
  popular?: boolean;
  searchKeywords: string[];
  estimatedTimeSec: number;
  metaTitle: string;
  metaDescription: string;
  faqList: { question: string; answer: string }[];
  howToSteps: string[];
  tips: string[];
}

export const CATEGORIES = [
  { id: 'todas', label: 'Todas as calculadoras' },
  { id: 'construcao', label: 'Construção' },
  { id: 'pisos', label: 'Pisos e Revestimentos' },
  { id: 'pintura', label: 'Pintura' },
  { id: 'cobertura', label: 'Cobertura' },
  { id: 'reforma', label: 'Reforma' },
] as const;

export const CALCULATORS: CalculatorMeta[] = [
  {
    id: 'piso',
    slug: 'calculadora-de-piso',
    name: 'Calculadora de Piso e Azulejo',
    shortTitle: 'Piso e Revestimento',
    category: 'pisos',
    categoryLabel: 'Pisos e Revestimentos',
    iconName: 'LayoutGrid',
    description: 'Calcule a quantidade de pisos, revestimentos e caixas com margem de perda.',
    detailedDescription: 'Descubra a quantidade exata de pisos cerâmicos ou porcelanatos, quantidade de caixas a comprar e a metragem quadrada total já com a folga necessária para cortes.',
    popular: true,
    estimatedTimeSec: 20,
    searchKeywords: ['piso', 'porcelanato', 'azulejo', 'revestimento', 'cerâmica', 'sala', 'quarto', 'banheiro', 'caixa de piso', 'metros quadrados de piso', 'quanto material de piso', 'quanto piso comprar', 'quanto piso preciso', 'calculadora de piso', 'calculadora de piso online', 'calcular piso m2', 'calculadora de cerâmica', 'calculadora de porcelanato', 'quantas caixas de piso preciso', 'como calcular piso'],
    metaTitle: 'Calculadora de Piso Online Grátis — Quantas Caixas Comprar | ObraCalcula',
    metaDescription: 'Calculadora de piso online grátis. Descubra quantas caixas de porcelanato ou cerâmica comprar para sua obra: calcule m², peças e margem de perda em segundos.',
    howToSteps: [
      'Meça o comprimento e a largura do cômodo em metros (ou informe a área total m²) — use uma trena ou o próprio aplicativo de medição do celular.',
      'Informe as dimensões da peça de piso ou porcelanato (ex: 60x60 cm, 80x80 cm) — geralmente está impressa na caixa.',
      'Selecione a margem de desperdício: 10% para assentamento reto simples, 15% para diagonal ou espinha de peixe, e 20% para peças grandes acima de 80x80 cm.',
      'Se souber a metragem por caixa (m²/cx), informe para obter o total de caixas fechadas a comprar.',
      'Anote o resultado e leve para o depósito: a calculadora já arredonda para caixas inteiras.'
    ],
    tips: [
      'Sempre guarde de 1 a 2 caixas extras do mesmo lote para futuras manutenções ou reparos de encanamento — lotes diferentes podem ter diferença de tonalidade.',
      'Em assentamentos diagonais (45°) ou espinha de peixe, o desperdício sobe para 15% a 20% devido aos recortes nos cantos — planeje com folga.',
      'Verifique se todas as caixas compradas têm o mesmo código de tonalidade e calibre impresso — peças de lotes distintos podem ter variação visível de cor.',
      'Peças grandes (80x80 cm, 90x90 cm, 120x60 cm) exigem base perfeitamente nivelada e dupla colagem de argamassa, aumentando o custo de assentamento.',
      'Compare o preço por m² e não por caixa: uma caixa maior pode ser mais barata mesmo que o preço unitário pareça maior.'
    ],
    faqList: [
      {
        question: 'Como usar a calculadora de piso?',
        answer: 'Informe as dimensões do ambiente (comprimento e largura em metros), o tamanho da peça (ex: 60x60 cm) e a margem de desperdício desejada (10% para assentamento reto). A calculadora retorna automaticamente os m² necessários, o número de peças e a quantidade de caixas a comprar.'
      },
      {
        question: 'Como calcular piso por m²?',
        answer: 'Multiplique o comprimento pela largura do cômodo para obter os m² brutos. Multiplique o resultado por 1,10 (para 10% de perda) ou 1,15 (15%). Divida pelo rendimento da caixa (m²/cx) para saber o número de caixas. Exemplo: sala de 5m x 4m = 20m² x 1,10 = 22m² ÷ 2,16 m²/cx = 10,2 → compre 11 caixas.'
      },
      {
        question: 'Quanto piso preciso para um quarto de 10m²?',
        answer: 'Para 10m² com 10% de perda, você precisa de 11m² de piso. Se cada caixa render 2,16m² (porcelanato 60x60), serão necessárias 5 caixas (10,18 m² → arredonda para 5 caixas cheias).'
      },
      {
        question: 'Quantas caixas de piso para uma sala de 20 m²?',
        answer: '20m² com 10% de perda = 22m². Dividindo por 2,16m²/cx (porcelanato 60x60), o resultado é 10,2 caixas → compre 11 caixas. Para 2,00m²/cx, seriam 11 caixas também.'
      },
      {
        question: 'Qual porcentagem de perda devo considerar para piso?',
        answer: 'Para assentamento alinhado/reto simples, 10% é o padrão recomendado. Para assentamentos diagonais, ambientes com muitos recortes ou peças grandes (acima de 80x80 cm), recomendamos de 15% a 20% de perda.'
      },
      {
        question: 'Quantos pisos vem em uma caixa?',
        answer: 'Varia conforme o fabricante e tamanho da peça. Porcelanato 60x60cm: em geral 2,16m²/cx (6 peças). Cerâmica 45x45cm: em geral 1,80m²/cx (8 peças). Verifique sempre a embalagem.'
      },
      {
        question: 'Devo comprar piso extra além do cálculo?',
        answer: 'Sim! Além dos 10% de perda operacional, tenha 1 caixa guardada na despensa para reposição com o mesmo tom e lote em caso de trincas ou reformas futuras. Lotes diferentes podem ter diferença de tonalidade.'
      }
    ]
  },
  {
    id: 'tijolos',
    slug: 'calculadora-de-tijolos',
    name: 'Calculadora de Tijolos e Blocos',
    shortTitle: 'Tijolos e Blocos',
    category: 'construcao',
    categoryLabel: 'Construção',
    iconName: 'Boxes',
    description: 'Descubra quantos tijolos ou blocos serão necessários para levantar paredes.',
    detailedDescription: 'Calcule a quantidade exata de tijolos cerâmicos (6 furos, 8 furos, 9 furos), blocos de concreto ou tijolos maciços, com desconto automático de vãos de portas e janelas.',
    popular: true,
    estimatedTimeSec: 30,
    searchKeywords: ['tijolo', 'bloco', 'bloco de concreto', 'tijolo baiano', 'alvenaria', 'levantar parede', 'parede', 'muro', 'construir parede', 'quanto de tijolo', 'quanto material de alvenaria', 'quantos tijolos comprar', 'quantos tijolos preciso', 'quantos tijolos por m2', 'quantos tijolos para uma parede', 'calculadora de tijolos', 'calcular tijolos', 'tijolos por metro quadrado', 'quantos tijolos para construir uma casa'],
    metaTitle: 'Quantos Tijolos Preciso? Calculadora de Tijolos por m² | ObraCalcula',
    metaDescription: 'Descubra quantos tijolos você precisa: calcule tijolos baianos (8 furos), maciços ou blocos de concreto por m² de parede com desconto automático de portas e janelas.',
    howToSteps: [
      'Adicione as medidas de cada parede que será construída: informe o comprimento (metros) e a altura (metros) de cada trecho.',
      'Desconte os vãos de portas (altura média 2,10m × largura) e janelas (altura × largura) que existem nessas paredes.',
      'Escolha o tipo de tijolo ou bloco: Baiano 8 furos (25 un/m²), Bloco de Concreto 14x19x39 (12,5 un/m²), Maciço (60 un/m²), entre outros.',
      'Defina a margem de perda — recomendamos 10% para quebras no transporte, descarga e cortes.',
      'Anote o total em unidades e milheiros para facilitar a compra no depósito.'
    ],
    tips: [
      'Tijolos furados (baiano) costumam sofrer quebra de 5% a 10% no descarregamento e transporte — uma folga de 10% no pedido é essencial para não faltar.',
      'O bloco de concreto 14x19x39 rende 12,5 peças por metro quadrado com junta de 1 cm — ideal para paredes estruturais e muros.',
      'Não se esqueça de calcular a argamassa de assentamento proporcional: para 1.000 tijolos baianos são necessários cerca de 2 a 3 sacos de cimento e 150 kg de areia.',
      'Tijolos são vendidos em milheiros (1.000 unidades). Compre sempre em quantidade de milheiro fechado para economizar no frete.',
      'Para muros de divisa, prefira tijolo maciço ou bloco de concreto pela maior resistência à chuva e umidade do solo.'
    ],
    faqList: [
      {
        question: 'Quantos tijolos preciso para uma parede de 10 m²?',
        answer: 'Para tijolo baiano 8 furos (consumo de 25 un/m²): 10 m² × 25 = 250 tijolos + 10% de perda = 275 tijolos. Para bloco de concreto 14x19x39 (12,5 un/m²): 10 m² × 12,5 = 125 + 10% = 138 blocos.'
      },
      {
        question: 'Quantos tijolos de 8 furos vão por metro quadrado?',
        answer: 'O tijolo baiano 8 furos (9x19x19 cm) consome em média 25 a 27 tijolos por m² de parede com junta de argamassa de 1,5 cm. Já o tijolo de 6 furos (10x20x20 cm) consome cerca de 20 a 22 unidades por m².'
      },
      {
        question: 'Quantos tijolos preciso para construir uma casa de 60m²?',
        answer: 'Uma casa de 60m² tem em média 80 a 100m² de área de paredes (considerando pé-direito de 2,80m e descontando vãos). Com tijolo baiano 8 furos: 90m² × 25 = 2.250 tijolos + 10% = 2.475 tijolos (aproximadamente 2,5 milheiros).'
      },
      {
        question: 'Quantos blocos de concreto 14x19x39 vão por metro quadrado?',
        answer: 'São necessários aproximadamente 12,5 blocos de concreto 14x19x39 cm por metro quadrado de parede. Com 10% de perda: 13,75 blocos/m².'
      },
      {
        question: 'Qual a diferença entre tijolo baiano e bloco de concreto?',
        answer: 'O tijolo baiano (cerâmico furado) é mais leve e mais barato, ideal para alvenaria de vedação (paredes internas). O bloco de concreto é mais resistente e mais pesado, sendo usado em muros, paredes estruturais e fundações.'
      },
      {
        question: 'Como descontar portas e janelas no cálculo de tijolos?',
        answer: 'Calcule a área do vão (largura × altura) e subtraia da área bruta da parede. Exemplo: parede de 3m × 2,8m = 8,4m² com uma porta de 0,90m × 2,10m = 1,89m², então a área líquida é 6,51m². O ObraCalcula faz essa dedução automaticamente.'
      }
    ]
  },
  {
    id: 'tinta',
    slug: 'calculadora-de-tinta',
    name: 'Calculadora de Tinta',
    shortTitle: 'Tinta e Pintura',
    category: 'pintura',
    categoryLabel: 'Pintura',
    iconName: 'Paintbrush',
    description: 'Calcule quantos litros, galões e latas de tinta comprar para pintar paredes e tetos.',
    detailedDescription: 'Estime a quantidade ideal de tinta látex, acrílica ou esmalte com base na metragem das paredes, inclusão do teto, demãos e desconto de esquadrias.',
    popular: true,
    estimatedTimeSec: 25,
    searchKeywords: ['tinta', 'pintura', 'pintar casa', 'galão de tinta', 'lata de tinta', 'demãos', 'pintar quarto', 'teto', 'parede', 'quanto de tinta', 'quanto material de pintura comprar', 'quantas latas de tinta', 'calculadora de tinta', 'calculadora de tinta parede', 'calcular tinta para parede', 'quanto tinta preciso', 'quanto tinta por m2', 'litros de tinta por m2', 'calculadora de pintura', 'tinta para quarto', 'tinta para sala'],
    metaTitle: 'Calculadora de Tinta Parede — Quantos Litros, Latas e Galões Comprar | ObraCalcula',
    metaDescription: 'Calculadora de tinta para parede grátis. Descubra quantos litros, latas de 18L ou galões de 3,6L de tinta comprar para paredes e teto sem sobrar nem faltar.',
    howToSteps: [
      'Informe o comprimento, a largura e a altura do ambiente em metros para calcular a área total das paredes automaticamente.',
      'Informe a quantidade e dimensões de portas (normalmente 0,90m × 2,10m) e janelas para descontar a área que não será pintada.',
      'Escolha se deseja incluir o teto na pintura — o teto tem a mesma área do piso do ambiente.',
      'Selecione o número de demãos: 2 para repintura, 3 para paredes novas ou mudança drástica de cor.',
      'Informe o rendimento da tinta (m²/litro) — verifique na lata. Tinta standard: 10 a 11 m²/L; premium: 12 a 14 m²/L.'
    ],
    tips: [
      'Paredes novas sem pintura anterior ou com cores escuras (como vermelho e azul escuro) exigem selador antes + 3 demãos de tinta para boa cobertura.',
      'Combine latas de 18L e galões de 3,6L para não desperdiçar: use a lata grande para a maior parte e um galão para os retoques finais.',
      'Tinta standard rende cerca de 10 m²/litro por demão; tintas premium de alta cobertura rendem 12 a 14 m²/litro — pode compensar mesmo sendo mais cara.',
      'Para textura lisa (massa corrida), aplique massa antes da tinta — isso reduz o consumo de tinta e melhora o acabamento.',
      'Nunca misture tintas de marcas diferentes na mesma parede — podem ter composição diferente e criar manchas.'
    ],
    faqList: [
      {
        question: 'Como calcular tinta para paredes de um quarto?',
        answer: 'Some as 4 paredes do quarto: 2 × (comprimento + largura) × altura. Exemplo: quarto 4m × 3m, pé-direito 2,80m → 2 × (4+3) × 2,80 = 39,2m². Desconte portas e janelas (~5m²) = 34,2m². Com 2 demãos e rendimento de 10m²/L: 34,2 × 2 ÷ 10 = 6,84 litros → compre 2 galões de 3,6L.'
      },
      {
        question: 'Quanto tinta por m² de parede?',
        answer: 'Com tinta standard (rendimento 10m²/L) e 2 demãos, o consumo é de 0,20 litros por m². Com 3 demãos, 0,30 litros por m². Exemplo: 50m² de parede × 0,20 L/m² = 10 litros de tinta.'
      },
      {
        question: 'Quantos metros quadrados uma lata de 18 litros pinta?',
        answer: 'Com rendimento de 10 m²/L e 2 demãos, uma lata de 18 litros pinta aproximadamente 90 m² de parede. Com 3 demãos, rende em torno de 60 m².'
      },
      {
        question: 'Quantas demãos de tinta são necessárias?',
        answer: 'Para repintura com a mesma cor ou cor similar, 2 demãos costumam ser suficientes. Para paredes novas, reparo de manchas ou troca de cor escura para clara, recomenda-se aplicar selador + 3 demãos de tinta.'
      },
      {
        question: 'Qual a diferença entre galão (3,6L) e lata (18L) de tinta?',
        answer: 'O volume total de 5 galões é igual a 1 lata (18L), mas a lata de 18 litros costuma ser 20% a 35% mais barata por litro. Compre a lata se for pintar uma área grande; prefira galões para retoques ou áreas pequenas.'
      },
      {
        question: 'Quanto tinta preciso para pintar uma casa inteira?',
        answer: 'Uma casa de 60m² tem em média 150 a 200m² de paredes internas. Com 2 demãos e rendimento de 10m²/L: 200m² × 2 ÷ 10 = 40 litros → 2 latas de 18L + 1 galão de 3,6L (41,6L no total).'
      }
    ]
  },
  {
    id: 'concreto',
    slug: 'calculadora-de-concreto',
    name: 'Calculadora de Concreto',
    shortTitle: 'Concreto Usinado/Virado',
    category: 'construcao',
    categoryLabel: 'Construção',
    iconName: 'Layers',
    description: 'Calcule o volume em m³ e o traço (cimento, areia e brita) para lajes, vigas e pisos.',
    detailedDescription: 'Obtenha o volume total de concreto em metros cúbicos (m³) para lajes, sapatas, colunas e contrapisos, com a dosagem completa de sacos de cimento, areia e pedra brita.',
    popular: true,
    estimatedTimeSec: 30,
    searchKeywords: ['concreto', 'laje', 'viga', 'coluna', 'sapata', 'metro cubico', 'm3 de concreto', 'traço de concreto', 'areia e brita', 'quanto de concreto para laje', 'quanto material de concreto'],
    metaTitle: 'Quanto de Concreto, Cimento e Brita para Laje: Calculadora | ObraCalcula',
    metaDescription: 'Descubra quanto material de concreto usinado ou virado comprar: calcule volume em m³, sacos de cimento de 50kg, areia e brita para lajes, vigas e pisos.',
    howToSteps: [
      'Escolha o elemento estrutural (Laje, Piso/Calçada, Viga/Coluna, Sapata ou Volume direto).',
      'Informe as medidas: comprimento, largura e espessura/altura em metros.',
      'Defina a margem de perda (5% a 10% para acomodação nas formas e irregularidades do solo).'
    ],
    tips: [
      'Para volumes acima de 3 m³, o concreto usinado traz economia de tempo, melhor homogeneidade e garantia de resistência FCK.',
      'Na concretagem de pisos e calçadas sobre a terra, nivele bem a base para evitar que a espessura fique maior do que o planejado.',
      'Mantenha o concreto curado (molhado) por pelo menos 7 dias após a concretagem para evitar fissuras.'
    ],
    faqList: [
      {
        question: 'Como calcular quanto de concreto preciso para uma laje?',
        answer: 'Multiplique o comprimento pela largura e pela espessura em metros. Exemplo: 8m x 5m com 10cm (0,10m) = 4,00 m³ + 5% de perda = 4,20 m³ de concreto.'
      },
      {
        question: 'Como calcular o metro cúbico (m³) de concreto?',
        answer: 'Multiplique: Comprimento x Largura x Espessura. Exemplo: Uma laje de 8m x 5m com 10cm (0,10m) de espessura = 8 x 5 x 0,10 = 4,00 m³.'
      },
      {
        question: 'Quantos sacos de cimento vão em 1 m³ de concreto?',
        answer: 'Para um traço convencional estrutural (FCK 20 a 25 MPa, proporção 1:2:3), gastam-se em média de 6,5 a 7 sacos de cimento de 50kg por metro cúbico.'
      },
      {
        question: 'Qual a proporção do traço de concreto 1:2:3?',
        answer: 'Significa 1 lata de cimento, 2 latas de areia média e 3 latas de pedra brita 1, com água dosada gradualmente até atingir boa trabalhabilidade.'
      }
    ]
  },
  {
    id: 'cimento',
    slug: 'calculadora-de-cimento',
    name: 'Calculadora de Cimento',
    shortTitle: 'Cimento por Serviço',
    category: 'construcao',
    categoryLabel: 'Construção',
    iconName: 'Package',
    description: 'Estime a quantidade de sacos de 50kg para reboco, contrapiso, assentamento e concreto.',
    detailedDescription: 'Calcule quantos sacos de cimento de 50kg você precisará para diferentes serviços da obra: reboco de parede, emboço, contrapiso, assentamento de tijolos ou concreto.',
    popular: true,
    estimatedTimeSec: 25,
    searchKeywords: ['cimento', 'saco de cimento', 'sacos de cimento 50kg', 'reboco', 'emboço', 'contrapiso', 'assentamento', 'quanto de cimento', 'quantos sacos de cimento comprar', 'quanto cimento por m2', 'quantos sacos de cimento por m2', 'calculadora de cimento', 'cimento por metro quadrado', 'sacos de cimento para contrapiso', 'quanto cimento para reboco', 'quanto cimento para laje', 'cimento para 100m2'],
    metaTitle: 'Quanto Cimento por m²? Calculadora de Sacos 50kg | ObraCalcula',
    metaDescription: 'Descubra quanto cimento por m² você precisa: calcule sacos de 50kg para contrapiso, reboco, assentamento e concreto. Tabela completa de consumo por serviço.',
    howToSteps: [
      'Selecione o tipo de serviço: Contrapiso, Reboco/Emboço, Assentamento de Tijolos ou Concreto estrutural.',
      'Informe a área em m² (para contrapiso e reboco) ou o volume em m³ (para concreto).',
      'Defina a espessura da camada: 3 cm para contrapiso, 1,5 cm para reboco, 2 cm para emboço.',
      'A calculadora exibe automaticamente os sacos de cimento (50kg), a quantidade de areia e a proporção do traço recomendado.'
    ],
    tips: [
      'Armazene os sacos de cimento em local seco e coberto, sobre estrados de madeira a pelo menos 30 cm do piso — umidade endurece o saco e inutiliza o produto.',
      'Use sacos com data de fabricação recente (menos de 3 meses) — cimento envelhece e perde resistência mesmo dentro do saco fechado.',
      'O excesso de cimento na massa de reboco causa trincas por retração; respeite sempre as proporções do traço — mais cimento não é melhor.',
      'Para contrapiso de garagem ou área externa, use traço mais rico (1:3) para maior resistência ao tráfego de veículos.',
      'Compre cimento CP II ou CP III para obras gerais; use CP V-ARI (alta resistência inicial) quando precisar desformar rápido.'
    ],
    faqList: [
      {
        question: 'Quanto cimento por m² de contrapiso?',
        answer: 'Para contrapiso de 3 cm de espessura no traço 1:4 (cimento e areia): 1 saco de 50kg cobre aproximadamente 4 a 5 m². Portanto: 100m² de contrapiso = 20 a 25 sacos de cimento de 50kg.'
      },
      {
        question: 'Quanto cimento por m² de reboco?',
        answer: 'Para reboco de 1,5 cm no traço 1:2:8 (cimento, cal, areia): 1 saco de 50kg cobre cerca de 10 a 12 m². Para 100m² de reboco: 8 a 10 sacos de cimento de 50kg.'
      },
      {
        question: 'Quantos sacos de cimento para assentar 1.000 tijolos?',
        answer: 'Para assentamento de tijolos baianos com argamassa traço 1:2:8, gasta-se aproximadamente 1 saco de cimento de 50kg para cada 150 a 200 tijolos. Para 1.000 tijolos: 5 a 7 sacos de cimento.'
      },
      {
        question: 'Quantos sacos de cimento para 100 m² de reboco?',
        answer: 'Para reboco de 1,5 cm de espessura no traço 1:2:8 (cimento, cal e areia), gastam-se cerca de 8 a 10 sacos de cimento de 50kg para 100 m².'
      },
      {
        question: 'Quantos sacos de cimento para um contrapiso de 50 m²?',
        answer: 'Com espessura média de 3 cm no traço 1:4 (cimento e areia), gasta-se em média de 10 a 12 sacos de cimento de 50kg para 50m².'
      },
      {
        question: 'Qual a diferença entre cimento CP II, CP III e CP V?',
        answer: 'CP II (Composto): uso geral em obras comuns. CP III (Alto-forno): mais resistente a sulfatos, ideal para fundações e obras em contato com o solo. CP V-ARI (Alta Resistência Inicial): endurece em 24 a 48h, usado quando se precisa desformar rápido ou em concreto aparente.'
      }
    ]
  },
  {
    id: 'argamassa',
    slug: 'calculadora-de-argamassa',
    name: 'Calculadora de Argamassa Colante',
    shortTitle: 'Argamassa Colante',
    category: 'pisos',
    categoryLabel: 'Pisos e Revestimentos',
    iconName: 'Container',
    description: 'Estime a quantidade de sacos de 20kg para assentamento de pisos e azulejos.',
    detailedDescription: 'Descubra quantos sacos de 20kg de argamassa AC-I, AC-II ou AC-III você precisa de acordo com o tamanho da peça e se o assentamento é colagem simples ou dupla.',
    popular: true,
    estimatedTimeSec: 20,
    searchKeywords: ['argamassa', 'argamassa colante', 'ac1', 'ac2', 'ac3', 'assentar piso', 'sacos de argamassa', 'quartzolit', 'quanto de argamassa comprar'],
    metaTitle: 'Quanto de Argamassa Colante Comprar (Sacos 20kg) | ObraCalcula',
    metaDescription: 'Descubra quanto de argamassa colante AC-I, AC-II ou AC-III comprar: calcule sacos de 20kg para assentamento simples e dupla colagem.',
    howToSteps: [
      'Informe a área total do piso ou parede a ser revestida (m²).',
      'Indique as dimensões da peça para determinar se exige colagem simples ou dupla colagem (peças > 30x30 cm).',
      'Defina o tipo de argamassa recomendada para o ambiente (Interno, Externo, Porcelanato ou Fachada).'
    ],
    tips: [
      'Peças com formato acima de 30x30 cm (900 cm²) exigem dupla colagem (argamassa no piso e no verso da peça), dobrando o consumo para cerca de 8 a 9 kg/m².',
      'Use AC-I para áreas internas secas, AC-II para áreas externas/molhadas e AC-III para porcelanatos grandes e piscinas.',
      'Misture a argamassa com batedor mecânico para garantir homogeneidade e tempo de secagem correto.'
    ],
    faqList: [
      {
        question: 'Quantos kg de argamassa gasta por metro quadrado?',
        answer: 'Em colagem simples (dente de 6 a 8mm), o consumo é de 4 a 5 kg/m² (1 saco de 20kg rende ~4 a 5 m²). Em dupla colagem, o consumo sobe para 8 a 9 kg/m² (1 saco rende ~2,2 a 2,5 m²).'
      },
      {
        question: 'Quando usar argamassa AC-I, AC-II ou AC-III?',
        answer: 'AC-I: Cerâmicas em áreas internas secas. AC-II: Áreas internas, externas e banheiros. AC-III: Porcelanatos, grandes formatos, fachadas e piscinas.'
      }
    ]
  },
  {
    id: 'telhas',
    slug: 'calculadora-de-telhas',
    name: 'Calculadora de Telhas e Telhado',
    shortTitle: 'Telhas e Cobertura',
    category: 'cobertura',
    categoryLabel: 'Cobertura',
    iconName: 'Home',
    description: 'Estime a quantidade de telhas cerâmicas, fibrocimento ou metálicas com inclinação.',
    detailedDescription: 'Calcule o número de telhas necessárias para a cobertura da sua casa considerando a projeção horizontal, caimento/inclinação do telhado e beirais.',
    popular: true,
    estimatedTimeSec: 25,
    searchKeywords: ['telha', 'telhado', 'cobertura', 'telha romana', 'telha portuguesa', 'fibrocimento', 'brasilit', 'caimento', 'área do telhado', 'quantas telhas comprar', 'quanto de telha preciso'],
    metaTitle: 'Quantas Telhas Comprar por m²: Calculadora de Telhado | ObraCalcula',
    metaDescription: 'Descubra quanto material de telhado comprar: calcule quantas telhas cerâmicas, fibrocimento ou metálicas você precisa com correção de inclinação.',
    howToSteps: [
      'Informe a largura e comprimento da área de projeção horizontal da casa.',
      'Adicione a medida dos beirais (normalmente 0,50m a 0,80m de cada lado).',
      'Defina a inclinação do telhado (ex: 30% a 35% para telhas cerâmicas, 10% a 15% para fibrocimento).',
      'Escolha o modelo de telha (Romana, Portuguesa, Colonial, Francesa, Fibrocimento 2,44x1,10m).'
    ],
    tips: [
      'A área real do telhado é sempre maior do que a projeção horizontal da planta devido ao caimento inclinado.',
      'Respeite a inclinação mínima recomendada pelo fabricante da telha para evitar retorno de água da chuva com ventos fortes.',
      'Lembre-se de calcular as telhas de cumeeira (emboçamento) para o encontro das águas do telhado.'
    ],
    faqList: [
      {
        question: 'Quantas telhas romanas vão por metro quadrado?',
        answer: 'A telha cerâmica tipo Romana consome em média 16 telhas por m² de telhado.'
      },
      {
        question: 'Quantas telhas portuguesas vão por m²?',
        answer: 'A telha portuguesa consome cerca de 17 peças por metro quadrado.'
      },
      {
        question: 'Como calcular a inclinação do telhado?',
        answer: 'Uma inclinação de 30% significa que a cada 1 metro de avanço horizontal, o telhado sobe 30 centímetros na vertical.'
      }
    ]
  },
  {
    id: 'rejunte',
    slug: 'calculadora-de-rejunte',
    name: 'Calculadora de Rejunte',
    shortTitle: 'Rejunte para Pisos',
    category: 'pisos',
    categoryLabel: 'Pisos e Revestimentos',
    iconName: 'Grid',
    description: 'Calcule a quantidade exata de rejunte (em kg) com base nas medidas da peça e da junta.',
    detailedDescription: 'Utilize a fórmula oficial dos fabricantes para descobrir quantos quilos e pacotes de rejunte cimentício, acrílico ou epóxi você precisa para rejuntar seu piso.',
    popular: true,
    estimatedTimeSec: 20,
    searchKeywords: ['rejunte', 'rejunte de piso', 'rejuntar porcelanato', 'largura da junta', 'rejunte epoxi', 'rejunte cimenticio', 'quanto de rejunte comprar', 'quantos kg de rejunte'],
    metaTitle: 'Quanto de Rejunte Comprar (kg e pacotes): Calculadora | ObraCalcula',
    metaDescription: 'Descubra quanto rejunte comprar: calcule com precisão matemática quantos kg de rejunte você precisa com base no formato do piso e largura da junta.',
    howToSteps: [
      'Informe a área total a ser rejuntada (m²).',
      'Informe o comprimento, largura e espessura da peça de piso/azulejo em milímetros ou centímetros.',
      'Defina a largura da junta de dilatação recomendada (ex: 1,5mm para porcelanato retificado, 3mm a 5mm para cerâmica comum).'
    ],
    tips: [
      'Porcelanatos retificados com juntas finas (1mm a 1,5mm) consomem muito menos rejunte por m² do que cerâmicas tradicionais com juntas de 4mm a 6mm.',
      'Rejunte acrílico e epóxi são ideais para dentro do box do banheiro por serem 100% impermeáveis e antimofo.',
      'Limpe o excesso de rejunte das peças logo após a aplicação com uma esponja úmida para não manchar o piso.'
    ],
    faqList: [
      {
        question: 'Como funciona a fórmula oficial do cálculo de rejunte?',
        answer: 'Fórmula: [(C + L) x E x J x 1,58] / (C x L), onde C=Comprimento(mm), L=Largura(mm), E=Espessura(mm) e J=Junta(mm). O resultado é dado em kg por m².'
      },
      {
        question: 'Qual a diferença de rejunte cimentício para o epóxi?',
        answer: 'O cimentício é mais econômico e poroso, comum em salas e quartos. O epóxi é impermeável, não mancha e é muito resistente, ideal para banheiros, cozinhas e piscinas.'
      }
    ]
  },
  {
    id: 'rodape',
    slug: 'calculadora-de-rodape',
    name: 'Calculadora de Rodapé',
    shortTitle: 'Rodapé Linear',
    category: 'reforma',
    categoryLabel: 'Reforma',
    iconName: 'Ruler',
    description: 'Calcule os metros lineares e quantidade de réguas de rodapé descontando vãos de portas.',
    detailedDescription: 'Calcule a metragem linear exata de rodapés de MDF, poliestireno, cerâmica ou madeira necessários para todos os cômodos da sua casa.',
    popular: false,
    estimatedTimeSec: 15,
    searchKeywords: ['rodape', 'metro linear', 'rodape poliestireno', 'rodape santa luzia', 'rodape mdf', 'acabamento'],
    metaTitle: 'Calculadora de Rodapé (Metros Lineares) — ObraCalcula',
    metaDescription: 'Calcule os metros lineares e réguas de rodapé necessárias para quartos, salas e corredores com desconto de vãos de portas.',
    howToSteps: [
      'Some os comprimentos de todas as paredes do cômodo (perímetro total).',
      'Informe a largura das portas e vãos de passagem para deduzir.',
      'Informe o comprimento da barra do rodapé comercial (geralmente 2,00m ou 2,40m).',
      'Defina a margem de perda para recortes e cantos (10% a 15%).'
    ],
    tips: [
      'Os cantos em ângulo de 45 graus geram perda de pontas nas barras; considere 10% a 15% de folga.',
      'Rodapés de poliestireno são à prova d’água e resistentes a cupins, ideais para áreas com piso vinílico ou porcelanato.'
    ],
    faqList: [
      {
        question: 'Como calcular rodapé para um quarto de 4m x 3m?',
        answer: 'O perímetro é (4+3+4+3) = 14 metros. Descontando uma porta de 0,80m = 13,20 metros lineares. Com 10% de perda = 14,52 metros.'
      }
    ]
  },
  {
    id: 'massa-corrida',
    slug: 'calculadora-de-massa-corrida',
    name: 'Calculadora de Massa Corrida e Gesso',
    shortTitle: 'Massa Corrida / Gesso',
    category: 'pintura',
    categoryLabel: 'Pintura',
    iconName: 'Brush',
    description: 'Estime latas, baldes e sacos de massa corrida (PVA) ou massa acrílica para alisamento.',
    detailedDescription: 'Descubra a quantidade de barricas, baldes de 18L e sacos de massa corrida PVA (interior) ou acrílica (exterior e banheiros) para preparar suas paredes antes da pintura.',
    popular: false,
    estimatedTimeSec: 20,
    searchKeywords: ['massa corrida', 'massa acrilica', 'emassar parede', 'alisar parede', 'gesso', 'barrica de massa'],
    metaTitle: 'Calculadora de Massa Corrida e Massa Acrílica — ObraCalcula',
    metaDescription: 'Descubra quantas barricas ou baldes de massa corrida PVA ou acrílica você precisa para nivelar e emassar suas paredes.',
    howToSteps: [
      'Informe a área total das paredes a serem emassadas.',
      'Escolha entre Massa PVA (áreas secas internas) ou Massa Acrílica (áreas úmidas e fachadas).',
      'Selecione a condição da parede (reboco novo rústico, repintura ou gesso acartonado/drywall).'
    ],
    tips: [
      'Paredes de reboco novo e grosso gastam até 50% mais massa para a primeira demão de nivelamento.',
      'Em paredes de gesso liso ou drywall, o consumo de massa é muito menor, servindo apenas para tratamento de juntas e pequenos retoques.',
      'Aplique um fundo preparador ou selador antes da massa para evitar que ela solte pó ou descasque no futuro.'
    ],
    faqList: [
      {
        question: 'Quantos metros quadrados rende um balde de massa corrida de 25 kg?',
        answer: 'Uma barrica ou balde de 25kg rende em média de 25 a 35 m² com 2 demãos sobre superfície já regularizada.'
      },
      {
        question: 'Qual a diferença entre massa PVA e massa acrílica?',
        answer: 'A massa corrida PVA é solúvel em água e deve ser usada apenas em áreas internas secas. A massa acrílica resiste à umidade e chuva, sendo obrigatória em banheiros, cozinhas, lavanderias e fachadas.'
      }
    ]
  }
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find(c => c.slug === slug || c.id === slug);
}

export function getRelatedCalculators(currentId: string, limit: number = 3): CalculatorMeta[] {
  const current = CALCULATORS.find(c => c.id === currentId);
  if (!current) return CALCULATORS.slice(0, limit);
  
  const sameCategory = CALCULATORS.filter(c => c.id !== currentId && c.category === current.category);
  const otherPopular = CALCULATORS.filter(c => c.id !== currentId && c.category !== current.category && c.popular);
  
  return [...sameCategory, ...otherPopular].slice(0, limit);
}
