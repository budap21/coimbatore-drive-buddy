import { useState } from 'react';
import { Volume2, Heart, Filter, Settings, Bell, Newspaper, Trophy, MessageSquare } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { mockNews, mockIPL, mockNotifications } from '@/data/mockData';

export const SocialPage = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'ipl' | 'notifications' | 'settings'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [readingAloud, setReadingAloud] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
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
          <h2 className="text-car-subtitle flex items-center gap-2">
            <Bell className="text-primary" />
            Recent Notifications
          </h2>
          
          {mockNotifications.map((notification) => (
            <NeuroCard 
              key={notification.id}
              urgent={notification.urgent}
              className="hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {notification.type === 'traffic' && <span>🚦</span>}
                    {notification.type === 'social' && <MessageSquare size={16} className="text-primary" />}
                    {notification.type === 'sports' && <Trophy size={16} className="text-warning" />}
                    <h3 className={`font-semibold ${notification.urgent ? 'text-destructive' : 'text-foreground'}`}>
                      {notification.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{notification.source}</span>
                    <span>•</span>
                    <span>{notification.time}</span>
                  </div>
                </div>
                {notification.urgent && (
                  <div className="bg-destructive/20 border border-destructive rounded-lg p-1">
                    <Bell size={14} className="text-destructive" />
                  </div>
                )}
              </div>
            </NeuroCard>
          ))}
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