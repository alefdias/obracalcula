import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface WastageSelectorProps {
  value: number; // percentage (e.g. 10)
  onChange: (val: number) => void;
  options?: number[];
  label?: string;
  recommendedText?: string;
}

export const WastageSelector: React.FC<WastageSelectorProps> = ({
  value,
  onChange,
  options = [5, 10, 15, 20],
  label = 'Margem de desperdício / quebra',
  recommendedText = 'Recomendamos 10% para obras convencionais e 15% para cortes diagonais ou materiais frágeis.'
}) => {
  const isCustom = !options.includes(value);
  const [showCustomInput, setShowCustomInput] = useState(isCustom);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          <span>{label}</span>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
            +{value}%
          </span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {options.map((opt) => {
          const isSelected = value === opt && !showCustomInput;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setShowCustomInput(false);
                onChange(opt);
              }}
              className={`flex-1 min-w-[64px] py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-150 ${
                isSelected
                  ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {opt}%
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowCustomInput(true)}
          className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all duration-150 ${
            showCustomInput
              ? 'border-brand-600 bg-brand-50 text-brand-700'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          Outro
        </button>
      </div>

      {showCustomInput && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={(e) => {
              const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
              onChange(val);
            }}
            placeholder="Ex: 12"
            className="w-24 px-3 py-2 text-sm border-2 border-brand-300 rounded-lg focus:outline-none focus:border-brand-500 font-semibold text-center"
          />
          <span className="text-sm font-medium text-slate-600">% de margem personalizada</span>
        </div>
      )}

      {recommendedText && (
        <p className="text-xs text-slate-500 flex items-start gap-1 pt-0.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
          <span>{recommendedText}</span>
        </p>
      )}
    </div>
  );
};
