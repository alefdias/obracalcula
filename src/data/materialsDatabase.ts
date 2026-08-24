export interface MaterialReference {
  name: string;
  category: string;
  unit: string;
  commercialPacking: string;
  averageYield: string;
  mixRatio?: string;
  recommendedLossMargin: string;
  description: string;
  usefulTip: string;
}

export const MATERIALS_DATABASE: MaterialReference[] = [
  {
    name: 'Piso Porcelanato Retificado',
    category: 'Pisos e Revestimentos',
    unit: 'm²',
    commercialPacking: 'Caixas de 1,44 m² a 2,40 m²',
    averageYield: 'Área da caixa com junta de 1,5mm a 2mm',
    recommendedLossMargin: '10% (reto) a 15% (diagonal)',
    description: 'Placas cerâmicas de alta densidade e absorção de água próxima a zero (< 0,5%).',
    usefulTip: 'Sempre confira o número de lote e tonalidade em todas as caixas no ato da entrega.'
  },
  {
    name: 'Tijolo Cerâmico Baiano (8 furos - 9x19x19 cm)',
    category: 'Alvenaria e Construção',
    unit: 'unidades',
    commercialPacking: 'Milheiros ou centenas',
    averageYield: '25 a 27 peças por m² de parede',
    recommendedLossMargin: '10%',
    description: 'Tijolo padrão para fechamento de alvenaria em construções residenciais.',
    usefulTip: 'Molhe os tijolos antes do assentamento para que eles não suguem a água da argamassa.'
  },
  {
    name: 'Bloco de Concreto Estrutural (14x19x39 cm)',
    category: 'Alvenaria e Construção',
    unit: 'unidades',
    commercialPacking: 'Paletes com 100 a 140 unidades',
    averageYield: '12,5 peças por m² de parede',
    recommendedLossMargin: '5% a 8%',
    description: 'Bloco para paredes estruturais que dispensam vigas e colunas convencionais.',
    usefulTip: 'Garante excelente isolamento acústico e alinhamento rápido da alvenaria.'
  },
  {
    name: 'Tinta Látex Acrílica Fosca Standard',
    category: 'Pintura',
    unit: 'Litros',
    commercialPacking: 'Latas de 18L, Galões de 3,6L, Quartos de 900ml',
    averageYield: '10 m² a 12 m² por litro por demão',
    recommendedLossMargin: '5%',
    description: 'Tinta à base de água para alvenaria interna e externa com boa lavabilidade.',
    usefulTip: 'Aplique sempre a primeira demão mais diluída (20% água) para melhor penetração no reboco.'
  },
  {
    name: 'Cimento Portland CP II-E-32',
    category: 'Construção e Estrutura',
    unit: 'Sacos de 50 kg',
    commercialPacking: 'Saco de 50 kg',
    averageYield: '6,5 a 7 sacos por m³ de concreto (traço 1:2:3)',
    mixRatio: '1 saco cimento : 4 latas areia : 5,5 latas brita : 1,5 latas água',
    recommendedLossMargin: '5%',
    description: 'Cimento multiuso ideal para fundações, lajes, pilares, vigas e alvenaria.',
    usefulTip: 'Nunca empilhe mais de 10 sacos de cimento na mesma pilha para evitar compactação e empedramento.'
  },
  {
    name: 'Argamassa Colante AC-II',
    category: 'Pisos e Revestimentos',
    unit: 'Sacos de 20 kg',
    commercialPacking: 'Saco de 20 kg',
    averageYield: '4 a 5 kg/m² (simples colagem) ou 8 a 9 kg/m² (dupla colagem)',
    recommendedLossMargin: '5%',
    description: 'Argamassa para assentamento de pisos cerâmicos e porcelanatos em áreas internas e externas.',
    usefulTip: 'Use desempenadeira com dentes adequados (8mm para cerâmicas comuns, 10mm a 12mm para grandes formatos).'
  },
  {
    name: 'Telha Cerâmica Tipo Romana',
    category: 'Cobertura',
    unit: 'unidades',
    commercialPacking: 'Milheiros ou centenas',
    averageYield: '16 peças por m² de telhado inclinado',
    recommendedLossMargin: '5% a 8%',
    description: 'Telha tradicional com encaixes perfeitos e caimento mínimo de 30% a 35%.',
    usefulTip: 'A estrutura de madeira (ripamento e caibros) deve seguir rigorosamente a galga da telha comprada.'
  },
  {
    name: 'Rejunte Cimentício Flexível',
    category: 'Pisos e Revestimentos',
    unit: 'kg',
    commercialPacking: 'Pacotes de 1 kg e 5 kg',
    averageYield: '0,3 a 0,5 kg/m² (para peças 60x60cm com junta de 2mm)',
    recommendedLossMargin: '10%',
    description: 'Massa cimentícia aditivada com polímeros para preenchimento de juntas de pisos.',
    usefulTip: 'Aguarde 72 horas após o assentamento do piso para iniciar o rejuntamento.'
  },
  {
    name: 'Massa Corrida PVA',
    category: 'Pintura e Acabamento',
    unit: 'kg',
    commercialPacking: 'Barricas de 25 kg, Baldes de 18 kg',
    averageYield: '1,0 a 1,5 kg/m² com duas demãos',
    recommendedLossMargin: '5%',
    description: 'Massa niveladora para paredes internas de gesso, alvenaria ou repintura.',
    usefulTip: 'Lixe com lixas finas (nº 180 a 220) usando lâmpada rasante para identificar imperfeições.'
  },
  {
    name: 'Areia Média Lavada',
    category: 'Agregados',
    unit: 'm³ (metros cúbicos)',
    commercialPacking: 'Caminhão (m³) ou sacos de 20kg',
    averageYield: '0,7 a 0,8 m³ de areia por m³ de concreto',
    recommendedLossMargin: '10% (acomodação e perdas no chão)',
    description: 'Agregado miúdo indispensável para argamassas de reboco, contrapiso e concreto.',
    usefulTip: 'Proteja a areia com lona plástica na calçada para não ser levada pela chuva.'
  },
  {
    name: 'Pedra Brita nº 1 (19mm)',
    category: 'Agregados',
    unit: 'm³ (metros cúbicos)',
    commercialPacking: 'Caminhão (m³) ou sacos de 20kg',
    averageYield: '0,8 a 0,9 m³ de brita por m³ de concreto',
    recommendedLossMargin: '5%',
    description: 'Agregado graúdo de britagem para concretos estruturais com ótimo adensamento.',
    usefulTip: 'Pedras limpas e sem pó garantem maior aderência à pasta de cimento e elevam a resistência final.'
  }
];
