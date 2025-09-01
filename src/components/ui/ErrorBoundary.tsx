import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NeuroCard } from './NeuroCard';
import { Button } from './button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <NeuroCard className="max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={32} className="text-destructive" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-destructive">Oops! Something went wrong</h2>
              <p className="text-muted-foreground">
                We're having trouble loading this page. Please try again.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left text-xs bg-muted/20 p-3 rounded-lg mt-4">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <pre className="mt-2 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
            <Button 
              onClick={this.handleRetry}
              className="gap-2"
              variant="outline"
            >
              <RefreshCw size={16} />
              Try Again
            </Button>
          </NeuroCard>
        </div>
      );
    }

    return this.props.children;
  }
}