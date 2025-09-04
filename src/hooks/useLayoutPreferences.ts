import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface WidgetLayout {
  id: string;
  position: number;
}

const defaultLayout: WidgetLayout[] = [
  { id: 'music', position: 0 },
  { id: 'weather', position: 1 },
  { id: 'voice', position: 2 },
  { id: 'traffic', position: 3 },
  { id: 'services', position: 4 },
];

export const useLayoutPreferences = () => {
  const [layout, setLayout] = useLocalStorage<WidgetLayout[]>('dashboard-layout', defaultLayout);

  const updateLayout = (newLayout: WidgetLayout[]) => {
    setLayout(newLayout);
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
  };

  return {
    layout,
    updateLayout,
    resetLayout,
  };
};