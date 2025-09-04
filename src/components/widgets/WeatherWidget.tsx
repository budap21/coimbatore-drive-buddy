import { Thermometer } from 'lucide-react';
import { mockWeatherData } from '@/data/mockData';

export const WeatherWidget = () => {
  return (
    <div className="glass-card p-4 flex items-center gap-4 status-warning h-full">
      <div className="w-16 h-16 rounded-2xl surface-elevated flex items-center justify-center text-3xl flex-shrink-0">
        {mockWeatherData.current.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Thermometer size={14} className="text-warning" />
          <span className="body-sm text-warning">Weather</span>
        </div>
        <h3 className="heading-sm">{mockWeatherData.current.temperature}</h3>
        <p className="body-sm text-muted-foreground">{mockWeatherData.current.condition}</p>
        <p className="body-sm text-warning font-medium">{mockWeatherData.current.drivingCondition}</p>
      </div>
    </div>
  );
};