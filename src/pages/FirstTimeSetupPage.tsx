import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export const FirstTimeSetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [fuelType, setFuelType] = useState<'petrol' | 'diesel' | 'electric' | 'hybrid'>('petrol');
  const [homeAddress, setHomeAddress] = useState('');

  const handleSetup = async () => {
    if (!user) return;
    
    if (!vehicleMake || !vehicleModel || !homeAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create vehicle
      const { error: vehicleError } = await supabase
        .from('vehicles')
        .insert({
          user_id: user.id,
          make: vehicleMake,
          model: vehicleModel,
          fuel_type: fuelType,
          is_primary: true
        });

      if (vehicleError) throw vehicleError;

      // Create home destination
      const { error: destError } = await supabase
        .from('favorite_destinations')
        .insert({
          user_id: user.id,
          name: 'Home',
          address: homeAddress,
          category: 'home'
        });

      if (destError) throw destError;

      toast.success('Setup complete! Welcome to DriverHub');
      navigate('/');
    } catch (error: any) {
      console.error('Setup error:', error);
      toast.error(error.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to DriverHub!</CardTitle>
          <CardDescription>Let's set up your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="make">Vehicle Make *</Label>
            <Input
              id="make"
              placeholder="e.g., Hyundai, Maruti"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Vehicle Model *</Label>
            <Input
              id="model"
              placeholder="e.g., Creta, Swift"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type *</Label>
            <Select value={fuelType} onValueChange={(v) => setFuelType(v as any)} disabled={loading}>
              <SelectTrigger id="fuelType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="home">Home Address *</Label>
            <Input
              id="home"
              placeholder="e.g., RS Puram, Coimbatore"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleSetup}
            disabled={loading}
            className="w-full h-12"
          >
            {loading ? 'Setting up...' : 'Complete Setup'}
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            disabled={loading}
            className="w-full"
          >
            Skip for now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
