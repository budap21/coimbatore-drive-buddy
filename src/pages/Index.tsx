import { useState } from 'react';
import { CarLayout } from '@/components/layout/CarLayout';
import { HomePage } from './HomePage';
import { MusicPage } from './MusicPage';
import { FoodPage } from './FoodPage';
import { SocialPage } from './SocialPage';
import { MapsPage } from './MapsPage';
import { SettingsPage } from './SettingsPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

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

  return (
    <CarLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </CarLayout>
  );
};

export default Index;
