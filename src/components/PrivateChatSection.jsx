import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Send, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  Check, 
  X, 
  Search, 
  ShieldCheck, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function PrivateChatSection({
  isDarkMode,
  currentUser,
  friends,
  setFriends,
  friendRequests,
  setFriendRequests,
}) {
  const [activeSubTab, setActiveSubTab] = useState('chats'); // 'chats' | 'requests' | 'add'
  const [selectedFriend, setSelectedFriend] = useState(friends[0] || null);
  const [privateMessageText, setPrivateMessageText] = useState('');
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const [searchUserId, setSearchUserId] = useState('');
  const [searchFeedback, setSearchFeedback] = useState(null);

  // Send Direct Message
  const handleSendPrivateMessage = (e) => {
    e.preventDefault();
    if (!privateMessageText.trim() || !selectedFriend) return;

    soundManager.playMessageSent();
    const newMsg = {
      id: Date.now(),
      senderId: currentUser.id,
      text: privateMessageText.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      type: "text",
    };

    setFriends(prev => prev.map(f => {
      if (f.id === selectedFriend.id) {
        return {
          ...f,
          lastMessage: newMsg.text,
          lastMessageTime: newMsg.time,
          messages: [...(f.messages || []), newMsg],
        };
      }
      return f;
    }));

    setSelectedFriend(prev => ({
      ...prev,
      messages: [...(prev.messages || []), newMsg],
    }));

    setPrivateMessageText('');
  };

  // Send Quick Voice Note to Friend
  const handleSendPrivateVoice = () => {
    if (!selectedFriend) return;
    soundManager.playTap();
    soundManager.playMessageSent();

    const newMsg = {
      id: Date.now(),
      senderId: currentUser.id,
      type: "voice",
      audioDuration: "0:08",
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setFriends(prev => prev.map(f => {
      if (f.id === selectedFriend.id) {
        return {
          ...f,
          lastMessage: "بصمة صوتية 🎙️",
          lastMessageTime: newMsg.time,
          messages: [...(f.messages || []), newMsg],
        };
      }
      return f;
    }));

    setSelectedFriend(prev => ({
      ...prev,
      messages: [...(prev.messages || []), newMsg],
    }));
  };

  // Accept Friend Request (موافقة)
  const handleAcceptRequest = (req) => {
    soundManager.playTap();
    const newFriend = {
      id: 'f-' + Date.now(),
      user: {
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
        status: "متصل الآن",
        isOnline: true,
        badge: "صديق جديد",
      },
      lastMessage: "تم قبول طلب الصداقة، أهلاً بك!",
      lastMessageTime: "الآن",
      unreadCount: 0,
      messages: [
        {
          id: Date.now(),
          senderId: currentUser.id,
          text: "أهلاً بك! تشرفت بصداقتك في منصة الكحلي 💎",
          time: "الآن",
          type: "text"
        }
      ]
    };

    setFriends(prev => [newFriend, ...prev]);
    setFriendRequests(prev => prev.filter(r => r.id !== req.id));
    setSelectedFriend(newFriend);
    setActiveSubTab('chats');
  };

  // Reject Friend Request (رفض)
  const handleRejectRequest = (reqId) => {
    soundManager.playTap();
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
  };

  // Send new friend request by User ID
  const handleSendRequestByUserId = (e) => {
    e.preventDefault();
    if (!searchUserId.trim()) return;

    soundManager.playTap();
    setSearchFeedback(`تم إرسال طلب الصداقة بنجاح إلى المستخدم ذو المعرف (#${searchUserId.trim()}) ✅`);
    setSearchUserId('');
    setTimeout(() => setSearchFeedback(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300">
      
      {/* SECTION HEADER CARD */}
      <div className={`p-4 sm:p-5 rounded-3xl border mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg ${
        isDarkMode ? 'bg-navy-900/90 border-cyan-500/25' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isDarkMode ? 'bg-navy-950 text-cyan-300' : 'bg-slate-900 text-cyan-300'
            }`}>
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black font-cairo bg-gradient-to-l from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              قسم الخاص (الأصدقاء والرسائل الخاصة)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              محادثات مشفرة بين الأصدقاء • إدارة طلبات الصداقة والموافقة عليها
            </p>
          </div>
        </div>

        {/* Sub-tabs pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-navy-950/60 border border-cyan-500/20">
          <button
            onClick={() => { soundManager.playTap(); setActiveSubTab('chats'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'chats'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-cyan-300'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>المحادثات ({friends.length})</span>
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveSubTab('requests'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'requests'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-cyan-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>طلبات الصداقة</span>
            {friendRequests.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {friendRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { soundManager.playTap(); setActiveSubTab('add'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'add'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-cyan-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>إضافة عبر ID</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: FRIEND REQUESTS TAB (طلبات الصداقة والموافقة) */}
      {activeSubTab === 'requests' && (
        <div className={`p-6 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-navy-900/90 border-cyan-500/30' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
            <div>
              <h3 className="text-base font-bold font-cairo">طلبات الصداقة الواردة</h3>
              <p className="text-xs text-slate-400">يمكنك الموافقة على طلبات الأعضاء أو رفضها</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
              {friendRequests.length} طلبات
            </span>
          </div>

          {friendRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-40 text-cyan-400" />
              <p>لا توجد طلبات صداقة معلقة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friendRequests.map(req => (
                <div 
                  key={req.id} 
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                    isDarkMode ? 'bg-navy-950/80 border-cyan-500/20 shadow-md' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={req.user.avatar} 
                      alt={req.user.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-cyan-400 shrink-0" 
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm truncate">{req.user.name}</h4>
                      <p className="text-[11px] text-cyan-400 font-mono">ID: #{req.user.id}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{req.date}</p>
                    </div>
                  </div>

                  {/* Accept / Reject Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleAcceptRequest(req)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center gap-1 shadow-md hover:brightness-110 transition"
                      title="موافقة على طلب الصداقة"
                    >
                      <Check className="w-4 h-4" />
                      <span>موافقة</span>
                    </button>

                    <button
                      onClick={() => handleRejectRequest(req.id)}
                      className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs transition"
                      title="رفض الطلب"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ADD FRIEND BY USER ID */}
      {activeSubTab === 'add' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl max-w-2xl mx-auto text-center ${
          isDarkMode ? 'bg-navy-900/90 border-cyan-500/30' : 'bg-white border-slate-200'
        }`}>
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-cairo mb-2">إضافة صديق جديد عبر الآيدي (ID)</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
            أدخل معرف حساب الصديق المكون من 6 أرقام لإرسال طلب صداقة فوري ومباشر.
          </p>

          <form onSubmit={handleSendRequestByUserId} className="flex gap-2 max-w-md mx-auto mb-4">
            <input 
              type="text" 
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              placeholder="مثال: 948210"
              className={`flex-1 px-4 py-3 rounded-2xl text-xs font-mono border focus:outline-none ${
                isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300'
              }`}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shrink-0 shadow-md"
            >
              إرسال الطلب
            </button>
          </form>

          {searchFeedback && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-in fade-in max-w-md mx-auto">
              {searchFeedback}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: ACTIVE 1-ON-1 CHATS */}
      {activeSubTab === 'chats' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* FRIENDS LIST (4 Cols) */}
          <div className={`md:col-span-4 rounded-3xl border p-4 space-y-2.5 h-[560px] overflow-y-auto ${
            isDarkMode ? 'bg-navy-900/90 border-cyan-500/25' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <h4 className="text-xs font-bold text-cyan-400/80 px-2 mb-2 font-cairo">المحادثات الخاصة</h4>
            
            {friends.map(f => (
              <div
                key={f.id}
                onClick={() => {
                  soundManager.playTap();
                  setSelectedFriend(f);
                }}
                className={`p-3 rounded-2xl cursor-pointer transition-all border flex items-center gap-3 ${
                  selectedFriend?.id === f.id
                    ? isDarkMode
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,247,255,0.2)]'
                      : 'bg-cyan-50 border-cyan-500 shadow-sm'
                    : isDarkMode
                      ? 'bg-navy-950/50 border-cyan-500/10 hover:bg-navy-800/60'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="relative">
                  <img src={f.user.avatar} alt={f.user.name} className="w-11 h-11 rounded-xl object-cover border border-cyan-400" />
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                    f.user.isOnline ? 'bg-emerald-500' : 'bg-slate-500'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs truncate">{f.user.name}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{f.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{f.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CHAT WINDOW (8 Cols) */}
          <div className={`md:col-span-8 rounded-3xl border flex flex-col h-[560px] overflow-hidden ${
            isDarkMode ? 'bg-navy-950/90 border-cyan-500/30' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            {selectedFriend ? (
              <>
                {/* Active Friend Header */}
                <div className={`p-4 border-b flex items-center justify-between ${
                  isDarkMode ? 'border-cyan-500/20 bg-navy-900/60' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <img src={selectedFriend.user.avatar} alt={selectedFriend.user.name} className="w-10 h-10 rounded-xl object-cover border border-cyan-400" />
                    <div>
                      <h4 className="font-bold text-sm">{selectedFriend.user.name}</h4>
                      <p className="text-[11px] text-cyan-400 flex items-center gap-1">
                        <span>ID: #{selectedFriend.user.id}</span>
                        <span>•</span>
                        <span className="text-emerald-400">{selectedFriend.user.status}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {(selectedFriend.messages || []).map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-xs sm:max-w-sm text-xs leading-relaxed ${
                        m.senderId === currentUser.id
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md'
                          : isDarkMode
                            ? 'bg-navy-900 border border-cyan-500/20 text-slate-200 rounded-bl-none'
                            : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}>
                        {m.type === 'voice' ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPlayingVoiceId(playingVoiceId === m.id ? null : m.id)}
                              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                            >
                              {playingVoiceId === m.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <span className="font-mono">{m.audioDuration}</span>
                            <span className="text-[10px] opacity-75">بصمة صوتية</span>
                          </div>
                        ) : (
                          <p>{m.text}</p>
                        )}
                        <span className="text-[9px] opacity-70 block text-left mt-1 font-mono">{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Private Chat Input */}
                <div className={`p-3 border-t flex items-center gap-2 ${
                  isDarkMode ? 'border-cyan-500/20 bg-navy-900/80' : 'border-slate-200 bg-slate-50'
                }`}>
                  <button
                    type="button"
                    onClick={handleSendPrivateVoice}
                    className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25"
                    title="إرسال بصمة صوتية سريعة"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <input 
                    type="text"
                    value={privateMessageText}
                    onChange={(e) => setPrivateMessageText(e.target.value)}
                    placeholder={`رسالة خاصة إلى ${selectedFriend.user.name}...`}
                    className={`flex-1 min-w-0 px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none ${
                      isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-white' : 'bg-white border-slate-300'
                    }`}
                  />

                  <button
                    onClick={handleSendPrivateMessage}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                اختر صديقاً لبدء المحادثة الخاصة
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
