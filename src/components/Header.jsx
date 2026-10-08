import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Sun, 
  Moon, 
  Coins, 
  ShieldCheck, 
  Radio, 
  User, 
  Sparkles,
  X,
  CheckCircle2,
  Gift,
  UserPlus
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function Header({
  isDarkMode,
  setIsDarkMode,
  onOpenSidebar,
  activeTab,
  setActiveTab,
  currentUser,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  isDeveloperLive,
  isUserDevMode,
  setIsUserDevMode
}) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleTheme = () => {
    soundManager.playTap();
    setIsDarkMode(prev => !prev);
  };

  const handleNotifClick = () => {
    soundManager.playTap();
    setShowNotifDropdown(prev => !prev);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-xl border-b ${
      isDarkMode 
        ? 'bg-navy-950/80 border-cyan-500/20 text-slate-100 shadow-[0_4px_25px_rgba(4,8,18,0.7)]' 
        : 'bg-white/85 border-cyan-600/15 text-slate-800 shadow-[0_4px_20px_rgba(8,145,178,0.08)]'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* RIGHT (In RTL, this is the Start/Logo) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              soundManager.playTap();
              setActiveTab('live');
            }}
            className="flex items-center gap-3 group text-right cursor-pointer focus:outline-none"
          >
            {/* Platform Logo Avatar / Icon */}
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_22px_rgba(0,247,255,0.7)] transition-all duration-300">
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-lg sm:text-xl tracking-wider ${
                  isDarkMode ? 'bg-navy-900 text-cyan-300' : 'bg-slate-900 text-cyan-300'
                }`}>
                  كـ
                </div>
              </div>
              {/* Online pulse dot */}
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-navy-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-l from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm font-cairo">
                  الكحلي
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-400">
                  AL-KOHLI
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1 font-medium">
                <span>منصة البث والمحادثات الملكية</span>
                {isDeveloperLive && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded-full border border-rose-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    بث مباشر
                  </span>
                )}
              </p>
            </div>
          </button>
        </div>

        {/* CENTER - Quick Nav Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-navy-900/40 dark:bg-navy-900/50 p-1.5 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
          <button
            onClick={() => { soundManager.playTap(); setActiveTab('live'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>قسم البث</span>
            {isDeveloperLive && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('public'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'public'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <span>قسم عام</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('private'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'private'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <span>قسم الخاص</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('stories'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'stories'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ستوري</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('store'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'store'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>المتجر</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveTab('profile'); }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>حسابي</span>
          </button>
        </nav>

        {/* LEFT (Actions: Theme Switcher, Notification Bell, 3 Bars Hamburger Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Developer / Normal user simulation pill */}
          <button
            onClick={() => {
              soundManager.playTap();
              setIsUserDevMode(prev => !prev);
            }}
            title="تبديل الصلاحية بين المطور والمستخدم لاختبار الميزات"
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
              isUserDevMode 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isUserDevMode ? 'وضع: المطور 👑' : 'وضع: عضو VIP 💎'}</span>
          </button>

          {/* User Coins Counter */}
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('store');
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              isDarkMode 
                ? 'bg-navy-900/90 border-cyan-500/30 text-yellow-400 hover:border-yellow-400/60' 
                : 'bg-slate-100 border-cyan-600/20 text-yellow-600 hover:bg-yellow-50'
            }`}
          >
            <Coins className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span className="font-mono">{currentUser.coins.toLocaleString()}</span>
          </button>

          {/* THEME TOGGLE (Night Turquoise vs Day) */}
          <button
            onClick={toggleTheme}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 relative group ${
              isDarkMode
                ? 'bg-cyan-950/60 border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/60 hover:shadow-[0_0_15px_rgba(0,247,255,0.4)]'
                : 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]'
            }`}
            title={isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي الكحلي القروازي"}
          >
            {isDarkMode ? (
              <div className="flex items-center gap-1.5">
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 fill-cyan-400/20" />
                <span className="hidden xl:inline text-xs font-bold text-cyan-300">ليلي قروازي</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <span className="hidden xl:inline text-xs font-bold text-amber-700">نهاري فاخر</span>
              </div>
            )}
          </button>

          {/* NOTIFICATION BELL */}
          <div className="relative">
            <button
              onClick={handleNotifClick}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 relative ${
                isDarkMode
                  ? 'bg-navy-900/80 border-cyan-500/30 text-slate-200 hover:text-cyan-300 hover:border-cyan-400/60'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-cyan-700'
              }`}
              title="الإشعارات والتنبيهات"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-lg animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Modal */}
            {showNotifDropdown && (
              <div className={`absolute left-0 mt-3 w-80 sm:w-96 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in slide-in-from-top-3 ${
                isDarkMode 
                  ? 'bg-navy-900/95 border-cyan-500/30 text-slate-100 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]' 
                  : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-xl shadow-2xl'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    <span>مركز الإشعارات</span>
                    <span className="px-1.5 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                      {notifications.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClearNotifications}
                      className="text-[11px] text-slate-400 hover:text-rose-400 transition"
                    >
                      مسح الكل
                    </button>
                    <button 
                      onClick={() => setShowNotifDropdown(false)}
                      className="p-1 rounded-lg hover:bg-white/10 text-slate-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">
                      لا توجد إشعارات جديدة حالياً
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          onMarkNotificationRead(notif.id);
                          if (notif.type === 'stream') setActiveTab('live');
                          if (notif.type === 'friend') setActiveTab('private');
                          if (notif.type === 'gift') setActiveTab('live');
                          setShowNotifDropdown(false);
                        }}
                        className={`p-3 rounded-xl cursor-pointer transition-all border flex items-start gap-3 ${
                          notif.unread
                            ? isDarkMode
                              ? 'bg-cyan-950/40 border-cyan-500/40 hover:bg-cyan-900/40'
                              : 'bg-cyan-50/80 border-cyan-200 hover:bg-cyan-100/70'
                            : isDarkMode
                              ? 'bg-navy-950/40 border-slate-800 hover:bg-navy-800/40'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                          {notif.type === 'stream' && <Radio className="w-4 h-4 text-rose-400" />}
                          {notif.type === 'gift' && <Gift className="w-4 h-4 text-yellow-400" />}
                          {notif.type === 'friend' && <UserPlus className="w-4 h-4 text-teal-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold leading-snug">{notif.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{notif.desc}</p>
                          <span className="text-[10px] text-cyan-400/80 mt-1 block">{notif.time}</span>
                        </div>
                        {notif.unread && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1"></span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3 BARS HAMBURGER MENU (3 شرطات) */}
          <button
            onClick={() => {
              soundManager.playTap();
              onOpenSidebar();
            }}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isDarkMode
                ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-cyan-400/40 text-cyan-300 hover:shadow-[0_0_18px_rgba(0,247,255,0.4)]'
                : 'bg-cyan-600 text-white border-cyan-700 shadow-md hover:bg-cyan-700'
            }`}
            title="القائمة الرئيسية والأقسام (3 شرطات)"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>
    </header>
  );
}
