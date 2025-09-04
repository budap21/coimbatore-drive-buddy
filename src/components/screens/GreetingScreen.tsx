import { useEffect } from 'react';

interface GreetingScreenProps {
  username?: string;
  onComplete: () => void;
}

export const GreetingScreen = ({ username = 'Driver', onComplete }: GreetingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {getGreeting()},
          </h1>
          <h2 className="text-4xl font-medium text-foreground animate-fade-in-up delay-500">
            {username}
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto animate-float"></div>
      </div>
    </div>
  );
};