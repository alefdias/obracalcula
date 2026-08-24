import React, { useMemo, useEffect } from 'react';
import { BrickInputs, BrickType } from './brickTypes';
import { calculateBricks, BRICK_SPECS } from './brickCalculation';
import { WallInputsList } from '../../components/common/WallInputsList';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_BRICK_INPUTS: BrickInputs = {
  brickType: 'baiano_8',
  jointThicknessCm: 1.5,
  walls: [
    { id: 'w1', name: 'Parede Principal', width: 5.0, height: 2.8, unit: 'm' },
    { id: 'w2', name: 'Parede Lateral', width: 4.0, height: 2.8, unit: 'm' },
  ],
  openings: [
    { id: 'op1', type: 'door', name: 'Porta Padrão (0.80 × 2.10m)', width: 0.8, height: 2.1, quantity: 1, unit: 'm' },
    { id: 'op2', type: 'window', name: 'Janela Padrão (1.20 × 1.00m)', width: 1.2, height: 1.0, quantity: 1, unit: 'm' },
  ],
  wasteMarginPercent: 10,
};

export const BrickCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<BrickInputs>(
    'tijolos',
    DEFAULT_BRICK_INPUTS
  );

  const result = useMemo(() => {
    return calculateBricks(values);
  }, [values]);

  useEffect(() => {
    if (result.netWallAreaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'tijolos',
          calculatorName: 'Calculadora de Tijolos e Blocos',
          summary: `${formatInteger(result.recommendedBrickCount)} unidades (${formatArea(result.netWallAreaM2)} de alvenaria)`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Área Líquida da Parede',
      value: formatArea(result.netWallAreaM2),
      subValue: `Bruta: ${formatArea(result.grossWallAreaM2)} (-${formatArea(result.openingsDeductionM2)} vãos)`,
    },
    {
      label: 'Consumo por m²',
      value: `≈ ${result.bricksPerM2} un/m²`,
      subValue: `Junta de ${values.jointThicknessCm} cm`,
    },
    {
      label: 'Tijolos sem perda',
      value: `${formatInteger(result.rawBrickCount)} un`,
    },
    {
      label: 'Argamassa Assentamento',
      value: `≈ ${result.mortarBagsEstimate20kg} sacos (20kg)`,
      subValue: 'Pronta para uso',
    },
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Tijolos / Blocos',
      quantity: `${formatInteger(result.recommendedBrickCount)} unidades`,
      description: `${BRICK_SPECS[values.brickType]?.name || 'Tijolos'} com +${result.wasteMarginUsed}% de quebra/corte`,
      badge: 'Material Principal',
    },
    {
      title: 'Argamassa Pronta de Assentamento',
      quantity: `≈ ${result.mortarBagsEstimate20kg} sacos de 20kg`,
      description: `Ou se preferir virar na obra: ≈ ${result.cementBags50kg} sacos de cimento (50kg) + ${formatNumber(result.sandVolumeM3)} m³ de areia média.`,
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
          {/* Tipo de Tijolo / Bloco */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Escolha o Tipo de Tijolo ou Bloco
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(BRICK_SPECS) as BrickType[]).filter(k => k !== 'custom').map((typeKey) => {
                const spec = BRICK_SPECS[typeKey];
                const isSelected = values.brickType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => updateValues({ brickType: typeKey })}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold block">{spec.name}</span>
                    <span className="text-xs text-slate-500 font-normal mt-0.5 block">
                      Dimensões: {spec.lengthCm} × {spec.heightCm} × {spec.widthCm} cm
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Múltiplas Paredes e Descontos */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Medidas das Paredes e Vãos (Portas/Janelas)
            </h3>

            <WallInputsList
              walls={values.walls}
              openings={values.openings}
              onWallsChange={(walls) => updateValues({ walls })}
              onOpeningsChange={(openings) => updateValues({ openings })}
            />
          </div>

          <hr className="border-slate-100" />

          {/* Junta e Desperdício */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Junta de Argamassa e Margem de Quebra
            </h3>

            <div className="mb-4">
              <label className="label-title">Espessura da Junta de Argamassa</label>
              <div className="grid grid-cols-3 gap-2">
                {[1.0, 1.5, 2.0].map((j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => updateValues({ jointThicknessCm: j })}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      values.jointThicknessCm === j
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {j} cm {j === 1.5 ? '(Padrão)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="10% é o padrão recomendado devido à quebra de transporte e cortes nos cantos."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Tijolos e Blocos"
            mainHighlight={{
              value: formatInteger(result.recommendedBrickCount),
              unit: 'unidades',
              secondaryHighlight: `Para ${formatArea(result.netWallAreaM2)} de parede`,
              description: `Estimativa para ${BRICK_SPECS[values.brickType]?.name} com folga de ${result.wasteMarginUsed}% para quebra.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Molhe os tijolos cerâmicos antes de assentar para garantir a máxima aderência da argamassa.',
              'Tijolos quebrados durante o transporte podem ser aproveitados nos recortes e amarrações das fiadas.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
