import { useState } from 'react';
import { Home, Music, UtensilsCrossed, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'social', label: 'Social', icon: Users },
];

export const CarLayout = ({ children, currentPage, onPageChange }: CarLayoutProps) => {
  return (
    <div className="car-screen min-h-screen bg-background text-foreground flex flex-col">
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="neuro-card-inset p-4 m-4 mt-0">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  "touch-target flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "neuro-button-primary text-primary-foreground" 
                    : "neuro-button text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};