import React, { useMemo, useEffect } from 'react';
import { PaintInputs, PaintType } from './paintTypes';
import { calculatePaint, PAINT_YIELDS } from './paintCalculation';
import { WallInputsList } from '../../components/common/WallInputsList';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw, Paintbrush, Layers, Home } from 'lucide-react';

const DEFAULT_PAINT_INPUTS: PaintInputs = {
  mode: 'simple_room',
  roomLength: 4.0,
  roomWidth: 3.5,
  wallHeight: 2.8,
  includeCeiling: true,
  walls: [
    { id: 'w1', name: 'Parede 1', width: 4.0, height: 2.8, unit: 'm' },
    { id: 'w2', name: 'Parede 2', width: 3.5, height: 2.8, unit: 'm' },
  ],
  openings: [
    { id: 'op1', type: 'door', name: 'Porta (0.80 × 2.10m)', width: 0.8, height: 2.1, quantity: 1, unit: 'm' },
    { id: 'op2', type: 'window', name: 'Janela (1.20 × 1.00m)', width: 1.2, height: 1.0, quantity: 1, unit: 'm' },
  ],
  directAreaM2: 50,
  paintType: 'standard',
  coats: 2,
  wasteMarginPercent: 5,
};

export const PaintCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<PaintInputs>(
    'tinta',
    DEFAULT_PAINT_INPUTS
  );

  const result = useMemo(() => {
    return calculatePaint(values);
  }, [values]);

  useEffect(() => {
    if (result.totalNetPaintingAreaM2 > 0) {
      const timer = setTimeout(() => {
        const packagingSummary: string[] = [];
        if (result.packaging.cans18L > 0) packagingSummary.push(`${result.packaging.cans18L}x 18L`);
        if (result.packaging.gallons3_6L > 0) packagingSummary.push(`${result.packaging.gallons3_6L}x 3,6L`);
        if (result.packaging.quarts0_9L > 0) packagingSummary.push(`${result.packaging.quarts0_9L}x 900ml`);

        saveCalculationHistory({
          calculatorId: 'tinta',
          calculatorName: 'Calculadora de Tinta',
          summary: `${formatNumber(result.recommendedLiters)} Litros (${packagingSummary.join(' + ') || 'Latas'}) para ${formatArea(result.totalNetPaintingAreaM2)}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const metrics: ResultMetric[] = [
    {
      label: 'Área Líquida de Pintura',
      value: formatArea(result.totalNetPaintingAreaM2),
      subValue: values.includeCeiling && values.mode === 'simple_room' ? `Inclui teto (${formatArea(result.ceilingAreaM2)})` : undefined,
    },
    {
      label: 'Área com Demãos',
      value: formatArea(result.totalAreaWithCoatsM2),
      subValue: `${values.coats} demãos completas`,
      highlight: true,
    },
    {
      label: 'Rendimento da Tinta',
      value: `${result.paintYieldPerLiter} m²/Litro`,
      subValue: 'Por demão',
    },
    {
      label: 'Volume Total Calculado',
      value: `${formatNumber(result.recommendedLiters, 1)} Litros`,
      subValue: `+${result.wasteMarginUsed}% margem`,
    },
  ];

  const packageInfo: ResultPackageInfo[] = [];

  if (result.packaging.cans18L > 0) {
    packageInfo.push({
      title: 'Latas Grandes (18 Litros)',
      quantity: `${result.packaging.cans18L} ${result.packaging.cans18L === 1 ? 'lata' : 'latas'}`,
      description: 'Ideal para paredes grandes e maior economia no preço por litro.',
      badge: 'Melhor Custo-Benefício',
    });
  }

  if (result.packaging.gallons3_6L > 0) {
    packageInfo.push({
      title: 'Galões Médios (3,6 Litros)',
      quantity: `${result.packaging.gallons3_6L} ${result.packaging.gallons3_6L === 1 ? 'galão' : 'galões'}`,
      description: 'Embalagem prática para quartos pequenos e complementos.',
    });
  }

  if (result.packaging.quarts0_9L > 0) {
    packageInfo.push({
      title: 'Quartos Pequenos (900 ml)',
      quantity: `${result.packaging.quarts0_9L} ${result.packaging.quarts0_9L === 1 ? 'quarto' : 'quartos'}`,
      description: 'Para acabamentos, retoques ou pequenas áreas.',
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
          {/* Mode Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                Ambiente ou Paredes a Pintar
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => updateValues({ mode: 'simple_room' })}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all text-center ${
                  values.mode === 'simple_room'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                Cômodo Completo
              </button>
              <button
                type="button"
                onClick={() => updateValues({ mode: 'custom_walls' })}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all text-center ${
                  values.mode === 'custom_walls'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                Paredes Avulsas
              </button>
              <button
                type="button"
                onClick={() => updateValues({ mode: 'direct_area' })}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all text-center ${
                  values.mode === 'direct_area'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                Área Total (m²)
              </button>
            </div>

            {values.mode === 'simple_room' && (
              <div className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="label-title text-xs">Comprimento (m)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={values.roomLength || ''}
                      onChange={(e) => updateValues({ roomLength: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 4.0"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="label-title text-xs">Largura (m)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={values.roomWidth || ''}
                      onChange={(e) => updateValues({ roomWidth: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 3.5"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="label-title text-xs">Altura / Pé-direito (m)</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={values.wallHeight || ''}
                      onChange={(e) => updateValues({ wallHeight: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 2.8"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="relative flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={values.includeCeiling}
                      onChange={(e) => updateValues({ includeCeiling: e.target.checked })}
                      className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                    />
                    <span>Incluir pintura do Teto (+{((values.roomLength || 0) * (values.roomWidth || 0)).toFixed(1)} m²)</span>
                  </label>
                </div>
              </div>
            )}

            {values.mode === 'custom_walls' && (
              <WallInputsList
                walls={values.walls}
                openings={values.openings}
                onWallsChange={(walls) => updateValues({ walls })}
                onOpeningsChange={(openings) => updateValues({ openings })}
              />
            )}

            {values.mode === 'direct_area' && (
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
                <label className="label-title">Área Total a ser Pintada (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={values.directAreaM2 || ''}
                    onChange={(e) => updateValues({ directAreaM2: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 50.0"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²</span>
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100" />

          {/* Tipo de Tinta */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Tipo de Tinta e Acabamento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(PAINT_YIELDS) as PaintType[]).map((typeKey) => {
                const spec = PAINT_YIELDS[typeKey];
                const isSelected = values.paintType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => updateValues({ paintType: typeKey })}
                    className={`p-3 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold block">{spec.name}</span>
                    <span className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
                      {spec.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Demãos e Desperdício */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Quantidade de Demãos e Margem
            </h3>

            <div className="mb-4">
              <label className="label-title">Número de Demãos</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((c) => (
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
                    {c} {c === 1 ? 'Demão' : 'Demãos'} {c === 2 ? '(Recomendado)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="5% a 10% é o suficiente para compensar absorção da parede e resíduos no rolo e bandeja."
            />
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Tinta"
            mainHighlight={{
              value: formatNumber(result.recommendedLiters, 1),
              unit: 'Litros',
              secondaryHighlight: `${packageInfo.map(p => p.quantity).join(' + ') || 'Embalagens recomendadas'}`,
              description: `Total para cobrir ${formatArea(result.totalNetPaintingAreaM2)} com ${values.coats} demãos de ${PAINT_YIELDS[values.paintType]?.name}.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Para paredes de reboco novo, aplique uma demão de Selador Acrílico antes da tinta para economizar até 30% de tinta.',
              'Dilua a tinta conforme as instruções da lata (geralmente de 10% a 20% com água potável).',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
