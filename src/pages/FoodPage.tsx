import { useState } from 'react';
import { Search, Heart, Star, Clock, Truck, Leaf, CircleDot, MapPin, Filter } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { mockRestaurants } from '@/data/mockData';

export const FoodPage = () => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'favorites' | 'orders'>('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1']);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'delivery'>('distance');

  const filteredRestaurants = mockRestaurants
    .filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'delivery':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        default:
          return 0;
      }
    });

  const handleVoiceCommand = (command: string) => {
    console.log('Food voice command:', command);
    if (command.toLowerCase().includes('order') && command.toLowerCase().includes('nearby')) {
      setSearchQuery('');
      setActiveTab('restaurants');
    } else if (command.toLowerCase().includes('a2b') || command.toLowerCase().includes('idli')) {
      setSelectedRestaurant('1');
    }
  };

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getCartTotal = () => {
    let total = 0;
    Object.entries(cart).forEach(([itemId, quantity]) => {
      mockRestaurants.forEach(restaurant => {
        const item = restaurant.items.find(i => i.id === itemId);
        if (item) total += item.price * quantity;
      });
    });
    return total;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-car-title">Food Hub</h1>
        <VoiceButton onCommand={handleVoiceCommand} />
      </div>

      {/* Cart Summary (if items in cart) */}
      {Object.keys(cart).length > 0 && (
        <NeuroCard className="bg-gradient-to-r from-success/20 to-warning/20 border border-success/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-success">🛒 Cart Summary</h3>
              <p className="text-car-body">₹{getCartTotal()} • {Object.values(cart).reduce((a, b) => a + b, 0)} items</p>
            </div>
            <button className="neuro-button-primary px-4 py-2">
              Checkout
            </button>
          </div>
        </NeuroCard>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {[
          { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
          { id: 'favorites', label: 'Favorites', icon: '❤️' },
          { id: 'orders', label: 'Orders', icon: '📦' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`neuro-button px-4 py-2 flex items-center gap-2 ${
              activeTab === tab.id ? 'neuro-button-primary' : ''
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      {activeTab === 'restaurants' && (
        <div className="space-y-3">
          <NeuroCard variant="inset">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-car-body"
              />
            </div>
          </NeuroCard>

          {/* Sort Options */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={16} className="text-muted-foreground flex-shrink-0" />
            {[
              { id: 'distance', label: 'Nearest', icon: '📍' },
              { id: 'rating', label: 'Top Rated', icon: '⭐' },
              { id: 'delivery', label: 'Fastest', icon: '🚀' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id as any)}
                className={`neuro-button px-3 py-2 flex items-center gap-2 whitespace-nowrap text-sm ${
                  sortBy === option.id ? 'neuro-button-primary' : ''
                }`}
              >
                <span>{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Food Suggestion */}
      <NeuroCard className="bg-gradient-to-r from-warning/20 to-primary/20 border border-warning/30">
        <div className="space-y-2">
          <h3 className="font-semibold text-warning flex items-center gap-2">
            🤖 AI Recommendation
          </h3>
          <p className="text-car-body">Based on your location and time, try Masala Dosa from A2B</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
              20% off
            </span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              Fast delivery
            </span>
          </div>
        </div>
      </NeuroCard>

      {/* Restaurant List or Details */}
      {!selectedRestaurant ? (
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <NeuroCard key={restaurant.id} className="hover:scale-105 cursor-pointer">
              <div 
                className="space-y-4"
                onClick={() => setSelectedRestaurant(restaurant.id)}
              >
                {/* Restaurant Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-car-body">{restaurant.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(restaurant.id);
                        }}
                        className="neuro-button touch-target p-2"
                      >
                        <Heart 
                          size={16} 
                          className={favorites.includes(restaurant.id) ? 'text-destructive fill-destructive' : 'text-muted-foreground'} 
                        />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                    
                    {/* Rating, Delivery Info, and Distance */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-warning fill-warning" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-info" />
                        <span className="text-info font-medium">{restaurant.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck size={14} className="text-primary" />
                        <span className="text-primary">Free delivery</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deals */}
                {restaurant.deals && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-2">
                    <p className="text-sm text-success">🎯 {restaurant.deals}</p>
                  </div>
                )}

                {/* Sample Items */}
                <div className="flex gap-2 overflow-x-auto">
                  {restaurant.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex-shrink-0 bg-muted/20 rounded-lg p-2 min-w-[120px]">
                      <div className="flex items-center gap-1 mb-1">
                        {item.veg ? (
                          <CircleDot size={12} className="text-success" />
                        ) : (
                          <CircleDot size={12} className="text-destructive" />
                        )}
                        {item.jain && <Leaf size={12} className="text-success" />}
                      </div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-xs text-primary">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </NeuroCard>
          ))}
        </div>
      ) : (
        // Restaurant Details View
        <div className="space-y-4">
          <button
            onClick={() => setSelectedRestaurant(null)}
            className="neuro-button px-4 py-2"
          >
            ← Back to Restaurants
          </button>
          
          {mockRestaurants
            .filter(r => r.id === selectedRestaurant)
            .map((restaurant) => (
              <div key={restaurant.id} className="space-y-4">
                {/* Restaurant Info */}
                <NeuroCard>
                  <div className="space-y-3">
                    <h2 className="text-car-subtitle">{restaurant.name}</h2>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-warning fill-warning" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <span>{restaurant.cuisine}</span>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    {restaurant.deals && (
                      <div className="bg-success/10 border border-success/30 rounded-lg p-2">
                        <p className="text-sm text-success">🎯 {restaurant.deals}</p>
                      </div>
                    )}
                  </div>
                </NeuroCard>

                {/* Menu Items */}
                <div className="space-y-3">
                  <h3 className="text-car-subtitle">Menu</h3>
                  {restaurant.items.map((item) => (
                    <NeuroCard key={item.id}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {item.veg ? (
                              <CircleDot size={16} className="text-success" />
                            ) : (
                              <CircleDot size={16} className="text-destructive" />
                            )}
                            {item.jain && <Leaf size={16} className="text-success" />}
                            <h4 className="font-semibold">{item.name}</h4>
                          </div>
                          <p className="text-car-body text-primary">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {cart[item.id] && (
                            <span className="neuro-card-inset px-2 py-1 text-sm">
                              {cart[item.id]}
                            </span>
                          )}
                          <button
                            onClick={() => addToCart(item.id)}
                            className="neuro-button-primary px-4 py-2"
                          >
                            Add +
                          </button>
                        </div>
                      </div>
                    </NeuroCard>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle">Your Favorite Restaurants</h2>
          {mockRestaurants
            .filter(restaurant => favorites.includes(restaurant.id))
            .map((restaurant) => (
              <NeuroCard key={restaurant.id} className="hover:scale-105 cursor-pointer">
                <div onClick={() => setSelectedRestaurant(restaurant.id)}>
                  <h3 className="font-semibold text-car-body">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="text-warning fill-warning" />
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </div>
              </NeuroCard>
            ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-car-subtitle">Recent Orders</h2>
          <NeuroCard>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recent orders</p>
              <button 
                onClick={() => setActiveTab('restaurants')}
                className="neuro-button-primary mt-4 px-6 py-2"
              >
                Order Now
              </button>
            </div>
          </NeuroCard>
        </div>
      )}
    </div>
  );
};