import React, { useMemo, useEffect } from 'react';
import { GroutInputs, GroutType } from './groutTypes';
import { calculateGrout, GROUT_TYPES } from './groutCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_GROUT_INPUTS: GroutInputs = {
  areaM2: 25,
  pieceLengthMm: 600,
  pieceWidthMm: 600,
  pieceThicknessMm: 8,
  jointWidthMm: 2,
  groutType: 'cimenticio',
  wasteMarginPercent: 10,
};

const COMMON_GROUT_SIZES = [
  { label: '60 × 60 cm (8mm esp.)', l: 600, w: 600, e: 8 },
  { label: '80 × 80 cm (9mm esp.)', l: 800, w: 800, e: 9 },
  { label: '120 × 60 cm (10mm esp.)', l: 1200, w: 600, e: 10 },
  { label: '45 × 45 cm (7mm esp.)', l: 450, w: 450, e: 7 },
  { label: '20 × 20 cm (Azulejo)', l: 200, w: 200, e: 6 },
  { label: '10 × 10 cm (Pastilha)', l: 100, w: 100, e: 5 },
];

export const GroutCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<GroutInputs>(
    'rejunte',
    DEFAULT_GROUT_INPUTS
  );

  const result = useMemo(() => {
    return calculateGrout(values);
  }, [values]);

  useEffect(() => {
    if (values.areaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'rejunte',
          calculatorName: 'Calculadora de Rejunte',
          summary: `${formatNumber(result.totalWeightKg)} kg de ${result.groutName} para ${formatArea(values.areaM2)}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const handleSizePreset = (l: number, w: number, e: number) => {
    updateValues({
      pieceLengthMm: l,
      pieceWidthMm: w,
      pieceThicknessMm: e,
    });
  };

  const metrics: ResultMetric[] = [
    {
      label: 'Área Total a Rejuntar',
      value: formatArea(values.areaM2),
      subValue: result.groutName,
    },
    {
      label: 'Consumo por m²',
      value: `${formatNumber(result.consumptionKgPerM2, 3)} kg/m²`,
      subValue: `Junta de ${values.jointWidthMm} mm`,
    },
    {
      label: 'Dimensões da Peça',
      value: `${values.pieceLengthMm / 10} × ${values.pieceWidthMm / 10} cm`,
      subValue: `Espessura: ${values.pieceThicknessMm} mm`,
    },
    {
      label: 'Peso Total Estimado',
      value: `${formatNumber(result.totalWeightKg, 2)} kg`,
      subValue: `+${result.wasteMarginUsed}% margem`,
      highlight: true,
    },
  ];

  const packageInfo: ResultPackageInfo[] = [];

  if (result.packages5kg > 0) {
    packageInfo.push({
      title: 'Pacotes de 5 kg',
      quantity: `${result.packages5kg} ${result.packages5kg === 1 ? 'pacote' : 'pacotes'}`,
      description: 'Embalagem econômica para áreas maiores.',
      badge: 'Pacote 5kg',
    });
  }

  if (result.packages1kg > 0) {
    packageInfo.push({
      title: 'Pacotes de 1 kg',
      quantity: `${result.packages1kg} ${result.packages1kg === 1 ? 'pacote' : 'pacotes'}`,
      description: 'Ideal para complemento ou áreas compactas.',
      badge: 'Pacote 1kg',
    });
  }

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
          {/* Tipo de Rejunte */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Rejunte
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(GROUT_TYPES) as GroutType[]).map((typeKey) => {
                const spec = GROUT_TYPES[typeKey];
                const isSelected = values.groutType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => updateValues({ groutType: typeKey })}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
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

          {/* Área e Dimensões do Piso */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Área e Dimensões da Peça
            </h3>

            <div className="mb-4">
              <label className="label-title">Área Total do Piso/Revestimento (m²)</label>
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

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {COMMON_GROUT_SIZES.map((size, idx) => {
                const isSelected =
                  values.pieceLengthMm === size.l &&
                  values.pieceWidthMm === size.w &&
                  values.pieceThicknessMm === size.e;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSizePreset(size.l, size.w, size.e)}
                    className={`p-2.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-xs font-bold block">{size.label.split('(')[0]}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{size.label.split('(')[1]?.replace(')', '')}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label-title text-xs">Comprimento (mm)</label>
                <input
                  type="number"
                  min="10"
                  max="3000"
                  value={values.pieceLengthMm || ''}
                  onChange={(e) => updateValues({ pieceLengthMm: parseFloat(e.target.value) || 0 })}
                  placeholder="Ex: 600"
                  className="input-field py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="label-title text-xs">Largura (mm)</label>
                <input
                  type="number"
                  min="10"
                  max="3000"
                  value={values.pieceWidthMm || ''}
                  onChange={(e) => updateValues({ pieceWidthMm: parseFloat(e.target.value) || 0 })}
                  placeholder="Ex: 600"
                  className="input-field py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="label-title text-xs">Espessura (mm)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={values.pieceThicknessMm || ''}
                  onChange={(e) => updateValues({ pieceThicknessMm: parseFloat(e.target.value) || 0 })}
                  placeholder="Ex: 8"
                  className="input-field py-2.5 text-sm"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Largura da Junta e Perda */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Largura da Junta (Espaçamento)
            </h3>

            <div className="mb-4">
              <label className="label-title">Largura do Espaçador / Junta (mm)</label>
              <div className="grid grid-cols-4 gap-2">
                {[1.5, 2.0, 3.0, 5.0].map((j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => updateValues({ jointWidthMm: j })}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      values.jointWidthMm === j
                        ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {j} mm {j === 2.0 ? '(Padrão)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="10% é indicado para cobrir sobras no fundo da embalagem e perdas na esponja de limpeza."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Rejunte"
            mainHighlight={{
              value: `${formatNumber(result.totalWeightKg, 1)}`,
              unit: 'kg',
              secondaryHighlight: `${packageInfo.map(p => p.quantity).join(' + ') || 'Quantidade estimada'}`,
              description: `Estimativa para ${result.groutName} cobrindo ${formatArea(values.areaM2)} com junta de ${values.jointWidthMm}mm.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Quanto maior a peça do piso e menor a junta, menor será a quantidade de rejunte necessária por m².',
              'Não aplique rejunte sob sol forte direto para não secar antes do tempo de cura ideal.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
