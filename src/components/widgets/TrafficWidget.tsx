import { Navigation, AlertTriangle } from 'lucide-react';
import { mockTrafficAlerts } from '@/data/mockData';

export const TrafficWidget = () => {
  const criticalAlert = mockTrafficAlerts[0];

  return (
    <div className="glass-card p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Navigation size={14} className="text-warning" />
          <h3 className="body-md font-semibold">Road Status</h3>
        </div>
        <span className="body-sm text-muted-foreground">{mockTrafficAlerts.length} alerts</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {criticalAlert && (
          <div className="flex items-center gap-3 p-3 rounded-xl surface-elevated">
            <div className="text-2xl flex-shrink-0">{criticalAlert.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="body-md font-medium truncate">{criticalAlert.title}</h4>
              <div className="flex items-center gap-3 body-sm text-muted-foreground mt-1">
                <span>{criticalAlert.distance}</span>
                <span className="text-warning font-medium">{criticalAlert.eta}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};