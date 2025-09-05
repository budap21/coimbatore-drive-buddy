-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- User profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  theme_preference TEXT DEFAULT 'auto', -- light, dark, auto
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Vehicle information table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  license_plate TEXT,
  fuel_type TEXT CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid')),
  fuel_capacity DECIMAL(5,2), -- in liters or kWh
  average_consumption DECIMAL(4,2), -- km per liter or km per kWh
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Favorite destinations
CREATE TABLE public.favorite_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  category TEXT CHECK (category IN ('home', 'work', 'frequent', 'custom')),
  icon TEXT DEFAULT '📍',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trip history
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  start_address TEXT NOT NULL,
  end_address TEXT NOT NULL,
  start_latitude DECIMAL(10, 8),
  start_longitude DECIMAL(11, 8),
  end_latitude DECIMAL(10, 8),
  end_longitude DECIMAL(11, 8),
  distance_km DECIMAL(8, 2),
  duration_minutes INTEGER,
  fuel_consumed DECIMAL(5, 2),
  fuel_cost DECIMAL(8, 2),
  toll_cost DECIMAL(8, 2) DEFAULT 0,
  route_data JSONB, -- Store route points and waypoints
  status TEXT CHECK (status IN ('planned', 'active', 'completed', 'cancelled')) DEFAULT 'planned',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services (petrol stations, EV charging, tire shops, etc.)
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('petrol_station', 'ev_charging', 'tire_shop', 'service_center', 'car_wash', 'parking')),
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  phone TEXT,
  website TEXT,
  opening_hours JSONB, -- {"monday": "06:00-22:00", etc.}
  amenities TEXT[], -- ["restroom", "atm", "restaurant", etc.]
  rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
  price_level INTEGER CHECK (price_level >= 1 AND price_level <= 4), -- 1=cheap, 4=expensive
  is_24_hours BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fuel prices for petrol stations
CREATE TABLE public.fuel_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  fuel_type TEXT CHECK (fuel_type IN ('petrol', 'diesel', 'premium', 'cng', 'lpg')),
  price_per_liter DECIMAL(6, 3) NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- EV charging details for charging stations
CREATE TABLE public.charging_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  connector_types TEXT[], -- ["type2", "ccs", "chademo", etc.]
  charging_speed_kw INTEGER[],
  number_of_ports INTEGER DEFAULT 1,
  pricing_per_kwh DECIMAL(6, 3),
  pricing_per_minute DECIMAL(6, 3),
  network_name TEXT, -- "TATA Power", "Ather Grid", etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User preferences and app settings
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  voice_enabled BOOLEAN DEFAULT true,
  voice_language TEXT DEFAULT 'en',
  auto_navigation BOOLEAN DEFAULT true,
  preferred_fuel_type TEXT,
  max_detour_km DECIMAL(4, 1) DEFAULT 5.0,
  show_traffic_alerts BOOLEAN DEFAULT true,
  show_fuel_alerts BOOLEAN DEFAULT true,
  fuel_alert_threshold DECIMAL(3, 1) DEFAULT 15.0, -- Alert when fuel below 15%
  preferred_payment_method TEXT,
  privacy_share_location BOOLEAN DEFAULT false,
  privacy_share_trips BOOLEAN DEFAULT false,
  widget_layout JSONB DEFAULT '{}', -- Store dashboard widget positions
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Traffic alerts and notifications
CREATE TABLE public.traffic_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT CHECK (alert_type IN ('traffic', 'accident', 'construction', 'weather', 'fuel', 'maintenance')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_km DECIMAL(6, 2) DEFAULT 1.0,
  is_read BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User's saved routes
CREATE TABLE public.saved_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_address TEXT NOT NULL,
  end_address TEXT NOT NULL,
  waypoints JSONB DEFAULT '[]', -- Array of waypoint coordinates
  route_data JSONB, -- Full route information
  estimated_duration INTEGER, -- in minutes
  estimated_distance DECIMAL(8, 2), -- in km
  estimated_fuel DECIMAL(5, 2),
  tags TEXT[] DEFAULT '{}', -- ["work", "weekend", "scenic"]
  is_favorite BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Maintenance records
CREATE TABLE public.maintenance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- "oil_change", "tire_rotation", etc.
  service_provider TEXT,
  odometer_reading INTEGER,
  cost DECIMAL(8, 2),
  notes TEXT,
  next_service_date DATE,
  next_service_odometer INTEGER,
  documents TEXT[], -- URLs to receipts/documents
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX idx_favorite_destinations_user_id ON public.favorite_destinations(user_id);
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_services_type ON public.services(type);
CREATE INDEX idx_services_location ON public.services(latitude, longitude);
CREATE INDEX idx_fuel_prices_service_id ON public.fuel_prices(service_id);
CREATE INDEX idx_charging_stations_service_id ON public.charging_stations(service_id);
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_traffic_alerts_user_id ON public.traffic_alerts(user_id);
CREATE INDEX idx_traffic_alerts_location ON public.traffic_alerts(latitude, longitude);
CREATE INDEX idx_saved_routes_user_id ON public.saved_routes(user_id);
CREATE INDEX idx_maintenance_records_user_id ON public.maintenance_records(user_id);
CREATE INDEX idx_maintenance_records_vehicle_id ON public.maintenance_records(vehicle_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_favorite_destinations_updated_at
  BEFORE UPDATE ON public.favorite_destinations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_charging_stations_updated_at
  BEFORE UPDATE ON public.charging_stations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_saved_routes_updated_at
  BEFORE UPDATE ON public.saved_routes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_maintenance_records_updated_at
  BEFORE UPDATE ON public.maintenance_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();