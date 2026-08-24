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
    searchKeywords: ['piso', 'porcelanato', 'azulejo', 'revestimento', 'cerâmica', 'sala', 'quarto', 'banheiro', 'caixa de piso', 'metros quadrados de piso', 'quanto material de piso', 'quanto piso comprar', 'quanto piso preciso'],
    metaTitle: 'Quanto Material de Piso Comprar: Calculadora de Piso e Porcelanato | ObraCalcula',
    metaDescription: 'Descubra quanto material de piso comprar para sua obra ou reforma. Calcule metros quadrados, quantidade de peças e caixas com margem de perda recomendada.',
    howToSteps: [
      'Meça o comprimento e a largura do cômodo em metros (ou informe a área total m²).',
      'Informe as dimensões da peça de piso ou porcelanato (ex: 60x60 cm, 80x80 cm).',
      'Selecione a margem de desperdício (10% para assentamento reto tradicional ou 15% a 20% para diagonal/cortes complexos).',
      'Se souber a quantidade de m² por caixa que o fabricante vende, informe para obter o total de caixas fechadas.'
    ],
    tips: [
      'Sempre guarde de 1 a 2 caixas extras do mesmo lote para futuras manutenções ou reparos de encanamento.',
      'Em assentamentos diagonais ou espinha de peixe, o desperdício é maior devido aos recortes nos cantos.',
      'Verifique se todas as caixas compradas pertencem à mesma tonalidade e calibre de fábrica.'
    ],
    faqList: [
      {
        question: 'Como saber quanto material de piso comprar?',
        answer: 'Multiplique o comprimento pela largura do ambiente para obter a metragem quadrada (m²) e adicione 10% de margem para cortes e quebras. Divida pela metragem da caixa para saber quantas caixas comprar.'
      },
      {
        question: 'Qual porcentagem de perda devo considerar para piso?',
        answer: 'Para assentamento alinhado/reto simples, 10% é o padrão recomendado. Para assentamentos diagonais, ambientes com muitos recortes ou peças grandes (acima de 80x80 cm), recomendamos de 15% a 20% de perda.'
      },
      {
        question: 'Quantos pisos vem em uma caixa?',
        answer: 'Varia conforme o fabricante e tamanho da peça. Geralmente uma caixa cobre entre 1,44 m² e 2,50 m². Verifique a embalagem ou especificação do produto antes da compra.'
      },
      {
        question: 'Como calcular piso para uma sala de 20 m²?',
        answer: 'Multiplica-se a área (20 m²) por 1,10 (10% de perda), totalizando 22 m². Se cada caixa tiver 2,00 m², você precisará de 11 caixas.'
      },
      {
        question: 'Devo comprar piso extra além do cálculo?',
        answer: 'Sim! Além dos 10% de perda operacional de corte, ter 1 caixa guardada na despensa garante reposição com o mesmo tom e lote em caso de trincas ou reformas futuras.'
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
    searchKeywords: ['tijolo', 'bloco', 'bloco de concreto', 'tijolo baiano', 'alvenaria', 'levantar parede', 'parede', 'muro', 'construir parede', 'quanto de tijolo', 'quanto material de alvenaria', 'quantos tijolos comprar'],
    metaTitle: 'Quanto de Tijolo e Bloco Comprar: Calculadora de Parede | ObraCalcula',
    metaDescription: 'Descubra quanto material de alvenaria comprar: quantidade de tijolos baianos, maciços ou blocos de concreto por m² com desconto de portas e janelas.',
    howToSteps: [
      'Adicione as medidas de cada parede (comprimento x altura).',
      'Desconte as áreas de portas e janelas existentes nas paredes.',
      'Escolha o tipo de tijolo ou bloco (ex: Baiano 8 furos, Bloco de Concreto 14x19x39, Maciço, etc.).',
      'Defina a margem de perda (geralmente 10% a quebra no transporte e corte).'
    ],
    tips: [
      'Tijolos furados costumam sofrer quebra no descarregamento e transporte. Uma folga de 10% é essencial.',
      'O bloco de concreto 14x19x39 rende cerca de 12,5 peças por metro quadrado com junta de 1 cm.',
      'Não se esqueça de prever a argamassa de assentamento proporcional ao número de tijolos.'
    ],
    faqList: [
      {
        question: 'Como saber quanto tijolo comprar para uma parede?',
        answer: 'Multiplique a área da parede em m² pelo consumo médio do tijolo escolhido (ex: 25 a 27 tijolos baianos de 8 furos por m²) e adicione 10% de perda por quebra.'
      },
      {
        question: 'Quantos tijolos de 8 furos gasta por metro quadrado?',
        answer: 'O tijolo baiano 8 furos (9x19x19 cm) consome em média 25 a 27 tijolos por m² de parede (com junta de argamassa de 1,5 cm).'
      },
      {
        question: 'Quantos blocos de concreto 14x19x39 vão por metro quadrado?',
        answer: 'São necessários aproximadamente 12,5 blocos de concreto por metro quadrado de parede.'
      },
      {
        question: 'Como descontar portas e janelas no cálculo de parede?',
        answer: 'Calcule a área do vão (largura x altura) e subtraia da área bruta da parede. O ObraCalcula faz essa dedução automaticamente no formulário de múltiplas paredes.'
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
    searchKeywords: ['tinta', 'pintura', 'pintar casa', 'galão de tinta', 'lata de tinta', 'demãos', 'pintar quarto', 'teto', 'parede', 'quanto de tinta', 'quanto material de pintura comprar', 'quantas latas de tinta'],
    metaTitle: 'Quanto de Tinta Comprar: Calculadora de Litros, Latas e Galões | ObraCalcula',
    metaDescription: 'Descubra quanto material de pintura comprar: calcule litros, latas de 18L e galões de 3,6L de tinta para paredes e tetos sem sobrar nem faltar.',
    howToSteps: [
      'Informe o comprimento, largura e altura do ambiente (ou a área das paredes).',
      'Informe a quantidade e tamanho de portas e janelas para descontar a área.',
      'Escolha se deseja incluir a pintura do teto.',
      'Defina o número de demãos (normalmente 2 a 3 para boa cobertura).'
    ],
    tips: [
      'Paredes novas sem pintura anterior ou com cores escuras costumam exigir selador e 3 demãos de tinta.',
      'Combine latas de 18L e galões de 3,6L para evitar sobras excessivas de tinta.',
      'Tinta standard rende cerca de 10 m²/litro por demão; tintas premium de alta cobertura podem render até 12-14 m²/litro.'
    ],
    faqList: [
      {
        question: 'Quantos metros quadrados uma lata de 18 litros pinta?',
        answer: 'Uma lata de 18 litros com rendimento médio de 10 m²/L rende cerca de 180 m² com 1 demão, ou cerca de 90 m² com 2 demãos completas.'
      },
      {
        question: 'Quantas demãos de tinta são necessárias?',
        answer: 'Para repintura com a mesma cor, 2 demãos costumam ser suficientes. Para paredes novas ou troca de cor forte para clara, recomenda-se 3 demãos.'
      },
      {
        question: 'O que rende mais: 1 lata de 18L ou 5 galões de 3,6L?',
        answer: 'O volume total é o mesmo (18L), mas a lata de 18 litros costuma ser entre 20% e 35% mais barata por litro do que comprar galões fracionados.'
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
    searchKeywords: ['cimento', 'saco de cimento', 'sacos de cimento 50kg', 'reboco', 'emboço', 'contrapiso', 'assentamento', 'quanto de cimento', 'quantos sacos de cimento comprar'],
    metaTitle: 'Quanto de Cimento Comprar (Sacos 50kg): Calculadora | ObraCalcula',
    metaDescription: 'Descubra quanto cimento comprar: calcule a quantidade de sacos de 50kg para contrapiso, reboco, assentamento de tijolos e concreto sem desperdício.',
    howToSteps: [
      'Selecione o tipo de serviço que irá realizar (Contrapiso, Reboco/Emboço, Assentamento de Tijolos ou Concreto).',
      'Informe a área (m²) ou volume a ser executado.',
      'Defina a espessura média da camada (ex: 2 a 3 cm para contrapiso, 1,5 a 2 cm para reboco).',
      'Consulte a quantidade recomendada de sacos de cimento e areia.'
    ],
    tips: [
      'Armazene os sacos de cimento em local seco e coberto, sobre estrados de madeira distantes do piso e paredes.',
      'Utilize sacos com prazo de validade recente (ideal menos de 30 dias de fabricação).',
      'O excesso de cimento na massa de reboco causa trincas por retração; respeite as proporções do traço.'
    ],
    faqList: [
      {
        question: 'Quantos sacos de cimento para 100 m² de reboco?',
        answer: 'Para um reboco de 1,5 cm de espessura no traço 1:2:8 (cimento, cal e areia), gastam-se cerca de 8 a 10 sacos de cimento de 50kg para 100 m².'
      },
      {
        question: 'Quantos sacos de cimento gasta em um contrapiso de 50 m²?',
        answer: 'Com espessura média de 3 cm no traço 1:4 (cimento e areia), gasta-se em média de 10 a 12 sacos de cimento de 50kg.'
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
