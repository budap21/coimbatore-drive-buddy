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
    <div className="min-h-screen bg-gradient-to-br from-background to-surface p-4 space-y-6">
      {/* Current Location & Navigation */}
      <NeuroCard className="glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
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
      <NeuroCard className="glass-card">
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
      <NeuroCard className="glass-card h-64">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden">
          {/* Detailed Coimbatore Map Mock */}
          <div className="absolute inset-0 bg-green-50/50">
            {/* Major roads */}
            <div className="absolute top-1/4 left-0 right-0 h-2 bg-yellow-400/60 rounded"></div>
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-500/60 rounded"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400/50"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-blue-400/60 rounded"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400/50"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400/50"></div>
            
            {/* Landmarks */}
            <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                Railway Station
              </div>
            </div>
            
            <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-blue-500 rounded-full">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                Bus Stand
              </div>
            </div>
            
            <div className="absolute top-1/4 left-3/4 w-4 h-4 bg-green-500 rounded-full">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                PSG Tech
              </div>
            </div>
            
            {/* Current location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white animate-pulse">
                <MapPin size={16} />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm bg-primary text-white px-2 py-1 rounded">
                You are here
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <button className="neuro-button-primary px-3 py-2 text-sm">
              🎯 Current Location
            </button>
            <button className="neuro-button px-3 py-2 text-sm">
              🚦 Traffic Status
            </button>
          </div>
        </div>
      </NeuroCard>

      {/* Quick Destinations */}
      <div className="space-y-4">
        <h2 className="text-car-subtitle">Quick Destinations</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickDestinations.map((dest, index) => (
            <NeuroCard key={index} className="glass-card hover:scale-105 cursor-pointer">
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
            <NeuroCard key={index} className="glass-card hover:scale-105 cursor-pointer">
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