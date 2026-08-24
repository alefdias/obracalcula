import { CALCULATORS, CalculatorMeta } from '../data/calculatorRegistry';
import { calculateFloor } from '../calculators/floor/floorCalculation';
import { calculateBricks } from '../calculators/bricks/brickCalculation';
import { calculatePaint } from '../calculators/paint/paintCalculation';
import { calculateConcrete } from '../calculators/concrete/concreteCalculation';
import { calculateCement } from '../calculators/cement/cementCalculation';
import { calculateMortar } from '../calculators/mortar/mortarCalculation';
import { calculateRoof } from '../calculators/roof/roofCalculation';
import { calculateGrout } from '../calculators/grout/groutCalculation';
import { calculateBaseboard } from '../calculators/baseboard/baseboardCalculation';
import { calculateSpackle } from '../calculators/spackle/spackleCalculation';
import { formatNumber, formatInteger, formatArea, formatVolume, formatWeight } from './formatters';

export interface NLPParseResult {
  hasMatch: boolean;
  calculator?: CalculatorMeta;
  interpretedText: string;
  instantResult?: {
    headline: string;
    subline: string;
    details: { label: string; value: string }[];
  };
  inferredParams?: Record<string, any>;
}

// Stopwords in Portuguese to ignore during token matching
const STOP_WORDS = new Set([
  'quantos', 'quantas', 'quanto', 'quanta', 'preciso', 'precisa', 'vou', 'gastar',
  'gasta', 'comprar', 'para', 'uma', 'um', 'uns', 'umas', 'de', 'da', 'do', 'das',
  'dos', 'em', 'no', 'na', 'nos', 'nas', 'com', 'por', 'que', 'se', 'qual', 'quais',
  'fazer', 'construir', 'reformar', 'pintar', 'assentar', 'calcular', 'calculo', 'ex',
  'exemplo', 'obra', 'casa', 'sala', 'quarto', 'muro', 'parede', 'chao', 'teto'
]);

export function parseNaturalLanguageQuery(text: string): NLPParseResult {
  const clean = text.toLowerCase().trim();
  if (!clean) {
    return { hasMatch: false, interpretedText: '' };
  }

  // 1. Extract dimensions / numbers
  // Check for AxB (e.g. 5x4, 5 x 4, 10x2.8, 4 por 3, 5 por 4)
  const dimMatch = clean.match(/(\d+(?:[.,]\d+)?)\s*(?:x|\*|por|\s*por\s*)\s*(\d+(?:[.,]\d+)?)/i);
  let dimL = 0;
  let dimW = 0;
  if (dimMatch) {
    dimL = parseFloat(dimMatch[1].replace(',', '.'));
    dimW = parseFloat(dimMatch[2].replace(',', '.'));
  }

  // Check for Area (e.g. 50m, 50m2, 50 m², 50 metros, 50 m2, 50 m)
  const areaMatch = clean.match(/(\d+(?:[.,]\d+)?)\s*(?:m²|m2|metros\s*quadrados|metros|m\b)/i);
  let areaVal = 0;
  if (areaMatch) {
    areaVal = parseFloat(areaMatch[1].replace(',', '.'));
  } else if (!dimMatch) {
    // If just a standalone number like "50"
    const numMatch = clean.match(/\b(\d+(?:[.,]\d+)?)\b/);
    if (numMatch) {
      areaVal = parseFloat(numMatch[1].replace(',', '.'));
    }
  }

  if (dimL > 0 && dimW > 0 && areaVal === 0) {
    areaVal = dimL * dimW;
  }

  // 2. Identify Target Calculator Intent
  let targetCalcId: string | null = null;

  if (clean.includes('piso') || clean.includes('porcelanato') || clean.includes('azulejo') || clean.includes('ceramica')) {
    targetCalcId = 'piso';
  } else if (clean.includes('tijol') || clean.includes('bloco') || clean.includes('alvenaria') || clean.includes('muro') || clean.includes('parede')) {
    targetCalcId = 'tijolos';
  } else if (clean.includes('tinta') || clean.includes('pintar') || clean.includes('pintura') || clean.includes('galao') || clean.includes('lata')) {
    targetCalcId = 'tinta';
  } else if (clean.includes('concreto') || clean.includes('laje') || clean.includes('viga') || clean.includes('coluna') || clean.includes('sapata')) {
    targetCalcId = 'concreto';
  } else if (clean.includes('cimento') || clean.includes('reboco') || clean.includes('contrapiso') || clean.includes('emboço')) {
    targetCalcId = 'cimento';
  } else if (clean.includes('argamassa') || clean.includes('ac1') || clean.includes('ac2') || clean.includes('ac3') || clean.includes('colante')) {
    targetCalcId = 'argamassa';
  } else if (clean.includes('telha') || clean.includes('telhado') || clean.includes('cobertura')) {
    targetCalcId = 'telhas';
  } else if (clean.includes('rejunte') || clean.includes('rejuntar')) {
    targetCalcId = 'rejunte';
  } else if (clean.includes('rodape') || clean.includes('rodapé')) {
    targetCalcId = 'rodape';
  } else if (clean.includes('massa corrida') || clean.includes('massa acrilica') || clean.includes('emassar') || clean.includes('gesso')) {
    targetCalcId = 'massa-corrida';
  }

  if (!targetCalcId) {
    return { hasMatch: false, interpretedText: '' };
  }

  const calculator = CALCULATORS.find(c => c.id === targetCalcId);
  if (!calculator) {
    return { hasMatch: false, interpretedText: '' };
  }

  // Fallback default area if user didn't specify numbers
  const effectiveArea = areaVal > 0 ? areaVal : 20;

  // 3. Compute instant calculation based on intent
  if (targetCalcId === 'piso') {
    const calcRes = calculateFloor({
      inputMode: dimL > 0 && dimW > 0 ? 'dimensions' : 'area',
      roomLength: dimL || Math.sqrt(effectiveArea),
      roomWidth: dimW || Math.sqrt(effectiveArea),
      roomArea: effectiveArea,
      pieceLengthCm: 60,
      pieceWidthCm: 60,
      pattern: 'straight',
      wasteMarginPercent: 10,
      boxCoverageM2: 2.16,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Cálculo de Piso para ${formatArea(effectiveArea)} (peça 60x60cm + 10% perda)`,
      instantResult: {
        headline: `${formatInteger(calcRes.recommendedPieceCount)} peças (~${calcRes.boxesEstimated} caixas)`,
        subline: `Área total a comprar: ${formatArea(calcRes.grossAreaWithWasteM2)} já com 10% de margem de corte.`,
        details: [
          { label: 'Área do ambiente', value: formatArea(effectiveArea) },
          { label: 'Peça padrão', value: '60 × 60 cm' },
          { label: 'Caixas recomendadas', value: `≈ ${calcRes.boxesEstimated} caixas (2,16 m²/cx)` },
        ],
      },
      inferredParams: {
        roomArea: effectiveArea,
        roomLength: dimL || 0,
        roomWidth: dimW || 0,
      },
    };
  }

  if (targetCalcId === 'tijolos') {
    const wallLength = dimL > 0 ? dimL : (areaVal > 0 ? areaVal / 2.8 : 5.0);
    const wallHeight = dimW > 0 ? dimW : 2.8;
    const calcRes = calculateBricks({
      brickType: 'baiano_8',
      jointThicknessCm: 1.5,
      walls: [{ id: 'w1', name: 'Parede', width: wallLength, height: wallHeight, unit: 'm' }],
      openings: [],
      wasteMarginPercent: 10,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Cálculo de Tijolos Baianos para ${formatArea(calcRes.netWallAreaM2)} de parede`,
      instantResult: {
        headline: `${formatInteger(calcRes.recommendedBrickCount)} tijolos baianos (8 furos)`,
        subline: `Para ${formatArea(calcRes.netWallAreaM2)} de parede com +10% de folga de quebra.`,
        details: [
          { label: 'Área da parede', value: formatArea(calcRes.netWallAreaM2) },
          { label: 'Tijolo', value: 'Baiano 8 furos (9x19x19cm)' },
          { label: 'Argamassa pronta', value: `≈ ${calcRes.mortarBagsEstimate20kg} sacos de 20kg` },
        ],
      },
      inferredParams: {
        walls: [{ id: 'w1', name: 'Parede', width: wallLength, height: wallHeight, unit: 'm' }],
      },
    };
  }

  if (targetCalcId === 'tinta') {
    const calcRes = calculatePaint({
      mode: dimL > 0 && dimW > 0 ? 'simple_room' : 'direct_area',
      roomLength: dimL || 4,
      roomWidth: dimW || 3.5,
      wallHeight: 2.8,
      includeCeiling: true,
      walls: [],
      openings: [],
      directAreaM2: effectiveArea,
      paintType: 'standard',
      coats: 2,
      wasteMarginPercent: 5,
    });

    const packsText = [];
    if (calcRes.packaging.cans18L > 0) packsText.push(`${calcRes.packaging.cans18L}x 18L`);
    if (calcRes.packaging.gallons3_6L > 0) packsText.push(`${calcRes.packaging.gallons3_6L}x 3,6L`);
    if (calcRes.packaging.quarts0_9L > 0) packsText.push(`${calcRes.packaging.quarts0_9L}x 900ml`);

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Cálculo de Tinta para ${formatArea(calcRes.totalNetPaintingAreaM2)} com 2 demãos`,
      instantResult: {
        headline: `${formatNumber(calcRes.recommendedLiters, 1)} Litros (${packsText.join(' + ') || 'Latas'})`,
        subline: `Cobertura com 2 demãos de tinta acrílica standard (+5% margem).`,
        details: [
          { label: 'Área de pintura', value: formatArea(calcRes.totalNetPaintingAreaM2) },
          { label: 'Demãos', value: '2 demãos completas' },
          { label: 'Sugestão de compra', value: packsText.join(' + ') || 'Latas de tinta' },
        ],
      },
    };
  }

  if (targetCalcId === 'concreto') {
    const l = dimL || 5;
    const w = dimW || 4;
    const calcRes = calculateConcrete({
      elementType: 'slab',
      lengthM: l,
      widthM: w,
      thicknessCm: 10,
      quantity: 1,
      directVolumeM3: effectiveArea * 0.1,
      strengthType: 'structural_25mpa',
      wasteMarginPercent: 5,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Concreto Estrutural para ${formatVolume(calcRes.totalVolumeWithWasteM3)} (espessura 10cm)`,
      instantResult: {
        headline: `${formatVolume(calcRes.totalVolumeWithWasteM3)} (~${calcRes.cementBags50kg} sacos cimento)`,
        subline: `Traço estrutural 1:2:3 com +5% de folga.`,
        details: [
          { label: 'Volume total', value: formatVolume(calcRes.totalVolumeWithWasteM3) },
          { label: 'Cimento 50kg', value: `${calcRes.cementBags50kg} sacos` },
          { label: 'Areia e Brita', value: `${formatNumber(calcRes.sandM3)} m³ areia / ${formatNumber(calcRes.gravelM3)} m³ brita` },
        ],
      },
    };
  }

  if (targetCalcId === 'cimento') {
    const calcRes = calculateCement({
      serviceType: 'contrapiso',
      areaM2: effectiveArea,
      thicknessCm: 3.5,
      wasteMarginPercent: 10,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Cimento para ${formatArea(effectiveArea)} de contrapiso (3,5cm espessura)`,
      instantResult: {
        headline: `${calcRes.cementBags50kg} sacos de cimento (50kg)`,
        subline: `+ ${formatNumber(calcRes.sandM3)} m³ de areia média lavada para ${formatArea(effectiveArea)}.`,
        details: [
          { label: 'Serviço', value: 'Contrapiso regularizado (3,5 cm)' },
          { label: 'Cimento 50kg', value: `${calcRes.cementBags50kg} sacos` },
          { label: 'Areia média', value: `≈ ${calcRes.sand18LCans} latas de 18L` },
        ],
      },
    };
  }

  if (targetCalcId === 'argamassa') {
    const calcRes = calculateMortar({
      mortarType: 'ac2',
      areaM2: effectiveArea,
      bondingMethod: 'double',
      wasteMarginPercent: 5,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Argamassa Colante AC-II para ${formatArea(effectiveArea)}`,
      instantResult: {
        headline: `${calcRes.bags20kg} sacos de 20kg (${formatWeight(calcRes.totalWeightKg)})`,
        subline: `Dupla colagem para pisos e porcelanatos com 5% de margem.`,
        details: [
          { label: 'Área revestida', value: formatArea(effectiveArea) },
          { label: 'Tipo', value: 'Argamassa AC-II (Dupla colagem)' },
          { label: 'Sacos 20kg', value: `${calcRes.bags20kg} sacos` },
        ],
      },
    };
  }

  if (targetCalcId === 'telhas') {
    const calcRes = calculateRoof({
      inputMode: 'real_area',
      houseLengthM: 10,
      houseWidthM: 7,
      eavesM: 0.6,
      slopePercent: 35,
      realRoofAreaM2: effectiveArea,
      tileModel: 'romana',
      roofWaterCount: 2,
      wasteMarginPercent: 5,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Telhas Cerâmicas Romanas para ${formatArea(effectiveArea)} de telhado`,
      instantResult: {
        headline: `${formatInteger(calcRes.recommendedTileCount)} telhas romanas`,
        subline: `Para ${formatArea(effectiveArea)} de telhado com 5% de quebra.`,
        details: [
          { label: 'Área do telhado', value: formatArea(effectiveArea) },
          { label: 'Modelo', value: 'Telha Romana (16 un/m²)' },
          { label: 'Cumeeiras', value: `≈ ${calcRes.ridgeTilesCount} peças` },
        ],
      },
    };
  }

  if (targetCalcId === 'rejunte') {
    const calcRes = calculateGrout({
      areaM2: effectiveArea,
      pieceLengthMm: 600,
      pieceWidthMm: 600,
      pieceThicknessMm: 8,
      jointWidthMm: 2,
      groutType: 'cimenticio',
      wasteMarginPercent: 10,
    });

    return {
      hasMatch: true,
      calculator,
      interpretedText: `Rejunte para ${formatArea(effectiveArea)} (peça 60x60cm, junta 2mm)`,
      instantResult: {
        headline: `${formatNumber(calcRes.totalWeightKg, 1)} kg de rejunte`,
        subline: `Cimentício resinado com 10% de folga.`,
        details: [
          { label: 'Área a rejuntar', value: formatArea(effectiveArea) },
          { label: 'Peso total', value: `${formatNumber(calcRes.totalWeightKg, 1)} kg` },
          { label: 'Pacotes 1kg', value: `${calcRes.packages1kg || 1} pacotes` },
        ],
      },
    };
  }

  return {
    hasMatch: true,
    calculator,
    interpretedText: `Calculadora de ${calculator.name}`,
  };
}

/**
 * Busca flexível de calculadoras com suporte a palavras isoladas e termos naturais
 */
export function matchCalculatorsFlexible(query: string, calculators: CalculatorMeta[]): CalculatorMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return calculators;

  // 1. NLP Parse first
  const nlp = parseNaturalLanguageQuery(q);
  if (nlp.hasMatch && nlp.calculator) {
    const primary = nlp.calculator;
    const others = calculators.filter(c => c.id !== primary.id);
    return [primary, ...others.slice(0, 2)];
  }

  // 2. Tokenized multi-word search
  const tokens = q.split(/\s+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));
  if (tokens.length === 0) {
    return calculators.filter(c => c.name.toLowerCase().includes(q) || c.slug.includes(q));
  }

  return calculators.filter(calc => {
    const searchableText = `${calc.name} ${calc.shortTitle} ${calc.description} ${calc.categoryLabel} ${calc.searchKeywords.join(' ')}`.toLowerCase();
    return tokens.some(token => searchableText.includes(token));
  });
}
