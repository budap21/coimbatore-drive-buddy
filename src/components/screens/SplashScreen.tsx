import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      <div className="text-center animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-pulse-glow">
            DRIVER HUB
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 animate-float"></div>
        </div>
        <p className="text-xl text-muted-foreground animate-fade-in-up delay-1000">
          Drive Smarter, Drive Safer
        </p>
      </div>
    </div>
  );
};