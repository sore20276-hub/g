import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  Gift, 
  Crown, 
  Zap, 
  CheckCircle2, 
  CreditCard,
  ShieldCheck,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundService';
import { STORE_COIN_PACKS, STORE_GIFTS, STORE_VIP_FRAMES } from '../data/mockData';

export default function StoreSection({
  isDarkMode,
  currentUser,
  setCurrentUser
}) {
  const [activeStoreTab, setActiveStoreTab] = useState('coins'); // 'coins' | 'gifts' | 'frames'
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  // Buy Coin Pack simulation
  const handleBuyCoinPack = (pack) => {
    soundManager.playGiftChime();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f7ff', '#eab308', '#3b82f6'],
      });
    } catch (e) {
      console.log(e);
    }

    const totalCoins = pack.coins + pack.bonus;
    setCurrentUser(prev => ({
      ...prev,
      coins: prev.coins + totalCoins,
    }));

    setPurchaseSuccess(`تم شحن ${totalCoins.toLocaleString()} كوينز بنجاح إلى محفظتك! 💎✨`);
    setTimeout(() => setPurchaseSuccess(null), 4000);
  };

  // Buy VIP Frame simulation
  const handleBuyFrame = (frame) => {
    if (currentUser.coins < frame.price) {
      alert("رصيد الكوينز غير كافٍ! يرجى شحن باقة كوينز أولاً.");
      return;
    }

    soundManager.playGiftChime();
    setCurrentUser(prev => ({
      ...prev,
      coins: prev.coins - frame.price,
      badge: frame.name.split(' ')[1] || 'VIP',
    }));

    setPurchaseSuccess(`تهانينا! تم تفعيل (${frame.name}) لحسابك ومايكاتك الملكية 👑✨`);
    setTimeout(() => setPurchaseSuccess(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300">
      
      {/* SUCCESS NOTIFICATION */}
      {purchaseSuccess && (
        <div className="mb-4 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-in fade-in shadow-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{purchaseSuccess}</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <div className={`p-6 rounded-3xl border mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
        isDarkMode ? 'bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-cyan-500/30' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-4 text-center sm:text-right">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-600 p-[2px] shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
              isDarkMode ? 'bg-navy-950 text-yellow-300' : 'bg-slate-900 text-yellow-300'
            }`}>
              <ShoppingBag className="w-7 h-7 text-yellow-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-cairo bg-gradient-to-l from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              متجر منصة الكحلي الفاخر
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              شحن كوينز، هدايا البث المباشر، وشارات وإطارات النخبة الملكية
            </p>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-yellow-500/15 border border-yellow-500/30">
          <Coins className="w-6 h-6 text-yellow-400 animate-bounce" />
          <div className="text-right">
            <p className="text-[10px] text-yellow-300 font-bold">رصيدك الحالي</p>
            <p className="text-lg font-black font-mono text-yellow-400 leading-none">
              {currentUser.coins.toLocaleString()} <span className="text-xs">💎</span>
            </p>
          </div>
        </div>
      </div>

      {/* STORE NAVIGATION TABS */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => { soundManager.playTap(); setActiveStoreTab('coins'); }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeStoreTab === 'coins'
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
              : isDarkMode ? 'bg-navy-900/60 text-slate-300 border border-cyan-500/15' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>باقات شحن الكوينز</span>
        </button>

        <button
          onClick={() => { soundManager.playTap(); setActiveStoreTab('gifts'); }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeStoreTab === 'gifts'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,247,255,0.4)]'
              : isDarkMode ? 'bg-navy-900/60 text-slate-300 border border-cyan-500/15' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>هدايا البث الحصرية</span>
        </button>

        <button
          onClick={() => { soundManager.playTap(); setActiveStoreTab('frames'); }}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeStoreTab === 'frames'
              ? 'bg-gradient-to-r from-teal-400 to-cyan-600 text-slate-950 shadow-[0_0_20px_rgba(45,212,191,0.4)]'
              : isDarkMode ? 'bg-navy-900/60 text-slate-300 border border-cyan-500/15' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>إطارات المايكات الملكية</span>
        </button>
      </div>

      {/* 1. COINS PACKAGES */}
      {activeStoreTab === 'coins' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_COIN_PACKS.map(pack => (
            <div
              key={pack.id}
              className={`p-6 rounded-3xl border transition hover:border-yellow-400 flex flex-col justify-between relative overflow-hidden ${
                pack.popular
                  ? 'border-yellow-400/80 shadow-[0_0_25px_rgba(234,179,8,0.25)]'
                  : isDarkMode ? 'bg-navy-900/80 border-cyan-500/20' : 'bg-white border-slate-200'
              }`}
            >
              {pack.popular && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-yellow-500 text-slate-950 font-black text-[10px] shadow-md">
                  الأكثر طلباً 🔥
                </span>
              )}

              <div className="text-center my-2">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-400/30 flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-black font-mono text-yellow-400">{pack.coins.toLocaleString()}</h3>
                <p className="text-xs text-emerald-400 font-bold mt-0.5">+ {pack.bonus} كوينز مجاناً هدية 🎁</p>
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-500/15">
                <button
                  onClick={() => handleBuyCoinPack(pack)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 shadow-md transition"
                >
                  شحن الآن ({pack.priceUSD})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. LIVE STREAM GIFTS */}
      {activeStoreTab === 'gifts' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STORE_GIFTS.map(gift => (
            <div
              key={gift.id}
              className={`p-5 rounded-3xl border text-center transition flex flex-col justify-between ${
                isDarkMode ? 'bg-navy-900/80 border-cyan-500/20 hover:border-cyan-400' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-5xl sm:text-6xl my-2 animate-bounce">{gift.icon}</div>
              <div>
                <h4 className="font-bold text-sm font-cairo">{gift.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{gift.desc}</p>
                <div className="mt-3 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold inline-block">
                  💎 {gift.price.toLocaleString()} كوينز
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. VIP MIC FRAMES */}
      {activeStoreTab === 'frames' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_VIP_FRAMES.map(frame => (
            <div
              key={frame.id}
              className={`p-6 rounded-3xl border text-center transition flex flex-col justify-between ${
                isDarkMode ? 'bg-navy-900/80 border-cyan-500/20 hover:border-cyan-400' : 'bg-white border-slate-200'
              }`}
            >
              <div className="my-3">
                <div className={`w-20 h-20 rounded-full mx-auto overflow-hidden p-1 ${frame.previewBorder}`}>
                  <img src={currentUser.avatar} alt="معاينة الإطار" className="w-full h-full rounded-full object-cover" />
                </div>
                <h4 className="font-bold text-sm font-cairo mt-3">{frame.name}</h4>
                <span className="text-xs font-mono text-yellow-400 font-bold block mt-1">💎 {frame.price.toLocaleString()} كوينز</span>
              </div>

              <button
                onClick={() => handleBuyFrame(frame)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-600 text-slate-950 font-bold text-xs shadow-md"
              >
                شراء وتفعيل الإطار 👑
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
