import React from 'react';

export type LengthUnit = 'm' | 'cm' | 'mm';

interface UnitSelectorProps {
  value: LengthUnit;
  onChange: (unit: LengthUnit) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  value,
  onChange,
  className = '',
  size = 'md',
}) => {
  const units: { id: LengthUnit; label: string }[] = [
    { id: 'm', label: 'Metros (m)' },
    { id: 'cm', label: 'Centímetros (cm)' },
    { id: 'mm', label: 'Milímetros (mm)' },
  ];

  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <div className={`inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 ${className}`}>
      {units.map(u => {
        const isActive = value === u.id;
        return (
          <button
            key={u.id}
            type="button"
            onClick={() => onChange(u.id)}
            className={`${padding} rounded-lg font-medium transition-all ${
              isActive
                ? 'bg-white text-brand-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {u.id}
          </button>
        );
      })}
    </div>
  );
};
