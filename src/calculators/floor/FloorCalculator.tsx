import React, { useState, useMemo, useEffect } from 'react';
import { FloorInputs, FloorCalculationResult } from './floorTypes';
import { calculateFloor } from './floorCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Calculator, RotateCcw, Sparkles, Check, ChevronRight } from 'lucide-react';

const COMMON_SIZES = [
  { label: '60 × 60 cm (Mais comum)', l: 60, w: 60 },
  { label: '80 × 80 cm (Porcelanato)', l: 80, w: 80 },
  { label: '120 × 60 cm (Retificado)', l: 120, w: 60 },
  { label: '90 × 90 cm (Grande formato)', l: 90, w: 90 },
  { label: '45 × 45 cm (Cerâmica)', l: 45, w: 45 },
  { label: '20 × 20 cm (Banheiro/Rústico)', l: 20, w: 20 },
];

const DEFAULT_INPUTS: FloorInputs = {
  inputMode: 'dimensions',
  roomLength: 5,
  roomWidth: 4,
  roomArea: 20,
  pieceLengthCm: 60,
  pieceWidthCm: 60,
  pattern: 'straight',
  wasteMarginPercent: 10,
  boxCoverageM2: 2.16,
};

export const FloorCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<FloorInputs>(
    'piso',
    DEFAULT_INPUTS
  );

  const [selectedPreset, setSelectedPreset] = useState<string>('60-60');

  const result = useMemo(() => {
    return calculateFloor(values);
  }, [values]);

  // Save to history when result changes significantly
  useEffect(() => {
    if (result.netAreaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'piso',
          calculatorName: 'Calculadora de Piso e Revestimento',
          summary: `${formatInteger(result.recommendedPieceCount)} peças (${formatNumber(result.grossAreaWithWasteM2)} m²) — ≈ ${result.boxesEstimated} caixas`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const handleSizePreset = (l: number, w: number, key: string) => {
    setSelectedPreset(key);
    updateValues({ pieceLengthCm: l, pieceWidthCm: w });
  };

  const handlePatternChange = (pattern: 'straight' | 'diagonal') => {
    const defaultWaste = pattern === 'diagonal' ? 15 : 10;
    updateValues({ pattern, wasteMarginPercent: defaultWaste });
  };

  const metrics: ResultMetric[] = [
    {
      label: 'Área do Ambiente (Líquida)',
      value: formatArea(result.netAreaM2),
      subValue: values.inputMode === 'dimensions' ? `${values.roomLength}m × ${values.roomWidth}m` : undefined,
    },
    {
      label: 'Área Total com Perda',
      value: formatArea(result.grossAreaWithWasteM2),
      subValue: `+${result.wasteMarginUsed}% margem`,
      highlight: true,
    },
    {
      label: 'Peças sem desperdício',
      value: `${formatInteger(result.rawPieceCount)} un`,
      subValue: `Peça ${values.pieceLengthCm}x${values.pieceWidthCm}cm`,
    },
    {
      label: 'Tamanho da Peça',
      value: `${values.pieceLengthCm} × ${values.pieceWidthCm} cm`,
      subValue: `${formatNumber(result.pieceAreaM2, 4)} m²/peça`,
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Caixas de Piso / Porcelanato',
      quantity: `≈ ${result.boxesEstimated || 0} caixas`,
      description: `Considerando embalagem padrão de ${formatNumber(result.boxCoverageUsed)} m² por caixa.`,
      badge: 'Compra Recomendada',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Restore state alert */}
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
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Etapa 1: Medidas do Ambiente */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Medidas do Ambiente
              </h3>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => updateValues({ inputMode: 'dimensions' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.inputMode === 'dimensions'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Comprimento × Largura
                </button>
                <button
                  type="button"
                  onClick={() => updateValues({ inputMode: 'area' })}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    values.inputMode === 'area'
                      ? 'bg-white text-brand-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Área Direta (m²)
                </button>
              </div>
            </div>

            {values.inputMode === 'dimensions' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-title">Comprimento (metros)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={values.roomLength || ''}
                      onChange={(e) => updateValues({ roomLength: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 5.0"
                      className="input-field pr-10"
                    />
                    <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m</span>
                  </div>
                </div>

                <div>
                  <label className="label-title">Largura (metros)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={values.roomWidth || ''}
                      onChange={(e) => updateValues({ roomWidth: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 4.0"
                      className="input-field pr-10"
                    />
                    <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="label-title">Área Total do Cômodo (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={values.roomArea || ''}
                    onChange={(e) => updateValues({ roomArea: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 20.0"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²</span>
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Etapa 2: Dimensões da Peça do Piso */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Tamanho do Piso / Porcelanato
            </h3>

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {COMMON_SIZES.map((size) => {
                const key = `${size.l}-${size.w}`;
                const isSelected = values.pieceLengthCm === size.l && values.pieceWidthCm === size.w;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSizePreset(size.l, size.w, key)}
                    className={`p-2.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-xs block font-bold text-slate-900">{size.l} × {size.w} cm</span>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{size.label.split('(')[1]?.replace(')', '') || 'Padrão'}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-title">Comprimento da Peça (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={values.pieceLengthCm || ''}
                    onChange={(e) => updateValues({ pieceLengthCm: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 60"
                    className="input-field pr-10"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">cm</span>
                </div>
              </div>

              <div>
                <label className="label-title">Largura da Peça (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={values.pieceWidthCm || ''}
                    onChange={(e) => updateValues({ pieceWidthCm: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 60"
                    className="input-field pr-10"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">cm</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Etapa 3: Tipo de Assentamento e Desperdício */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Forma de Instalação e Desperdício
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => handlePatternChange('straight')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  values.pattern === 'straight'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-sm font-bold block">Assentamento Reto</span>
                <span className="text-xs text-slate-500 font-normal">Padrão alinhado (+10% perda)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePatternChange('diagonal')}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  values.pattern === 'diagonal'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-sm font-bold block">Assentamento Diagonal</span>
                <span className="text-xs text-slate-500 font-normal">Mais cortes (+15% perda)</span>
              </button>
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15, 20]}
            />
          </div>

          <hr className="border-slate-100" />

          {/* Etapa 4: Informação da Caixa (Opcional) */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-2">
              Metragem por Caixa (Opcional)
            </h3>
            <div className="relative">
              <input
                type="number"
                min="0.5"
                step="0.01"
                value={values.boxCoverageM2 || ''}
                onChange={(e) => updateValues({ boxCoverageM2: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 2.16 (consulte a caixa)"
                className="input-field pr-16"
              />
              <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²/cx</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Geralmente informado na etiqueta do fabricante. Ajuda a saber exatamente quantas caixas comprar.
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Piso e Revestimento"
            mainHighlight={{
              value: formatInteger(result.recommendedPieceCount),
              unit: 'peças',
              secondaryHighlight: `≈ ${result.boxesEstimated || 0} caixas (${formatArea(result.grossAreaWithWasteM2)})`,
              description: `Quantidade recomendada com margem de segurança de ${result.wasteMarginUsed}% para cortes e reposição.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              result.baseboardSuggestionM
                ? `Estimativa de rodapé para este ambiente: ≈ ${formatNumber(result.baseboardSuggestionM)} metros lineares.`
                : 'Não esqueça de verificar a argamassa colante e o rejunte necessários.',
              'Guarde pelo menos 1 caixa fechada como reserva de emergência para reparos futuros.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
