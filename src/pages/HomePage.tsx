import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Route, 
  Gauge, 
  Star,
  TrendingUp,
  Battery,
  Signal,
  RotateCcw,
  Settings
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { VoiceButton } from '@/components/ui/VoiceButton';
import { FrequentDestination } from '@/components/ui/FrequentDestination';
import { MapWidget } from '@/components/ui/MapWidget';
import { DraggableWidget } from '@/components/ui/DraggableWidget';
import { MusicWidget } from '@/components/widgets/MusicWidget';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { VoiceWidget } from '@/components/widgets/VoiceWidget';
import { TrafficWidget } from '@/components/widgets/TrafficWidget';
import { ServicesWidget } from '@/components/widgets/ServicesWidget';
import { useLayoutPreferences } from '@/hooks/useLayoutPreferences';
import { 
  getAISuggestions, 
  mockDriverProfile, 
  mockNotifications,
  mockFrequentDestinations,
  mockDiscountOffers
} from '@/data/mockData';

export const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('Radio Mirchi Tamil');
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  
  const { layout, updateLayout, resetLayout } = useLayoutPreferences();

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  };

  const suggestions = getAISuggestions(getTimeOfDay());
  const urgentNotifications = mockNotifications.filter(n => n.urgent && !dismissedAlerts.includes(n.id));

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    if (command.toLowerCase().includes('play')) {
      setIsPlaying(true);
    } else if (command.toLowerCase().includes('pause')) {
      setIsPlaying(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = layout.findIndex(item => item.id === active.id);
      const newIndex = layout.findIndex(item => item.id === over.id);
      
      const newLayout = arrayMove(layout, oldIndex, newIndex).map((item, index) => ({
        ...item,
        position: index,
      }));
      
      updateLayout(newLayout);
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const handleNavigate = (destination: any) => {
    console.log('Navigate to:', destination);
  };

  // Widget components mapped by ID
  const widgets = {
    music: <MusicWidget isPlaying={isPlaying} currentSong={currentSong} onTogglePlay={() => setIsPlaying(!isPlaying)} />,
    weather: <WeatherWidget />,
    voice: <VoiceWidget onCommand={handleVoiceCommand} />,
    traffic: <TrafficWidget />,
    services: <ServicesWidget />,
  };

  // Sort widgets by position
  const sortedWidgets = layout.sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Ambient Background with Mirror Effects */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Header with Mirror Effect */}
      <header className="relative z-10 m-4">
        <div className="glass-card p-6 backdrop-blur-xl border-2 border-white/20 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
                  <Gauge size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                    DriverHub
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{currentTime.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>Coimbatore, TN</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Signal size={14} className="text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Live Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-lg">
                Good <span className="text-primary font-semibold">{getTimeOfDay()}</span>, 
                <span className="text-foreground font-bold ml-1">{mockDriverProfile.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-2 rounded-full">
                  <Battery size={16} className="text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">85%</span>
                </div>
                <VoiceButton onCommand={handleVoiceCommand} className="w-14 h-14" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Urgent Notifications */}
      {urgentNotifications.length > 0 && (
        <section className="mx-4 mb-4 relative z-10">
          {urgentNotifications.slice(0, 1).map((notification) => (
            <div key={notification.id} className="glass-card p-4 border-2 border-red-500/30 bg-red-500/5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div>
                    <span className="text-lg font-semibold text-red-500">{notification.title}</span>
                    <p className="text-sm text-muted-foreground ml-2">{notification.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(notification.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500/20 text-red-500 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Main Content Grid */}
      <div className="mx-4 space-y-4 relative z-10">
        
        {/* Draggable Widgets Section */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <section className="glass-card p-6 backdrop-blur-xl border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Smart Dashboard</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetLayout}
                  className="flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-muted transition-all"
                >
                  <RotateCcw size={16} />
                  <span>Reset Layout</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20">
                  <Settings size={16} className="text-primary" />
                  <span className="text-primary font-medium">Drag to rearrange</span>
                </div>
              </div>
            </div>
            
            <SortableContext 
              items={sortedWidgets.map(w => w.id)} 
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-5 gap-6 h-40">
                {sortedWidgets.map((widget) => (
                  <DraggableWidget 
                    key={widget.id} 
                    id={widget.id}
                    className="h-full"
                  >
                    {widgets[widget.id as keyof typeof widgets]}
                  </DraggableWidget>
                ))}
              </div>
            </SortableContext>
          </section>
        </DndContext>

        {/* Live Routes & Premium Services */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Live Routes with Enhanced Design */}
          <div className="glass-card p-6 backdrop-blur-xl border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Route size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Live Routes</h3>
                <p className="text-sm text-muted-foreground">Real-time navigation</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {mockFrequentDestinations.slice(0, 3).map((destination, index) => (
                <div 
                  key={destination.id} 
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                  onClick={() => handleNavigate(destination)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                          {destination.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{destination.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-400">{destination.eta}</div>
                      <div className="text-xs text-muted-foreground">{destination.distance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Deals */}
          <div className="glass-card p-6 backdrop-blur-xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-green-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Premium Deals</h3>
                <p className="text-sm text-muted-foreground">Exclusive offers</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {mockDiscountOffers.slice(0, 3).map((offer) => (
                <div key={offer.id} className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                      {offer.restaurant}
                    </h4>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                      {offer.offer}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valid: {offer.validTill}</span>
                    <span className="text-emerald-400 font-medium">{offer.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Map Section */}
        <div className="glass-card p-6 backdrop-blur-xl border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Smart Navigation</h3>
                <p className="text-sm text-muted-foreground">AI-powered routing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 rounded-full">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Live Traffic</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">{suggestions.news}</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
            <MapWidget className="h-48" />
          </div>
        </div>
      </div>
    </div>
  );
};