import { useState, useEffect } from 'react';
import { Play, Pause, MapPin, Clock, Zap, AlertTriangle, Route, Calendar, Gauge } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { TrafficAlert } from '@/components/ui/TrafficAlert';
import { FrequentDestination } from '@/components/ui/FrequentDestination';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MapWidget } from '@/components/ui/MapWidget';
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
    <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-background via-background to-card/50">
      {/* Automotive Header */}
      <div className="flex justify-between items-center p-4 border-b border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gauge size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">DriverHub</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Clock size={12} />
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
                <MapPin size={12} className="ml-2" />
                Coimbatore, TN
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Good {getTimeOfDay()}, {mockDriverProfile.name}
          </div>
          <VoiceButton onCommand={handleVoiceCommand} />
        </div>
      </div>

      {/* Main Dashboard - Automotive Grid Layout */}
      <div className="flex-1 p-3 grid grid-rows-3 gap-3 overflow-hidden">
        
        {/* Top Row - Primary Controls */}
        <div className="grid grid-cols-12 gap-3">
          {/* Traffic & Alerts */}
          <div className="col-span-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-warning" />
              <h2 className="font-medium text-sm text-foreground">Road Status</h2>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {mockTrafficAlerts.slice(0, 3).map((alert) => (
                <TrafficAlert key={alert.id} alert={alert} />
              ))}
            </div>
          </div>

          {/* Central Control Panel */}
          <div className="col-span-6">
            {/* Urgent Alert Strip */}
            {urgentNotifications.length > 0 && (
              <div className="mb-3">
                {urgentNotifications.slice(0, 1).map((notification) => (
                  <NeuroCard key={notification.id} className="border-destructive/40 bg-destructive/5 p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                        <div>
                          <span className="font-medium text-destructive text-xs">{notification.title}</span>
                          <span className="text-xs text-muted-foreground ml-2">{notification.message}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => dismissAlert(notification.id)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </NeuroCard>
                ))}
              </div>
            )}

            {/* Main Control Row - Perfectly Aligned */}
            <div className="grid grid-cols-3 gap-3 h-20">
              {/* Music Control */}
              <NeuroCard className="bg-primary/5 border-primary/20 p-3 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  {isPlaying ? <Pause size={16} className="text-primary" /> : <Play size={16} className="text-primary" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-xs text-foreground">Now Playing</h3>
                  <p className="text-xs text-muted-foreground truncate">{currentSong}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-0.5 bg-primary/30 rounded flex-1"></div>
                    <div className="h-0.5 bg-primary rounded w-8"></div>
                    <div className="h-0.5 bg-primary/30 rounded flex-1"></div>
                  </div>
                </div>
              </NeuroCard>

              {/* Weather Control */}
              <NeuroCard className="bg-info/5 border-info/20 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                  <span className="text-xl">{mockWeatherData.current.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-xs text-foreground">{mockWeatherData.current.temperature}</h3>
                  <p className="text-xs text-muted-foreground">{mockWeatherData.current.condition}</p>
                  <p className="text-xs text-info font-medium">{mockWeatherData.current.drivingCondition}</p>
                </div>
              </NeuroCard>

              {/* Voice Assistant */}
              <NeuroCard className="bg-accent/5 border-accent/20 p-3 flex flex-col items-center justify-center gap-2">
                <VoiceButton onCommand={handleVoiceAssistantCommand} className="w-12 h-12" />
                <div className="text-center">
                  <span className="text-xs font-medium text-foreground">Assistant</span>
                  <p className="text-xs text-muted-foreground">Tap to speak</p>
                </div>
              </NeuroCard>
            </div>
          </div>

          {/* Services Panel */}
          <div className="col-span-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-success" />
              <h3 className="font-medium text-sm text-foreground">Quick Services</h3>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {mockDriverServices.slice(0, 4).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Row - Navigation & Offers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Frequent Destinations */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Route size={14} className="text-primary" />
              <h3 className="font-medium text-sm text-foreground">Quick Routes</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mockFrequentDestinations.slice(0, 4).map((destination) => (
                <FrequentDestination 
                  key={destination.id} 
                  destination={destination} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Driver Deals */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-success" />
              <h3 className="font-medium text-sm text-foreground">Exclusive Deals</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mockDiscountOffers.slice(0, 4).map((offer) => (
                <NeuroCard key={offer.id} className="p-2 hover-lift cursor-pointer bg-success/5 border-success/20">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-xs text-foreground truncate">{offer.restaurant}</h4>
                      <span className="text-xs bg-success/20 text-success px-1 py-0.5 rounded">
                        {offer.offer}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{offer.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="truncate">{offer.validTill}</span>
                      <span>{offer.distance}</span>
                    </div>
                  </div>
                </NeuroCard>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Map */}
        <div className="grid grid-cols-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <h3 className="font-medium text-sm text-foreground">Navigation Map</h3>
              </div>
              <div className="text-xs text-muted-foreground">{suggestions.news}</div>
            </div>
            <MapWidget className="h-full min-h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};