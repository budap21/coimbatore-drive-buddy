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
      {/* Revolutionary Mesh Background */}
      <div className="fixed inset-0 opacity-50">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8"></div>
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-success/8 to-info/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Ultra Modern Floating Header */}
      <header className="relative z-10 m-6">
        <div className="glass-card backdrop-blur-2xl border border-white/10 p-8 rounded-3xl" 
             style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center shadow-lg">
                  <Gauge size={28} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-success to-accent rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
                  DriverHub Pro
                </h1>
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <Clock size={14} className="text-primary" />
                    <span className="text-primary font-medium">
                      {currentTime.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full">
                    <MapPin size={14} className="text-accent" />
                    <span className="text-accent font-medium">Coimbatore, TN</span>
                  </div>
                  <div className="flex items-center gap-2 bg-success/10 px-3 py-1 rounded-full">
                    <Signal size={14} className="text-success" />
                    <span className="text-success font-medium">5G Connected</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right space-y-1">
                <div className="text-2xl font-bold">
                  Good <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{getTimeOfDay()}</span>
                </div>
                <div className="text-lg text-foreground/80">{mockDriverProfile.name}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-success/15 px-4 py-3 rounded-2xl border border-success/20">
                  <Battery size={18} className="text-success" />
                  <span className="text-success font-bold text-lg">85%</span>
                </div>
                <VoiceButton onCommand={handleVoiceCommand} className="w-16 h-16 shadow-lg hover:shadow-glow" />
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

      {/* Revolutionary Layout - No Waste Space */}
      <div className="mx-6 space-y-6 relative z-10">
        
        {/* Unified Control Center */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Smart Dashboard Widgets - Compact */}
          <div className="col-span-8">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="glass-card backdrop-blur-2xl border border-white/10 p-6 rounded-3xl" 
                   style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Settings size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Control Center</h2>
                  </div>
                  <button
                    onClick={resetLayout}
                    className="flex items-center gap-2 px-3 py-2 bg-muted/30 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-muted/50 transition-all text-sm"
                  >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>
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
              </div>
            </DndContext>
          </div>

          {/* AI Insights Panel */}
          <div className="col-span-4">
            <div className="glass-card backdrop-blur-2xl border border-white/10 p-6 rounded-3xl h-full" 
                 style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-info to-primary flex items-center justify-center">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">AI Insights</h3>
                  <p className="text-sm text-muted-foreground">Real-time analytics</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-success/10 border border-success/20 rounded-xl">
                  <div className="text-sm font-medium text-success">Traffic Status</div>
                  <div className="text-xs text-success/80">Optimal routes available</div>
                </div>
                <div className="p-3 bg-info/10 border border-info/20 rounded-xl">
                  <div className="text-sm font-medium text-info">Fuel Efficiency</div>
                  <div className="text-xs text-info/80">+12% improvement today</div>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl">
                  <div className="text-sm font-medium text-warning">AI Suggestion</div>
                  <div className="text-xs text-warning/80">{suggestions.news}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation & Services Row */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Revolutionary Smart Navigation */}
          <div className="col-span-7">
            <div className="glass-card backdrop-blur-2xl border border-white/10 p-6 rounded-3xl h-full" 
                 style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-info flex items-center justify-center">
                    <Route size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Smart Navigation
                    </h3>
                    <p className="text-sm text-muted-foreground">AI-powered real-time routing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-success/15 rounded-full border border-success/20">
                    <TrendingUp size={14} className="text-success" />
                    <span className="text-success font-bold text-sm">Live Traffic</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {mockFrequentDestinations.slice(0, 4).map((destination, index) => (
                  <div 
                    key={destination.id} 
                    className="relative p-4 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer group hover:scale-105"
                    onClick={() => handleNavigate(destination)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {destination.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">{destination.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{destination.eta}</div>
                          <div className="text-xs text-muted-foreground">{destination.distance}</div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin size={16} className="text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Map Preview */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <MapWidget className="h-32" />
              </div>
            </div>
          </div>

          {/* Premium Services & Deals */}
          <div className="col-span-5">
            <div className="glass-card backdrop-blur-2xl border border-white/10 p-6 rounded-3xl h-full" 
                 style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-success via-accent to-warning flex items-center justify-center">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-success to-warning bg-clip-text text-transparent">
                    Premium Hub
                  </h3>
                  <p className="text-sm text-muted-foreground">Exclusive offers & services</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockDiscountOffers.slice(0, 4).map((offer) => (
                  <div key={offer.id} className="relative p-4 bg-gradient-to-br from-success/5 to-warning/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-success/30 transition-all cursor-pointer group hover:scale-105">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground group-hover:text-success transition-colors mb-1">
                          {offer.restaurant}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">{offer.description}</p>
                      </div>
                      <span className="px-2 py-1 bg-success/20 text-success rounded-lg text-xs font-bold ml-2">
                        {offer.offer}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Until {offer.validTill}</span>
                      <span className="text-success font-bold">{offer.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar - Ultra Modern */}
        <div className="glass-card backdrop-blur-2xl border border-white/10 p-4 rounded-3xl" 
             style={{ background: 'var(--gradient-glass)', boxShadow: 'var(--shadow-glass)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success font-medium">System Optimal</span>
              </div>
              <div className="text-sm text-muted-foreground">{suggestions.news}</div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-info" />
                <span className="text-info font-medium">Performance: +15%</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal size={14} className="text-success" />
                <span className="text-success font-medium">5G Ultra</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};