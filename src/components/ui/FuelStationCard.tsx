import { MapPin, Star, Clock } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface FuelStation {
  id: string;
  name: string;
  distance: string;
  price: string;
  offers: string;
  availability: string;
  rating: number;
  icon: string;
}

interface FuelStationCardProps {
  station: FuelStation;
}

export const FuelStationCard = ({ station }: FuelStationCardProps) => {
  return (
    <NeuroCard className="compact-card hover-lift cursor-pointer bg-gradient-to-r from-orange-50/50 to-yellow-100/50 border-orange-200">
      <div className="flex items-start gap-3">
        <div className="text-xl">{station.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm truncate">{station.name}</h4>
            <div className="flex items-center gap-1 text-xs">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span>{station.rating}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1">
                <MapPin size={10} />
                {station.distance}
              </span>
              <span className="font-bold text-green-600">{station.price}</span>
            </div>
            
            <p className="text-xs text-blue-600 font-medium">{station.offers}</p>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={10} />
              {station.availability}
            </div>
          </div>
        </div>
      </div>
    </NeuroCard>
  );
};