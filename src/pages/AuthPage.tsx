import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';

const phoneSchema = z.string().regex(/^\+91[6-9]\d{9}$/, "Invalid Indian phone number");
const emailSchema = z.string().email("Invalid email").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(100);

export const AuthPage = () => {
  const navigate = useNavigate();
  const { user, signUp, signInWithPassword, signInWithPhone, verifyOTP, signInWithGoogle } = useAuth();
  
  const [activeTab, setActiveTab] = useState('phone');
  const [loading, setLoading] = useState(false);
  
  // Phone auth state
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // Email auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handlePhoneAuth = async () => {
    if (otpSent) {
      // Verify OTP
      try {
        phoneSchema.parse(phone);
        if (otp.length !== 6) {
          return;
        }
        setLoading(true);
        const { error } = await verifyOTP(phone, otp);
        if (!error) {
          navigate('/setup');
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error(err.errors[0].message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Send OTP
      try {
        phoneSchema.parse(phone);
        setLoading(true);
        const { error } = await signInWithPhone(phone);
        if (!error) {
          setOtpSent(true);
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error(err.errors[0].message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailAuth = async () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      
      setLoading(true);
      
      if (isSignUp) {
        const { error } = await signUp(email, password, { full_name: fullName });
        if (!error) {
          navigate('/setup');
        }
      } else {
        const { error } = await signInWithPassword(email, password);
        if (!error) {
          navigate('/');
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error(err.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            DRIVER HUB
          </CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpSent || loading}
                  className="h-14 text-lg"
                />
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={loading}
                    className="h-14 text-lg text-center tracking-widest"
                  />
                </div>
              )}

              <Button
                onClick={handlePhoneAuth}
                disabled={loading}
                className="w-full h-14 text-lg"
              >
                {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </Button>

              {otpSent && (
                <Button
                  variant="ghost"
                  onClick={() => setOtpSent(false)}
                  className="w-full"
                >
                  Change Phone Number
                </Button>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-4 mt-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="h-12"
                />
              </div>

              <Button
                onClick={handleEmailAuth}
                disabled={loading}
                className="w-full h-12"
              >
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </TabsContent>

            <TabsContent value="google" className="space-y-4 mt-4">
              <Button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full h-14 text-lg"
              >
                {loading ? 'Processing...' : 'Continue with Google'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
