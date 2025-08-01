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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 compact-spacing">
        {/* Urgent Notifications */}
        {urgentNotifications.length > 0 && (
          <div className="space-y-2 animate-fade-in">
            <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
              <Zap size={18} />
              Urgent Alerts
            </h2>
            {urgentNotifications.map((notification) => (
              <NeuroCard key={notification.id} urgent className="border-destructive compact-card hover-lift">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-destructive text-sm">{notification.title}</h3>
                    <p className="text-xs mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Now Playing - Compact */}
            <NeuroCard className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30 compact-card hover-lift animate-fade-in">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary text-sm">🎵 Now Playing</h3>
                  <p className="text-sm">{currentSong}</p>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="neuro-button-primary touch-target rounded-full w-12 h-12 hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>
            </NeuroCard>

            {/* AI Suggestions - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
              <NeuroCard className="hover-lift cursor-pointer compact-card animate-scale-in">
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-primary text-sm">🎵 Music</h3>
                  <p className="text-xs">{suggestions.music.title}</p>
                  <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    {suggestions.music.genre}
                  </span>
                </div>
              </NeuroCard>

              <NeuroCard className="hover-lift cursor-pointer compact-card animate-scale-in">
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-warning text-sm">🍽️ Food</h3>
                  <p className="text-xs">{suggestions.food.item}</p>
                  <span className="inline-block px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">
                    ₹{suggestions.food.price}
                  </span>
                </div>
              </NeuroCard>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <NeuroCard className="hover-lift cursor-pointer bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 compact-card animate-fade-in">
                <div className="text-center space-y-1">
                  <MapPin className="text-accent mx-auto" size={20} />
                  <h3 className="font-semibold text-accent text-sm">Navigate</h3>
                </div>
              </NeuroCard>
              
              <NeuroCard className="hover-lift cursor-pointer bg-gradient-to-r from-warning/20 to-success/20 border-warning/30 compact-card animate-fade-in">
                <div className="text-center space-y-1">
                  <Zap className="text-warning mx-auto" size={20} />
                  <h3 className="font-semibold text-warning text-sm">Voice</h3>
                </div>
              </NeuroCard>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-4">
            <NeuroCard className="compact-card animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-semibold text-accent flex items-center gap-2 text-sm">
                  <MapPin size={16} />
                  Coimbatore Map
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
                        You are here
                      </div>
                    </div>
                    
                    {/* Landmarks */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded animate-pulse"></div>
                    <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-yellow-400/60 rounded animate-pulse"></div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2">
                    <button className="neuro-button-primary px-2 py-1 text-xs hover:scale-105 transition-transform">
                      📍 Navigate
                    </button>
                  </div>
                </div>
              </div>
            </NeuroCard>

            {/* News Update - Compact */}
            <NeuroCard className="compact-card animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-semibold text-accent text-sm">📰 Quick Update</h3>
                <p className="text-xs text-muted-foreground">{suggestions.news}</p>
              </div>
            </NeuroCard>
          </div>
        </div>
      </div>
    </div>
  );
};