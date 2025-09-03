import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  MapPin, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Route, 
  Calendar, 
  Gauge, 
  Navigation, 
  Thermometer, 
  Fuel, 
  Shield,
  Music,
  Mic,
  Star,
  TrendingUp,
  Battery,
  Signal
} from 'lucide-react';
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
    <div className="dashboard-grid bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-ambient)' }}></div>
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}></div>
      </div>

      {/* Premium Header */}
      <header className="relative z-10 glass-card mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl automotive-button-primary flex items-center justify-center">
                <Gauge size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="heading-lg">DriverHub</h1>
                <div className="flex items-center gap-4 body-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{currentTime.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>Coimbatore, TN</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal size={12} className="text-success" />
                    <span className="text-success">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="body-md">
              Good {getTimeOfDay()}, <span className="text-foreground font-semibold">{mockDriverProfile.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 body-sm">
                <Battery size={12} className="text-success" />
                <span>85%</span>
              </div>
              <VoiceButton onCommand={handleVoiceCommand} className="w-12 h-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-1 px-4 py-2 relative z-10 widget-grid grid-cols-12 grid-rows-2 gap-4">
        
        {/* Primary Control Center */}
        <section className="col-span-8 row-span-1">
          {/* Urgent Notifications */}
          {urgentNotifications.length > 0 && (
            <div className="mb-4">
              {urgentNotifications.slice(0, 1).map((notification) => (
                <div key={notification.id} className="glass-card p-3 status-destructive">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse-glow"></div>
                      <div>
                        <span className="heading-sm text-destructive">{notification.title}</span>
                        <p className="body-sm ml-2">{notification.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(notification.id)}
                      className="touch-premium text-destructive/60 hover:text-destructive"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Controls Grid */}
          <div className="grid grid-cols-3 gap-4 h-28">
            {/* Music Control */}
            <div className="glass-card p-4 flex items-center gap-4 status-info">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-2xl automotive-button-primary flex items-center justify-center group"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-primary-foreground group-hover:scale-110 transition-transform" />
                ) : (
                  <Play size={20} className="text-primary-foreground group-hover:scale-110 transition-transform ml-1" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Music size={14} className="text-info" />
                  <span className="body-sm text-info">Now Playing</span>
                </div>
                <h3 className="heading-sm truncate">{currentSong}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 bg-info/20 rounded-full flex-1">
                    <div className="h-1 bg-info rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Control */}
            <div className="glass-card p-4 flex items-center gap-4 status-warning">
              <div className="w-16 h-16 rounded-2xl surface-elevated flex items-center justify-center text-3xl">
                {mockWeatherData.current.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer size={14} className="text-warning" />
                  <span className="body-sm text-warning">Weather</span>
                </div>
                <h3 className="heading-sm">{mockWeatherData.current.temperature}</h3>
                <p className="body-sm">{mockWeatherData.current.condition}</p>
                <p className="body-sm text-warning font-medium">{mockWeatherData.current.drivingCondition}</p>
              </div>
            </div>

            {/* Voice Assistant */}
            <div className="glass-card p-4 flex flex-col items-center justify-center gap-3 status-success">
              <VoiceButton onCommand={handleVoiceAssistantCommand} className="w-16 h-16 animate-float" />
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <Mic size={14} className="text-success" />
                  <span className="body-sm text-success">Assistant</span>
                </div>
                <p className="body-sm">Tap to speak</p>
              </div>
            </div>
          </div>
        </section>

        {/* Traffic & Services */}
        <aside className="col-span-4 row-span-1 grid grid-rows-2 gap-4">
          {/* Traffic Status */}
          <div className="glass-card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Navigation size={14} className="text-warning" />
                <h3 className="body-md font-semibold">Road Status</h3>
              </div>
              <span className="body-sm text-muted-foreground">{mockTrafficAlerts.length} alerts</span>
            </div>
            {/* Show only the most critical alert */}
            {mockTrafficAlerts.length > 0 && (
              <div className="flex items-center gap-3 p-2 rounded-lg surface-elevated">
                <div className="text-lg">{mockTrafficAlerts[0].icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="body-sm font-medium truncate">{mockTrafficAlerts[0].title}</h4>
                  <div className="flex items-center gap-3 body-xs text-muted-foreground">
                    <span>{mockTrafficAlerts[0].distance}</span>
                    <span className="text-warning font-medium">{mockTrafficAlerts[0].eta}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Services */}
          <div className="glass-card p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-success" />
                <h3 className="body-md font-semibold">Services</h3>
              </div>
              <span className="body-sm text-muted-foreground">{mockDriverServices.length} nearby</span>
            </div>
            {/* Show only the closest/best service */}
            {mockDriverServices.length > 0 && (
              <div className="flex items-center gap-3 p-2 rounded-lg surface-elevated">
                <div className="text-lg">{mockDriverServices[0].icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="body-sm font-medium truncate">{mockDriverServices[0].name}</h4>
                  <div className="flex items-center justify-between body-xs">
                    <span className="text-muted-foreground">{mockDriverServices[0].distance}</span>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-500 fill-current" />
                      <span>{mockDriverServices[0].rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Navigation & Deals */}
        <section className="col-span-12 row-span-1 grid grid-cols-2 gap-4">
          {/* Quick Routes */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Route size={16} className="text-primary" />
              <h3 className="heading-sm">Quick Routes</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockFrequentDestinations.slice(0, 4).map((destination) => (
                <FrequentDestination 
                  key={destination.id} 
                  destination={destination} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Exclusive Deals */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-success" />
              <h3 className="heading-sm">Exclusive Deals</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockDiscountOffers.slice(0, 4).map((offer) => (
                <div key={offer.id} className="surface-elevated p-3 rounded-xl hover:surface-primary transition-all cursor-pointer group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="body-md text-foreground truncate group-hover:text-success transition-colors">
                        {offer.restaurant}
                      </h4>
                      <span className="status-success px-2 py-1 rounded-lg body-sm font-semibold">
                        {offer.offer}
                      </span>
                    </div>
                    <p className="body-sm truncate">{offer.description}</p>
                    <div className="flex justify-between body-sm">
                      <span className="truncate">{offer.validTill}</span>
                      <span className="text-primary font-medium">{offer.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Map Footer */}
      <footer className="relative z-10 mx-4 mb-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <h3 className="heading-sm">Navigation</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="body-sm flex items-center gap-2">
                <TrendingUp size={12} className="text-success" />
                <span className="text-success">Live Traffic</span>
              </div>
              <div className="body-sm">{suggestions.news}</div>
            </div>
          </div>
          <MapWidget className="h-32 rounded-xl overflow-hidden" />
        </div>
      </footer>
    </div>
  );
};