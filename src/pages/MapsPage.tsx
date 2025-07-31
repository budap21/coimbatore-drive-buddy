import { useState } from 'react';
import { MapPin, Navigation, Search, Clock, Car } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const MapsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation] = useState('Gandhipuram, Coimbatore');
  
  const quickDestinations = [
    { name: 'A2B Restaurant', distance: '2.3 km', time: '8 min', type: 'restaurant' },
    { name: 'Brookefields Mall', distance: '5.1 km', time: '15 min', type: 'shopping' },
    { name: 'Coimbatore Railway Station', distance: '3.7 km', time: '12 min', type: 'transport' },
    { name: 'Airport', distance: '12.5 km', time: '25 min', type: 'transport' }
  ];

  const recentSearches = [
    'Junior Kuppanna, RS Puram',
    'Fun Republic Mall',
    'KMCH Hospital',
    'Tidel Park'
  ];

  return (
    <div className="space-y-6">
      {/* Current Location & Navigation */}
      <NeuroCard className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <MapPin className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Current Location</h3>
              <p className="text-car-body">{currentLocation}</p>
            </div>
          </div>
          <Button className="neuro-button-primary rounded-full p-3">
            <Navigation size={20} />
          </Button>
        </div>
      </NeuroCard>

      {/* Search */}
      <NeuroCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for places, restaurants, hotels..."
              className="flex-1"
            />
          </div>
        </div>
      </NeuroCard>

      {/* Map Placeholder */}
      <NeuroCard className="h-64">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin size={48} className="text-primary mx-auto" />
            <h3 className="font-semibold text-primary">Interactive Map</h3>
            <p className="text-sm text-muted-foreground">Google Maps integration placeholder</p>
          </div>
        </div>
      </NeuroCard>

      {/* Quick Destinations */}
      <div className="space-y-4">
        <h2 className="text-car-subtitle">Quick Destinations</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickDestinations.map((dest, index) => (
            <NeuroCard key={index} className="hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-accent/20">
                    <Car className="text-accent" size={16} />
                  </div>
                  <div>
                    <h4 className="font-medium">{dest.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {dest.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {dest.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="neuro-button">
                  Navigate
                </Button>
              </div>
            </NeuroCard>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="space-y-4">
        <h2 className="text-car-subtitle">Recent Searches</h2>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <NeuroCard key={index} className="hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-car-body">{search}</span>
              </div>
            </NeuroCard>
          ))}
        </div>
      </div>
    </div>
  );
};