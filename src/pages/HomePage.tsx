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

  const suggestions = getAISuggestions(getTimeOfDay());
  const urgentNotifications = mockNotifications.filter(n => n.urgent);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    // Simulate command processing
    if (command.toLowerCase().includes('play')) {
      setIsPlaying(true);
    } else if (command.toLowerCase().includes('pause')) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Time and Driver Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-car-title">Good {getTimeOfDay()}, {mockDriverProfile.name}!</h1>
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
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Driver Points */}
      <DriverPoints points={mockDriverProfile.points} level={mockDriverProfile.level} />

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
                <div>
                  <h3 className="font-semibold text-destructive">{notification.title}</h3>
                  <p className="text-sm mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
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

      {/* Sponsored Deal */}
      <NeuroCard className="bg-gradient-to-r from-success/20 to-warning/20 border border-success/30">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-success">🎯 Sponsored Deal</h3>
            <p className="text-car-body">Swiggy: 20% off at A2B</p>
            <p className="text-sm text-muted-foreground">Valid till midnight | Use code: DRIVER20</p>
          </div>
          <button className="neuro-button-primary px-4 py-2">
            Order Now
          </button>
        </div>
      </NeuroCard>
    </div>
  );
};