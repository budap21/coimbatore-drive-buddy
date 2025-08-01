import { useState, useEffect } from 'react';
import { Play, Pause, MapPin, Clock, Zap } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { DriverPoints } from '@/components/ui/DriverPoints';
import { getAISuggestions, mockDriverProfile, mockNotifications } from '@/data/mockData';

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

  return (
    <div className="space-y-6">
      {/* Header with Time and Driver Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Weather/Time Graphics */}
          <div className="text-2xl">
            {getTimeOfDay() === 'morning' && '🌅'}
            {getTimeOfDay() === 'afternoon' && '☀️'}
            {getTimeOfDay() === 'evening' && '🌆'}
            {getTimeOfDay() === 'night' && '🌙'}
          </div>
          <div>
            <h1 className="text-car-title">Good {getTimeOfDay()}, Test User 1!</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Clock size={16} />
            {currentTime.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
            <MapPin size={16} className="ml-4" />
            Coimbatore, TN
          </p>
          </div>
        </div>
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Urgent Notifications */}
      {urgentNotifications.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-car-subtitle text-destructive flex items-center gap-2">
            <Zap size={20} />
            Urgent Alerts
          </h2>
          {urgentNotifications.map((notification) => (
            <NeuroCard key={notification.id} urgent className="border-destructive">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">{notification.title}</h3>
                  <p className="text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
                <button
                  onClick={() => dismissAlert(notification.id)}
                  className="neuro-button p-2 ml-2"
                >
                  ✕
                </button>
              </div>
            </NeuroCard>
          ))}
        </div>
      )}

      {/* Now Playing */}
      <NeuroCard className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-primary">Now Playing</h3>
            <p className="text-car-body">{currentSong}</p>
            <p className="text-sm text-muted-foreground">Auto-started for your {getTimeOfDay()} drive</p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="neuro-button-primary touch-target rounded-full"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </NeuroCard>

      {/* Quick Map View */}
      <NeuroCard>
        <div className="space-y-3">
          <h3 className="font-semibold text-accent flex items-center gap-2">
            <MapPin size={20} />
            Quick Navigation
          </h3>
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg relative overflow-hidden">
            {/* Mock Coimbatore Map */}
            <div className="absolute inset-0 bg-green-100/30">
              {/* Road lines */}
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400/50"></div>
              <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400/50"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-gray-400/50"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gray-400/50"></div>
              
              {/* Location pin for Coimbatore */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                  📍
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow">
                  Coimbatore
                </div>
              </div>
              
              {/* Some buildings/landmarks */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/60 rounded"></div>
              <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-yellow-400/60 rounded"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400/60 rounded-full"></div>
            </div>
            
            <div className="absolute bottom-2 right-2">
              <button className="neuro-button-primary px-3 py-1 text-sm">
                📍 Navigate
              </button>
            </div>
          </div>
        </div>
      </NeuroCard>

      {/* AI Suggestions */}
      <div className="space-y-4">
        <h2 className="text-car-subtitle">AI Suggestions for You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Music Suggestion */}
          <NeuroCard className="hover:scale-105 cursor-pointer">
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">🎵 Recommended Music</h3>
              <p className="text-car-body">{suggestions.music.title}</p>
              <p className="text-sm text-muted-foreground">by {suggestions.music.artist}</p>
              <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                {suggestions.music.genre}
              </span>
            </div>
          </NeuroCard>

          {/* Food Suggestion */}
          <NeuroCard className="hover:scale-105 cursor-pointer">
            <div className="space-y-2">
              <h3 className="font-semibold text-warning">🍽️ Meal Suggestion</h3>
              <p className="text-car-body">{suggestions.food.item}</p>
              <p className="text-sm text-muted-foreground">from {suggestions.food.restaurant}</p>
              <span className="inline-block px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">
                ₹{suggestions.food.price}
              </span>
            </div>
          </NeuroCard>
        </div>

        {/* News Update */}
        <NeuroCard>
          <div className="space-y-2">
            <h3 className="font-semibold text-accent">📰 Quick Update</h3>
            <p className="text-car-body">{suggestions.news}</p>
          </div>
        </NeuroCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <NeuroCard className="hover:scale-105 cursor-pointer bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30">
          <div className="text-center space-y-2">
            <MapPin className="text-accent mx-auto" size={24} />
            <h3 className="font-semibold text-accent">Quick Navigate</h3>
            <p className="text-sm text-muted-foreground">Find nearby places</p>
          </div>
        </NeuroCard>
        
        <NeuroCard className="hover:scale-105 cursor-pointer bg-gradient-to-r from-warning/20 to-success/20 border-warning/30">
          <div className="text-center space-y-2">
            <Zap className="text-warning mx-auto" size={24} />
            <h3 className="font-semibold text-warning">Voice Command</h3>
            <p className="text-sm text-muted-foreground">Say "Navigate to..."</p>
          </div>
        </NeuroCard>
      </div>
    </div>
  );
};