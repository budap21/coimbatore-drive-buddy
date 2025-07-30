import { Star, Trophy } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface DriverPointsProps {
  points: number;
  level: string;
}

export const DriverPoints = ({ points, level }: DriverPointsProps) => {
  return (
    <NeuroCard className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30">
      <div className="flex items-center gap-3">
        <div className="neuro-button-primary p-3 rounded-full">
          <Trophy size={20} />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-warning fill-warning" />
            <span className="text-car-subtitle font-bold text-primary">{points}</span>
            <span className="text-muted-foreground">Points</span>
          </div>
          <p className="text-sm text-muted-foreground">{level} Driver</p>
        </div>
      </div>
    </NeuroCard>
  );
};