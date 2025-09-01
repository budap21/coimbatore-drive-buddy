import { Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface WeatherData {
  current: {
    temperature: string;
    condition: string;
    humidity: string;
    windSpeed: string;
    visibility: string;
    icon: string;
    drivingCondition: string;
  };
  hourly: Array<{
    time: string;
    temp: string;
    condition: string;
    icon: string;
  }>;
}

interface WeatherWidgetProps {
  weather: WeatherData;
}

export const WeatherWidget = ({ weather }: WeatherWidgetProps) => {
  return (
    <NeuroCard className="compact-card bg-gradient-to-br from-blue-50/50 to-sky-100/50 border-sky-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Cloud size={16} />
              Weather
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl">{weather.current.icon}</span>
              <div>
                <p className="font-bold text-lg">{weather.current.temperature}</p>
                <p className="text-xs text-muted-foreground">{weather.current.condition}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-success">Driving: {weather.current.drivingCondition}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Droplets size={12} className="text-blue-500" />
            <span>{weather.current.humidity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={12} className="text-gray-500" />
            <span>{weather.current.windSpeed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} className="text-green-500" />
            <span>{weather.current.visibility}</span>
          </div>
        </div>

        <div className="flex justify-between text-xs">
          {weather.hourly.slice(0, 4).map((hour, index) => (
            <div key={index} className="text-center">
              <p className="text-muted-foreground">{hour.time}</p>
              <span className="text-sm">{hour.icon}</span>
              <p className="font-medium">{hour.temp}</p>
            </div>
          ))}
        </div>
      </div>
    </NeuroCard>
  );
};