import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import LiveStreamSection from './components/LiveStreamSection';
import PublicChatSection from './components/PublicChatSection';
import PrivateChatSection from './components/PrivateChatSection';
import StoriesSection from './components/StoriesSection';
import ProfileSection from './components/ProfileSection';
import StoreSection from './components/StoreSection';
import LogoutWarningModal from './components/LogoutWarningModal';
import { 
  INITIAL_USER, 
  DEVELOPER_PROFILE, 
  INITIAL_GUEST_MICS, 
  INITIAL_GUEST_REQUESTS,
  INITIAL_LIVE_COMMENTS, 
  INITIAL_PUBLIC_MESSAGES, 
  INITIAL_FRIENDS, 
  INITIAL_FRIEND_REQUESTS,
  INITIAL_STORIES,
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { soundManager } from './utils/soundService';
import { LogIn, Sparkles, Radio } from 'lucide-react';

export default function App() {
  // Theme state (true = Night Turquoise / Dark Navy, false = Day Luxury)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sidebar & Active tab state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'public' | 'private' | 'stories' | 'store' | 'profile'

  // User & Developer states
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [developerProfile, setDeveloperProfile] = useState(DEVELOPER_PROFILE);
  const [isDeveloperLive, setIsDeveloperLive] = useState(true); // Broadcast open or locked
  const [isUserDevMode, setIsUserDevMode] = useState(false); // Toggle developer simulation

  // Live Stream sub-states
  const [guestMics, setGuestMics] = useState(INITIAL_GUEST_MICS);
  const [guestRequests, setGuestRequests] = useState(INITIAL_GUEST_REQUESTS);
  const [liveComments, setLiveComments] = useState(INITIAL_LIVE_COMMENTS);

  // Chat & Stories states
  const [publicMessages, setPublicMessages] = useState(INITIAL_PUBLIC_MESSAGES);
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [friendRequests, setFriendRequests] = useState(INITIAL_FRIEND_REQUESTS);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Logout state
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Synchronize theme with HTML document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#070f1e';
      document.body.style.color = '#f1f5f9';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [isDarkMode]);

  // Toggle Visibility (ظهور / إخفاء)
  const handleToggleVisibility = () => {
    soundManager.playTap();
    setCurrentUser(prev => ({
      ...prev,
      isHidden: !prev.isHidden,
    }));
  };

  // Confirm Logout action (إنهاء الجلسة)
  const handleConfirmLogout = () => {
    soundManager.playTap();
    setShowLogoutModal(false);
    setIsLoggedOut(true);
  };

  // Relogin action
  const handleReLogin = () => {
    soundManager.playGiftChime();
    setIsLoggedOut(false);
    setActiveTab('live');
  };

  // Notification actions
  const handleMarkNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, unread: false } : n));
  };

  const handleClearNotifications = () => {
    soundManager.playTap();
    setNotifications([]);
  };

  // -------------------------------------------------------------
  // LOGGED OUT SCREEN
  // -------------------------------------------------------------
  if (isLoggedOut) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode ? 'bg-navy-950 text-slate-100' : 'bg-slate-100 text-slate-800'
      }`}>
        <div className={`max-w-md w-full rounded-3xl p-8 border text-center shadow-2xl ${
          isDarkMode ? 'bg-navy-900 border-cyan-500/30' : 'bg-white border-slate-200'
        }`}>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_25px_rgba(0,247,255,0.4)] mx-auto mb-5">
            <div className={`w-full h-full rounded-[22px] flex items-center justify-center font-black text-2xl ${
              isDarkMode ? 'bg-navy-950 text-cyan-300' : 'bg-slate-900 text-cyan-300'
            }`}>
              كـ
            </div>
          </div>

          <h2 className="text-2xl font-black font-cairo mb-2">تم تسجيل الخروج بنجاح</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            تم إنهاء جلستك وحفظ رصيد كوينز الكحلي وبيانات حسابك بأمان. اضغط أدناه لإعادة تسجيل الدخول إلى منصة الكحلي.
          </p>

          <button
            onClick={handleReLogin}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 font-black text-sm shadow-[0_0_25px_rgba(0,247,255,0.4)] hover:brightness-110 transition flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول إلى منصة الكحلي 💎</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 md:pb-8 flex flex-col font-cairo transition-colors duration-300 ${
      isDarkMode ? 'bg-[#070f1e] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* 1. TOP HEADER (Logo on Right, Theme + Notifs + 3 Bars on Left) */}
      <Header 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearNotifications={handleClearNotifications}
        isDeveloperLive={isDeveloperLive}
        isUserDevMode={isUserDevMode}
        setIsUserDevMode={setIsUserDevMode}
      />

      {/* 2. SIDEBAR DRAWER (3 Bars Navigation) */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onOpenLogoutModal={() => setShowLogoutModal(true)}
        onToggleVisibility={handleToggleVisibility}
        isDeveloperLive={isDeveloperLive}
        isUserDevMode={isUserDevMode}
        setIsUserDevMode={setIsUserDevMode}
      />

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* قسم البث */}
        {activeTab === 'live' && (
          <LiveStreamSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isDeveloperLive={isDeveloperLive}
            setIsDeveloperLive={setIsDeveloperLive}
            developerProfile={developerProfile}
            guestMics={guestMics}
            setGuestMics={setGuestMics}
            guestRequests={guestRequests}
            setGuestRequests={setGuestRequests}
            liveComments={liveComments}
            setLiveComments={setLiveComments}
            isUserDevMode={isUserDevMode}
            setIsUserDevMode={setIsUserDevMode}
          />
        )}

        {/* قسم عام */}
        {activeTab === 'public' && (
          <PublicChatSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            publicMessages={publicMessages}
            setPublicMessages={setPublicMessages}
          />
        )}

        {/* قسم الخاص */}
        {activeTab === 'private' && (
          <PrivateChatSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            friends={friends}
            setFriends={setFriends}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        )}

        {/* قسم ستوري */}
        {activeTab === 'stories' && (
          <StoriesSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            stories={stories}
            setStories={setStories}
          />
        )}

        {/* قسم المتجر */}
        {activeTab === 'store' && (
          <StoreSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}

        {/* قسم حسابي */}
        {activeTab === 'profile' && (
          <ProfileSection 
            isDarkMode={isDarkMode}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onToggleVisibility={handleToggleVisibility}
            onOpenLogoutModal={() => setShowLogoutModal(true)}
          />
        )}
      </main>

      {/* 4. MOBILE BOTTOM NAVIGATION */}
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        isDeveloperLive={isDeveloperLive}
        currentUser={currentUser}
      />

      {/* 5. LOGOUT WARNING MODAL (رسالة تحذير إنهاء الجلسة) */}
      <LogoutWarningModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirmLogout={handleConfirmLogout}
        isDarkMode={isDarkMode}
        currentUser={currentUser}
      />

    </div>
  );
}
