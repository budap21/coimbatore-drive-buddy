import { useState } from 'react';
import { Play, Pause, Heart, Search, Radio, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { mockSongs, mockFMStations } from '@/data/mockData';

export const MusicPage = () => {
  const [activeTab, setActiveTab] = useState<'songs' | 'fm' | 'playlists'>('songs');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>('1');
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);

  const genres = ['All', 'Pop', 'Classical', 'Devotional', 'Folk', 'Romantic'];
  
  const filteredSongs = mockSongs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || selectedGenre === 'All' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleVoiceCommand = (command: string) => {
    console.log('Music voice command:', command);
    if (command.toLowerCase().includes('radio mirchi')) {
      setActiveTab('fm');
    } else if (command.toLowerCase().includes('play')) {
      setIsPlaying(true);
    } else if (command.toLowerCase().includes('pause')) {
      setIsPlaying(false);
    }
  };

  const toggleFavorite = (songId: string) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const playPause = (songId?: string) => {
    if (songId && songId !== currentlyPlaying) {
      setCurrentlyPlaying(songId);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-car-title">Music Hub</h1>
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Now Playing Bar */}
      {currentlyPlaying && (
        <NeuroCard className="bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Volume2 size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {mockSongs.find(s => s.id === currentlyPlaying)?.title || 'Radio Mirchi Tamil'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mockSongs.find(s => s.id === currentlyPlaying)?.artist || 'Live FM'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="neuro-button touch-target p-2">
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => playPause()}
                className="neuro-button-primary touch-target p-3"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="neuro-button touch-target p-2">
                <SkipForward size={20} />
              </button>
            </div>
          </div>
        </NeuroCard>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: 'songs', label: 'Songs', icon: '🎵' },
          { id: 'fm', label: 'FM Radio', icon: '📻' },
          { id: 'playlists', label: 'Playlists', icon: '📝' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`neuro-button px-4 py-2 flex items-center gap-2 ${
              activeTab === tab.id ? 'neuro-button-primary' : ''
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Songs Tab */}
      {activeTab === 'songs' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-4">
            <NeuroCard variant="inset">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search songs, artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-car-body"
                />
              </div>
            </NeuroCard>

            {/* Genre Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre === 'All' ? null : genre)}
                  className={`neuro-button px-4 py-2 whitespace-nowrap ${
                    (genre === 'All' && !selectedGenre) || selectedGenre === genre
                      ? 'neuro-button-primary' : ''
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Songs List */}
          <div className="space-y-3">
            {filteredSongs.map((song) => (
              <NeuroCard key={song.id} className="hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => playPause(song.id)}
                      className={`touch-target p-3 rounded-full ${
                        currentlyPlaying === song.id ? 'neuro-button-primary' : 'neuro-button'
                      }`}
                    >
                      {currentlyPlaying === song.id && isPlaying ? 
                        <Pause size={20} /> : <Play size={20} />
                      }
                    </button>
                    <div>
                      <h3 className="font-semibold text-car-body">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">{song.artist}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          {song.genre}
                        </span>
                        <span className="text-xs text-muted-foreground">{song.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(song.id)}
                    className="neuro-button touch-target p-2"
                  >
                    <Heart 
                      size={20} 
                      className={favorites.includes(song.id) ? 'text-destructive fill-destructive' : 'text-muted-foreground'} 
                    />
                  </button>
                </div>
              </NeuroCard>
            ))}
          </div>
        </div>
      )}

      {/* FM Radio Tab */}
      {activeTab === 'fm' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle">Live FM Stations</h2>
          {mockFMStations.map((station) => (
            <NeuroCard key={station.id} className="hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="neuro-button-primary p-3 rounded-full">
                    <Radio size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-car-body">{station.name}</h3>
                    <p className="text-sm text-muted-foreground">{station.frequency}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentlyPlaying(station.id);
                    setIsPlaying(true);
                  }}
                  className="neuro-button-primary touch-target px-4 py-2"
                >
                  <Play size={16} className="mr-2" />
                  Listen
                </button>
              </div>
            </NeuroCard>
          ))}
        </div>
      )}

      {/* Playlists Tab */}
      {activeTab === 'playlists' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle">Your Playlists</h2>
          
          <NeuroCard className="hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-car-body">Favorites</h3>
                <p className="text-sm text-muted-foreground">{favorites.length} songs</p>
              </div>
            </div>
          </NeuroCard>

          <NeuroCard className="hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-warning to-success flex items-center justify-center">
                <Volume2 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-car-body">Drive Time Hits</h3>
                <p className="text-sm text-muted-foreground">25 songs • Auto-generated</p>
              </div>
            </div>
          </NeuroCard>
        </div>
      )}
    </div>
  );
};