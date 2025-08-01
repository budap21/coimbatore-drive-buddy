import React from 'react';
import { cn } from '@/lib/utils';

interface NeuroCardProps {
  children: React.ReactNode;
  className?: string;
  urgent?: boolean;
  onClick?: () => void;
  variant?: 'raised' | 'inset';
}

export const NeuroCard: React.FC<NeuroCardProps> = ({ 
  children, 
  className, 
  urgent = false,
  onClick,
  variant = 'raised'
}) => {
  return (
    <div
      className={cn(
        "neuro-card transition-all duration-300 animate-fade-in",
        variant === 'inset' && "neuro-card-inset",
        urgent && "border-destructive/50 bg-destructive/5 animate-pulse pulse-urgent",
        onClick && "cursor-pointer hover:scale-[1.02] hover-lift",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};