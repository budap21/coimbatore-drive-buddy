-- Enable Row Level Security on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charging_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_records ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" ON public.user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Vehicles Policies
CREATE POLICY "Users can view own vehicles" ON public.vehicles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vehicles" ON public.vehicles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vehicles" ON public.vehicles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vehicles" ON public.vehicles
  FOR DELETE USING (auth.uid() = user_id);

-- Favorite Destinations Policies
CREATE POLICY "Users can view own destinations" ON public.favorite_destinations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own destinations" ON public.favorite_destinations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own destinations" ON public.favorite_destinations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own destinations" ON public.favorite_destinations
  FOR DELETE USING (auth.uid() = user_id);

-- Trips Policies
CREATE POLICY "Users can view own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" ON public.trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" ON public.trips
  FOR DELETE USING (auth.uid() = user_id);

-- Services Policies (public read, admin write)
CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage services" ON public.services
  FOR ALL USING (auth.role() = 'service_role');

-- Fuel Prices Policies (public read, admin write)
CREATE POLICY "Anyone can view fuel prices" ON public.fuel_prices
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage fuel prices" ON public.fuel_prices
  FOR ALL USING (auth.role() = 'service_role');

-- Charging Stations Policies (public read, admin write)
CREATE POLICY "Anyone can view charging stations" ON public.charging_stations
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage charging stations" ON public.charging_stations
  FOR ALL USING (auth.role() = 'service_role');

-- User Preferences Policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences" ON public.user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- Traffic Alerts Policies
CREATE POLICY "Users can view own alerts" ON public.traffic_alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts" ON public.traffic_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON public.traffic_alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts" ON public.traffic_alerts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all alerts" ON public.traffic_alerts
  FOR ALL USING (auth.role() = 'service_role');

-- Saved Routes Policies
CREATE POLICY "Users can view own routes" ON public.saved_routes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routes" ON public.saved_routes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routes" ON public.saved_routes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routes" ON public.saved_routes
  FOR DELETE USING (auth.uid() = user_id);

-- Maintenance Records Policies
CREATE POLICY "Users can view own maintenance records" ON public.maintenance_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own maintenance records" ON public.maintenance_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own maintenance records" ON public.maintenance_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own maintenance records" ON public.maintenance_records
  FOR DELETE USING (auth.uid() = user_id);