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
    <div className="dashboard-grid bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-ambient)' }}></div>
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}></div>
      </div>

      {/* Premium Header */}
      <header className="relative z-10 glass-card mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl automotive-button-primary flex items-center justify-center">
                <Gauge size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="heading-lg">DriverHub</h1>
                <div className="flex items-center gap-4 body-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{currentTime.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>Coimbatore, TN</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal size={12} className="text-success" />
                    <span className="text-success">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="body-md">
              Good {getTimeOfDay()}, <span className="text-foreground font-semibold">{mockDriverProfile.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 body-sm">
                <Battery size={12} className="text-success" />
                <span>85%</span>
              </div>
              <VoiceButton onCommand={handleVoiceCommand} className="w-12 h-12" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-1 px-4 py-2 relative z-10 widget-grid grid-cols-12 grid-rows-2 gap-4">
        
        {/* Urgent Notifications */}
        {urgentNotifications.length > 0 && (
          <section className="col-span-12 mb-4">
            {urgentNotifications.slice(0, 1).map((notification) => (
              <div key={notification.id} className="glass-card p-3 status-destructive">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse-glow"></div>
                    <div>
                      <span className="heading-sm text-destructive">{notification.title}</span>
                      <p className="body-sm ml-2">{notification.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(notification.id)}
                    className="touch-premium text-destructive/60 hover:text-destructive"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Draggable Widgets Grid */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <section className="col-span-12 row-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-lg">Dashboard</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetLayout}
                  className="flex items-center gap-2 touch-premium glass-card px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw size={14} />
                  <span className="body-sm">Reset Layout</span>
                </button>
                <div className="flex items-center gap-2 glass-card px-3 py-2">
                  <Settings size={14} className="text-primary" />
                  <span className="body-sm text-primary">Drag to rearrange</span>
                </div>
              </div>
            </div>
            
            <SortableContext 
              items={sortedWidgets.map(w => w.id)} 
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-5 gap-4 h-32">
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

        {/* Navigation & Deals */}
        <section className="col-span-12 row-span-1 grid grid-cols-2 gap-4">
          {/* Quick Routes */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Route size={16} className="text-primary" />
              <h3 className="heading-sm">Quick Routes</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockFrequentDestinations.slice(0, 4).map((destination) => (
                <FrequentDestination 
                  key={destination.id} 
                  destination={destination} 
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          {/* Exclusive Deals */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Star size={16} className="text-success" />
              <h3 className="heading-sm">Exclusive Deals</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockDiscountOffers.slice(0, 4).map((offer) => (
                <div key={offer.id} className="surface-elevated p-3 rounded-xl hover:surface-primary transition-all cursor-pointer group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="body-md text-foreground truncate group-hover:text-success transition-colors">
                        {offer.restaurant}
                      </h4>
                      <span className="status-success px-2 py-1 rounded-lg body-sm font-semibold">
                        {offer.offer}
                      </span>
                    </div>
                    <p className="body-sm truncate">{offer.description}</p>
                    <div className="flex justify-between body-sm">
                      <span className="truncate">{offer.validTill}</span>
                      <span className="text-primary font-medium">{offer.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Map Footer */}
      <footer className="relative z-10 mx-4 mb-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <h3 className="heading-sm">Navigation</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="body-sm flex items-center gap-2">
                <TrendingUp size={12} className="text-success" />
                <span className="text-success">Live Traffic</span>
              </div>
              <div className="body-sm">{suggestions.news}</div>
            </div>
          </div>
          <MapWidget className="h-32 rounded-xl overflow-hidden" />
        </div>
      </footer>
    </div>
  );
};