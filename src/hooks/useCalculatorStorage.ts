import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  summary: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

const STORAGE_PREFIX = 'obracalcula_inputs_';
const HISTORY_KEY = 'obracalcula_history_v1';

export function useCalculatorStorage<T>(calculatorId: string, defaultValues: T) {
  const [values, setValues] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}${calculatorId}`);
      if (saved) {
        return { ...defaultValues, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Erro ao ler localStorage', e);
    }
    return defaultValues;
  });

  const [hasSavedData, setHasSavedData] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(`${STORAGE_PREFIX}${calculatorId}`);
    } catch {
      return false;
    }
  });

  const updateValues = (newValues: Partial<T> | ((prev: T) => T)) => {
    setValues(prev => {
      const updated = typeof newValues === 'function' ? (newValues as any)(prev) : { ...prev, ...newValues };
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${calculatorId}`, JSON.stringify(updated));
        setHasSavedData(true);
      } catch (e) {
        console.warn('Erro ao salvar em localStorage', e);
      }
      return updated;
    });
  };

  const resetValues = () => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${calculatorId}`);
      setHasSavedData(false);
      setValues(defaultValues);
    } catch (e) {
      console.warn('Erro ao limpar localStorage', e);
    }
  };

  return { values, updateValues, resetValues, hasSavedData };
}

export function saveCalculationHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>) {
  try {
    const history = getCalculationHistory();
    const newItem: HistoryItem = {
      ...item,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: Date.now(),
    };
    // Keep max 20 history items
    const updated = [newItem, ...history.filter(h => h.calculatorId !== item.calculatorId || Date.now() - h.timestamp > 5000)].slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('obracalcula_history_updated'));
  } catch (e) {
    console.warn('Erro ao salvar histórico', e);
  }
}

export function getCalculationHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Erro ao ler histórico', e);
  }
  return [];
}

export function clearCalculationHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event('obracalcula_history_updated'));
  } catch (e) {
    console.warn('Erro ao limpar histórico', e);
  }
}
