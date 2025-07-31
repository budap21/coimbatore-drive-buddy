import { useState } from 'react';
import { CarLayout } from '@/components/layout/CarLayout';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { MusicPage } from './MusicPage';
import { FoodPage } from './FoodPage';
import { SocialPage } from './SocialPage';
import { MapsPage } from './MapsPage';
import { SettingsPage } from './SettingsPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const handleLogin = (userData: { name: string; phone: string }) => {
    setUser(userData);
  };

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

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <CarLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </CarLayout>
  );
};

export default Index;
