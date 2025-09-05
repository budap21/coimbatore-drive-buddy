-- Function to get nearby services within a radius
CREATE OR REPLACE FUNCTION get_nearby_services(
  user_lat DECIMAL(10, 8),
  user_lng DECIMAL(11, 8),
  radius_km DECIMAL DEFAULT 10.0,
  service_types TEXT[] DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  type TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  rating DECIMAL(2, 1),
  price_level INTEGER,
  is_24_hours BOOLEAN,
  distance_km DECIMAL,
  fuel_prices JSONB,
  charging_info JSONB
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    s.type,
    s.address,
    s.latitude,
    s.longitude,
    s.phone,
    s.rating,
    s.price_level,
    s.is_24_hours,
    ROUND(
      (6371 * acos(
        cos(radians(user_lat)) * cos(radians(s.latitude)) * 
        cos(radians(s.longitude) - radians(user_lng)) + 
        sin(radians(user_lat)) * sin(radians(s.latitude))
      ))::DECIMAL, 2
    ) AS distance_km,
    COALESCE(
      (SELECT jsonb_agg(
        jsonb_build_object(
          'fuel_type', fp.fuel_type,
          'price_per_liter', fp.price_per_liter,
          'last_updated', fp.last_updated
        )
      ) FROM public.fuel_prices fp WHERE fp.service_id = s.id),
      '[]'::jsonb
    ) AS fuel_prices,
    COALESCE(
      (SELECT jsonb_build_object(
        'connector_types', cs.connector_types,
        'charging_speed_kw', cs.charging_speed_kw,
        'number_of_ports', cs.number_of_ports,
        'pricing_per_kwh', cs.pricing_per_kwh,
        'network_name', cs.network_name
      ) FROM public.charging_stations cs WHERE cs.service_id = s.id LIMIT 1),
      '{}'::jsonb
    ) AS charging_info
  FROM public.services s
  WHERE 
    (service_types IS NULL OR s.type = ANY(service_types))
    AND (6371 * acos(
      cos(radians(user_lat)) * cos(radians(s.latitude)) * 
      cos(radians(s.longitude) - radians(user_lng)) + 
      sin(radians(user_lat)) * sin(radians(s.latitude))
    )) <= radius_km
  ORDER BY distance_km ASC;
END;
$$;

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update trip statistics
CREATE OR REPLACE FUNCTION update_trip_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update saved route usage when a trip is completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.saved_routes
    SET usage_count = usage_count + 1,
        last_used_at = NOW()
    WHERE user_id = NEW.user_id
      AND start_address = NEW.start_address
      AND end_address = NEW.end_address;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trip_stats_trigger
  AFTER UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION update_trip_stats();

-- Function to get user's trip statistics
CREATE OR REPLACE FUNCTION get_user_trip_stats(user_uuid UUID)
RETURNS TABLE (
  total_trips INTEGER,
  total_distance_km DECIMAL,
  total_fuel_consumed DECIMAL,
  total_fuel_cost DECIMAL,
  average_trip_distance DECIMAL,
  favorite_destination TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_trips,
    COALESCE(SUM(t.distance_km), 0) as total_distance_km,
    COALESCE(SUM(t.fuel_consumed), 0) as total_fuel_consumed,
    COALESCE(SUM(t.fuel_cost), 0) as total_fuel_cost,
    COALESCE(AVG(t.distance_km), 0) as average_trip_distance,
    (
      SELECT t2.end_address
      FROM public.trips t2
      WHERE t2.user_id = user_uuid AND t2.status = 'completed'
      GROUP BY t2.end_address
      ORDER BY COUNT(*) DESC
      LIMIT 1
    ) as favorite_destination
  FROM public.trips t
  WHERE t.user_id = user_uuid AND t.status = 'completed';
END;
$$;

-- Function to clean up old traffic alerts
CREATE OR REPLACE FUNCTION cleanup_expired_alerts()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.traffic_alerts
  WHERE expires_at < NOW()
    OR (created_at < NOW() - INTERVAL '7 days' AND is_read = true);
END;
$$;

-- Function to get optimized route suggestions
CREATE OR REPLACE FUNCTION get_route_suggestions(
  user_uuid UUID,
  start_lat DECIMAL(10, 8),
  start_lng DECIMAL(11, 8),
  end_lat DECIMAL(10, 8),
  end_lng DECIMAL(11, 8)
)
RETURNS TABLE (
  route_name TEXT,
  estimated_duration INTEGER,
  estimated_distance DECIMAL,
  usage_count INTEGER,
  last_used_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.name as route_name,
    sr.estimated_duration,
    sr.estimated_distance,
    sr.usage_count,
    sr.last_used_at
  FROM public.saved_routes sr
  WHERE sr.user_id = user_uuid
    AND (
      (6371 * acos(
        cos(radians(start_lat)) * cos(radians(12.9716)) * 
        cos(radians(77.5946) - radians(start_lng)) + 
        sin(radians(start_lat)) * sin(radians(12.9716))
      )) < 2  -- Within 2km of saved route start
    )
  ORDER BY sr.usage_count DESC, sr.last_used_at DESC
  LIMIT 5;
END;
$$;