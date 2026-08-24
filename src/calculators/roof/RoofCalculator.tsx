import React, { useMemo, useEffect } from 'react';
import { RoofInputs, RoofTileModel } from './roofTypes';
import { calculateRoof, ROOF_TILE_SPECS } from './roofCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw, Home } from 'lucide-react';

const DEFAULT_ROOF_INPUTS: RoofInputs = {
  inputMode: 'projection',
  houseLengthM: 10.0,
  houseWidthM: 7.0,
  eavesM: 0.60,
  slopePercent: 35,
  realRoofAreaM2: 85,
  tileModel: 'romana',
  roofWaterCount: 2,
  wasteMarginPercent: 5,
};

export const RoofCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<RoofInputs>(
    'telhas',
    DEFAULT_ROOF_INPUTS
  );

  const result = useMemo(() => {
    return calculateRoof(values);
  }, [values]);

  useEffect(() => {
    if (result.realInclinedAreaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'telhas',
          calculatorName: 'Calculadora de Telhas e Telhado',
          summary: `${formatInteger(result.recommendedTileCount)} ${ROOF_TILE_SPECS[values.tileModel]?.unitLabel} (${formatArea(result.realInclinedAreaM2)} real)`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Área da Projeção Horizontal',
      value: formatArea(result.horizontalProjectionAreaM2),
      subValue: `Com beirais de ${values.eavesM}m`,
    },
    {
      label: 'Área Real Inclinada do Telhado',
      value: formatArea(result.realInclinedAreaM2),
      subValue: `Fator de inclinação: ×${result.slopeCorrectionFactor}`,
      highlight: true,
    },
    {
      label: 'Consumo por m²',
      value: `${result.tilesPerM2} ${ROOF_TILE_SPECS[values.tileModel]?.unitLabel}/m²`,
      subValue: ROOF_TILE_SPECS[values.tileModel]?.name,
    },
    {
      label: 'Cumeeiras (Emboçamento)',
      value: `≈ ${result.ridgeTilesCount} peças`,
      subValue: 'Para o cume do telhado',
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: ROOF_TILE_SPECS[values.tileModel]?.name || 'Telhas',
      quantity: `${formatInteger(result.recommendedTileCount)} ${ROOF_TILE_SPECS[values.tileModel]?.unitLabel}`,
      description: `Com +${result.wasteMarginUsed}% de folga para cortes no espigão e quebra no descarregamento.`,
      badge: 'Material Principal',
    },
    {
      title: 'Telhas de Cumeeira (Articulação)',
      quantity: `≈ ${result.ridgeTilesCount} unidades`,
      description: 'Fechamento superior no encontro das águas do telhado.',
    },
  ];

  return (
    <div className="space-y-8">
      {hasSavedData && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-brand-900">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Continuando cálculo anterior salvo no seu navegador.
          </span>
          <button
            type="button"
            onClick={resetValues}
            className="text-xs text-brand-700 hover:text-brand-950 font-bold underline flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Limpar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Modelo da Telha */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Modelo de Telha
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(ROOF_TILE_SPECS) as RoofTileModel[]).map((modelKey) => {
                const spec = ROOF_TILE_SPECS[modelKey];
                const isSelected = values.tileModel === modelKey;
                return (
                  <button
                    key={modelKey}
                    type="button"
                    onClick={() => updateValues({ tileModel: modelKey })}
                    className={`p-3.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{spec.name}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-normal mt-1 block">
                      {spec.description} (Min. {spec.minSlopePercent}% inclinação)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Dimensões da Casa e Beirais */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                Medidas da Planta e Inclinação
              </h3>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => updateValues({ inputMode: 'projection' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.inputMode === 'projection'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Planta + Beirais
                </button>
                <button
                  type="button"
                  onClick={() => updateValues({ inputMode: 'real_area' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.inputMode === 'real_area'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Área Real (m²)
                </button>
              </div>
            </div>

            {values.inputMode === 'projection' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-title">Comprimento da Construção (m)</label>
                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      value={values.houseLengthM || ''}
                      onChange={(e) => updateValues({ houseLengthM: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 10.0"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="label-title">Largura da Construção (m)</label>
                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      value={values.houseWidthM || ''}
                      onChange={(e) => updateValues({ houseWidthM: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 7.0"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-title">Tamanho do Beiral (metros)</label>
                    <input
                      type="number"
                      min="0"
                      max="2.0"
                      step="0.05"
                      value={values.eavesM || ''}
                      onChange={(e) => updateValues({ eavesM: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 0.60"
                      className="input-field"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Avanço do telhado além das paredes externas</span>
                  </div>

                  <div>
                    <label className="label-title">Inclinação do Telhado (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="5"
                        max="100"
                        step="1"
                        value={values.slopePercent || ''}
                        onChange={(e) => updateValues({ slopePercent: parseFloat(e.target.value) || 0 })}
                        placeholder="Ex: 35"
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">%</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">30% a 35% é o padrão para telhas cerâmicas</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="label-title">Área Inclinada Total do Telhado (m²)</label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={values.realRoofAreaM2 || ''}
                  onChange={(e) => updateValues({ realRoofAreaM2: parseFloat(e.target.value) || 0 })}
                  placeholder="Ex: 85"
                  className="input-field"
                />
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Desperdício */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Margem de Quebra e Cortes nos Cantos
            </h3>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 8, 10]}
              recommendedText="5% para telhados simples de 2 águas; 8% a 10% para telhados em 4 águas com muitos espigões."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Telhas e Telhado"
            mainHighlight={{
              value: formatInteger(result.recommendedTileCount),
              unit: ROOF_TILE_SPECS[values.tileModel]?.unitLabel || 'telhas',
              secondaryHighlight: `Para ${formatArea(result.realInclinedAreaM2)} de telhado`,
              description: `Estimativa para ${ROOF_TILE_SPECS[values.tileModel]?.name} com inclinação corrigida de ${values.slopePercent}%.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'A galga das ripas na estrutura de madeira deve ser medida com a telha comprada no canteiro de obras.',
              'Garanta a inclinação mínima do fabricante para evitar vazamentos em tempestades com vento forte.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
