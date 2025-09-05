# Car Infotainment System Database Schema

## Overview
Complete database schema for a car infotainment system with user management, trip tracking, services, and preferences.

## Setup Instructions

1. **Run in Supabase SQL Editor** (Recommended)
   - Go to your Supabase Dashboard → SQL Editor
   - Copy and paste each file in order:
     1. `001_initial_schema.sql` - Creates all tables and indexes
     2. `002_rls_policies.sql` - Sets up Row Level Security
     3. `003_sample_data.sql` - Inserts sample data
     4. `004_functions.sql` - Creates helper functions

2. **Manual Setup**
   - Execute each SQL file in the Supabase SQL Editor in the correct order
   - Ensure all tables and policies are created successfully

## Database Structure

### Core Tables

#### User Management
- **user_profiles** - User information and preferences
- **user_preferences** - App settings and privacy preferences
- **vehicles** - User's registered vehicles

#### Trip & Navigation
- **trips** - Trip history and current trips
- **favorite_destinations** - Saved locations
- **saved_routes** - Frequently used routes
- **traffic_alerts** - Real-time alerts and notifications

#### Services & Infrastructure
- **services** - Petrol stations, EV charging, tire shops, service centers
- **fuel_prices** - Current fuel prices at stations
- **charging_stations** - EV charging station details
- **maintenance_records** - Vehicle service history

### Key Features

#### Security
- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Public services data accessible to all users
- Service role can manage infrastructure data

#### Performance
- Indexed columns for optimal query performance
- Geographic queries for location-based services
- Automatic timestamp management with triggers

#### Helper Functions
- **get_nearby_services()** - Find services within radius
- **get_user_trip_stats()** - Calculate user statistics
- **get_route_suggestions()** - Suggest optimal routes
- **cleanup_expired_alerts()** - Maintenance function

## Sample Data Included

- Petrol stations with fuel prices
- EV charging stations with connector details
- Tire shops and service centers
- Indian locations (Bangalore) for testing

## Next Steps

After running these SQL files, you can:
1. Implement Supabase client in your React app
2. Create authentication system
3. Build real-time trip tracking
4. Add location-based service discovery
5. Implement user preferences sync

## API Usage Examples

```sql
-- Find nearby petrol stations
SELECT * FROM get_nearby_services(12.9716, 77.5946, 5.0, ARRAY['petrol_station']);

-- Get user trip statistics
SELECT * FROM get_user_trip_stats('user-uuid-here');

-- Find route suggestions
SELECT * FROM get_route_suggestions('user-uuid', 12.9716, 77.5946, 12.9352, 77.6245);
```