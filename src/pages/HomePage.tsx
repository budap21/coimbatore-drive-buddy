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
  mockDriverServices,
  mockWeatherData,
  mockFrequentDestinations,
  mockDiscountOffers
} from '@/data/mockData';
import { ServiceCard } from '@/components/ui/ServiceCard';

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

      {/* Main Dashboard - Optimized Single Screen Layout */}
      <div className="flex-1 p-3 grid grid-cols-12 gap-2 overflow-hidden">
        {/* Left Panel - Traffic & Navigation */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {/* Traffic Alerts */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-muted-foreground" />
              <h2 className="font-medium text-xs text-foreground">Road Conditions</h2>
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto">
              {mockTrafficAlerts.slice(0, 3).map((alert) => (
                <TrafficAlert key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Frequent Destinations */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Route size={14} className="text-muted-foreground" />
              <h3 className="font-medium text-xs text-foreground">Quick Routes</h3>
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
              {mockFrequentDestinations.slice(0, 3).map((destination) => (
                <FrequentDestination 
                  key={destination.id} 
                  destination={destination} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Main Status */}
        <div className="col-span-12 lg:col-span-6 space-y-2">
          {/* Urgent Alerts - Minimal */}
          {urgentNotifications.length > 0 && (
            <div className="space-y-1">
              {urgentNotifications.slice(0, 1).map((notification) => (
                <NeuroCard key={notification.id} className="border-destructive/50 compact-card bg-destructive/5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <div>
                        <h3 className="font-medium text-destructive text-xs">{notification.title}</h3>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(notification.id)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                </NeuroCard>
              ))}
            </div>
          )}

          {/* Main Control Row */}
          <div className="grid grid-cols-4 gap-2">
            {/* Now Playing */}
            <NeuroCard className="bg-primary/5 border-primary/20 compact-card col-span-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause size={12} className="text-primary" /> : <Play size={12} className="text-primary" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-xs text-foreground">Now Playing</h3>
                  <p className="text-xs text-muted-foreground truncate">{currentSong}</p>
                </div>
              </div>
            </NeuroCard>

            {/* Weather Compact */}
            <WeatherWidget weather={mockWeatherData} />

            {/* Voice Assistant */}
            <NeuroCard className="bg-accent/5 border-accent/20 compact-card">
              <div className="flex flex-col items-center gap-1">
                <VoiceButton onCommand={handleVoiceAssistantCommand} className="w-8 h-8" />
                <span className="text-xs text-muted-foreground">Voice</span>
              </div>
            </NeuroCard>
          </div>

          {/* Driver Deals - Horizontal */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <h3 className="font-medium text-xs text-foreground">Exclusive Offers</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mockDiscountOffers.slice(0, 2).map((offer) => (
                <NeuroCard key={offer.id} className="compact-card hover-lift cursor-pointer bg-success/5 border-success/20">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-xs text-foreground">{offer.restaurant}</h4>
                      <span className="text-xs bg-success/20 text-success px-1 py-0.5 rounded">
                        {offer.offer}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{offer.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{offer.validTill}</span>
                      <span>{offer.distance}</span>
                    </div>
                  </div>
                </NeuroCard>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Services */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          {/* Essential Services */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-muted-foreground" />
              <h3 className="font-medium text-xs text-foreground">Driver Essentials</h3>
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {mockDriverServices.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Quick Update */}
          <NeuroCard className="compact-card bg-card/30">
            <div className="space-y-1">
              <h3 className="font-medium text-xs text-foreground">📡 Traffic Update</h3>
              <p className="text-xs text-muted-foreground">{suggestions.news}</p>
            </div>
          </NeuroCard>
        </div>
      </div>
    </div>
  );
};