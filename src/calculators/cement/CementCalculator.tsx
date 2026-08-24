import React, { useMemo, useEffect } from 'react';
import { CementInputs, CementServiceType } from './cementTypes';
import { calculateCement, CEMENT_SERVICES } from './cementCalculation';
import { WastageSelector } from '../../components/common/WastageSelector';
import { ResultCard, ResultMetric, ResultPackageInfo } from '../../components/common/ResultCard';
import { formatNumber, formatInteger, formatArea, formatVolume } from '../../utils/formatters';
import { useCalculatorStorage, saveCalculationHistory } from '../../hooks/useCalculatorStorage';
import { Sparkles, RotateCcw } from 'lucide-react';

const DEFAULT_CEMENT_INPUTS: CementInputs = {
  serviceType: 'contrapiso',
  areaM2: 30,
  thicknessCm: 3.5,
  wasteMarginPercent: 10,
};

export const CementCalculator: React.FC = () => {
  const { values, updateValues, resetValues, hasSavedData } = useCalculatorStorage<CementInputs>(
    'cimento',
    DEFAULT_CEMENT_INPUTS
  );

  const result = useMemo(() => {
    return calculateCement(values);
  }, [values]);

  useEffect(() => {
    if (values.areaM2 > 0) {
      const timer = setTimeout(() => {
        saveCalculationHistory({
          calculatorId: 'cimento',
          calculatorName: 'Calculadora de Cimento',
          summary: `${result.cementBags50kg} sacos de 50kg para ${values.areaM2} m² de ${result.serviceName}`,
          inputs: values,
          results: result,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result, values]);

  const handleServiceChange = (st: CementServiceType) => {
    const spec = CEMENT_SERVICES[st];
    updateValues({
      serviceType: st,
      thicknessCm: spec.defaultThicknessCm,
    });
  };

  const metrics: ResultMetric[] = [
    {
      label: 'Área / Volume do Serviço',
      value: formatArea(values.areaM2),
      subValue: `Espessura: ${values.thicknessCm} cm (Vol: ${formatVolume(result.volumeTotalM3)})`,
    },
    {
      label: 'Cimento CP II / CP III',
      value: `${result.cementBags50kg} sacos (50kg)`,
      subValue: `+${result.wasteMarginUsed}% margem`,
      highlight: true,
    },
    {
      label: 'Areia Necessária',
      value: `${formatNumber(result.sandM3)} m³`,
      subValue: `≈ ${result.sand18LCans} latas (18L)`,
    },
    ...(result.limeBags20kg
      ? [
          {
            label: 'Cal Hidratada (CH-I)',
            value: `${result.limeBags20kg} sacos (20kg)`,
            subValue: 'Para maciez e plasticidade',
          },
        ]
      : []),
  ];

  const packageInfo: ResultPackageInfo[] = [
    {
      title: 'Cimento Portland (Sacos de 50kg)',
      quantity: `${result.cementBags50kg} sacos de 50kg`,
      description: `Para ${formatArea(values.areaM2)} de ${result.serviceName} com ${values.thicknessCm}cm de espessura.`,
      badge: 'Material Principal',
    },
    {
      title: 'Areia Média Lavada',
      quantity: `${formatNumber(result.sandM3)} m³ (≈ ${result.sand18LCans} latas de 18L)`,
      description: 'Livre de impurezas para não enfraquecer a massa.',
    },
    ...(result.limeBags20kg
      ? [
          {
            title: 'Cal Hidratada para Reboco',
            quantity: `${result.limeBags20kg} sacos de 20kg`,
            description: 'Evita fissuras e melhora o acabamento na desempenadeira.',
          },
        ]
      : []),
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
          {/* Serviço */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Tipo de Serviço
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(CEMENT_SERVICES) as CementServiceType[]).map((typeKey) => {
                const spec = CEMENT_SERVICES[typeKey];
                const isSelected = values.serviceType === typeKey;
                return (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => handleServiceChange(typeKey)}
                    className={`p-3.5 text-left rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 text-brand-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold block">{spec.name}</span>
                    <span className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-2">
                      {spec.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Área e Espessura */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Área e Espessura da Camada
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-title">Área a Executar (m²)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={values.areaM2 || ''}
                    onChange={(e) => updateValues({ areaM2: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 30"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">m²</span>
                </div>
              </div>

              <div>
                <label className="label-title">Espessura Média (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={values.thicknessCm || ''}
                    onChange={(e) => updateValues({ thicknessCm: parseFloat(e.target.value) || 0 })}
                    placeholder="Ex: 3.5"
                    className="input-field pr-10"
                  />
                  <span className="absolute right-3.5 top-3.5 text-sm font-semibold text-slate-400">cm</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Perda */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Margem de Desperdício da Massa
            </h3>

            <WastageSelector
              value={values.wasteMarginPercent}
              onChange={(val) => updateValues({ wasteMarginPercent: val })}
              options={[5, 10, 15]}
              recommendedText="10% é o padrão para cobrir perdas no chão durante o sarrafeamento e respingos na parede."
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 sticky top-24">
          <ResultCard
            calculatorName="Calculadora de Cimento"
            mainHighlight={{
              value: `${result.cementBags50kg}`,
              unit: 'sacos (50kg)',
              secondaryHighlight: `+ ${formatNumber(result.sandM3)} m³ de areia`,
              description: `Total para ${formatArea(values.areaM2)} de ${result.serviceName} com espessura de ${values.thicknessCm}cm.`,
            }}
            metrics={metrics}
            packageInfo={packageInfo}
            additionalNotes={[
              'Armazene os sacos sobre estrado de madeira sem encostar na parede para não absorver umidade.',
              'Peneire a areia antes da mistura para evitar pedriscos que atrapalhem o desempeno.',
            ]}
          />
        </div>
      </div>
    </div>
  );
};
