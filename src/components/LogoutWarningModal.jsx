import React from 'react';
import { 
  AlertTriangle, 
  LogOut, 
  ShieldCheck, 
  X, 
  Lock, 
  Coins, 
  CheckCircle2 
} from 'lucide-react';
import { soundManager } from '../utils/soundService';

export default function LogoutWarningModal({
  isOpen,
  onClose,
  onConfirmLogout,
  isDarkMode,
  currentUser
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl text-center ${
        isDarkMode 
          ? 'bg-navy-950 border-rose-500/40 text-slate-100 shadow-[0_0_50px_rgba(244,63,94,0.25)]' 
          : 'bg-white border-rose-300 text-slate-800 shadow-2xl'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Badge Icon */}
        <div className="relative inline-block my-2">
          <div className="w-20 h-20 rounded-3xl bg-rose-500/15 border-2 border-rose-500/40 flex items-center justify-center mx-auto text-rose-500 animate-bounce">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <span className="absolute -bottom-1 right-1/2 translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px]">
            تحذير أمني
          </span>
        </div>

        {/* Warning Title */}
        <h3 className="text-xl sm:text-2xl font-black font-cairo mt-4 mb-2 text-rose-400">
          تحذير إنهاء الجلسة
        </h3>

        {/* Warning Body */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك (<span className="text-cyan-400 font-bold">{currentUser.name}</span>) في منصة الكحلي؟
        </p>

        {/* Security Summary Box */}
        <div className={`p-3.5 rounded-2xl border mb-6 text-right space-y-2 text-xs ${
          isDarkMode ? 'bg-navy-900/80 border-cyan-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>سيتم حفظ بياناتك ورصيد محفظتك ({currentUser.coins.toLocaleString()} كوينز) بأمان.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="w-4 h-4 shrink-0" />
            <span>ستحتاج إلى تسجيل الدخول مجدداً للوصول إلى البثوث والمحادثات الخاصة.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              soundManager.playTap();
              onConfirmLogout();
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>نعم، إنهاء الجلسة وتسجيل الخروج</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            إلغاء والبقاء
          </button>
        </div>

      </div>
    </div>
  );
}
