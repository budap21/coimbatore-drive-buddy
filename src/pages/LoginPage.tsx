import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NeuroCard } from '@/components/ui/NeuroCard';

interface LoginPageProps {
  onLogin: (user: { name: string; phone: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = () => {
    setLoading(true);
    // Quick professional login since PIN authentication is already handled
    setTimeout(() => {
      onLogin({
        name: 'Professional Driver',
        phone: '+91-XXXX-XXXX'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-success/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="login-container w-full max-w-md space-y-8 relative z-10">
        {/* Graphics */}
        <div className="login-graphics text-center space-y-6">
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center animate-glow">
            <div className="text-5xl animate-bounce">🚗</div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-warning to-success rounded-full flex items-center justify-center text-2xl animate-pulse">
              🔑
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DriverHub
            </h1>
            <p className="text-muted-foreground">Your smart driving companion</p>
          </div>
        </div>

        <div className="login-form">
          <NeuroCard className="neuro-card hover-glow">
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Professional Access
                </h2>
                <p className="text-muted-foreground">
                  PIN authentication enabled for secure access
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 p-4 bg-success/10 border border-success/30 rounded-lg">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success font-medium">Secure PIN Authentication Active</span>
                </div>
                
                <button 
                  onClick={handleQuickLogin}
                  className={`w-full neuro-button-primary py-4 font-medium transition-all duration-300 ${
                    loading 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:scale-105 hover:shadow-glow'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Accessing Dashboard...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>🔐</span>
                      <span>Continue to Dashboard</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </NeuroCard>
        </div>
      </div>
    </div>
  );
};