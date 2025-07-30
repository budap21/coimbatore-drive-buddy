import { Mic, MicOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  onCommand: (command: string) => void;
  className?: string;
}

export const VoiceButton = ({ onCommand, className }: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const mockCommands = [
          "Play Tamil music",
          "Order food nearby",
          "Show IPL scores",
          "Read news headlines"
        ];
        const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        onCommand(randomCommand);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={cn(
        "neuro-button-primary touch-target rounded-full",
        isListening && "voice-active",
        className
      )}
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
};