import { Navigation, MapPin, Route, Zap } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface MapWidgetProps {
  className?: string;
}

export const MapWidget = ({ className }: MapWidgetProps) => {
  return (
    <NeuroCard className={`relative overflow-hidden bg-card/50 border-border/30 ${className}`}>
      {/* Map Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-card/50 to-muted/30">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        {/* Roads */}
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-primary/30 transform rotate-12"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-primary/20 transform -rotate-6"></div>
        <div className="absolute left-1/4 top-0 w-0.5 h-full bg-primary/25 transform rotate-3"></div>
        
        {/* Location Markers */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-warning rounded-full"></div>
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-success rounded-full"></div>
      </div>

      {/* Map Controls Overlay */}
      <div className="relative z-10 p-3 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
            <Navigation size={12} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Live Map</span>
          </div>
          <div className="flex gap-1">
            <button className="w-6 h-6 bg-background/80 backdrop-blur-sm rounded border border-border/50 flex items-center justify-center hover:bg-background/90 transition-colors">
              <MapPin size={10} className="text-muted-foreground" />
            </button>
            <button className="w-6 h-6 bg-background/80 backdrop-blur-sm rounded border border-border/50 flex items-center justify-center hover:bg-background/90 transition-colors">
              <Route size={10} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bg-background/90 backdrop-blur-sm rounded-md px-2 py-1">
            <div className="text-xs text-muted-foreground">Current Location</div>
            <div className="text-xs font-medium text-foreground">Coimbatore, TN</div>
          </div>
          <div className="flex items-center gap-1 bg-success/20 backdrop-blur-sm rounded-md px-2 py-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">GPS Active</span>
          </div>
        </div>
      </div>
    </NeuroCard>
  );
};