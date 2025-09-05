import { useState } from 'react';
import { Bell, Volume2, Globe, Shield, Moon, Car, User, HelpCircle } from 'lucide-react';
import { NeuroCard } from '@/components/ui/NeuroCard';
import { Switch } from '@/components/ui/switch';

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    voiceCommands: true,
    darkMode: true,
    safetyMode: true,
    autoPlayMusic: true,
    urgentAlertsOnly: false,
    language: 'english',
    voiceLanguage: 'tamil'
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Audio & Voice',
      icon: Volume2,
      items: [
        {
          key: 'voiceCommands',
          label: 'Voice Commands',
          description: 'Enable voice control for hands-free operation',
          type: 'toggle'
        },
        {
          key: 'autoPlayMusic',
          label: 'Auto-play Music',
          description: 'Automatically start music when driving',
          type: 'toggle'
        },
        {
          key: 'voiceLanguage',
          label: 'Voice Language',
          description: 'Choose your preferred voice language',
          type: 'select',
          options: ['Tamil', 'English', 'Hindi']
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Receive app notifications',
          type: 'toggle'
        },
        {
          key: 'urgentAlertsOnly',
          label: 'Urgent Alerts Only',
          description: 'Only show critical safety alerts while driving',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Safety & Driving',
      icon: Shield,
      items: [
        {
          key: 'safetyMode',
          label: 'Safety Mode',
          description: 'Auto-enable voice-only mode while driving',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for better visibility',
          type: 'toggle'
        },
        {
          key: 'language',
          label: 'App Language',
          description: 'Choose your preferred app language',
          type: 'select',
          options: ['English', 'Tamil', 'Hindi']
        }
      ]
    }
  ];

  const profileSection = {
    name: 'Test User',
    phone: '+91 9876543210',
    level: 'Silver Driver',
    points: 1250
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface p-4 space-y-6">
      {/* User Profile with Driver Points */}
      <NeuroCard className="glass-card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <User className="text-primary" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-primary">{profileSection.name}</h2>
              <p className="text-car-body">{profileSection.phone}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-accent">{profileSection.level}</span>
                <span className="text-sm text-warning">{profileSection.points} points</span>
              </div>
            </div>
          </div>
          
          {/* Driver Points Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Gold</span>
              <span className="text-warning">{profileSection.points}/2000</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-warning to-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${(profileSection.points / 2000) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </NeuroCard>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-3">
          <div className="flex items-center gap-2">
            <section.icon size={20} className="text-primary" />
            <h2 className="text-car-subtitle">{section.title}</h2>
          </div>
          
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <NeuroCard key={itemIndex} className="glass-card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {item.type === 'toggle' && (
                    <Switch
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => updateSetting(item.key, checked)}
                    />
                  )}
                  
                  {item.type === 'select' && (
                    <select
                      value={settings[item.key as keyof typeof settings] as string}
                      onChange={(e) => updateSetting(item.key, e.target.value.toLowerCase())}
                      className="neuro-card-inset px-3 py-2 rounded-md bg-background border border-input"
                    >
                      {item.options?.map((option) => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </NeuroCard>
            ))}
          </div>
        </div>
      ))}

      {/* Help & Support */}
      <NeuroCard className="glass-card hover:scale-105 cursor-pointer">
        <div className="flex items-center gap-3">
          <HelpCircle className="text-accent" size={20} />
          <div>
            <h4 className="font-medium">Help & Support</h4>
            <p className="text-sm text-muted-foreground">Get help and contact support</p>
          </div>
        </div>
      </NeuroCard>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>DriverHub v1.0.0</p>
        <p>Made for Coimbatore Drivers</p>
      </div>
    </div>
  );
};