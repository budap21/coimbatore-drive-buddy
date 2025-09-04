import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PinEntryScreenProps {
  onSuccess: () => void;
}

export const PinEntryScreen = ({ onSuccess }: PinEntryScreenProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  
  const correctPin = '1234';

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError('');
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = () => {
    if (pin === correctPin) {
      onSuccess();
    } else {
      setError('Incorrect PIN. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      setPin('');
    }
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">Enter PIN</h1>
        <p className="text-muted-foreground mb-8">Please enter your 4-digit PIN to continue</p>
        
        {/* PIN Display */}
        <div className={cn(
          "flex gap-4 justify-center mb-6",
          isShaking && "animate-pulse"
        )}>
          {[0, 1, 2, 3].map(index => (
            <div
              key={index}
              className="w-12 h-12 rounded-xl surface-elevated border-2 border-border flex items-center justify-center"
            >
              {pin.length > index ? (
                <div className="w-3 h-3 rounded-full bg-primary animate-scale-in" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-destructive mb-4 animate-fade-in">{error}</p>
        )}

        {/* Number Keypad */}
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-6">
          {numbers.map(num => (
            <Button
              key={num}
              variant="outline"
              size="lg"
              className="w-16 h-16 text-xl font-semibold automotive-button-secondary"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleClear}
            className="automotive-button-secondary"
          >
            Clear
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="automotive-button-primary"
          >
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};