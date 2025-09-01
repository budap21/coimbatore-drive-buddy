import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { useState } from 'react';
import { NeuroCard } from './NeuroCard';
import { cn } from '@/lib/utils';

interface VoiceAssistantProps {
  onCommand: (command: string) => void;
}

export const VoiceAssistant = ({ onCommand }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const mockCommands = [
          "Navigate to office",
          "Play Tamil folk music",
          "Find nearest fuel station",
          "Check traffic to home",
          "Order food from A2B",
          "What's the weather like?"
        ];
        const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        setLastCommand(randomCommand);
        onCommand(randomCommand);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <NeuroCard className="bg-gradient-to-r from-purple-50/50 to-blue-100/50 border-purple-200 compact-card">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-purple-600" />
            <h3 className="font-semibold text-sm">Voice Assistant</h3>
          </div>
          <button className="neuro-button p-1">
            <Settings size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleListening}
            className={cn(
              "neuro-button-primary touch-target rounded-full w-12 h-12 transition-all duration-300",
              isListening && "voice-active animate-pulse scale-110"
            )}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <div className="flex-1">
            <p className="text-xs font-medium text-purple-700">
              {isListening ? 'Listening...' : 'Tap to speak'}
            </p>
            {lastCommand && (
              <p className="text-xs text-muted-foreground mt-1">
                Last: "{lastCommand}"
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-white/50 rounded">
            <p className="font-medium">Navigation</p>
            <p className="text-muted-foreground">"Navigate to..."</p>
          </div>
          <div className="text-center p-2 bg-white/50 rounded">
            <p className="font-medium">Music</p>
            <p className="text-muted-foreground">"Play music"</p>
          </div>
        </div>
      </div>
    </NeuroCard>
  );
};