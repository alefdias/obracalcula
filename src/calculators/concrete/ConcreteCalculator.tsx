import React, { useMemo, useEffect } from 'react';
import { ConcreteInputs, ConcreteElementType, ConcreteStrengthType } from './concreteTypes';
import { calculateConcrete, CONCRETE_MIX_SPECS } from './concreteCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatVolume } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw, Box, Layers } from 'lucide-react';

const DEFAULT_CONCRETE_INPUTS: ConcreteInputs = {
  elementType: 'slab',
  lengthM: 8.0,
  widthM: 5.0,
  thicknessCm: 10,
  quantity: 1,
  directVolumeM3: 4.0,
  strengthType: 'structural_25mpa',
  wasteMarginPercent: 5,
};

const ELEMENT_OPTIONS: { id: ConcreteElementType; label: string; defaultThickness: number }[] = [
  { id: 'slab', label: 'Laje Maciça', defaultThickness: 10 },
  { id: 'floor', label: 'Piso / Calçada / Garagem', defaultThickness: 8 },
  { id: 'beam', label: 'Vigas / Pilares / Colunas', defaultThickness: 30 },
  { id: 'footing', label: 'Sapatas / Blocos de Fundação', defaultThickness: 40 },
  { id: 'direct_volume', label: 'Volume Direto (m³)', defaultThickness: 0 },
];

export const ConcreteCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<ConcreteInputs>(
    'concreto',
    DEFAULT_CONCRETE_INPUTS
  );

  const result = useMemo(() => {
    return calculateConcrete(values);
  }, [values]);

  useEffect(() => {
    if (result.totalVolumeWithWasteM3 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'concreto',
          calculatorName: 'Calculadora de Concreto',
          summary: `${formatVolume(result.totalVolumeWithWasteM3)} (${result.cementBags50kg} sacos cimento) — ${result.strengthName}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const handleElementChange = (type: ConcreteElementType) => {
    const found = ELEMENT_OPTIONS.find(e => e.id === type);
    updateValues({
      elementType: type,
      thicknessCm: found && found.defaultThickness > 0 ? found.defaultThickness : values.thicknessCm,
    });
  };

  const metrics: ResultMetric[] = [
    {
      label: 'Volume Bruto Calculado',
      value: formatVolume(result.baseVolumeM3),
    },
    {
      label: 'Volume Total com Margem',
      value: formatVolume(result.totalVolumeWithWasteM3),
      subValue: `+${result.wasteMarginUsed}% folga`,
      highlight: true,
    },
    {
      label: 'Cimento CP II / CP III',
      value: `${result.cementBags50kg} sacos (50kg)`,
      subValue: `Proporção ${CONCRETE_MIX_SPECS[values.strengthType]?.ratio.split(' ')[0]}`,
    },
    {
      label: 'Areia Média Lavada',
      value: `${formatNumber(result.sandM3)} m³`,
      subValue: `≈ ${result.sand18LCans} latas (18L)`,
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Concreto Usinado (Opção Caminhão Betoneira)',
      quantity: `${formatVolume(result.totalVolumeWithWasteM3)}`,
      description: 'Volume exato para solicitar à concreteira da sua região.',
      badge: 'Usinado',
    },
    {
      title: 'Cimento Portland (Sacos de 50kg)',
      quantity: `${result.cementBags50kg} sacos`,
      description: 'Cimento para virar o concreto na betoneira da obra.',
      badge: 'Virado na Obra',
    },
    {
      title: 'Pedra Brita 1 (19mm)',
      quantity: `${formatNumber(result.gravelM3)} m³ (≈ ${result.gravel18LCans} latas)`,
      description: 'Agregado graúdo para conferir resistência mecânica.',
    },
    {
      title: 'Areia Média Lavada',
      quantity: `${formatNumber(result.sandM3)} m³ (≈ ${result.sand18LCans} latas)`,
      description: 'Agregado miúdo sem terra ou matéria orgânica.',
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
          {/* Element Type */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Elemento a ser Concretado
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ELEMENT_OPTIONS.map((opt) => {
                const isSelected = values.elementType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleElementChange(opt.id)}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold block">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Dimensions */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Dimensões do Elemento
            </h3>

            {values.elementType === 'direct_volume' ? (
              <div>
                <label className="label-title">Volume Total (m³)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={values.directVolumeM3 || ''}
                    onChange={(e) => updateValues({ directVolumeM3: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 4.5"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m³</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-title">Comprimento (metros)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={values.lengthM || ''}
                        onChange={(e) => updateValues({ lengthM: parseFloat(e.target.value) || 0 })}
                        placeholder="Ex: 8.0"
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
                        value={values.widthM || ''}
                        onChange={(e) => updateValues({ widthM: parseFloat(e.target.value) || 0 })}
                        placeholder="Ex: 5.0"
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-title">
                      {values.elementType === 'beam' ? 'Altura da Viga/Pilar (cm)' : 'Espessura / Altura (cm)'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        step="1"
                        value={values.thicknessCm || ''}
                        onChange={(e) => updateValues({ thicknessCm: parseFloat(e.target.value) || 0 })}
                        placeholder="Ex: 10"
                        className="input-field pr-10"
                      />
                      <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">cm</span>
                    </div>
                  </div>

                  {(values.elementType === 'beam' || values.elementType === 'footing') && (
                    <div>
                      <label className="label-title">Quantidade de Peças Iguais</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={values.quantity || 1}
                        onChange={(e) => updateValues({ quantity: parseInt(e.target.value) || 1 })}
                        className="input-field"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Strength & Traço */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Finalidade e Resistência (Traço)
            </h3>

            <div className="space-y-2 mb-4">
              {(Object.keys(CONCRETE_MIX_SPECS) as ConcreteStrengthType[]).map((strengthKey) => {
                const spec = CONCRETE_MIX_SPECS[strengthKey];
                const isSelected = values.strengthType === strengthKey;
                return (
                  <button
                    key={strengthKey}
                    type="button"
                    onClick={() => updateValues({ strengthType: strengthKey })}
                    className={`w-full p-3.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{spec.name}</span>
                      <span className="text-xs font-mono bg-brand-100 text-brand-800 px-2 py-0.5 rounded">
                        {spec.ratio}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-normal mt-1 block">
                      {spec.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 8, 10]}
              recommendedText="5% é indicado para lajes em formas metálicas ou madeira plana; 8% a 10% para solo irregular ou calçadas."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Concreto"
            mainHighlight={{
              value: formatVolume(result.totalVolumeWithWasteM3),
              unit: '',
              secondaryHighlight: `≈ ${result.cementBags50kg} sacos de cimento (50kg)`,
              description: `Volume total necessário incluindo +${result.wasteMarginUsed}% de folga para formas e desníveis.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Para 1 m³ de concreto no traço 1:2:3, use 1 lata de cimento, 2 de areia e 3 de brita, adicionando água aos poucos.',
              'Mantenha a superfície sempre molhada (cura úmida) por no mínimo 7 dias após a concretagem para atingir a resistência máxima.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
