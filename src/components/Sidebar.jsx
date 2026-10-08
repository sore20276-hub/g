import React from 'react';
import { 
  X, 
  Radio, 
  MessageSquare, 
  Users, 
  Sparkles, 
  ShoppingBag, 
  User, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ChevronLeft,
  Crown,
  Coins,
  Flame
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currentUser,
  isDarkMode,
  onOpenLogoutModal,
  onToggleVisibility,
  isDeveloperLive,
  isUserDevMode,
  setIsUserDevMode
}) {
  if (!isOpen) return null;

  const navItems = [
    {
      id: 'profile',
      label: 'قسم حسابي',
      sublabel: 'الملف الشخصي، الإعدادات، البريد',
      icon: User,
      badge: currentUser.badge,
      color: 'text-cyan-400',
      activeColor: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'live',
      label: 'قسم البث',
      sublabel: 'البث المباشر، المايكات، الهدايا',
      icon: Radio,
      badge: isDeveloperLive ? 'مباشر الآن 🔴' : 'مقفل 🔒',
      color: 'text-rose-400',
      activeColor: 'from-rose-500 to-red-600',
      isLive: isDeveloperLive,
    },
    {
      id: 'public',
      label: 'قسم عام',
      sublabel: 'شات عام، بصمات صوتية، صور',
      icon: MessageSquare,
      badge: 'عام',
      color: 'text-teal-400',
      activeColor: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'private',
      label: 'قسم الخاص',
      sublabel: 'رسائل الأصدقاء، طلبات الصداقة',
      icon: Users,
      badge: 'خاص',
      color: 'text-blue-400',
      activeColor: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'stories',
      label: 'قسم ستوري',
      sublabel: 'فيديوهات قصيرة شبيهة تيك توك',
      icon: Sparkles,
      badge: 'جديد 🔥',
      color: 'text-amber-400',
      activeColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 'store',
      label: 'قسم المتجر',
      sublabel: 'شراء كوينز، إطارات، هدايا فاخرة',
      icon: ShoppingBag,
      badge: 'عروض 💎',
      color: 'text-yellow-400',
      activeColor: 'from-yellow-500 to-amber-600',
    },
  ];

  const handleSelectTab = (tabId) => {
    soundManager.playTap();
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className={`relative w-full max-w-sm sm:max-w-md h-full flex flex-col shadow-2xl z-10 transition-transform duration-300 border-r ${
        isDarkMode 
          ? 'bg-navy-950 text-slate-100 border-cyan-500/20 shadow-[0_0_50px_rgba(0,0,0,0.9)]' 
          : 'bg-white text-slate-800 border-slate-200 shadow-2xl'
      }`}>
        
        {/* Top Header inside Drawer */}
        <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
          isDarkMode ? 'border-cyan-500/20 bg-navy-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black ${
                isDarkMode ? 'bg-navy-900 text-cyan-300' : 'bg-slate-900 text-cyan-300'
              }`}>
                كـ
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base font-cairo bg-gradient-to-l from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                أقسام منصة الكحلي
              </h3>
              <p className="text-[11px] text-slate-400">القائمة الرئيسية والتنقل السريع</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className={`p-2 rounded-xl transition ${
              isDarkMode ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Profile Card inside Drawer */}
        <div className="p-4 border-b border-cyan-500/15">
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            isDarkMode 
              ? 'bg-navy-900/80 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
              : 'bg-cyan-50/70 border-cyan-200'
          }`}>
            <div className="relative">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400/60 shadow-md" 
              />
              <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-navy-950 ${
                currentUser.isHidden ? 'bg-slate-500' : 'bg-emerald-500'
              }`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm truncate">{currentUser.name}</span>
                <Crown className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              </div>
              <p className="text-[11px] font-mono text-cyan-400 mt-0.5">ID: #{currentUser.id}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-300 font-bold border border-yellow-500/30 flex items-center gap-1">
                  <Coins className="w-3 h-3 text-yellow-400" />
                  {currentUser.coins.toLocaleString()}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                  currentUser.isHidden 
                    ? 'bg-slate-600/30 text-slate-300' 
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {currentUser.isHidden ? 'وضع الإخفاء' : 'متصل للجميع'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Links List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-[11px] font-bold text-cyan-400/70 px-2 tracking-wider">الأقسام الرئيسية</p>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-right transition-all border ${
                  isActive
                    ? `bg-gradient-to-r ${item.activeColor} text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] border-transparent font-bold`
                    : isDarkMode
                      ? 'bg-navy-900/40 border-cyan-500/15 text-slate-200 hover:bg-navy-800/80 hover:border-cyan-400/40'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-cyan-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isDarkMode 
                        ? 'bg-navy-950/80 ' + item.color 
                        : 'bg-white ' + item.color
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-sm font-bold truncate leading-snug">{item.label}</p>
                    <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                      {item.sublabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-black/20 text-white border border-white/20' 
                        : item.isLive 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronLeft className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                </div>
              </button>
            );
          })}

          {/* Quick Settings & Modes inside Drawer */}
          <div className="pt-3">
            <p className="text-[11px] font-bold text-cyan-400/70 px-2 tracking-wider mb-2">إعدادات سريعة</p>

            {/* Toggle Online / Hidden Status */}
            <button
              onClick={() => {
                soundManager.playTap();
                onToggleVisibility();
              }}
              className={`w-full p-3 rounded-xl flex items-center justify-between text-right transition border mb-2 ${
                isDarkMode 
                  ? 'bg-navy-900/40 border-cyan-500/15 text-slate-200 hover:bg-navy-800/80' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  {currentUser.isHidden ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <p className="text-xs font-bold">خيار الظهور والإخفاء</p>
                  <p className="text-[10px] text-slate-400">
                    {currentUser.isHidden ? 'الحالة الحالية: وضع الإخفاء (مخفي)' : 'الحالة الحالية: ظاهر للجميع (متصل)'}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                currentUser.isHidden ? 'bg-slate-700 text-slate-300' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {currentUser.isHidden ? 'تفعيل الظهور' : 'تفعيل الإخفاء'}
              </span>
            </button>

            {/* Developer Mode Switch (Interactive testing simulator) */}
            <button
              onClick={() => {
                soundManager.playTap();
                setIsUserDevMode(prev => !prev);
              }}
              className={`w-full p-3 rounded-xl flex items-center justify-between text-right transition border ${
                isUserDevMode 
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' 
                  : isDarkMode 
                    ? 'bg-navy-900/40 border-cyan-500/15 text-slate-200 hover:bg-navy-800/80' 
                    : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">تبديل وضع المستخدم / المطور</p>
                  <p className="text-[10px] text-slate-400">
                    {isUserDevMode ? 'أنت تتصفح حالياً بصلاحيات المطور 👑' : 'أنت تتصفح كـ مستخدم وعضو VIP 💎'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-cyan-400">تبديل</span>
            </button>
          </div>
        </div>

        {/* Footer with Logout Warning Trigger */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'border-cyan-500/20 bg-navy-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
              onOpenLogoutModal();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center gap-2 transition duration-200"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>تسجيل الخروج من المنصة</span>
          </button>
        </div>

      </div>
    </div>
  );
}
