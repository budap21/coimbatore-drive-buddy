import { useState, useCallback } from 'react';
import { CarLayout } from '@/components/layout/CarLayout';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { MusicPage } from './MusicPage';
import { FoodPage } from './FoodPage';
import { SocialPage } from './SocialPage';
import { MapsPage } from './MapsPage';
import { SettingsPage } from './SettingsPage';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { PinEntryScreen } from '@/components/screens/PinEntryScreen';
import { GreetingScreen } from '@/components/screens/GreetingScreen';

type StartupStep = 'splash' | 'pin' | 'greeting' | 'login' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<StartupStep>('splash');
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const handleLogin = (userData: { name: string; phone: string }) => {
    setUser(userData);
    setCurrentStep('dashboard');
  };

  const handleSplashComplete = useCallback(() => {
    setCurrentStep('pin');
  }, []);

  const handlePinSuccess = useCallback(() => {
    setCurrentStep('greeting');
  }, []);

  const handleGreetingComplete = useCallback(() => {
    setCurrentStep('login');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'music':
        return <MusicPage />;
      case 'food':
        return <FoodPage />;
      case 'social':
        return <SocialPage />;
      case 'maps':
        return <MapsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  // Handle startup flow
  if (currentStep === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentStep === 'pin') {
    return <PinEntryScreen onSuccess={handlePinSuccess} />;
  }

  if (currentStep === 'greeting') {
    return <GreetingScreen username={user?.name} onComplete={handleGreetingComplete} />;
  }

  if (currentStep === 'login' && !user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <CarLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </CarLayout>
  );
};

export default Index;
