/**
 * Utilitários de formatação de números, moedas e unidades para o padrão brasileiro
 */

export function formatNumber(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatInteger(value: number): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return Math.round(value).toLocaleString('pt-BR');
}

export function formatArea(m2: number): string {
  return `${formatNumber(m2, 2)} m²`;
}

export function formatVolume(m3: number): string {
  return `${formatNumber(m3, 2)} m³`;
}

export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return `${formatNumber(kg / 1000, 2)} toneladas`;
  }
  return `${formatNumber(kg, 1)} kg`;
}

export function formatLength(m: number): string {
  return `${formatNumber(m, 2)} m`;
}

/**
 * Converte qualquer unidade de comprimento para Metros (m)
 */
export function convertToMeters(val: number, unit: 'm' | 'cm' | 'mm'): number {
  if (!val || isNaN(val)) return 0;
  switch (unit) {
    case 'cm': return val / 100;
    case 'mm': return val / 1000;
    case 'm':
    default:
      return val;
  }
}

/**
 * Converte Metros (m) para a unidade de destino
 */
export function convertFromMeters(valInMeters: number, toUnit: 'm' | 'cm' | 'mm'): number {
  if (!valInMeters || isNaN(valInMeters)) return 0;
  switch (toUnit) {
    case 'cm': return valInMeters * 100;
    case 'mm': return valInMeters * 1000;
    case 'm':
    default:
      return valInMeters;
  }
}
