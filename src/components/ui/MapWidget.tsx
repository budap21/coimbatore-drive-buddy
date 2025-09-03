import { MapPin, Navigation, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapWidgetProps {
  className?: string;
}

export const MapWidget = ({ className }: MapWidgetProps) => {
  const mockRoutes = [
    { name: 'Home', time: '12 min', distance: '8.2 km', traffic: 'light' },
    { name: 'Work', time: '25 min', distance: '15.4 km', traffic: 'moderate' },
    { name: 'Mall', time: '8 min', distance: '4.1 km', traffic: 'heavy' }
  ];

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'light': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'heavy': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn("relative overflow-hidden bg-surface-primary rounded-xl", className)}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated via-surface-primary to-surface-secondary">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Mock Road Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M0,40 Q150,20 300,60 Q450,100 600,40"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
            className="animate-pulse-glow"
          />
          <path
            d="M0,80 Q200,60 400,100 Q600,140 800,80"
            stroke="hsl(var(--success))"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M100,120 Q300,140 500,100 Q700,60 900,120"
            stroke="hsl(var(--warning))"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Location Markers */}
        <div className="absolute top-8 left-12">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow shadow-lg"></div>
          <div className="absolute -top-1 -left-1 w-5 h-5 border-2 border-primary/50 rounded-full animate-ping"></div>
        </div>
        
        <div className="absolute top-16 right-20">
          <div className="w-2 h-2 bg-success rounded-full"></div>
        </div>
        
        <div className="absolute bottom-8 left-1/3">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
        </div>
      </div>

      {/* Overlay Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="glass-card p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-primary" />
              <span className="body-sm font-semibold">Live Routes</span>
            </div>
            <div className="flex items-center gap-1 body-sm text-success">
              <Zap size={12} />
              <span>Real-time</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {mockRoutes.map((route, index) => (
              <div key={route.name} className="surface-elevated p-2 rounded-lg hover:surface-primary transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={10} className={getTrafficColor(route.traffic)} />
                  <span className="body-sm font-medium truncate group-hover:text-primary transition-colors">
                    {route.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-muted-foreground" />
                    <span className="body-sm">{route.time}</span>
                  </div>
                  <span className="body-sm text-muted-foreground">{route.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};