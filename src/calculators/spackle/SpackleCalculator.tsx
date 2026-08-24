import React, { useMemo, useEffect } from 'react';
import { SpackleInputs, SpackleType, WallCondition } from './spackleTypes';
import { calculateSpackle, SPACKLE_TYPES } from './spackleCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea, formatWeight } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_SPACKLE_INPUTS: SpackleInputs = {
  areaM2: 40,
  spackleType: 'pva',
  wallCondition: 'reboco_novo',
  coats: 2,
  wasteMarginPercent: 5,
};

export const SpackleCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<SpackleInputs>(
    'massa-corrida',
    DEFAULT_SPACKLE_INPUTS
  );

  const result = useMemo(() => {
    return calculateSpackle(values);
  }, [values]);

  useEffect(() => {
    if (values.areaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'massa-corrida',
          calculatorName: 'Calculadora de Massa Corrida',
          summary: `${result.barrels25kg} barricas de 25kg (${formatWeight(result.totalWeightKg)}) para ${formatArea(values.areaM2)}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Área a ser Nivelada',
      value: formatArea(values.areaM2),
      subValue: result.spackleName,
    },
    {
      label: 'Consumo por m²',
      value: `${result.consumptionKgPerM2} kg/m²`,
      subValue: `${values.coats} demãos`,
    },
    {
      label: 'Peso Total Estimado',
      value: formatWeight(result.totalWeightKg),
      subValue: `+${result.wasteMarginUsed}% margem`,
      highlight: true,
    },
    {
      label: 'Barricas de 25kg',
      value: `≈ ${result.barrels25kg} barricas`,
      subValue: 'Embalagem econômica',
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Barricas de Massa (25 kg)',
      quantity: `${result.barrels25kg} ${result.barrels25kg === 1 ? 'barrica' : 'barricas'}`,
      description: 'Opção mais barata para obras de médio e grande porte.',
      badge: 'Melhor Custo',
    },
    {
      title: 'Ou Baldes de Massa (18 Litros / ~20kg)',
      quantity: `${result.buckets18L} ${result.buckets18L === 1 ? 'balde' : 'baldes'}`,
      description: 'Mais fácil de transportar e fechar para uso posterior.',
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
          {/* Tipo de Massa */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Massa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(SPACKLE_TYPES) as SpackleType[]).map((typeKey) => {
                const spec = SPACKLE_TYPES[typeKey];
                const isSelected = values.spackleType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => updateValues({ spackleType: typeKey })}
                    className={`p-3.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold block">{spec.name}</span>
                    <span className="text-[11px] text-slate-500 font-normal mt-1 block">
                      {spec.recommendedFor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Área e Superfície */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Área e Estado da Parede
            </h3>

            <div className="space-y-4">
              <div>
                <label className="label-title">Área Total das Paredes a Emassar (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={values.areaM2 || ''}
                    onChange={(e) => updateValues({ areaM2: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 40"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²</span>
                </div>
              </div>

              <div>
                <label className="label-title">Condição da Superfície</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'reboco_novo', label: 'Reboco Novo Rústico', desc: 'Consome mais massa (+35%)' },
                    { id: 'repintura', label: 'Repintura / Parede Lisa', desc: 'Consumo padrão regular' },
                    { id: 'drywall_gesso', label: 'Gesso / Drywall', desc: 'Superfície já muito plana (-30%)' },
                  ].map((cond) => (
                    <button
                      key={cond.id}
                      type="button"
                      onClick={() => updateValues({ wallCondition: cond.id as WallCondition })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        values.wallCondition === cond.id
                          ? 'border-brand-600 bg-brand-50 text-brand-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{cond.label}</span>
                      <span className="text-[11px] text-slate-500 font-normal">{cond.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Demãos e Perda */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Demãos e Desperdício
            </h3>

            <div className="mb-4">
              <label className="label-title">Número de Demãos</label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => updateValues({ coats: c })}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      values.coats === c
                        ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {c} {c === 1 ? 'Demão (Pequenos reparos)' : 'Demãos (Padrão para alisamento)'}
                  </button>
                ))}
              </div>
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="5% é suficiente para perdas na desempenadeira e lixamento."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Massa Corrida"
            mainHighlight={{
              value: `${result.barrels25kg}`,
              unit: 'barricas (25kg)',
              secondaryHighlight: `Total de ${formatWeight(result.totalWeightKg)}`,
              description: `Estimativa para cobrir ${formatArea(values.areaM2)} com ${values.coats} demãos de ${result.spackleName}.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Lixe sempre entre as demãos com lixa fina (nº 220) para obter um acabamento perfeitamente liso antes da pintura.',
              'Aplique Selador Acrílico antes da massa para economizar produto e evitar que o reboco sugue a umidade da massa.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
