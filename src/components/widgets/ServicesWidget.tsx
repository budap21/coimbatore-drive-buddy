import { Shield, Star } from 'lucide-react';
import { mockDriverServices } from '@/data/mockData';

export const ServicesWidget = () => {
  const topService = mockDriverServices[0];

  return (
    <div className="glass-card p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-success" />
          <h3 className="body-md font-semibold">Services</h3>
        </div>
        <span className="body-sm text-muted-foreground">{mockDriverServices.length} nearby</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {topService && (
          <div className="flex items-center gap-3 p-3 rounded-xl surface-elevated">
            <div className="text-2xl flex-shrink-0">{topService.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="body-md font-medium truncate">{topService.name}</h4>
              <div className="flex items-center justify-between body-sm mt-1">
                <span className="text-muted-foreground">{topService.distance}</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="font-medium">{topService.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};