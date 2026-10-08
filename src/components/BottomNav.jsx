import React from 'react';
import { 
  Radio, 
  MessageSquare, 
  Users, 
  Sparkles, 
  ShoppingBag, 
  User 
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function BottomNav({
  activeTab,
  setActiveTab,
  isDarkMode,
  isDeveloperLive,
  currentUser
}) {
  const tabs = [
    { id: 'live', label: 'البث', icon: Radio, isLive: isDeveloperLive },
    { id: 'public', label: 'عام', icon: MessageSquare },
    { id: 'stories', label: 'ستوري', icon: Sparkles, isSpecial: true },
    { id: 'private', label: 'الخاص', icon: Users },
    { id: 'store', label: 'المتجر', icon: ShoppingBag },
    { id: 'profile', label: 'حسابي', icon: User },
  ];

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-navy-950/90 border-cyan-500/25 text-slate-300' 
        : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
    }`}>
      <div className="grid grid-cols-6 h-16 items-center px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playTap();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center h-full relative transition ${
                isActive 
                  ? 'text-cyan-400 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'} ${
                  tab.isSpecial && !isActive ? 'text-amber-400' : ''
                }`} />
                {tab.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-cairo truncate max-w-[50px]">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_#00f7ff]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
