import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Lock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Gift, 
  ShieldAlert, 
  UserX, 
  Ban, 
  Volume1, 
  Sparkles, 
  Heart, 
  Users, 
  Crown, 
  UserPlus, 
  AlertCircle, 
  Flame, 
  Check, 
  X, 
  ShieldCheck, 
  HelpCircle,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundService';
import { STORE_GIFTS } from '../data/mockData';

export default function LiveStreamSection({
  isDarkMode,
  currentUser,
  setCurrentUser,
  isDeveloperLive,
  setIsDeveloperLive,
  developerProfile,
  guestMics,
  setGuestMics,
  guestRequests,
  setGuestRequests,
  liveComments,
  setLiveComments,
  isUserDevMode,
  setIsUserDevMode,
}) {
  const [commentText, setCommentText] = useState('');
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showModModal, setShowModModal] = useState(false);
  const [selectedUserForMod, setSelectedUserForMod] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [activeGiftAnimation, setActiveGiftAnimation] = useState(null);
  const [isDeveloperMicOn, setIsDeveloperMicOn] = useState(true);
  const [isDeveloperCamOn, setIsDeveloperCamOn] = useState(true);
  const [hasRequestedGuest, setHasRequestedGuest] = useState(false);
  const [screenShieldActive, setScreenShieldActive] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ top: 20, left: 30 });
  const [mutedUsersList, setMutedUsersList] = useState([]);
  const [bannedUsersList, setBannedUsersList] = useState([]);
  const chatScrollRef = useRef(null);

  // Auto scroll comments
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [liveComments]);

  // Moving dynamic anti-screenshot watermark
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPos({
        top: Math.floor(Math.random() * 70) + 15,
        left: Math.floor(Math.random() * 70) + 15,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Screen protection listeners (PrintScreen & Window blur detection)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's'))) {
        setScreenShieldActive(true);
        setTimeout(() => setScreenShieldActive(false), 3500);
      }
    };

    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, []);

  // Handle Comment Submission
  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (bannedUsersList.includes(currentUser.id)) {
      alert("⚠️ حسابك محظور من المشاركة في هذا البث.");
      return;
    }

    if (mutedUsersList.includes(currentUser.id)) {
      alert("⚠️ تم كتم حسابك مؤقتاً بواسطة المطور.");
      return;
    }

    soundManager.playMessageSent();
    const newComment = {
      id: Date.now(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      text: commentText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setLiveComments(prev => [...prev, newComment]);
    setCommentText('');

    // Spawn floating heart occasionally
    spawnHeart();
  };

  // Spawn floating reaction heart
  const spawnHeart = () => {
    const heartId = Date.now() + Math.random();
    setFloatingHearts(prev => [...prev, { id: heartId, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 2000);
  };

  // Handle Send Gift
  const handleSendGift = (gift) => {
    if (currentUser.coins < gift.price) {
      alert("رصيد الكوينز غير كافٍ! يرجى شحن محفظتك من قسم المتجر.");
      return;
    }

    // Deduct coins
    setCurrentUser(prev => ({
      ...prev,
      coins: prev.coins - gift.price,
      giftsSent: (prev.giftsSent || 0) + 1,
    }));

    soundManager.playGiftChime();

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f7ff', '#06b6d4', '#eab308', '#ec4899', '#3b82f6'],
      });
    } catch (e) {
      console.log(e);
    }

    // Show big screen gift animation
    setActiveGiftAnimation({
      gift,
      sender: currentUser.name,
      senderAvatar: currentUser.avatar,
    });

    // Add gift message to live chat
    setLiveComments(prev => [
      ...prev,
      {
        id: Date.now(),
        user: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        text: `أرسل هدية فاخرة (${gift.name}) إلى المطور! 🔥💎`,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        isGiftNotice: true,
        giftName: gift.name,
      }
    ]);

    setShowGiftModal(false);

    // Hide animation after 4 seconds
    setTimeout(() => {
      setActiveGiftAnimation(null);
    }, 4200);
  };

  // Viewer request guest mic
  const handleRequestGuestMic = () => {
    soundManager.playTap();
    if (hasRequestedGuest) {
      setHasRequestedGuest(false);
      setGuestRequests(prev => prev.filter(r => r.user.id !== currentUser.id));
      return;
    }

    setHasRequestedGuest(true);
    const newReq = {
      id: 'req-' + Date.now(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        level: currentUser.level,
      },
      requestedAt: 'الآن',
    };
    setGuestRequests(prev => [newReq, ...prev]);
  };

  // Developer Accept Guest to specific mic
  const handleAcceptGuest = (req, targetMicId) => {
    soundManager.playTap();
    setGuestMics(prev => prev.map(m => {
      if (m.micId === targetMicId) {
        return {
          ...m,
          occupied: true,
          user: req.user,
          isMuted: false,
          isSpeaking: true,
          volume: 80,
        };
      }
      return m;
    }));

    // Remove from requests
    setGuestRequests(prev => prev.filter(r => r.id !== req.id));
    if (req.user.id === currentUser.id) {
      setHasRequestedGuest(false);
    }
  };

  // Developer Remove/Kick Guest from mic
  const handleRemoveGuestFromMic = (micId) => {
    soundManager.playTap();
    setGuestMics(prev => prev.map(m => {
      if (m.micId === micId) {
        return {
          ...m,
          occupied: false,
          user: null,
          isMuted: false,
          isSpeaking: false,
          volume: 0,
        };
      }
      return m;
    }));
  };

  // Toggle Guest Mic Mute
  const handleToggleGuestMute = (micId) => {
    soundManager.playTap();
    setGuestMics(prev => prev.map(m => {
      if (m.micId === micId) {
        return { ...m, isMuted: !m.isMuted };
      }
      return m;
    }));
  };

  // Host Moderation actions (Mute, Kick, Ban)
  const handleModerateUser = (action) => {
    if (!selectedUserForMod) return;
    soundManager.playTap();

    if (action === 'mute') {
      setMutedUsersList(prev => [...prev, selectedUserForMod.id]);
      setLiveComments(prev => [
        ...prev,
        {
          id: Date.now(),
          systemNotice: true,
          text: `🛡️ قام المطور بكتم المستخدم (${selectedUserForMod.name}) من التعليقات.`,
        }
      ]);
    } else if (action === 'kick') {
      setLiveComments(prev => [
        ...prev,
        {
          id: Date.now(),
          systemNotice: true,
          text: `🚪 تم طرد المستخدم (${selectedUserForMod.name}) من غرفة البث.`,
        }
      ]);
    } else if (action === 'ban') {
      setBannedUsersList(prev => [...prev, selectedUserForMod.id]);
      setLiveComments(prev => [
        ...prev,
        {
          id: Date.now(),
          systemNotice: true,
          text: `🚫 قام المطور بحظر المستخدم (${selectedUserForMod.name}) نهائياً من البث.`,
        }
      ]);
    }

    setShowModModal(false);
    setSelectedUserForMod(null);
  };

  // Toggle Developer Live status
  const handleToggleLiveBroadcast = () => {
    soundManager.playTap();
    const nextState = !isDeveloperLive;
    setIsDeveloperLive(nextState);
  };

  // -------------------------------------------------------------
  // VIEW 1: LOCKED STATE (عندما لا يوجد بث من المطور)
  // -------------------------------------------------------------
  if (!isDeveloperLive) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
        <div className={`relative overflow-hidden rounded-3xl border p-8 sm:p-14 text-center ${
          isDarkMode 
            ? 'bg-navy-900/90 border-cyan-500/30 shadow-[0_0_50px_rgba(4,8,18,0.9)]' 
            : 'bg-white border-cyan-300 shadow-xl'
        }`}>
          {/* Ambient turquoise glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Locked Icon & Badges */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 p-[2px] shadow-[0_0_35px_rgba(0,247,255,0.4)] animate-float">
              <div className={`w-full h-full rounded-[22px] flex items-center justify-center ${
                isDarkMode ? 'bg-navy-950 text-cyan-300' : 'bg-slate-900 text-cyan-300'
              }`}>
                <Lock className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
            <span className="absolute -bottom-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold">
              البث مقفل حالياً
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-cairo mb-3 bg-gradient-to-l from-cyan-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
            قسم البث المباشر مقفل
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
            يفتح قسم البث المباشر والمايكات الأربعة تلقائياً وبشكل حصري عند بدء المطور للبث. لا يمكن الدخول إلا عندما يكون المطور على الهواء.
          </p>

          {/* Developer Broadcast Control (Or switch to dev) */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleToggleLiveBroadcast}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 hover:shadow-[0_0_30px_rgba(0,247,255,0.6)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
              <span>بدء البث كـ مطور المنصة 👑</span>
            </button>

            <button
              onClick={() => setIsUserDevMode(prev => !prev)}
              className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm border transition ${
                isDarkMode
                  ? 'bg-navy-950/80 border-cyan-500/30 text-cyan-300 hover:bg-navy-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{isUserDevMode ? 'أنت في وضع المطور الآن' : 'تبديل وضع التجربة إلى مطور'}</span>
            </button>
          </div>

          {/* Security Features Badge */}
          <div className="mt-12 pt-8 border-t border-cyan-500/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>حماية البث من لقطات الشاشة والتصوير</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mic className="w-4 h-4 text-teal-400" />
              <span>4 مايكات تفاعلية تحت حساب المطور</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-4 h-4 text-yellow-400" />
              <span>هدايا ومؤثرات فاخرة ثلاثية الأبعاد</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ACTIVE LIVE BROADCAST STAGE
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 relative select-none">
      
      {/* SCREENSHOT & RECORDING ANTI-PIRACY SHIELD OVERLAY */}
      {screenShieldActive && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center backdrop-blur-2xl animate-in fade-in">
          <ShieldAlert className="w-20 h-20 text-rose-500 mb-4 animate-bounce" />
          <h2 className="text-2xl font-black text-white font-cairo mb-2">
            ⚠️ تنبيه أمني: المحتوى محمي من التصوير
          </h2>
          <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            قسم البث في منصة "الكحلي" محمي بالكامل من لقطات الشاشة وتسجيل الفيديو لمنع تسريب المحتوى والحفاظ على خصوصية المطور والضيوف.
          </p>
          <button 
            onClick={() => setScreenShieldActive(false)}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
          >
            العودة للمشاهدة
          </button>
        </div>
      )}

      {/* FULL-SCREEN LUXURY GIFT CELEBRATION ANIMATION */}
      {activeGiftAnimation && (
        <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center animate-in zoom-in duration-300">
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-navy-900/90 to-navy-950/95 border-2 border-cyan-400/80 shadow-[0_0_80px_rgba(0,247,255,0.7)] text-center max-w-md mx-4">
            <div className="text-7xl sm:text-8xl mb-4 animate-bounce">
              {activeGiftAnimation.gift.icon}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <img 
                src={activeGiftAnimation.senderAvatar} 
                alt={activeGiftAnimation.sender} 
                className="w-8 h-8 rounded-full border border-cyan-400 object-cover" 
              />
              <span className="font-bold text-cyan-300 text-base">{activeGiftAnimation.sender}</span>
            </div>
            <p className="text-xs text-slate-300">أهدى المطور</p>
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-cairo mt-1">
              {activeGiftAnimation.gift.name}
            </h3>
            <div className="mt-3 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono inline-block">
              💎 {activeGiftAnimation.gift.price} كوينز
            </div>
          </div>
        </div>
      )}

      {/* TOP LIVE HEADER BANNER */}
      <div className={`p-4 rounded-2xl border mb-4 flex flex-wrap items-center justify-between gap-3 ${
        isDarkMode ? 'bg-navy-900/80 border-cyan-500/20' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={developerProfile.avatar} 
              alt={developerProfile.name} 
              className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-400 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-rose-500 text-white text-[9px] font-bold px-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base font-cairo flex items-center gap-1">
                <span>{developerProfile.name}</span>
                <Crown className="w-4 h-4 text-yellow-400" />
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                المطور الرئيسي
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs sm:max-w-md">
              {developerProfile.title}
            </p>
          </div>
        </div>

        {/* Live Metrics & Stream Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            <Users className="w-4 h-4" />
            <span>{developerProfile.viewers.toLocaleString()} مشاهد</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{developerProfile.likes.toLocaleString()} تفاعل</span>
          </div>

          {/* Test Screenshot Protection Trigger Button */}
          <button
            onClick={() => {
              setScreenShieldActive(true);
              setTimeout(() => setScreenShieldActive(false), 3500);
            }}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500/25"
            title="تجربة نظام حماية البث من لقطات الشاشة"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>فحص الحماية 🔒</span>
          </button>

          {/* Developer Control: End Live */}
          {(isUserDevMode || currentUser.id === developerProfile.id) && (
            <button
              onClick={handleToggleLiveBroadcast}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
            >
              إنهاء البث 🛑
            </button>
          )}
        </div>
      </div>

      {/* MAIN BROADCAST GRID: STAGE & 4 GUEST MICS (Right) + LIVE CHAT (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* RIGHT COLUMN: DEVELOPER MAIN STAGE + 4 GUEST MICS (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* DEVELOPER HOST MAIN STAGE */}
          <div className={`relative rounded-3xl overflow-hidden border p-6 aspect-video sm:aspect-[16/9] max-h-[380px] flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)]' 
              : 'bg-gradient-to-br from-slate-900 via-navy-900 to-slate-900 border-cyan-400/40 text-white shadow-xl'
          }`}>
            
            {/* DYNAMIC ANTI-SCREENSHOT WATERMARK */}
            <div 
              className="absolute pointer-events-none text-cyan-400/25 font-mono text-xs font-bold transition-all duration-1000 z-10"
              style={{ top: `${watermarkPos.top}%`, left: `${watermarkPos.left}%` }}
            >
              🔒 ID: #{currentUser.id} | منصة الكحلي الملكية
            </div>

            {/* Stage Top Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-black flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  بث المطور
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-cyan-300 text-xs font-mono border border-cyan-400/30">
                  HD 1080p | 60 FPS
                </span>
              </div>

              {/* Developer Stage Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playMicToggle(!isDeveloperMicOn);
                    setIsDeveloperMicOn(prev => !prev);
                  }}
                  className={`p-2 rounded-xl backdrop-blur-md transition ${
                    isDeveloperMicOn ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' : 'bg-rose-500/40 text-rose-300 border border-rose-500/60'
                  }`}
                  title={isDeveloperMicOn ? 'كتم مايك المطور' : 'تشغيل مايك المطور'}
                >
                  {isDeveloperMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsDeveloperCamOn(prev => !prev)}
                  className={`p-2 rounded-xl backdrop-blur-md transition ${
                    isDeveloperCamOn ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' : 'bg-rose-500/40 text-rose-300 border border-rose-500/60'
                  }`}
                  title={isDeveloperCamOn ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
                >
                  {isDeveloperCamOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Center: Developer Visual Presence / Soundwave Equalizer */}
            <div className="relative z-20 flex flex-col items-center justify-center my-auto">
              <div className="relative">
                {/* Neon pulsating rings */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 opacity-60 blur-md animate-pulse" />
                
                <img 
                  src={developerProfile.avatar} 
                  alt={developerProfile.name}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-cyan-400 shadow-2xl z-10" 
                />

                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 z-20 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow-md">
                  <Crown className="w-3 h-3" />
                  المطور
                </div>
              </div>

              {/* Sound equalizer bars */}
              {isDeveloperMicOn && (
                <div className="flex items-center gap-1 mt-4 h-6">
                  <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-3"></span>
                  <span className="w-1 bg-teal-300 rounded-full animate-[bounce_0.8s_infinite_200ms] h-5"></span>
                  <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.5s_infinite_300ms] h-6"></span>
                  <span className="w-1 bg-blue-400 rounded-full animate-[bounce_0.7s_infinite_150ms] h-4"></span>
                  <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.9s_infinite_250ms] h-5"></span>
                </div>
              )}
            </div>

            {/* Stage Bottom Bar */}
            <div className="relative z-20 flex items-center justify-between text-xs text-slate-300 bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 font-cairo">
                <span className="text-cyan-300 font-bold">المطور الرئيسي:</span>
                <span>يتحدث في موضوع سهرة الليلة 🎙️✨</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>حماية مشفرة ضد التصوير</span>
              </div>
            </div>
          </div>

          {/* 4 GUEST MICS UNDER DEVELOPER ACCOUNT (4 مايكات تحت حساب المطور) */}
          <div className={`p-4 sm:p-5 rounded-3xl border ${
            isDarkMode ? 'bg-navy-900/90 border-cyan-500/25' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/15">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm sm:text-base font-cairo">
                  مايكات القست (4 مايكات تحت المطور)
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                  {guestMics.filter(m => m.occupied).length} / 4
                </span>
              </div>

              {/* Guest Request / Manage Requests button */}
              <div className="flex items-center gap-2">
                {(isUserDevMode || currentUser.id === developerProfile.id) ? (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setShowRequestsModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>طلبات القست</span>
                    {guestRequests.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                        {guestRequests.length}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleRequestGuestMic}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-sm ${
                      hasRequestedGuest
                        ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{hasRequestedGuest ? 'إلغاء طلب القست ⏳' : 'طلب صعود قست 🎙️'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 4 MICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {guestMics.map((mic) => (
                <div
                  key={mic.micId}
                  className={`relative p-3.5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between min-h-[145px] ${
                    mic.occupied
                      ? isDarkMode
                        ? 'bg-navy-950/80 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'bg-cyan-50/70 border-cyan-300 shadow-sm'
                      : isDarkMode
                        ? 'bg-navy-950/30 border-dashed border-slate-700 hover:border-cyan-500/40'
                        : 'bg-slate-50 border-dashed border-slate-300'
                  }`}
                >
                  {/* Mic Number Tag */}
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">
                      مايك #{mic.micId}
                    </span>
                    {mic.occupied && (
                      <span className={`w-2 h-2 rounded-full ${mic.isMuted ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`} />
                    )}
                  </div>

                  {mic.occupied ? (
                    <>
                      {/* Occupied Guest Avatar */}
                      <div className="relative my-1">
                        {mic.isSpeaking && !mic.isMuted && (
                          <div className="absolute -inset-1.5 rounded-full bg-cyan-400/30 animate-ping" />
                        )}
                        <img 
                          src={mic.user.avatar} 
                          alt={mic.user.name} 
                          className={`w-12 h-12 rounded-full object-cover border-2 shadow-md relative z-10 ${
                            mic.isMuted ? 'border-rose-500/70' : 'border-cyan-400'
                          }`}
                        />
                        {/* Mic state icon */}
                        <span className={`absolute -bottom-1 -right-1 z-20 p-1 rounded-full text-white text-[9px] ${
                          mic.isMuted ? 'bg-rose-600' : 'bg-emerald-600'
                        }`}>
                          {mic.isMuted ? <MicOff className="w-2.5 h-2.5" /> : <Mic className="w-2.5 h-2.5" />}
                        </span>
                      </div>

                      <p className="font-bold text-xs truncate max-w-[110px]">{mic.user.name}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">Lv.{mic.user.level}</p>

                      {/* Developer control for this guest mic */}
                      {(isUserDevMode || currentUser.id === developerProfile.id) && (
                        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-cyan-500/20 w-full justify-center">
                          <button
                            onClick={() => handleToggleGuestMute(mic.micId)}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-300 text-[10px]"
                            title={mic.isMuted ? 'إلغاء كتم الضيف' : 'كتم الضيف'}
                          >
                            {mic.isMuted ? <Volume2 className="w-3 h-3 text-emerald-400" /> : <VolumeX className="w-3 h-3 text-rose-400" />}
                          </button>
                          <button
                            onClick={() => handleRemoveGuestFromMic(mic.micId)}
                            className="p-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-[10px]"
                            title="إنزال الضيف من المايك"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Empty Mic Spot */}
                      <div className="my-auto flex flex-col items-center gap-1.5 py-2">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-slate-400">
                          <Mic className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">مايك شاغر</span>
                      </div>

                      <button
                        onClick={handleRequestGuestMic}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold underline"
                      >
                        طلب المايك
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Gift Trigger Bar (Under Mics) */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
            isDarkMode ? 'bg-navy-900/60 border-cyan-500/20' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {STORE_GIFTS.slice(0, 4).map(gift => (
                <button
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 shrink-0 transition hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-navy-950/80 border-cyan-500/30 text-slate-200 hover:border-cyan-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="text-lg">{gift.icon}</span>
                  <div className="text-right">
                    <p className="text-[11px] font-bold leading-none">{gift.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-yellow-400 font-mono mt-0.5">💎 {gift.price}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                soundManager.playTap();
                setShowGiftModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md hover:brightness-110"
            >
              <Gift className="w-4 h-4 text-slate-950" />
              <span>كل الهدايا 🎁</span>
            </button>
          </div>
        </div>

        {/* LEFT COLUMN: LIVE COMMENTS & MODERATION (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col h-[520px] sm:h-[600px]">
          <div className={`flex-1 rounded-3xl border flex flex-col overflow-hidden relative ${
            isDarkMode ? 'bg-navy-900/90 border-cyan-500/30' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            
            {/* Live Chat Top Header */}
            <div className={`p-3.5 border-b flex items-center justify-between ${
              isDarkMode ? 'border-cyan-500/20 bg-navy-950/50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <h4 className="font-bold text-xs sm:text-sm font-cairo">تكس التعليقات المباشرة</h4>
              </div>
              <span className="text-[10px] text-slate-400">تحديث فوري</span>
            </div>

            {/* FLOATING REACTION HEARTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {floatingHearts.map(h => (
                <div
                  key={h.id}
                  className="absolute bottom-16 text-rose-500 animate-[float_2s_ease-out_forwards]"
                  style={{ left: `${h.left}%` }}
                >
                  <Heart className="w-6 h-6 fill-rose-500 drop-shadow-md" />
                </div>
              ))}
            </div>

            {/* Comments List Feed */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
              {liveComments.map(comment => {
                if (comment.systemNotice) {
                  return (
                    <div key={comment.id} className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-bold text-center">
                      {comment.text}
                    </div>
                  );
                }

                if (comment.isGiftNotice) {
                  return (
                    <div key={comment.id} className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2">
                      <Gift className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>{comment.user.name}: {comment.text}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={comment.id}
                    className={`p-2.5 rounded-2xl text-xs transition border flex items-start gap-2.5 ${
                      isDarkMode 
                        ? 'bg-navy-950/60 border-cyan-500/15 hover:border-cyan-400/30' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400/40 shrink-0 mt-0.5"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span 
                          onClick={() => {
                            if (isUserDevMode || currentUser.id === developerProfile.id) {
                              setSelectedUserForMod(comment.user);
                              setShowModModal(true);
                            }
                          }}
                          className="font-bold text-cyan-300 text-[11px] truncate cursor-pointer hover:underline"
                        >
                          {comment.user.name}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">{comment.time}</span>
                      </div>
                      <p className="text-slate-200 text-xs mt-0.5 leading-relaxed break-words">{comment.text}</p>
                    </div>

                    {/* Developer Moderation shortcut on each comment */}
                    {(isUserDevMode || currentUser.id === developerProfile.id) && (
                      <button
                        onClick={() => {
                          setSelectedUserForMod(comment.user);
                          setShowModModal(true);
                        }}
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-cyan-300 shrink-0"
                        title="إجراءات المطور: كتم، طرد، حظر"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Comment Input Box & Heart Reaction */}
            <form onSubmit={handleSendComment} className={`p-2.5 border-t flex items-center gap-2 ${
              isDarkMode ? 'border-cyan-500/20 bg-navy-950/70' : 'border-slate-200 bg-slate-50'
            }`}>
              <button
                type="button"
                onClick={spawnHeart}
                className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition shrink-0"
                title="إرسال قلب وتفاعل"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
              </button>

              <input 
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="اكتب تعليقك في البث..."
                className={`flex-1 min-w-0 px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none transition ${
                  isDarkMode 
                    ? 'bg-navy-900 border-cyan-500/30 text-white placeholder-slate-500 focus:border-cyan-400' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-cyan-500'
                }`}
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 transition shrink-0"
                title="إرسال التعليق"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </form>

          </div>
        </div>

      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* 1. DEVELOPER MODERATION MODAL (كتم، طرد، حظر) */}
      {showModModal && selectedUserForMod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-sm rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>صلاحيات المطور للإشراف</span>
              </div>
              <button onClick={() => setShowModModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
              <img src={selectedUserForMod.avatar} alt={selectedUserForMod.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-sm">{selectedUserForMod.name}</p>
                <p className="text-xs text-cyan-400 font-mono">ID: #{selectedUserForMod.id}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Mute */}
              <button
                onClick={() => handleModerateUser('mute')}
                className="w-full p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <VolumeX className="w-4 h-4" />
                  <span>كتم المستخدم من التعليقات (كتم)</span>
                </div>
                <span>5 دقائق</span>
              </button>

              {/* Kick */}
              <button
                onClick={() => handleModerateUser('kick')}
                className="w-full p-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <UserX className="w-4 h-4" />
                  <span>طرد من البث المباشر (طرد)</span>
                </div>
                <span>فوري</span>
              </button>

              {/* Ban */}
              <button
                onClick={() => handleModerateUser('ban')}
                className="w-full p-3 rounded-xl bg-red-600/25 hover:bg-red-600/40 border border-red-500/50 text-red-300 font-bold text-xs flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4" />
                  <span>حظر الحساب نهائياً من البث (حظر)</span>
                </div>
                <span>دائم</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. GUEST REQUESTS QUEUE MODAL (قائمة طلبات القست للمطور) */}
      {showRequestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>قائمة طلبات صعود القست ({guestRequests.length})</span>
              </div>
              <button onClick={() => setShowRequestsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {guestRequests.length === 0 ? (
                <p className="text-center py-8 text-xs text-slate-400">لا توجد طلبات قست جديدة حالياً</p>
              ) : (
                guestRequests.map(req => (
                  <div key={req.id} className="p-3.5 rounded-2xl border border-cyan-500/20 bg-navy-900/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={req.user.avatar} alt={req.user.name} className="w-10 h-10 rounded-xl object-cover border border-cyan-400" />
                      <div className="min-w-0">
                        <p className="font-bold text-xs truncate">{req.user.name}</p>
                        <p className="text-[10px] text-cyan-400 font-mono">Lv.{req.user.level} • {req.requestedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Pick an empty mic */}
                      {[1, 2, 3, 4].map(mId => {
                        const micItem = guestMics.find(m => m.micId === mId);
                        const isOcc = micItem?.occupied;
                        return (
                          <button
                            key={mId}
                            disabled={isOcc}
                            onClick={() => handleAcceptGuest(req, mId)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                              isOcc
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110'
                            }`}
                            title={isOcc ? `مايك ${mId} مشغول` : `قبول في مايك ${mId}`}
                          >
                            مـ{mId}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setGuestRequests(prev => prev.filter(r => r.id !== req.id))}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                        title="رفض الطلب"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. FULL GIFTS CATALOG MODAL (كتالوج الهدايا الفاخرة) */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <Gift className="w-5 h-5 text-yellow-400" />
                <span>متجر هدايا البث المباشر</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-yellow-400 font-bold px-2.5 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                  💎 {currentUser.coins.toLocaleString()}
                </span>
                <button onClick={() => setShowGiftModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {STORE_GIFTS.map(gift => (
                <div
                  key={gift.id}
                  className={`p-4 rounded-2xl border text-center transition hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,247,255,0.2)] flex flex-col justify-between ${
                    isDarkMode ? 'bg-navy-900/80 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-4xl sm:text-5xl mb-2">{gift.icon}</div>
                  <h5 className="font-bold text-xs">{gift.name}</h5>
                  <p className="text-[10px] text-slate-400 my-1">{gift.desc}</p>
                  <div className="mt-2 pt-2 border-t border-cyan-500/20">
                    <button
                      onClick={() => handleSendGift(gift)}
                      className="w-full py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>إرسال</span>
                      <span className="font-mono text-[10px]">({gift.price}💎)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
