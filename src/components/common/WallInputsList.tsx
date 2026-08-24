import React from 'react';
import { Plus, Trash2, DoorOpen, LayoutTemplate, Layers } from 'lucide-react';
import { UnitSelector, LengthUnit } from './UnitSelector';
import { convertToMeters } from '../../utils/formatters';

export interface WallItem {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: LengthUnit;
}

export interface OpeningItem {
  id: string;
  type: 'door' | 'window' | 'custom';
  name: string;
  width: number;
  height: number;
  quantity: number;
  unit: LengthUnit;
}

interface WallInputsListProps {
  walls: WallItem[];
  openings: OpeningItem[];
  onWallsChange: (walls: WallItem[]) => void;
  onOpeningsChange: (openings: OpeningItem[]) => void;
  defaultHeight?: number;
}

export const WallInputsList: React.FC<WallInputsListProps> = ({
  walls,
  openings,
  onWallsChange,
  onOpeningsChange,
  defaultHeight = 2.8,
}) => {
  // Add Wall
  const addWall = () => {
    const nextNum = walls.length + 1;
    onWallsChange([
      ...walls,
      {
        id: `wall_${Date.now()}`,
        name: `Parede ${nextNum}`,
        width: 4.0,
        height: defaultHeight,
        unit: 'm',
      },
    ]);
  };

  const removeWall = (id: string) => {
    if (walls.length <= 1) return;
    onWallsChange(walls.filter(w => w.id !== id));
  };

  const updateWall = (id: string, updates: Partial<WallItem>) => {
    onWallsChange(walls.map(w => (w.id === id ? { ...w, ...updates } : w)));
  };

  // Add Opening
  const addOpeningPreset = (type: 'door' | 'window') => {
    const id = `op_${Date.now()}`;
    if (type === 'door') {
      onOpeningsChange([
        ...openings,
        {
          id,
          type: 'door',
          name: 'Porta Padrão (0.80 x 2.10m)',
          width: 0.8,
          height: 2.1,
          quantity: 1,
          unit: 'm',
        },
      ]);
    } else {
      onOpeningsChange([
        ...openings,
        {
          id,
          type: 'window',
          name: 'Janela Padrão (1.20 x 1.00m)',
          width: 1.2,
          height: 1.0,
          quantity: 1,
          unit: 'm',
        },
      ]);
    }
  };

  const removeOpening = (id: string) => {
    onOpeningsChange(openings.filter(o => o.id !== id));
  };

  const updateOpening = (id: string, updates: Partial<OpeningItem>) => {
    onOpeningsChange(openings.map(o => (o.id === id ? { ...o, ...updates } : o)));
  };

  // Calculate totals
  const totalGrossArea = walls.reduce((sum, w) => {
    const wm = convertToMeters(w.width, w.unit);
    const hm = convertToMeters(w.height, w.unit);
    return sum + wm * hm;
  }, 0);

  const totalDeductionArea = openings.reduce((sum, o) => {
    const wm = convertToMeters(o.width, o.unit);
    const hm = convertToMeters(o.height, o.unit);
    return sum + wm * hm * (o.quantity || 1);
  }, 0);

  const netArea = Math.max(0, totalGrossArea - totalDeductionArea);

  return (
    <div className="space-y-6">
      {/* Walls Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-600" />
            <h4 className="text-sm font-bold text-slate-800">Paredes do Ambiente</h4>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {walls.length} {walls.length === 1 ? 'parede' : 'paredes'}
          </span>
        </div>

        <div className="space-y-2.5">
          {walls.map((wall, index) => {
            const wm = convertToMeters(wall.width, wall.unit);
            const hm = convertToMeters(wall.height, wall.unit);
            const wallArea = wm * hm;

            return (
              <div
                key={wall.id}
                className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {wall.name || `Parede ${index + 1}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {wallArea.toFixed(2)} m²
                    </span>
                    {walls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWall(wall.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remover parede"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Comprimento / Largura (m)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={wall.width || ''}
                      onChange={(e) => updateWall(wall.id, { width: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 4.0"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Altura / Pé-direito (m)
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={wall.height || ''}
                      onChange={(e) => updateWall(wall.id, { height: parseFloat(e.target.value) || 0 })}
                      placeholder="Ex: 2.8"
                      className="input-field py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addWall}
          className="w-full py-2.5 px-4 border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50 hover:bg-brand-50/50 text-slate-700 hover:text-brand-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar outra parede</span>
        </button>
      </div>

      {/* Deductions (Doors, Windows, Openings) */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DoorOpen className="w-4 h-4 text-brand-600" />
            <h4 className="text-sm font-bold text-slate-800">Descontar Portas e Janelas (Vãos)</h4>
          </div>
          {totalDeductionArea > 0 && (
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              -{totalDeductionArea.toFixed(2)} m²
            </span>
          )}
        </div>

        {openings.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
            Nenhum vão cadastrado. Adicione portas e janelas para descontar da metragem final e economizar material.
          </p>
        ) : (
          <div className="space-y-2">
            {openings.map((op) => (
              <div
                key={op.id}
                className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    {op.type === 'door' ? <DoorOpen className="w-4 h-4" /> : <LayoutTemplate className="w-4 h-4" />}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">{op.name}</span>
                    <span className="text-xs text-slate-400 block">
                      {op.width}m × {op.height}m ({((op.width * op.height) * op.quantity).toFixed(2)} m²)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500 font-medium">Qtd:</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={op.quantity}
                      onChange={(e) => updateOpening(op.id, { quantity: parseInt(e.target.value) || 1 })}
                      className="w-14 px-2 py-1 border border-slate-300 rounded text-center text-xs font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOpening(op.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => addOpeningPreset('door')}
            className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + Porta (0.80 × 2.10m)
          </button>
          <button
            type="button"
            onClick={() => addOpeningPreset('window')}
            className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + Janela (1.20 × 1.00m)
          </button>
        </div>
      </div>

      {/* Area Summary Ribbon */}
      <div className="bg-brand-50/70 border border-brand-200 rounded-xl p-3.5 flex items-center justify-between text-xs sm:text-sm">
        <div>
          <span className="text-slate-500 font-medium">Área Bruta: </span>
          <span className="font-bold text-slate-800">{totalGrossArea.toFixed(2)} m²</span>
          {totalDeductionArea > 0 && (
            <span className="text-rose-600 font-medium ml-2">
              (Desconto: -{totalDeductionArea.toFixed(2)} m²)
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-brand-900 font-medium">Área Líquida: </span>
          <span className="font-extrabold text-brand-700 text-base">{netArea.toFixed(2)} m²</span>
        </div>
      </div>
    </div>
  );
};
