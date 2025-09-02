// Mock data for DriverHub MVP

export const mockSongs = [
  {
    id: '1',
    title: 'Vaadi Vaadi',
    artist: 'Dhanush',
    album: 'Maari',
    duration: '4:12',
    genre: 'Folk',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: '/api/placeholder/300/300'
  },
  {
    id: '2',
    title: 'Ilaiya Nila',
    artist: 'A.R. Rahman',
    album: 'Paiyaa',
    duration: '5:23',
    genre: 'Romantic',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    image: '/api/placeholder/300/300'
  },
  {
    id: '3',
    title: 'Thanjavur Maanade',
    artist: 'Ilaiyaraaja',
    album: 'Classic Tamil',
    duration: '6:45',
    genre: 'Classical',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    image: '/api/placeholder/300/300'
  },
  {
    id: '4',
    title: 'Aaluma Doluma',
    artist: 'Anirudh',
    album: 'Vedalam',
    duration: '4:32',
    genre: 'Pop',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    image: '/api/placeholder/300/300'
  }
];

export const mockFMStations = [
  { id: 'fm1', name: 'Radio Mirchi Tamil', frequency: '98.3 FM', url: 'https://radiomirchi.stream/tamil' },
  { id: 'fm2', name: 'Hello FM', frequency: '106.4 FM', url: 'https://hello.fm/stream' },
  { id: 'fm3', name: 'Big FM', frequency: '92.7 FM', url: 'https://bigfm.stream/tamil' },
];

export const mockRestaurants = [
  {
    id: '1',
    name: 'A2B (Adyar Ananda Bhavan)',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '25-30 mins',
    distance: '0.8 km',
    image: '/api/placeholder/200/150',
    deals: '20% off on orders above ₹200',
    items: [
      { id: '1', name: 'Masala Dosa', price: 120, veg: true, jain: true },
      { id: '2', name: 'Idli Sambar (4pcs)', price: 80, veg: true, jain: true },
      { id: '3', name: 'Rava Upma', price: 90, veg: true, jain: false },
    ]
  },
  {
    id: '2',
    name: 'Annapoorna',
    cuisine: 'Vegetarian',
    rating: 4.3,
    deliveryTime: '20-25 mins',
    distance: '1.2 km',
    image: '/api/placeholder/200/150',
    deals: 'Free delivery on orders above ₹150',
    items: [
      { id: '1', name: 'Veg Biryani', price: 180, veg: true, jain: false },
      { id: '2', name: 'Sambar Rice', price: 100, veg: true, jain: true },
      { id: '3', name: 'Curd Rice', price: 70, veg: true, jain: true },
    ]
  },
  {
    id: '3',
    name: 'Junior Kuppanna',
    cuisine: 'Non-Vegetarian',
    rating: 4.6,
    deliveryTime: '35-40 mins',
    distance: '2.5 km',
    image: '/api/placeholder/200/150',
    deals: 'Free drink with any biryani',
    items: [
      { id: '1', name: 'Mutton Biryani', price: 320, veg: false, jain: false },
      { id: '2', name: 'Chicken 65', price: 240, veg: false, jain: false },
      { id: '3', name: 'Fish Curry', price: 280, veg: false, jain: false },
    ]
  }
];

export const mockNews = [
  {
    id: '1',
    headline: 'Coimbatore Metro Project Delayed by 6 Months',
    source: 'The Hindu',
    category: 'Local',
    time: '2 hours ago',
    content: 'The much-awaited Coimbatore Metro project faces another delay due to land acquisition issues...',
    urgent: false
  },
  {
    id: '2',
    headline: 'Heavy Traffic Expected on Avinashi Road Due to Festival',
    source: 'NDTV',
    category: 'Traffic',
    time: '30 minutes ago',
    content: 'Commuters are advised to use alternate routes as heavy traffic is expected...',
    urgent: true
  },
  {
    id: '3',
    headline: 'Tamil Nadu Weather: Light Rain Expected in Western Districts',
    source: 'CNN',
    category: 'Weather',
    time: '1 hour ago',
    content: 'The meteorological department has forecast light to moderate rainfall...',
    urgent: false
  },
];

export const mockIPL = [
  {
    id: '1',
    team1: 'CSK',
    team2: 'MI',
    team1Score: '180/4',
    team2Score: '120/6',
    status: 'Live - CSK Won',
    overs: '20',
    venue: 'MA Chidambaram Stadium',
    time: 'Live Now'
  },
  {
    id: '2',
    team1: 'RCB',
    team2: 'KKR',
    team1Score: 'Yet to bat',
    team2Score: '165/7',
    status: 'Live - RCB to chase 166',
    overs: '20',
    venue: 'Eden Gardens',
    time: 'Live Now'
  },
];

export const mockNotifications = [
  {
    id: '1',
    title: 'Traffic Alert',
    message: 'Heavy traffic on Trichy Road near Gandhipuram',
    type: 'traffic',
    urgent: true,
    time: '5 minutes ago',
    source: 'Traffic Police',
    hasAudio: true,
    duration: '0:45'
  },
  {
    id: '2',
    title: 'WhatsApp Voice Message',
    message: 'Mom: "Call me when you reach home safely"',
    type: 'social',
    urgent: false,
    time: '10 minutes ago',
    source: 'WhatsApp',
    socialType: 'whatsapp',
    hasAudio: true,
    duration: '0:12'
  },
  {
    id: '3',
    title: 'Instagram Story',
    message: 'John tagged you in a story',
    type: 'social',
    urgent: false,
    time: '15 minutes ago',
    source: 'Instagram',
    socialType: 'instagram',
    hasAudio: false
  },
  {
    id: '4',
    title: 'Telegram Voice Note',
    message: 'Tech Group: "Check out this new car tech!"',
    type: 'social',
    urgent: false,
    time: '20 minutes ago',
    source: 'Telegram',
    socialType: 'telegram',
    hasAudio: true,
    duration: '0:28'
  },
  {
    id: '5',
    title: 'Facebook Messenger',
    message: 'Sarah: "Are we still meeting tomorrow?"',
    type: 'social',
    urgent: false,
    time: '30 minutes ago',
    source: 'Facebook Messenger',
    socialType: 'facebook',
    hasAudio: false
  },
  {
    id: '6',
    title: 'Twitter Mention',
    message: '@TechGuru mentioned you in a tweet about electric cars',
    type: 'social',
    urgent: false,
    time: '45 minutes ago',
    source: 'Twitter',
    socialType: 'twitter',
    hasAudio: false
  },
  {
    id: '7',
    title: 'CSK Match Update',
    message: 'CSK beats MI by 60 runs! 🏆',
    type: 'sports',
    urgent: false,
    time: '1 hour ago',
    source: 'IPL Official',
    hasAudio: true,
    duration: '0:35'
  },
];

export const getAISuggestions = (timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night') => {
  const suggestions = {
    morning: {
      music: { title: 'Morning Devotional', artist: 'M.S. Subbulakshmi', genre: 'Devotional' },
      food: { restaurant: 'A2B', item: 'Idli Sambar', price: 80 },
      news: 'Today\'s weather: Sunny, 28°C in Coimbatore'
    },
    afternoon: {
      music: { title: 'Lunch Break Hits', artist: 'Yuvan Shankar Raja', genre: 'Pop' },
      food: { restaurant: 'Annapoorna', item: 'Veg Biryani', price: 180 },
      news: 'Traffic update: Moderate traffic on all major routes'
    },
    evening: {
      music: { title: 'Vaadi Vaadi', artist: 'Dhanush', genre: 'Folk' },
      food: { restaurant: 'Junior Kuppanna', item: 'Chicken 65', price: 240 },
      news: 'CSK vs MI: Match starting at 7:30 PM'
    },
    night: {
      music: { title: 'Romantic Melodies', artist: 'A.R. Rahman', genre: 'Romantic' },
      food: { restaurant: 'A2B', item: 'Light Dinner Combo', price: 150 },
      news: 'Tomorrow\'s forecast: Partly cloudy, light rain expected'
    }
  };
  
  return suggestions[timeOfDay];
};

export const mockDriverProfile = {
  name: 'Test User 1',
  points: 1250,
  level: 'Elite',
  achievements: ['Safe Driver', 'Music Lover', 'Foodie Explorer'],
  totalTrips: 450,
  favoriteGenre: 'Tamil Folk',
  favoriteRestaurant: 'A2B'
};

// Driver Dashboard Mock Data
export const mockTrafficAlerts = [
  {
    id: '1',
    type: 'construction' as const,
    title: 'Road Construction',
    description: 'Avinashi Road - Lane closure near Peelamedu',
    severity: 'high' as const,
    eta: '+15 mins',
    distance: '2.3 km',
    icon: '🚧'
  },
  {
    id: '2',
    type: 'accident' as const,
    title: 'Traffic Jam',
    description: 'Trichy Road - Heavy traffic near Gandhipuram',
    severity: 'medium' as const,
    eta: '+8 mins',
    distance: '1.8 km',
    icon: '🚗'
  },
  {
    id: '3',
    type: 'roadblock' as const,
    title: 'Road Block',
    description: 'Sathy Road - Construction debris blocking lane',
    severity: 'medium' as const,
    eta: '+5 mins',
    distance: '1.1 km',
    icon: '🚧'
  }
];

export const mockDriverServices = [
  {
    id: '1',
    type: 'fuel' as const,
    name: 'Indian Oil Petrol Pump',
    distance: '0.8 km',
    price: '₹102.45/L',
    offers: '5% cashback with SBI Card',
    availability: 'Open 24/7',
    rating: 4.2,
    icon: '⛽'
  },
  {
    id: '2',
    type: 'puncture' as const,
    name: 'Quick Fix Puncture Shop',
    distance: '0.5 km',
    price: '₹50-₹150',
    offers: 'Emergency service available',
    availability: 'Open 6 AM - 10 PM',
    rating: 4.1,
    icon: '🔧'
  },
  {
    id: '3',
    type: 'service' as const,
    name: 'Maruti Service Center',
    distance: '1.8 km',
    price: 'Service from ₹2000',
    offers: 'Genuine parts warranty',
    availability: 'Open 9 AM - 7 PM',
    rating: 4.4,
    icon: '🔧'
  },
  {
    id: '4',
    type: 'wash' as const,
    name: 'Auto Spa Car Wash',
    distance: '1.1 km',
    price: '₹200-₹500',
    offers: 'Premium wax included',
    availability: 'Open 8 AM - 8 PM',
    rating: 4.3,
    icon: '🚿'
  },
  {
    id: '5',
    type: 'fuel' as const,
    name: 'HP Petrol Bunk',
    distance: '1.2 km',
    price: '₹102.38/L',
    offers: 'Free air check',
    availability: 'Open till 10 PM',
    rating: 4.0,
    icon: '⛽'
  },
  {
    id: '6',
    type: 'puncture' as const,
    name: 'Road Side Tyre Care',
    distance: '2.3 km',
    price: '₹40-₹120',
    offers: '24/7 emergency service',
    availability: 'Open 24/7',
    rating: 3.9,
    icon: '🛞'
  }
];

export const mockWeatherData = {
  current: {
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h',
    visibility: '8 km',
    icon: '⛅',
    drivingCondition: 'Good'
  },
  hourly: [
    { time: '2 PM', temp: '30°C', condition: 'Sunny', icon: '☀️' },
    { time: '4 PM', temp: '32°C', condition: 'Hot', icon: '🌡️' },
    { time: '6 PM', temp: '29°C', condition: 'Partly Cloudy', icon: '⛅' },
    { time: '8 PM', temp: '26°C', condition: 'Clear', icon: '🌙' }
  ]
};

export const mockFrequentDestinations = [
  {
    id: '1',
    name: 'Office - Tidel Park',
    address: 'TIDEL Park, Coimbatore',
    distance: '12.5 km',
    eta: '22 mins',
    traffic: 'Moderate',
    lastVisited: 'Yesterday',
    icon: '🏢',
    trafficColor: 'warning' as const
  },
  {
    id: '2',
    name: 'Home',
    address: 'RS Puram, Coimbatore',
    distance: '8.3 km',
    eta: '15 mins',
    traffic: 'Light',
    lastVisited: 'This morning',
    icon: '🏠',
    trafficColor: 'success' as const
  },
  {
    id: '3',
    name: 'Brookefields Mall',
    address: 'Brookefields Mall, Coimbatore',
    distance: '5.7 km',
    eta: '18 mins',
    traffic: 'Heavy',
    lastVisited: '2 days ago',
    icon: '🛍️',
    trafficColor: 'destructive' as const
  },
  {
    id: '4',
    name: 'Airport',
    address: 'Coimbatore International Airport',
    distance: '15.2 km',
    eta: '28 mins',
    traffic: 'Light',
    lastVisited: '1 week ago',
    icon: '✈️',
    trafficColor: 'success' as const
  }
];

export const mockDiscountOffers = [
  {
    id: '1',
    restaurant: 'A2B',
    offer: '25% OFF',
    description: 'On orders above ₹300',
    validTill: '6 PM Today',
    distance: '0.8 km',
    type: 'exclusive'
  },
  {
    id: '2',
    restaurant: 'Junior Kuppanna',
    offer: 'Buy 1 Get 1',
    description: 'On all biryanis',
    validTill: '9 PM Today',
    distance: '2.5 km',
    type: 'driver-special'
  },
  {
    id: '3',
    restaurant: 'Annapoorna',
    offer: 'Free Delivery',
    description: 'No minimum order',
    validTill: 'All day',
    distance: '1.2 km',
    type: 'partner'
  }
];