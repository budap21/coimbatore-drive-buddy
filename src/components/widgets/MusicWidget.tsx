import { Play, Pause, Music } from 'lucide-react';

interface MusicWidgetProps {
  isPlaying: boolean;
  currentSong: string;
  onTogglePlay: () => void;
}

export const MusicWidget = ({ isPlaying, currentSong, onTogglePlay }: MusicWidgetProps) => {
  return (
    <div className="glass-card p-4 flex items-center gap-4 status-info h-full">
      <button
        onClick={onTogglePlay}
        className="w-16 h-16 rounded-2xl automotive-button-primary flex items-center justify-center group flex-shrink-0"
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
            <div className="h-1 bg-info rounded-full w-1/3 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};