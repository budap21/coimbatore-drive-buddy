import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NeuroCard } from '@/components/ui/NeuroCard';

interface LoginPageProps {
  onLogin: (user: { name: string; phone: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1500);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') { // Hardcoded OTP
      setLoading(true);
      setTimeout(() => {
        onLogin({
          name: 'Test User 1',
          phone: phoneNumber
        });
      }, 1000);
    }
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
            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Phone Number</label>
                  <div className="flex rounded-lg overflow-hidden">
                    <div className="flex items-center px-4 py-3 bg-muted/50 text-muted-foreground border border-input">
                      +91
                    </div>
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="rounded-l-none border-l-0 py-3"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className={`w-full neuro-button-primary py-3 font-medium transition-all duration-300 ${
                    phoneNumber.length !== 10 || loading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105'
                  }`}
                  disabled={phoneNumber.length !== 10 || loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending OTP...
                    </div>
                  ) : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Enter OTP</label>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Code sent to <span className="text-primary font-medium">+91 {phoneNumber}</span>
                    </p>
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="0000"
                      className="text-center text-2xl tracking-[0.5em] font-bold py-4"
                      maxLength={4}
                      required
                    />
                    <div className="mt-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                      <p className="text-sm text-warning">💡 Demo OTP: <span className="font-bold">1234</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')}
                    className="flex-1 neuro-button py-3 transition-all duration-300 hover:scale-105"
                  >
                    ← Back
                  </button>
                  <button 
                    type="submit" 
                    className={`flex-1 neuro-button-primary py-3 font-medium transition-all duration-300 ${
                      otp.length !== 4 || loading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:scale-105'
                    }`}
                    disabled={otp.length !== 4 || loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : 'Verify'}
                  </button>
                </div>
              </form>
            )}
          </NeuroCard>
        </div>
      </div>
    </div>
  );
};