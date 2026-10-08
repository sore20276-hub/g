import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Eye, 
  Share2, 
  Plus, 
  Volume2, 
  VolumeX, 
  Music2, 
  ChevronUp, 
  ChevronDown, 
  Send, 
  X, 
  Check, 
  Video as VideoIcon,
  Play,
  Pause
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function StoriesSection({
  isDarkMode,
  currentUser,
  stories,
  setStories
}) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  
  // Create story state
  const [newCaption, setNewCaption] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('نغمات الكحلي الفاخرة 🎵');
  const [selectedVideoPreset, setSelectedVideoPreset] = useState(0);

  const activeStory = stories[currentStoryIndex] || stories[0];

  const videoPresets = [
    {
      url: "https://assets.mixkit.co/videos/preview/mixkit-neon-lights-in-the-dark-41712-large.mp4",
      title: "أضواء نيون وسهرة كحلية 💎",
      poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
    },
    {
      url: "https://assets.mixkit.co/videos/preview/mixkit-glittering-lights-in-the-night-42998-large.mp4",
      title: "بريق فيروزي فاخر ✨",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80"
    },
    {
      url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-31912-large.mp4",
      title: "أجواء تقنية وسرعة ⚡",
      poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80"
    }
  ];

  // Navigate next / prev story
  const handleNextStory = () => {
    soundManager.playTap();
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      setCurrentStoryIndex(0); // loop back
    }
  };

  const handlePrevStory = () => {
    soundManager.playTap();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    }
  };

  // Toggle Like (التفاعل)
  const handleToggleLike = () => {
    soundManager.playTap();
    setStories(prev => prev.map((s, idx) => {
      if (idx === currentStoryIndex) {
        const nextState = !s.isLiked;
        return {
          ...s,
          isLiked: nextState,
          likesCount: nextState ? s.likesCount + 1 : s.likesCount - 1,
        };
      }
      return s;
    }));
  };

  // Add Comment (الرسائل والتعليقات)
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    soundManager.playMessageSent();
    const commentObj = {
      id: Date.now(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      text: newCommentText.trim(),
    };

    setStories(prev => prev.map((s, idx) => {
      if (idx === currentStoryIndex) {
        return {
          ...s,
          commentsCount: s.commentsCount + 1,
          comments: [...(s.comments || []), commentObj],
        };
      }
      return s;
    }));

    setNewCommentText('');
  };

  // Publish New Story
  const handlePublishStory = (e) => {
    e.preventDefault();
    soundManager.playGiftChime();

    const selectedPreset = videoPresets[selectedVideoPreset];
    const newStory = {
      id: 'story-' + Date.now(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        isVerified: true,
      },
      videoUrl: selectedPreset.url,
      poster: selectedPreset.poster,
      caption: newCaption.trim() || 'مقطع ستوري جديد في منصة الكحلي 💎 #الكحلي',
      song: newSongTitle.trim() || 'صوت الكحلي الأصلي 🎵',
      likesCount: 1,
      commentsCount: 0,
      viewsCount: 120,
      isLiked: true,
      comments: [],
    };

    setStories(prev => [newStory, ...prev]);
    setCurrentStoryIndex(0);
    setShowCreateStoryModal(false);
    setNewCaption('');
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300">
      
      {/* HEADER BAR */}
      <div className={`p-4 rounded-3xl border mb-4 flex items-center justify-between shadow-lg ${
        isDarkMode ? 'bg-navy-900/90 border-cyan-500/25' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-[2px] shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isDarkMode ? 'bg-navy-950 text-amber-300' : 'bg-slate-900 text-amber-300'
            }`}>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black font-cairo bg-gradient-to-l from-amber-400 via-rose-300 to-cyan-300 bg-clip-text text-transparent">
              قسم ستوري (مقاطع ريلز شبيهة تيك توك)
            </h2>
            <p className="text-xs text-slate-400">تصفح الفيديوهات القصيرة، التفاعل، المشاهدات، والتعليقات</p>
          </div>
        </div>

        {/* Create Story Trigger */}
        <button
          onClick={() => {
            soundManager.playTap();
            setShowCreateStoryModal(true);
          }}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition"
        >
          <Plus className="w-4 h-4" />
          <span>نشر مقطع ستوري 📹</span>
        </button>
      </div>

      {/* TIKTOK-LIKE SHORT VIDEO CONTAINER */}
      <div className="flex items-center justify-center gap-4">
        
        {/* REEL PLAYER CARD */}
        <div className="relative w-full max-w-sm sm:max-w-md h-[620px] sm:h-[680px] rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-black">
          
          {/* Video / Loop Video */}
          <video
            key={activeStory.id}
            src={activeStory.videoUrl}
            poster={activeStory.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
            onClick={() => setIsPlaying(prev => !prev)}
          />

          {/* Top Overlay (Mute + Sound Indicator) */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-cyan-300 text-xs font-bold border border-cyan-400/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ستوري الكحلي
            </span>

            <button
              onClick={() => {
                soundManager.playTap();
                setIsMuted(prev => !prev);
              }}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 hover:bg-black/70 transition"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>

          {/* RIGHT SIDE ACTION BUTTONS (Likes, Comments, Views, Share) */}
          <div className="absolute bottom-16 left-4 z-20 flex flex-col items-center gap-4">
            
            {/* Creator Avatar with Follow Plus */}
            <div className="relative mb-1">
              <img 
                src={activeStory.author.avatar} 
                alt={activeStory.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 shadow-xl" 
              />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-md">
                +
              </span>
            </div>

            {/* 1. LIKES & INTERACTION (التفاعل) */}
            <button
              onClick={handleToggleLike}
              className="flex flex-col items-center group"
            >
              <div className={`p-3 rounded-full backdrop-blur-md transition transform group-hover:scale-110 ${
                activeStory.isLiked 
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_#f43f5e]' 
                  : 'bg-black/50 text-white border border-white/20'
              }`}>
                <Heart className={`w-6 h-6 ${activeStory.isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-white text-xs font-bold font-mono mt-1 drop-shadow-md">
                {activeStory.likesCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-300">تفاعل</span>
            </button>

            {/* 2. COMMENTS & MESSAGES (الرسائل والتعليقات) */}
            <button
              onClick={() => {
                soundManager.playTap();
                setShowCommentsModal(true);
              }}
              className="flex flex-col items-center group"
            >
              <div className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 group-hover:scale-110 transition">
                <MessageSquare className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-white text-xs font-bold font-mono mt-1 drop-shadow-md">
                {activeStory.commentsCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-300">تعليق</span>
            </button>

            {/* 3. VIEWS COUNTER (المشاهدات) */}
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                <Eye className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-white text-xs font-bold font-mono mt-1 drop-shadow-md">
                {activeStory.viewsCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-300">مشاهدة</span>
            </div>

            {/* 4. SPINNING MUSIC DISC */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 flex items-center justify-center animate-spin-slow shadow-lg">
              <Music2 className="w-5 h-5 text-white" />
            </div>

          </div>

          {/* BOTTOM OVERLAY (Author Name, Caption, Music Track) */}
          <div className="absolute bottom-4 right-4 left-20 z-20 text-right">
            <h4 className="text-white font-bold text-sm drop-shadow-md font-cairo flex items-center gap-1.5 justify-end">
              <span>{activeStory.author.name}</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </h4>
            <p className="text-slate-100 text-xs mt-1 leading-relaxed line-clamp-2 drop-shadow-md">
              {activeStory.caption}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-medium mt-1.5 justify-end">
              <span className="truncate">{activeStory.song}</span>
              <Music2 className="w-3.5 h-3.5 shrink-0 animate-bounce" />
            </div>
          </div>

        </div>

        {/* DESKTOP STORY NAVIGATION ARROWS */}
        <div className="hidden sm:flex flex-col gap-3">
          <button
            onClick={handlePrevStory}
            disabled={currentStoryIndex === 0}
            className="p-3 rounded-2xl bg-navy-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-30 transition shadow-lg"
            title="المقطع السابق"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          
          <span className="text-xs font-mono font-bold text-cyan-400 text-center">
            {currentStoryIndex + 1} / {stories.length}
          </span>

          <button
            onClick={handleNextStory}
            className="p-3 rounded-2xl bg-navy-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition shadow-lg"
            title="المقطع التالي"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* ----------------- MODALS ----------------- */}

      {/* 1. COMMENTS BOTTOM-SHEET / MODAL */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 border shadow-2xl h-[520px] flex flex-col ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-3">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>التعليقات والرسائل ({activeStory.comments?.length || 0})</span>
              </div>
              <button onClick={() => setShowCommentsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto space-y-3 p-1">
              {(activeStory.comments || []).length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-400">كن أول من يترك تعليقاً على هذا المقطع!</p>
              ) : (
                activeStory.comments.map(c => (
                  <div key={c.id} className="p-3 rounded-2xl bg-navy-900/60 border border-cyan-500/15 flex items-start gap-3">
                    <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover border border-cyan-400" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-cyan-300">{c.user}</p>
                      <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment input form */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-cyan-500/20 flex gap-2">
              <input 
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="أضف تعليقك الراقي..."
                className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none ${
                  isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CREATE / PUBLISH NEW STORY MODAL */}
      {showCreateStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <VideoIcon className="w-5 h-5 text-amber-400" />
                <span>نشر مقطع ستوري جديد</span>
              </div>
              <button onClick={() => setShowCreateStoryModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2">اختر نموذج الفيديو:</p>
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {videoPresets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideoPreset(idx)}
                  className={`p-1.5 rounded-2xl border cursor-pointer transition relative ${
                    selectedVideoPreset === idx
                      ? 'border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(0,247,255,0.4)]'
                      : 'border-slate-700 hover:border-cyan-500/50'
                  }`}
                >
                  <img src={preset.poster} alt={preset.title} className="w-full h-20 object-cover rounded-xl" />
                  <p className="text-[10px] font-bold mt-1 truncate">{preset.title}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">وصف المقطع والهاشتاجات:</label>
                <input 
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="اكتب وصفاً جذاباً لمقطعك... #الكحلي"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none ${
                    isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">المقطع الصوتي / الموسيقى:</label>
                <input 
                  type="text"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  placeholder="اسم الأغنية أو النغمة"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none ${
                    isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowCreateStoryModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5"
              >
                إلغاء
              </button>
              <button 
                onClick={handlePublishStory}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 text-slate-950 font-black text-xs shadow-lg"
              >
                نشر الستوري الآن 🚀
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
