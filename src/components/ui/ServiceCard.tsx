import { Star, MapPin, Clock } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface ServiceCardProps {
  service: {
    id: string;
    type: 'fuel' | 'puncture' | 'service' | 'wash';
    name: string;
    distance: string;
    price: string;
    offers: string;
    availability: string;
    rating: number;
    icon: string;
  };
}

const getServiceColor = (type: string) => {
  switch (type) {
    case 'fuel': return 'text-warning';
    case 'puncture': return 'text-destructive';
    case 'service': return 'text-info';
    case 'wash': return 'text-accent';
    default: return 'text-muted-foreground';
  }
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <NeuroCard className="compact-card hover-lift cursor-pointer bg-card/30 border-border/30">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-lg ${getServiceColor(service.type)}`}>
              {service.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate text-foreground">{service.name}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={10} />
                <span>{service.distance}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star size={10} className="fill-warning text-warning" />
                  <span>{service.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs font-medium text-foreground">{service.price}</div>
          <div className="text-xs text-success">{service.offers}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={10} />
            <span>{service.availability}</span>
          </div>
        </div>
      </div>
    </NeuroCard>
  );
};