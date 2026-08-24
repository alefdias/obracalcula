import React, { useMemo, useEffect } from 'react';
import { MortarInputs, MortarType, BondingMethod } from './mortarTypes';
import { calculateMortar, MORTAR_SPECS } from './mortarCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea, formatWeight } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_MORTAR_INPUTS: MortarInputs = {
  mortarType: 'ac2',
  areaM2: 25,
  bondingMethod: 'double',
  pieceSizeCm: 60,
  layerThicknessCm: 1.5,
  wasteMarginPercent: 5,
};

export const MortarCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<MortarInputs>(
    'argamassa',
    DEFAULT_MORTAR_INPUTS
  );

  const result = useMemo(() => {
    return calculateMortar(values);
  }, [values]);

  useEffect(() => {
    if (values.areaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'argamassa',
          calculatorName: 'Calculadora de Argamassa Colante',
          summary: `${result.bags20kg} sacos de 20kg (${result.mortarName}) para ${formatArea(values.areaM2)}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Área a ser Revestida',
      value: formatArea(values.areaM2),
      subValue: result.mortarName,
    },
    {
      label: 'Consumo Médio',
      value: `${result.consumptionKgPerM2} kg/m²`,
      subValue: values.bondingMethod === 'double' ? 'Dupla colagem' : 'Colagem simples',
    },
    {
      label: 'Peso Total Estimado',
      value: formatWeight(result.totalWeightKg),
      subValue: `+${result.wasteMarginUsed}% margem`,
      highlight: true,
    },
    {
      label: 'Sacos Necessários',
      value: `${result.bags20kg} sacos (20kg)`,
      subValue: 'Embalagem padrão',
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Argamassa em Sacos de 20kg',
      quantity: `${result.bags20kg} sacos`,
      description: `Rendimento médio de 1 saco: cobre cerca de ${(20 / (result.consumptionKgPerM2 || 5)).toFixed(1)} m² de área.`,
      badge: 'Compra Recomendada',
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
          {/* Tipo de Argamassa */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Argamassa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(MORTAR_SPECS) as MortarType[]).map((typeKey) => {
                const spec = MORTAR_SPECS[typeKey];
                const isSelected = values.mortarType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => updateValues({ mortarType: typeKey })}
                    className={`p-3.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold block">{spec.name}</span>
                    <span className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-2">
                      {spec.recommendedFor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Área e Método de Colagem */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Área e Método de Aplicação
            </h3>

            <div className="space-y-4">
              <div>
                <label className="label-title">Área Total do Revestimento (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={values.areaM2 || ''}
                    onChange={(e) => updateValues({ areaM2: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 25"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²</span>
                </div>
              </div>

              {values.mortarType !== 'reboco_pronto' ? (
                <div>
                  <label className="label-title">Método de Assentamento</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateValues({ bondingMethod: 'single' })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        values.bondingMethod === 'single'
                          ? 'border-brand-600 bg-brand-50 text-brand-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold block">Colagem Simples</span>
                      <span className="text-xs text-slate-500 font-normal">Para pisos até 30×30 cm (~4,5 a 5 kg/m²)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateValues({ bondingMethod: 'double' })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        values.bondingMethod === 'double'
                          ? 'border-brand-600 bg-brand-50 text-brand-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-sm font-bold block">Dupla Colagem (Recomendada)</span>
                      <span className="text-xs text-slate-500 font-normal">Pisos acima de 30×30 cm (~8,5 a 9 kg/m²)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="label-title">Espessura do Reboco Pronto (cm)</label>
                  <input
                    type="number"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={values.layerThicknessCm || 1.5}
                    onChange={(e) => updateValues({ layerThicknessCm: parseFloat(e.target.value) || 1.5 })}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Desperdício */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Margem de Perda
            </h3>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="5% a 10% para resíduos de masseira e regularizações na base."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Argamassa Colante"
            mainHighlight={{
              value: `${result.bags20kg}`,
              unit: 'sacos (20kg)',
              secondaryHighlight: `Total de ${formatWeight(result.totalWeightKg)}`,
              description: `Estimativa para ${result.mortarName} cobrindo ${formatArea(values.areaM2)}.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              result.bondingRecommendation,
              'Respeite o tempo em aberto da argamassa (cerca de 15 a 20 minutos após estendida no chão) para não perder a aderência.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
