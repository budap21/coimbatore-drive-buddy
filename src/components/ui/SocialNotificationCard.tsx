import { useState } from 'react';
import { Play, Pause, SkipForward, Bell, MessageSquare, Trophy } from 'lucide-react';
import { NeuroCard } from './NeuroCard';

interface SocialNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  urgent: boolean;
  time: string;
  source: string;
  socialType?: string;
  hasAudio?: boolean;
  duration?: string;
}

interface SocialNotificationCardProps {
  notification: SocialNotification;
  isPlaying?: boolean;
  onPlay?: (id: string) => void;
  onPause?: () => void;
  onSkip?: () => void;
}

const getSocialIcon = (socialType?: string) => {
  switch (socialType) {
    case 'whatsapp': return '💬';
    case 'instagram': return '📷';
    case 'twitter': return '🐦';
    case 'facebook': return '👥';
    case 'telegram': return '✈️';
    default: return '📱';
  }
};

const getSocialColor = (socialType?: string) => {
  switch (socialType) {
    case 'whatsapp': return 'text-social-whatsapp';
    case 'instagram': return 'text-social-instagram';
    case 'twitter': return 'text-social-twitter';
    case 'facebook': return 'text-social-facebook';
    case 'telegram': return 'text-social-telegram';
    default: return 'text-primary';
  }
};

export const SocialNotificationCard = ({ 
  notification, 
  isPlaying = false, 
  onPlay, 
  onPause, 
  onSkip 
}: SocialNotificationCardProps) => {
  const [currentTime, setCurrentTime] = useState('0:00');

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.(notification.id);
    }
  };

  return (
    <NeuroCard 
      urgent={notification.urgent}
      className="hover:scale-105 cursor-pointer transition-all duration-300"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {notification.type === 'traffic' && <span>🚦</span>}
              {notification.type === 'social' && (
                <span className={`text-lg ${getSocialColor(notification.socialType)}`}>
                  {getSocialIcon(notification.socialType)}
                </span>
              )}
              {notification.type === 'sports' && <Trophy size={16} className="text-warning" />}
              <h3 className={`font-semibold ${notification.urgent ? 'text-destructive' : 'text-foreground'}`}>
                {notification.title}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={getSocialColor(notification.socialType)}>{notification.source}</span>
              <span>•</span>
              <span>{notification.time}</span>
              {notification.hasAudio && (
                <>
                  <span>•</span>
                  <span className="text-info">🎵 {notification.duration}</span>
                </>
              )}
            </div>
          </div>
          
          {notification.urgent && (
            <div className="bg-destructive/20 border border-destructive rounded-lg p-1">
              <Bell size={14} className="text-destructive" />
            </div>
          )}
        </div>

        {/* Audio Controls */}
        {notification.hasAudio && (
          <div className="bg-card/50 border border-primary/20 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className={`neuro-button touch-target p-2 ${
                    isPlaying ? 'neuro-button-primary' : ''
                  }`}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                
                <button
                  onClick={onSkip}
                  className="neuro-button touch-target p-2"
                >
                  <SkipForward size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{currentTime}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{notification.duration}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            {isPlaying && (
              <div className="space-y-1">
                <div className="w-full bg-muted/30 rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-1000"
                    style={{ width: '35%' }}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 text-xs text-primary animate-pulse">
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-2">Playing audio...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Social Media Quick Actions */}
        {notification.type === 'social' && (
          <div className="flex gap-2">
            <button className="neuro-button px-3 py-1 text-xs">
              Reply
            </button>
            <button className="neuro-button px-3 py-1 text-xs">
              Mark Read
            </button>
            {notification.socialType === 'whatsapp' && (
              <button className="neuro-button px-3 py-1 text-xs text-social-whatsapp">
                Call Back
              </button>
            )}
          </div>
        )}
      </div>
    </NeuroCard>
  );
};