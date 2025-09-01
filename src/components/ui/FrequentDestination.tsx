import { Navigation, Clock, MapPin, ArrowRight } from 'lucide-react';
import { NeuroCard } from './NeuroCard';
import { cn } from '@/lib/utils';

interface Destination {
  id: string;
  name: string;
  address: string;
  distance: string;
  eta: string;
  traffic: string;
  lastVisited: string;
  icon: string;
  trafficColor: 'success' | 'warning' | 'destructive';
}

interface FrequentDestinationProps {
  destination: Destination;
  onNavigate: (destination: Destination) => void;
}

export const FrequentDestination = ({ destination, onNavigate }: FrequentDestinationProps) => {
  const getTrafficColor = (color: string) => {
    switch (color) {
      case 'success': return 'text-success border-success/20 bg-success/10';
      case 'warning': return 'text-warning border-warning/20 bg-warning/10';
      case 'destructive': return 'text-destructive border-destructive/20 bg-destructive/10';
      default: return 'text-muted-foreground border-muted/20 bg-muted/10';
    }
  };

  return (
    <NeuroCard className="compact-card hover-lift cursor-pointer" onClick={() => onNavigate(destination)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-lg">{destination.icon}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate mb-1">{destination.name}</h4>
            <p className="text-xs text-muted-foreground truncate mb-2">{destination.address}</p>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <MapPin size={10} />
                {destination.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {destination.eta}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full border",
                getTrafficColor(destination.trafficColor)
              )}>
                {destination.traffic} traffic
              </span>
              <span className="text-xs text-muted-foreground">{destination.lastVisited}</span>
            </div>
          </div>
        </div>
        
        <button className="neuro-button-primary p-2 rounded-full hover:scale-110 transition-transform">
          <Navigation size={14} />
        </button>
      </div>
    </NeuroCard>
  );
};