import React, { useMemo, useEffect } from 'react';
import { BaseboardInputs } from './baseboardTypes';
import { calculateBaseboard } from './baseboardCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatLength } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_BASEBOARD_INPUTS: BaseboardInputs = {
  mode: 'room_dimensions',
  roomLengthM: 4.5,
  roomWidthM: 3.5,
  perimeterDirectM: 16.0,
  doorCount: 1,
  doorWidthM: 0.8,
  barLengthM: 2.4,
  wasteMarginPercent: 10,
};

export const BaseboardCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<BaseboardInputs>(
    'rodape',
    DEFAULT_BASEBOARD_INPUTS
  );

  const result = useMemo(() => {
    return calculateBaseboard(values);
  }, [values]);

  useEffect(() => {
    if (result.netPerimeterM > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'rodape',
          calculatorName: 'Calculadora de Rodapé',
          summary: `${result.barsNeeded} réguas (${formatLength(result.totalWithWasteM)}) de rodapé`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Perímetro Líquido do Cômodo',
      value: formatLength(result.netPerimeterM),
      subValue: `Bruto: ${formatLength(result.grossPerimeterM)} (-${formatLength(result.doorsDeductionM)} portas)`,
    },
    {
      label: 'Comprimento com Folga',
      value: formatLength(result.totalWithWasteM),
      subValue: `+${result.wasteMarginUsed}% cortes 45°`,
      highlight: true,
    },
    {
      label: 'Tamanho da Régua / Barra',
      value: `${result.barLengthUsedM} metros`,
      subValue: 'Padrão comercial',
    },
    {
      label: 'Total de Barras a Comprar',
      value: `${result.barsNeeded} barras`,
      subValue: 'Sem faltar peças',
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Barras de Rodapé (2,40m)',
      quantity: `${result.barsNeeded} barras`,
      description: `Rendem ${formatLength(result.barsNeeded * result.barLengthUsedM)} lineares totais com folga de recortes.`,
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
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Medidas do Ambiente
              </h3>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => updateValues({ mode: 'room_dimensions' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.mode === 'room_dimensions' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Dimensões (C × L)
                </button>
                <button
                  type="button"
                  onClick={() => updateValues({ mode: 'perimeter_direct' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.mode === 'perimeter_direct' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Perímetro Direto (m)
                </button>
              </div>
            </div>

            {values.mode === 'room_dimensions' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Comprimento do Cômodo (m)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={values.roomLengthM || ''}
                    onChange={(e) => updateValues({ roomLengthM: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 4.5"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-title">Largura do Cômodo (m)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.1"
                    value={values.roomWidthM || ''}
                    onChange={(e) => updateValues({ roomWidthM: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 3.5"
                    className="input-field"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="label-title">Soma de Todas as Paredes (metros lineares)</label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={values.perimeterDirectM || ''}
                  onChange={(e) => updateValues({ perimeterDirectM: parseFloat(e.target.value) || 0 })}
                  placeholder="Ex: 16.0"
                  className="input-field"
                />
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Vãos e Tamanho da Barra */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Desconto de Portas e Comprimento da Barra
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-title">Quantidade de Portas no Cômodo</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={values.doorCount}
                  onChange={(e) => updateValues({ doorCount: parseInt(e.target.value) || 0 })}
                  className="input-field"
                />
                <span className="text-xs text-slate-400 mt-1 block">Cada porta desconta 0,80m de rodapé</span>
              </div>

              <div>
                <label className="label-title">Comprimento da Régua Comercial (m)</label>
                <select
                  value={values.barLengthM}
                  onChange={(e) => updateValues({ barLengthM: parseFloat(e.target.value) || 2.4 })}
                  className="input-field bg-white"
                >
                  <option value={2.4}>2,40 metros (Poliestireno / MDF padrão)</option>
                  <option value={2.0}>2,00 metros (Madeira / Especial)</option>
                  <option value={1.2}>1,20 metros (Porcelanato retificado)</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Perda */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Margem para Cantos (Cortes em 45°)
            </h3>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="10% a 15% é o ideal devido aos cortes em ângulo nos cantos do cômodo."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Rodapé"
            mainHighlight={{
              value: `${result.barsNeeded}`,
              unit: 'barras',
              secondaryHighlight: `Total de ${formatLength(result.totalWithWasteM)}`,
              description: `Estimativa para cômodo com perímetro líquido de ${formatLength(result.netPerimeterM)}.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Para rodapés de poliestireno, utilize cola de fixação específica e silicone para vedação superior.',
              'Os cortes nos cantos em 45° exigem caixa de meia-esquadria para um acabamento perfeito.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
