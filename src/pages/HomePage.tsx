import { useState, useEffect } from 'react';
import { Play, Pause, MapPin, Clock, Zap, AlertTriangle, Fuel, Route, Calendar } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { DriverPoints } from '@/components/ui/DriverPoints';
import { TrafficAlert } from '@/components/ui/TrafficAlert';
import { WeatherWidget } from '@/components/ui/WeatherWidget';
import { FuelStationCard } from '@/components/ui/FuelStationCard';
import { FrequentDestination } from '@/components/ui/FrequentDestination';
import { VoiceAssistant } from '@/components/ui/VoiceAssistant';
import { 
  getAISuggestions, 
  mockDriverProfile, 
  mockNotifications,
  mockTrafficAlerts,
  mockFuelStations,
  mockWeatherData,
  mockFrequentDestinations,
  mockDiscountOffers
} from '@/data/mockData';

export const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('Radio Mirchi Tamil');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  };

  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const suggestions = getAISuggestions(getTimeOfDay());
  const urgentNotifications = mockNotifications.filter(n => n.urgent && !dismissedAlerts.includes(n.id));

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    // Simulate command processing
    if (command.toLowerCase().includes('play')) {
      setIsPlaying(true);
    } else if (command.toLowerCase().includes('pause')) {
      setIsPlaying(false);
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const handleNavigate = (destination: any) => {
    console.log('Navigate to:', destination);
    // Simulate navigation
  };

  const handleVoiceAssistantCommand = (command: string) => {
    console.log('Voice Assistant command:', command);
    // Process voice commands
    handleVoiceCommand(command);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">
            {getTimeOfDay() === 'morning' && '🌅'}
            {getTimeOfDay() === 'afternoon' && '☀️'}
            {getTimeOfDay() === 'evening' && '🌆'}
            {getTimeOfDay() === 'night' && '🌙'}
          </div>
          <div>
            <h1 className="text-xl font-bold">Good {getTimeOfDay()}, Test User 1!</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock size={14} />
              {currentTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
              <MapPin size={14} className="ml-2" />
              Coimbatore, TN
            </p>
          </div>
        </div>
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Main Dashboard - Single Screen Layout */}
      <div className="flex-1 p-4 grid grid-cols-12 gap-3 compact-spacing overflow-hidden">
        {/* Traffic Alerts Column */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-destructive" />
            <h2 className="font-semibold text-sm">Traffic & Road Info</h2>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {mockTrafficAlerts.map((alert) => (
              <TrafficAlert key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Central Info Column */}
        <div className="col-span-12 lg:col-span-6 space-y-3">
          {/* Urgent Notifications Row */}
          {urgentNotifications.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {urgentNotifications.slice(0, 1).map((notification) => (
                <NeuroCard key={notification.id} urgent className="border-destructive compact-card hover-lift">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-destructive text-sm">{notification.title}</h3>
                      <p className="text-xs mt-1">{notification.message}</p>
                    </div>
                    <button
                      onClick={() => dismissAlert(notification.id)}
                      className="neuro-button p-1 ml-2 text-xs hover:scale-110 transition-transform"
                    >
                      ✕
                    </button>
                  </div>
                </NeuroCard>
              ))}
            </div>
          )}

          {/* Current Status Row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Now Playing */}
            <NeuroCard className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30 compact-card hover-lift">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="neuro-button-primary rounded-full w-8 h-8 hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary text-xs">🎵 Playing</h3>
                  <p className="text-xs truncate">{currentSong}</p>
                </div>
              </div>
            </NeuroCard>

            {/* Weather */}
            <WeatherWidget weather={mockWeatherData} />

            {/* Voice Assistant */}
            <NeuroCard className="bg-gradient-to-r from-purple-50/50 to-blue-100/50 border-purple-200 compact-card">
              <div className="flex items-center gap-2">
                <VoiceButton onCommand={handleVoiceAssistantCommand} className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-xs text-purple-700">Voice</h3>
                  <p className="text-xs text-muted-foreground">Tap to speak</p>
                </div>
              </div>
            </NeuroCard>
          </div>

          {/* Frequent Destinations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Route size={16} className="text-accent" />
              <h3 className="font-semibold text-sm">Frequent Destinations</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {mockFrequentDestinations.slice(0, 4).map((destination) => (
                <FrequentDestination 
                  key={destination.id} 
                  destination={destination} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-3">
          {/* Fuel Stations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Fuel size={16} className="text-warning" />
              <h3 className="font-semibold text-sm">Nearby Fuel</h3>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mockFuelStations.slice(0, 3).map((station) => (
                <FuelStationCard key={station.id} station={station} />
              ))}
            </div>
          </div>

          {/* Exclusive Offers */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-success" />
              <h3 className="font-semibold text-sm">Driver Deals</h3>
            </div>
            <div className="space-y-2">
              {mockDiscountOffers.slice(0, 2).map((offer) => (
                <NeuroCard key={offer.id} className="compact-card hover-lift cursor-pointer bg-gradient-to-r from-success/10 to-primary/10 border-success/30">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-success">{offer.restaurant}</h4>
                      <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full">
                        {offer.offer}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{offer.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Valid: {offer.validTill}</span>
                      <span className="text-accent">{offer.distance}</span>
                    </div>
                  </div>
                </NeuroCard>
              ))}
            </div>
          </div>

          {/* Quick News */}
          <NeuroCard className="compact-card">
            <div className="space-y-1">
              <h3 className="font-semibold text-accent text-sm">📰 Quick Update</h3>
              <p className="text-xs text-muted-foreground">{suggestions.news}</p>
            </div>
          </NeuroCard>
        </div>
      </div>
    </div>
  );
};