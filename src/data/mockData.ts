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