import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Smile, 
  Heart, 
  Volume2, 
  Hash, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Upload,
  User
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function PublicChatSection({
  isDarkMode,
  currentUser,
  publicMessages,
  setPublicMessages
}) {
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImagePreset, setSelectedImagePreset] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  const chatScrollRef = useRef(null);
  const recordIntervalRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [publicMessages]);

  // Voice recording timer simulation
  useEffect(() => {
    if (isRecordingVoice) {
      setRecordDuration(0);
      recordIntervalRef.current = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    }
    return () => {
      if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    };
  }, [isRecordingVoice]);

  // Handle Send Text Message
  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    soundManager.playMessageSent();
    const newMsg = {
      id: Date.now(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        badge: currentUser.badge,
        badgeColor: "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold",
      },
      type: "text",
      content: inputText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
    };

    setPublicMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  // Handle Start / Stop Voice Recording (بصمة صوتية)
  const handleToggleVoiceRecord = () => {
    soundManager.playTap();
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
    } else {
      // Finish recording and send voice note
      setIsRecordingVoice(false);
      soundManager.playMessageSent();

      const seconds = recordDuration || 5;
      const formattedDuration = `0:${seconds < 10 ? '0' : ''}${seconds}`;

      const newMsg = {
        id: Date.now(),
        user: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          badge: currentUser.badge,
          badgeColor: "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold",
        },
        type: "voice",
        audioDuration: formattedDuration,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
      };

      setPublicMessages(prev => [...prev, newMsg]);
      setRecordDuration(0);
    }
  };

  const handleCancelVoiceRecord = () => {
    soundManager.playTap();
    setIsRecordingVoice(false);
    setRecordDuration(0);
  };

  // Play / Pause Voice Fingerprint Simulation
  const handleTogglePlayVoice = (msgId) => {
    soundManager.playTap();
    if (playingVoiceId === msgId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(msgId);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 5000);
    }
  };

  // Handle Send Image Message
  const handleSendImage = () => {
    if (!selectedImagePreset) return;
    soundManager.playMessageSent();

    const newMsg = {
      id: Date.now(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        badge: currentUser.badge,
        badgeColor: "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold",
      },
      type: "image",
      image: selectedImagePreset,
      caption: imageCaption.trim() || 'صورة من أجواء الكحلي 💎',
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
    };

    setPublicMessages(prev => [...prev, newMsg]);
    setShowImageModal(false);
    setSelectedImagePreset(null);
    setImageCaption('');
  };

  // Like message
  const handleLikeMessage = (msgId) => {
    soundManager.playTap();
    setPublicMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return { ...m, likes: (m.likes || 0) + 1 };
      }
      return m;
    }));
  };

  // Image presets for quick sharing
  const imagePresets = [
    { id: 1, title: 'أمسية كحلية 🌌', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80' },
    { id: 2, title: 'الرياض في المساء 🏙️', url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&auto=format&fit=crop&q=80' },
    { id: 3, title: 'قهوة وفخامة ☕', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80' },
    { id: 4, title: 'نجوم وفيروز ✨', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300">
      
      {/* SECTION HEADER CARD */}
      <div className={`p-4 sm:p-5 rounded-3xl border mb-4 flex items-center justify-between shadow-lg ${
        isDarkMode ? 'bg-navy-900/90 border-cyan-500/25' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isDarkMode ? 'bg-navy-950 text-cyan-300' : 'bg-slate-900 text-cyan-300'
            }`}>
              <Hash className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black font-cairo bg-gradient-to-l from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              قسم عام (الشات العام الملكي)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              محادثات عامة لجميع الحسابات • نصية، صور، وبصمات صوتية مع ظهور الهوية
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            متصل: 4,820 عضو
          </span>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className={`rounded-3xl border flex flex-col h-[580px] sm:h-[650px] overflow-hidden shadow-2xl relative ${
        isDarkMode ? 'bg-navy-950/90 border-cyan-500/30 shadow-[0_0_40px_rgba(4,8,18,0.9)]' : 'bg-white border-slate-200'
      }`}>
        
        {/* MESSAGES FEED */}
        <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {publicMessages.map(msg => (
            <div 
              key={msg.id}
              className={`p-4 rounded-2xl border transition-all ${
                msg.user.id === currentUser.id
                  ? isDarkMode
                    ? 'bg-cyan-950/40 border-cyan-500/40 mr-4 sm:mr-12'
                    : 'bg-cyan-50/80 border-cyan-300 mr-4 sm:mr-12'
                  : isDarkMode
                    ? 'bg-navy-900/70 border-cyan-500/15 ml-4 sm:ml-12'
                    : 'bg-slate-50 border-slate-200 ml-4 sm:ml-12'
              }`}
            >
              {/* Message Header: Avatar + Name + User ID + Badge */}
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-cyan-500/15">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={msg.user.avatar} 
                      alt={msg.user.name} 
                      className="w-10 h-10 rounded-xl object-cover border-2 border-cyan-400 shadow-sm"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-navy-950" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm font-cairo">{msg.user.name}</h4>
                      {msg.user.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${msg.user.badgeColor || 'bg-cyan-500/20 text-cyan-300'}`}>
                          {msg.user.badge}
                        </span>
                      )}
                    </div>
                    {/* User ID - Prominently Displayed as requested */}
                    <p className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 font-semibold">
                      <span>ID: #{msg.user.id}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 font-mono">{msg.time}</span>
              </div>

              {/* Message Body Content */}
              <div className="my-2">
                {/* 1. TEXT MESSAGE */}
                {msg.type === 'text' && (
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                    {msg.content}
                  </p>
                )}

                {/* 2. VOICE FINGERPRINT (بصمة صوتية) */}
                {msg.type === 'voice' && (
                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 max-w-sm ${
                    isDarkMode ? 'bg-navy-900/90 border-cyan-400/40' : 'bg-white border-cyan-300 shadow-sm'
                  }`}>
                    <button
                      onClick={() => handleTogglePlayVoice(msg.id)}
                      className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition"
                    >
                      {playingVoiceId === msg.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 fill-slate-950 translate-x-[1px]" />
                      )}
                    </button>

                    {/* Animated Soundwave */}
                    <div className="flex-1 flex items-center gap-1 h-6">
                      {[12, 24, 18, 28, 14, 20, 26, 16, 22, 10, 18, 25, 15, 20].map((h, i) => (
                        <span 
                          key={i} 
                          className={`w-1 rounded-full transition-all duration-200 ${
                            playingVoiceId === msg.id 
                              ? 'bg-cyan-400 animate-pulse' 
                              : 'bg-slate-500'
                          }`}
                          style={{ height: playingVoiceId === msg.id ? `${(h * 1.2) % 24 + 6}px` : `${h}px` }}
                        />
                      ))}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-cyan-400">{msg.audioDuration}</span>
                      <p className="text-[9px] text-slate-400 flex items-center gap-0.5">
                        <Volume2 className="w-2.5 h-2.5" /> بصمة صوتية
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. IMAGE MESSAGE */}
                {msg.type === 'image' && (
                  <div className="space-y-2 max-w-md">
                    <img 
                      src={msg.image} 
                      alt="مرفق صورة" 
                      onClick={() => setPreviewImage(msg.image)}
                      className="rounded-2xl max-h-64 w-full object-cover border border-cyan-500/30 cursor-pointer hover:opacity-95 transition"
                    />
                    {msg.caption && (
                      <p className="text-xs text-slate-200 mt-1 font-medium">{msg.caption}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Message Bottom Action (Likes) */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cyan-500/10">
                <button
                  onClick={() => handleLikeMessage(msg.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span className="font-mono">{msg.likes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VOICE RECORDING ACTIVE BANNER */}
        {isRecordingVoice && (
          <div className="p-3 bg-rose-950/80 border-t border-rose-500/40 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="font-bold text-xs text-rose-300 font-cairo">
                جاري تسجيل البصمة الصوتية... (0:{recordDuration < 10 ? '0' : ''}{recordDuration})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelVoiceRecord}
                className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleToggleVoiceRecord}
                className="px-4 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-md"
              >
                إرسال البصمة 🎙️
              </button>
            </div>
          </div>
        )}

        {/* INPUT BAR (TEXT + IMAGES + VOICE NOTES) */}
        <div className={`p-3 sm:p-4 border-t ${
          isDarkMode ? 'border-cyan-500/20 bg-navy-950' : 'border-slate-200 bg-slate-50'
        }`}>
          <form onSubmit={handleSendText} className="flex items-center gap-2 sm:gap-3">
            
            {/* Voice Fingerprint Button (بصمة صوتية) */}
            <button
              type="button"
              onClick={handleToggleVoiceRecord}
              className={`p-2.5 sm:p-3 rounded-2xl border transition ${
                isRecordingVoice 
                  ? 'bg-rose-600 text-white border-rose-500 animate-bounce' 
                  : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25'
              }`}
              title="تسجيل وإرسال بصمة صوتية"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Photo Attachment Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setShowImageModal(true);
              }}
              className="p-2.5 sm:p-3 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition"
              title="إرفاق صورة"
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            {/* Text Input */}
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب رسالتك في قسم عام لجميع الأعضاء..."
              className={`flex-1 min-w-0 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium border focus:outline-none transition ${
                isDarkMode 
                  ? 'bg-navy-900 border-cyan-500/30 text-white placeholder-slate-500 focus:border-cyan-400' 
                  : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-cyan-500'
              }`}
            />

            {/* Send Button */}
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 font-black text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(0,247,255,0.4)] transition shrink-0 flex items-center gap-1.5"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>

      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* 1. IMAGE ATTACHMENT MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <span>إرسال صورة في قسم عام</span>
              </div>
              <button onClick={() => setShowImageModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">اختر من الصور الجاهزة أو التقط لحظة كحلية:</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {imagePresets.map(preset => (
                <div 
                  key={preset.id}
                  onClick={() => setSelectedImagePreset(preset.url)}
                  className={`p-2 rounded-2xl border cursor-pointer transition relative overflow-hidden ${
                    selectedImagePreset === preset.url
                      ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(0,247,255,0.4)]'
                      : 'border-slate-700 hover:border-cyan-500/50'
                  }`}
                >
                  <img src={preset.url} alt={preset.title} className="w-full h-24 object-cover rounded-xl" />
                  <p className="text-[11px] font-bold mt-1.5 truncate">{preset.title}</p>
                </div>
              ))}
            </div>

            <input 
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="أضف تعليقاً على الصورة (اختياري)..."
              className={`w-full px-4 py-2.5 rounded-xl text-xs border mb-4 focus:outline-none ${
                isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
              }`}
            />

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5"
              >
                إلغاء
              </button>
              <button 
                disabled={!selectedImagePreset}
                onClick={handleSendImage}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs disabled:opacity-50"
              >
                نشر الصورة الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. IMAGE FULL PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-2xl max-h-[85vh]">
            <img src={previewImage} alt="عرض بالحجم الكامل" className="rounded-2xl max-h-[80vh] w-auto object-contain border border-cyan-400 shadow-2xl" />
            <button className="absolute -top-3 -right-3 p-2 rounded-full bg-slate-900 text-white border border-cyan-400 shadow-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
