import { useState } from 'react';
import { Volume2, Heart, Filter, Settings, Bell, Newspaper, Trophy, MessageSquare, Play, Pause, SkipForward } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { SocialNotificationCard } from '@/components/ui/SocialNotificationCard';
import { mockNews, mockIPL, mockNotifications } from '@/data/mockData';

export const SocialPage = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'ipl' | 'notifications' | 'settings'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [readingAloud, setReadingAloud] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playingNotification, setPlayingNotification] = useState<string | null>(null);
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'social' | 'traffic' | 'sports'>('all');
  const [settings, setSettings] = useState({
    audioEnabled: true,
    frequency: '5min',
    language: 'Tamil',
    sources: ['NDTV', 'The Hindu', 'CNN']
  });

  const newsCategories = ['All', 'Local', 'Traffic', 'Weather', 'Sports'];

  const filteredNews = mockNews.filter(news => 
    !selectedCategory || selectedCategory === 'All' || news.category === selectedCategory
  );

  const handleVoiceCommand = (command: string) => {
    console.log('Social voice command:', command);
    if (command.toLowerCase().includes('csk score')) {
      setActiveTab('ipl');
    } else if (command.toLowerCase().includes('read news')) {
      setActiveTab('news');
      if (filteredNews.length > 0) {
        setReadingAloud(filteredNews[0].id);
      }
    }
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const readAloud = (newsId: string) => {
    setReadingAloud(readingAloud === newsId ? null : newsId);
    // Simulate TTS
    if (readingAloud !== newsId) {
      setTimeout(() => setReadingAloud(null), 5000);
    }
  };

  const handlePlayNotification = (id: string) => {
    setPlayingNotification(id);
    // Simulate audio playback
    setTimeout(() => setPlayingNotification(null), 30000);
  };

  const handlePauseNotification = () => {
    setPlayingNotification(null);
  };

  const handleSkipNotification = () => {
    setPlayingNotification(null);
    // Could auto-play next notification here
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    if (notificationFilter === 'all') return true;
    return notification.type === notificationFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-car-title">Social Hub</h1>
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'news', label: 'News', icon: Newspaper },
          { id: 'ipl', label: 'IPL', icon: Trophy },
          { id: 'notifications', label: 'Alerts', icon: Bell },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`neuro-button px-4 py-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id ? 'neuro-button-primary' : ''
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Social Media Updates */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <NeuroCard className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                📘 Facebook Update
              </h3>
              <p className="text-sm">Your friend Raj shared a video about traffic updates in Coimbatore</p>
              <div className="flex gap-2">
                <button className="neuro-button px-3 py-1 text-xs">👍 Like</button>
                <button className="neuro-button px-3 py-1 text-xs">💬 Comment</button>
                <button className="neuro-button px-3 py-1 text-xs">📤 Share</button>
              </div>
            </div>
          </NeuroCard>

          <NeuroCard className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/30">
            <div className="space-y-3">
              <h3 className="font-semibold text-pink-400 flex items-center gap-2">
                📷 Instagram Story
              </h3>
              <p className="text-sm">@coimbatore_food posted a new reel about best breakfast spots</p>
              <div className="flex gap-2">
                <button className="neuro-button px-3 py-1 text-xs">❤️ Love</button>
                <button className="neuro-button px-3 py-1 text-xs">📩 Message</button>
                <button className="neuro-button px-3 py-1 text-xs">📋 Save</button>
              </div>
            </div>
          </NeuroCard>

          <NeuroCard className="bg-gradient-to-r from-blue-400/20 to-blue-600/20 border-blue-400/30">
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                🐦 Twitter/X Update
              </h3>
              <p className="text-sm">@CoimbatoreTraffic: "Heavy traffic on Avinashi Road. Use alternate routes."</p>
              <div className="flex gap-2">
                <button className="neuro-button px-3 py-1 text-xs">🔄 Retweet</button>
                <button className="neuro-button px-3 py-1 text-xs">❤️ Like</button>
                <button className="neuro-button px-3 py-1 text-xs">💬 Reply</button>
              </div>
            </div>
          </NeuroCard>
        </div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {newsCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                className={`neuro-button px-4 py-2 whitespace-nowrap ${
                  (category === 'All' && !selectedCategory) || selectedCategory === category
                    ? 'neuro-button-primary' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="space-y-3">
            {filteredNews.map((news) => (
              <NeuroCard 
                key={news.id} 
                urgent={news.urgent}
                className="hover:scale-105 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-car-body ${news.urgent ? 'text-destructive' : ''}`}>
                        {news.headline}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.time}</span>
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => readAloud(news.id)}
                        className={`neuro-button touch-target p-2 ${
                          readingAloud === news.id ? 'neuro-button-primary' : ''
                        }`}
                      >
                        <Volume2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleFavorite(news.id)}
                        className="neuro-button touch-target p-2"
                      >
                        <Heart 
                          size={16} 
                          className={favorites.includes(news.id) ? 'text-destructive fill-destructive' : 'text-muted-foreground'} 
                        />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{news.content}</p>
                  
                  {readingAloud === news.id && (
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-2">
                      <p className="text-sm text-primary flex items-center gap-2">
                        <Volume2 size={16} className="animate-pulse" />
                        Reading aloud in {settings.language}...
                      </p>
                    </div>
                  )}
                </div>
              </NeuroCard>
            ))}
          </div>
        </div>
      )}

      {/* IPL Tab */}
      {activeTab === 'ipl' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle flex items-center gap-2">
            <Trophy className="text-warning" />
            Live IPL Scores
          </h2>
          
          {mockIPL.map((match) => (
            <NeuroCard key={match.id} className="hover:scale-105 cursor-pointer">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-car-body">{match.team1} vs {match.team2}</h3>
                  <button
                    onClick={() => toggleFavorite(match.id)}
                    className="neuro-button touch-target p-2"
                  >
                    <Heart 
                      size={16} 
                      className={favorites.includes(match.id) ? 'text-destructive fill-destructive' : 'text-muted-foreground'} 
                    />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-semibold text-primary">{match.team1}</p>
                    <p className="text-lg font-bold">{match.team1Score}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-primary">{match.team2}</p>
                    <p className="text-lg font-bold">{match.team2Score}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-warning">{match.status}</p>
                  <p className="text-xs text-muted-foreground">{match.venue} • {match.time}</p>
                </div>

                {match.status.includes('Live') && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-2 text-center">
                    <p className="text-sm text-success flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      Live Match • Earn 10 Driver Points for following!
                    </p>
                  </div>
                )}
              </div>
            </NeuroCard>
          ))}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-car-subtitle flex items-center gap-2">
              <Bell className="text-primary" />
              Smart Notifications
            </h2>
            {playingNotification && (
              <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <span>Playing audio...</span>
              </div>
            )}
          </div>

          {/* Notification Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All', icon: '📱', count: mockNotifications.length },
              { id: 'social', label: 'Social', icon: '💬', count: mockNotifications.filter(n => n.type === 'social').length },
              { id: 'traffic', label: 'Traffic', icon: '🚦', count: mockNotifications.filter(n => n.type === 'traffic').length },
              { id: 'sports', label: 'Sports', icon: '🏆', count: mockNotifications.filter(n => n.type === 'sports').length }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setNotificationFilter(filter.id as any)}
                className={`neuro-button px-4 py-2 flex items-center gap-2 whitespace-nowrap ${
                  notificationFilter === filter.id ? 'neuro-button-primary' : ''
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Enhanced Notification List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <SocialNotificationCard
                key={notification.id}
                notification={notification}
                isPlaying={playingNotification === notification.id}
                onPlay={handlePlayNotification}
                onPause={handlePauseNotification}
                onSkip={handleSkipNotification}
              />
            ))}
          </div>

          {/* Audio Control Panel */}
          {playingNotification && (
            <NeuroCard className="bg-gradient-to-r from-primary/20 to-info/20 border border-primary/30">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-primary">🎵 Audio Player</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePauseNotification}
                      className="neuro-button touch-target p-2"
                    >
                      <Pause size={16} />
                    </button>
                    <button
                      onClick={handleSkipNotification}
                      className="neuro-button touch-target p-2"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Auto-pausing music for smart notification playback
                </div>
              </div>
            </NeuroCard>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle flex items-center gap-2">
            <Settings className="text-primary" />
            Social Settings
          </h2>
          
          {/* Audio Settings */}
          <NeuroCard>
            <div className="space-y-4">
              <h3 className="font-semibold">Audio & Voice</h3>
              
              <div className="flex justify-between items-center">
                <span>Enable Audio Feedback</span>
                <button
                  onClick={() => setSettings(prev => ({...prev, audioEnabled: !prev.audioEnabled}))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.audioEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Language</label>
                <div className="flex gap-2">
                  {['Tamil', 'English'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSettings(prev => ({...prev, language: lang}))}
                      className={`neuro-button px-4 py-2 ${
                        settings.language === lang ? 'neuro-button-primary' : ''
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </NeuroCard>

          {/* Notification Frequency */}
          <NeuroCard>
            <div className="space-y-4">
              <h3 className="font-semibold">Notification Frequency</h3>
              <div className="flex gap-2 flex-wrap">
                {['1min', '5min', '15min', 'Urgent only'].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setSettings(prev => ({...prev, frequency: freq}))}
                    className={`neuro-button px-4 py-2 ${
                      settings.frequency === freq ? 'neuro-button-primary' : ''
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </NeuroCard>

          {/* News Sources */}
          <NeuroCard>
            <div className="space-y-4">
              <h3 className="font-semibold">News Sources</h3>
              {['NDTV', 'The Hindu', 'CNN', 'BBC'].map((source) => (
                <div key={source} className="flex justify-between items-center">
                  <span>{source}</span>
                  <button
                    onClick={() => {
                      setSettings(prev => ({
                        ...prev, 
                        sources: prev.sources.includes(source) 
                          ? prev.sources.filter(s => s !== source)
                          : [...prev.sources, source]
                      }));
                    }}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.sources.includes(source) ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.sources.includes(source) ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </NeuroCard>

          {/* Driver Points Info */}
          <NeuroCard className="bg-gradient-to-r from-warning/20 to-success/20 border border-warning/30">
            <div className="space-y-2">
              <h3 className="font-semibold text-warning">🏆 Driver Points System</h3>
              <div className="text-sm space-y-1">
                <p>• Follow live IPL matches: +10 points</p>
                <p>• Read daily news: +5 points</p>
                <p>• Use voice commands: +2 points</p>
                <p>• Share traffic updates: +15 points</p>
              </div>
            </div>
          </NeuroCard>
        </div>
      )}
    </div>
  );
};