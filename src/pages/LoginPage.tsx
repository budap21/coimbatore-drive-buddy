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
          name: 'Test User',
          phone: phoneNumber
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-car-title text-primary mb-2">Welcome to DriverHub</h1>
          <p className="text-muted-foreground">Login with your phone number</p>
        </div>

        <NeuroCard>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="flex">
                  <div className="flex items-center px-3 py-2 border border-input rounded-l-md bg-muted text-muted-foreground">
                    +91
                  </div>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full neuro-button-primary"
                disabled={phoneNumber.length !== 10 || loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <p className="text-sm text-muted-foreground mb-2">
                  OTP sent to +91 {phoneNumber}
                </p>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="1234"
                  className="text-center text-lg tracking-wider"
                  maxLength={4}
                  required
                />
                <p className="text-xs text-warning mt-1">For demo, use OTP: 1234</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep('phone')}
                  className="flex-1"
                >
                  Change Number
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 neuro-button-primary"
                  disabled={otp.length !== 4 || loading}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </form>
          )}
        </NeuroCard>
      </div>
    </div>
  );
};