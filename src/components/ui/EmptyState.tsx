import React from 'react';
import { NeuroCard } from './NeuroCard';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <NeuroCard className={cn("text-center py-12", className)}>
      <div className="space-y-4">
        {icon && (
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-content mx-auto opacity-60">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
        </div>
        {action && (
          <Button 
            onClick={action.onClick}
            variant="outline"
            className="mt-4"
          >
            {action.label}
          </Button>
        )}
      </div>
    </NeuroCard>
  );
};