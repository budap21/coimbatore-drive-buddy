-- Insert sample services data
INSERT INTO public.services (name, type, address, latitude, longitude, phone, opening_hours, amenities, rating, price_level, is_24_hours, is_verified) VALUES
-- Petrol Stations
('Indian Oil Petrol Station', 'petrol_station', 'MG Road, Bangalore, Karnataka', 12.9716, 77.5946, '+91-80-12345678', '{"monday": "06:00-22:00", "tuesday": "06:00-22:00", "wednesday": "06:00-22:00", "thursday": "06:00-22:00", "friday": "06:00-22:00", "saturday": "06:00-22:00", "sunday": "06:00-22:00"}', '["restroom", "atm", "air_pump"]', 4.2, 2, false, true),
('HP Petrol Station', 'petrol_station', 'Brigade Road, Bangalore, Karnataka', 12.9738, 77.6084, '+91-80-23456789', '{"monday": "00:00-23:59"}', '["restroom", "cafe", "atm", "air_pump"]', 4.0, 2, true, true),
('Bharat Petroleum', 'petrol_station', 'Koramangala, Bangalore, Karnataka', 12.9352, 77.6245, '+91-80-34567890', '{"monday": "05:30-23:00", "tuesday": "05:30-23:00", "wednesday": "05:30-23:00", "thursday": "05:30-23:00", "friday": "05:30-23:00", "saturday": "05:30-23:00", "sunday": "05:30-23:00"}', '["restroom", "air_pump", "car_wash"]', 4.1, 2, false, true),

-- EV Charging Stations
('Tata Power EZ Charge', 'ev_charging', 'UB City Mall, Bangalore, Karnataka', 12.9716, 77.5946, '+91-80-45678901', '{"monday": "06:00-22:00", "tuesday": "06:00-22:00", "wednesday": "06:00-22:00", "thursday": "06:00-22:00", "friday": "06:00-22:00", "saturday": "06:00-22:00", "sunday": "06:00-22:00"}', '["parking", "cafe", "restroom"]', 4.3, 3, false, true),
('Ather Grid Charging', 'ev_charging', 'Electronic City, Bangalore, Karnataka', 12.8456, 77.6603, '+91-80-56789012', '{"monday": "00:00-23:59"}', '["parking", "security"]', 4.4, 2, true, true),
('ChargeZone Station', 'ev_charging', 'Whitefield, Bangalore, Karnataka', 12.9698, 77.7500, '+91-80-67890123', '{"monday": "24/7"}', '["parking", "cafe", "wifi"]', 4.2, 3, true, true),

-- Tire Shops
('MRF Tyres & Service', 'tire_shop', 'Richmond Road, Bangalore, Karnataka', 12.9581, 77.5957, '+91-80-78901234', '{"monday": "09:00-19:00", "tuesday": "09:00-19:00", "wednesday": "09:00-19:00", "thursday": "09:00-19:00", "friday": "09:00-19:00", "saturday": "09:00-19:00", "sunday": "10:00-18:00"}', '["wheel_alignment", "balancing", "puncture_repair"]', 4.0, 2, false, true),
('Bridgestone Select', 'tire_shop', 'Jayanagar, Bangalore, Karnataka', 12.9279, 77.5834, '+91-80-89012345', '{"monday": "09:00-20:00", "tuesday": "09:00-20:00", "wednesday": "09:00-20:00", "thursday": "09:00-20:00", "friday": "09:00-20:00", "saturday": "09:00-20:00", "sunday": "10:00-19:00"}', '["wheel_alignment", "balancing", "nitrogen_filling"]', 4.3, 3, false, true),
('Apollo Tyres Service', 'tire_shop', 'Marathahalli, Bangalore, Karnataka', 12.9591, 77.6974, '+91-80-90123456', '{"monday": "09:00-19:30", "tuesday": "09:00-19:30", "wednesday": "09:00-19:30", "thursday": "09:00-19:30", "friday": "09:00-19:30", "saturday": "09:00-19:30", "sunday": "10:00-18:00"}', '["wheel_alignment", "balancing", "puncture_repair", "tire_pressure_check"]', 4.1, 2, false, true),

-- Service Centers
('Maruti Suzuki Service', 'service_center', 'Hosur Road, Bangalore, Karnataka', 12.9082, 77.6384, '+91-80-01234567', '{"monday": "09:00-18:00", "tuesday": "09:00-18:00", "wednesday": "09:00-18:00", "thursday": "09:00-18:00", "friday": "09:00-18:00", "saturday": "09:00-18:00", "sunday": "closed"}', '["oil_change", "general_service", "parts_replacement"]', 4.2, 2, false, true),
('Hyundai Authorized Service', 'service_center', 'Rajajinagar, Bangalore, Karnataka', 12.9897, 77.5554, '+91-80-12345670', '{"monday": "09:00-18:30", "tuesday": "09:00-18:30", "wednesday": "09:00-18:30", "thursday": "09:00-18:30", "friday": "09:00-18:30", "saturday": "09:00-18:30", "sunday": "closed"}', '["oil_change", "general_service", "warranty_service"]', 4.1, 3, false, true);

-- Insert fuel prices for petrol stations
INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'petrol', 102.50 FROM public.services s WHERE s.name = 'Indian Oil Petrol Station';

INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'diesel', 89.75 FROM public.services s WHERE s.name = 'Indian Oil Petrol Station';

INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'petrol', 103.20 FROM public.services s WHERE s.name = 'HP Petrol Station';

INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'diesel', 90.10 FROM public.services s WHERE s.name = 'HP Petrol Station';

INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'petrol', 102.80 FROM public.services s WHERE s.name = 'Bharat Petroleum';

INSERT INTO public.fuel_prices (service_id, fuel_type, price_per_liter) 
SELECT s.id, 'diesel', 89.90 FROM public.services s WHERE s.name = 'Bharat Petroleum';

-- Insert charging station details for EV stations
INSERT INTO public.charging_stations (service_id, connector_types, charging_speed_kw, number_of_ports, pricing_per_kwh, network_name)
SELECT s.id, '["CCS", "Type2", "CHAdeMO"]', '{50, 25, 7}', 4, 12.50, 'Tata Power'
FROM public.services s WHERE s.name = 'Tata Power EZ Charge';

INSERT INTO public.charging_stations (service_id, connector_types, charging_speed_kw, number_of_ports, pricing_per_kwh, network_name)
SELECT s.id, '["CCS", "Type2"]', '{25, 7}', 2, 15.00, 'Ather Grid'
FROM public.services s WHERE s.name = 'Ather Grid Charging';

INSERT INTO public.charging_stations (service_id, connector_types, charging_speed_kw, number_of_ports, pricing_per_kwh, network_name)
SELECT s.id, '["CCS", "Type2", "CHAdeMO"]', '{60, 25, 7}', 6, 13.20, 'ChargeZone'
FROM public.services s WHERE s.name = 'ChargeZone Station';