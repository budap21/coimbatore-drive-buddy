import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NeuroCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'raised' | 'inset';
  onClick?: () => void;
  urgent?: boolean;
}

export const NeuroCard = ({ 
  children, 
  className, 
  variant = 'raised',
  onClick,
  urgent = false
}: NeuroCardProps) => {
  const cardClass = variant === 'raised' ? 'neuro-card' : 'neuro-card-inset';
  
  return (
    <div
      className={cn(
        cardClass,
        "p-4 animate-fade-in-up",
        urgent && "pulse-urgent border-2 border-destructive",
        onClick && "cursor-pointer hover:scale-105 transition-transform",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};