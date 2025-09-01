import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { NeuroCard } from './NeuroCard';
import { cn } from '@/lib/utils';

interface TrafficAlert {
  id: string;
  type: 'construction' | 'accident' | 'roadblock';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  eta: string;
  distance: string;
  icon: string;
}

interface TrafficAlertProps {
  alert: TrafficAlert;
}

export const TrafficAlert = ({ alert }: TrafficAlertProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-destructive bg-destructive/10';
      case 'medium': return 'border-warning bg-warning/10';
      case 'low': return 'border-success bg-success/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  return (
    <NeuroCard className={cn("compact-card hover-lift", getSeverityColor(alert.severity))}>
      <div className="flex items-start gap-3">
        <div className="text-lg">{alert.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm truncate">{alert.title}</h4>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              alert.severity === 'high' && "bg-destructive text-destructive-foreground",
              alert.severity === 'medium' && "bg-warning text-warning-foreground",
              alert.severity === 'low' && "bg-success text-success-foreground"
            )}>
              {alert.eta}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {alert.distance}
            </span>
          </div>
        </div>
      </div>
    </NeuroCard>
  );
};