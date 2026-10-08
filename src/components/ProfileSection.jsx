import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Mail, 
  ShieldCheck, 
  Coins, 
  Crown, 
  Eye, 
  EyeOff, 
  LogOut, 
  Clock, 
  AlertTriangle, 
  Check, 
  X, 
  Copy, 
  CheckCircle2, 
  Gift, 
  Sparkles, 
  Calendar,
  Lock
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function ProfileSection({
  isDarkMode,
  currentUser,
  setCurrentUser,
  onToggleVisibility,
  onOpenLogoutModal,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [copiedId, setCopiedId] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);

  // 7-DAY EMAIL RESTRICTION CALCULATION
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const lastChangeTime = new Date(currentUser.lastEmailChangeDate).getTime();
  const timeSinceLastChange = Date.now() - lastChangeTime;
  const canChangeEmail = timeSinceLastChange >= SEVEN_DAYS_MS;
  const remainingTimeMs = SEVEN_DAYS_MS - timeSinceLastChange;
  const remainingDays = Math.ceil(remainingTimeMs / (1000 * 60 * 60 * 24));

  // Copy Account ID
  const handleCopyId = () => {
    soundManager.playTap();
    navigator.clipboard?.writeText(currentUser.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    soundManager.playTap();

    let updatedEmail = currentUser.email;
    let newEmailChangeDate = currentUser.lastEmailChangeDate;

    // Check if email was edited
    if (editEmail.trim() !== currentUser.email) {
      if (!canChangeEmail) {
        alert(`⚠️ لا يمكنك تعديل البريد الإلكتروني إلا مرة واحدة كل 7 أيام! متبقي ${remainingDays} أيام حتى يسمح لك بالتعديل القادم.`);
        return;
      }
      updatedEmail = editEmail.trim();
      newEmailChangeDate = new Date().toISOString();
    }

    setCurrentUser(prev => ({
      ...prev,
      name: editName.trim() || prev.name,
      avatar: editAvatar || prev.avatar,
      email: updatedEmail,
      lastEmailChangeDate: newEmailChangeDate,
    }));

    setShowEditModal(false);
    setSaveSuccessMsg("تم حفظ وتحديث بيانات البروفايل بنجاح! ✨");
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Avatar presets for quick profile picture choice
  const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300">
      
      {/* SUCCESS ALERT BANNER */}
      {saveSuccessMsg && (
        <div className="mb-4 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-in fade-in shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* PROFILE CARD */}
      <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
        isDarkMode ? 'bg-navy-900/90 border-cyan-500/30' : 'bg-white border-slate-200'
      }`}>
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden">
          <img 
            src={currentUser.cover} 
            alt="غلاف البروفايل" 
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
          
          {/* Status Badge on Cover */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border flex items-center gap-1.5 ${
              currentUser.isHidden
                ? 'bg-slate-900/80 border-slate-600 text-slate-300'
                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            }`}>
              {currentUser.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{currentUser.isHidden ? 'الحالة: وضع الإخفاء' : 'الحالة: متصل وظاهر'}</span>
            </span>
          </div>
        </div>

        {/* Profile Content Details */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          
          {/* Avatar & Action Buttons Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            
            {/* Main Avatar */}
            <div className="relative inline-block mx-auto sm:mx-0">
              <div className="p-1 rounded-3xl bg-gradient-to-tr from-cyan-400 via-teal-300 to-blue-600 shadow-[0_0_25px_rgba(0,247,255,0.4)]">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-[22px] object-cover border-4 border-navy-950"
                />
              </div>
              <span className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-3 border-navy-950 shadow-md ${
                currentUser.isHidden ? 'bg-slate-500' : 'bg-emerald-500'
              }`} />
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
              
              {/* Edit Profile Button */}
              <button
                onClick={() => {
                  soundManager.playTap();
                  setShowEditModal(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs sm:text-sm hover:shadow-[0_0_20px_rgba(0,247,255,0.4)] transition flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>تعديل البروفايل</span>
              </button>

              {/* Toggle Online / Hidden Visibility */}
              <button
                onClick={() => {
                  soundManager.playTap();
                  onToggleVisibility();
                }}
                className={`px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  currentUser.isHidden
                    ? 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                    : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                }`}
                title="تغيير حالة الظهور والإخفاء لجميع المستخدمين"
              >
                {currentUser.isHidden ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                <span>{currentUser.isHidden ? 'إلغاء الإخفاء (ظهور)' : 'تفعيل وضع الإخفاء'}</span>
              </button>

              {/* Logout Button (with Warning modal) */}
              <button
                onClick={() => {
                  soundManager.playTap();
                  onOpenLogoutModal();
                }}
                className="px-4 py-2.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-400 text-xs sm:text-sm font-bold transition flex items-center gap-1.5"
                title="تسجيل الخروج من المنصة"
              >
                <LogOut className="w-4 h-4" />
                <span>تسجيل خروج</span>
              </button>

            </div>
          </div>

          {/* User Bio & Titles */}
          <div className="text-center sm:text-right mb-6">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black font-cairo">{currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm">
                <Crown className="w-3.5 h-3.5" />
                {currentUser.badge}
              </span>
            </div>

            {/* Account ID with Copy feature */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
              <span className="text-xs font-mono text-cyan-400 font-bold">
                معرف الحساب (ID): #{currentUser.id}
              </span>
              <button
                onClick={handleCopyId}
                className="p-1 rounded-md hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition"
                title="نسخ الآيدي"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-3 leading-relaxed">
              {currentUser.bio}
            </p>
          </div>

          {/* METRICS & WALLET GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-cyan-500/20">
            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-navy-950/70 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center gap-1.5 text-yellow-400 mb-1">
                <Coins className="w-4 h-4" />
                <span className="text-base sm:text-lg font-black font-mono">{currentUser.coins.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">رصيد كوينز الكحلي</p>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-navy-950/70 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-base sm:text-lg font-black font-mono">Lv.{currentUser.level}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">مستوى الحساب</p>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-navy-950/70 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
                <Gift className="w-4 h-4" />
                <span className="text-base sm:text-lg font-black font-mono">{currentUser.giftsSent}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">الهدايا المرسلة</p>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${
              isDarkMode ? 'bg-navy-950/70 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center gap-1 text-teal-400 mb-1">
                <User className="w-4 h-4" />
                <span className="text-base sm:text-lg font-black font-mono">{currentUser.followersCount}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">المتابعون</p>
            </div>
          </div>

          {/* EMAIL & SECURITY STATUS CARD */}
          <div className={`mt-6 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDarkMode ? 'bg-navy-950/40 border-cyan-500/15' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-300">البريد الإلكتروني الموثق</p>
                <p className="text-xs font-mono text-cyan-400">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">
                {canChangeEmail
                  ? 'متاح تعديل الإيميل الآن (كل 7 أيام)'
                  : `متبقي ${remainingDays} أيام للتعديل القادم`}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ----------------- EDIT PROFILE MODAL ----------------- */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${
            isDarkMode ? 'bg-navy-950 border-cyan-500/30 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <div className="flex items-center gap-2 font-bold font-cairo">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <span>تعديل بيانات الحساب والبروفايل</span>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Change Avatar */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">اختر الصورة الشخصية:</label>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {avatarPresets.map((preset, idx) => (
                    <img 
                      key={idx}
                      src={preset} 
                      alt="صورة رمزية"
                      onClick={() => setEditAvatar(preset)}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition ${
                        editAvatar === preset ? 'border-cyan-400 ring-2 ring-cyan-400 scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Change Name */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">اسم المستخدم (الاسم الظاهر):</label>
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold border focus:outline-none ${
                    isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
                  }`}
                />
              </div>

              {/* Change Email with 7-Day Restriction Rule */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">البريد الإلكتروني (تعديل مرة كل 7 أيام):</label>
                  {!canChangeEmail && (
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      مغلق (متبقي {remainingDays} أيام)
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="email"
                    value={editEmail}
                    disabled={!canChangeEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono border focus:outline-none ${
                      !canChangeEmail
                        ? 'bg-slate-900/60 border-slate-700 text-slate-400 cursor-not-allowed'
                        : isDarkMode ? 'bg-navy-900 border-cyan-500/30 text-white' : 'bg-slate-100 border-slate-300'
                    }`}
                  />
                  {!canChangeEmail && (
                    <div className="mt-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] leading-relaxed flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                      <span>
                        حماية أمان الحساب: تم تغيير البريد الإلكتروني مؤخراً، يمكنك التعديل القادم بعد انقضاء 7 أيام كاملة.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-white/5"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg"
                >
                  حفظ التعديلات
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
