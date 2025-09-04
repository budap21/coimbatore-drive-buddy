import { Mic } from 'lucide-react';
import { VoiceButton } from '@/components/ui/VoiceButton';

interface VoiceWidgetProps {
  onCommand: (command: string) => void;
}

export const VoiceWidget = ({ onCommand }: VoiceWidgetProps) => {
  return (
    <div className="glass-card p-4 flex flex-col items-center justify-center gap-3 status-success h-full">
      <VoiceButton onCommand={onCommand} className="w-16 h-16 animate-float" />
      <div className="text-center">
        <div className="flex items-center gap-2 justify-center mb-1">
          <Mic size={14} className="text-success" />
          <span className="body-sm text-success">Assistant</span>
        </div>
        <p className="body-sm">Tap to speak</p>
      </div>
    </div>
  );
};