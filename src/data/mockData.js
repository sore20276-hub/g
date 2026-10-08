export const INITIAL_USER = {
  id: "782910",
  name: "أمير الكحلي الملكي",
  email: "alkohli.vip@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  cover: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
  bio: "عاشق للأناقة والهدوء الكحلي 💎✨ | عضو النخبة VIP",
  coins: 18500,
  level: 42,
  isHidden: false, // true = مخفي, false = ظهور
  lastEmailChangeDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // Changed 4 days ago (needs 3 more days)
  badge: "VIP الملكي",
  followersCount: 1420,
  followingCount: 280,
  giftsSent: 89,
  isDeveloper: false, // Switchable for testing Developer vs Normal user
};

export const DEVELOPER_PROFILE = {
  id: "100001",
  name: "المطور الرئيسي للكحلي 👑",
  title: "سهرة الكحلي الفاخرة | نقاش ومسابقات كوينز 💎🎙️",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  viewers: 1248,
  likes: 45200,
  isLive: true,
  micActive: true,
  cameraActive: true,
};

export const INITIAL_GUEST_MICS = [
  {
    micId: 1,
    occupied: true,
    user: {
      id: "302911",
      name: "سارة الفيروزية 🦋",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      level: 28,
    },
    isMuted: false,
    isSpeaking: true,
    volume: 85,
  },
  {
    micId: 2,
    occupied: true,
    user: {
      id: "449012",
      name: "فارس الليل 🌙",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      level: 35,
    },
    isMuted: true,
    isSpeaking: false,
    volume: 0,
  },
  {
    micId: 3,
    occupied: false,
    user: null,
    isMuted: false,
    isSpeaking: false,
    volume: 0,
  },
  {
    micId: 4,
    occupied: false,
    user: null,
    isMuted: false,
    isSpeaking: false,
    volume: 0,
  },
];

export const INITIAL_GUEST_REQUESTS = [
  {
    id: "req-1",
    user: {
      id: "559102",
      name: "ريان الكحلي ⚡",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      level: 19,
    },
    requestedAt: "منذ دقيقتين",
  },
  {
    id: "req-2",
    user: {
      id: "681203",
      name: "نجمة المساء ✨",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      level: 22,
    },
    requestedAt: "منذ 5 دقائق",
  },
];

export const INITIAL_LIVE_COMMENTS = [
  { id: 1, user: { name: "عاشق الكحلي", id: "910283", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80" }, text: "مساء الفخامة يا مطورنا الغالي! 💙👑", time: "21:20" },
  { id: 2, user: { name: "لانا التميمي", id: "442190", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" }, text: "الصوت نقي جداً ما شاء الله والمايكات مرتبة 🔥", time: "21:21" },
  { id: 3, user: { name: "ماجد الدوسري", id: "119830", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80" }, text: "أرسل لكم صقر ذهبي الآن 🦅✨", time: "21:22", isGiftNotice: true, giftName: "صقر ذهبي" },
  { id: 4, user: { name: "هند القروازي", id: "882310", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80" }, text: "أجمل منصة وأحلى بث ليلي! 💎🌌", time: "21:23" },
];

export const STORE_GIFTS = [
  { id: "gift-1", name: "وردة كحلية 🌹", price: 20, icon: "🌹", color: "from-cyan-400 to-blue-600", desc: "وردة فيروزية لامعة" },
  { id: "gift-2", name: "صقر ذهبي 🦅", price: 500, icon: "🦅", color: "from-yellow-400 to-amber-600", desc: "رمز القوة والأصالة" },
  { id: "gift-3", name: "سيارة رياضية 🏎️", price: 2000, icon: "🏎️", color: "from-red-500 to-rose-700", desc: "سرعة وفخامة لا تنتهي" },
  { id: "gift-4", name: "تاج المطور الملكي 👑", price: 5000, icon: "👑", color: "from-amber-300 via-yellow-400 to-amber-600", desc: "التاج الأسطوري للكحلي" },
  { id: "gift-5", name: "يخت كحلي فاخر 🛥️", price: 10000, icon: "🛥️", color: "from-teal-400 to-cyan-700", desc: "رحلة ملكية في أعماق الكحلي" },
  { id: "gift-6", name: "كوكب الكحلي النادر 🪐", price: 25000, icon: "🪐", color: "from-cyan-300 via-blue-500 to-indigo-800", desc: "الهدية الأغلى والأكثر بريقاً" },
];

export const INITIAL_PUBLIC_MESSAGES = [
  {
    id: 1,
    user: {
      id: "100001",
      name: "المطور الرئيسي 👑",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      badge: "المطور",
      badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-950",
    },
    type: "text",
    content: "أهلاً وسهلاً بجميع أعضاء وزوار منصة الكحلي الفاخرة! نتمنى لكم أوقاتاً ممتعة وراقية 💎✨",
    time: "20:45",
    likes: 24,
  },
  {
    id: 2,
    user: {
      id: "449012",
      name: "فارس الليل",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      badge: "VIP",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40",
    },
    type: "voice",
    audioDuration: "0:14",
    time: "20:50",
    likes: 8,
  },
  {
    id: 3,
    user: {
      id: "302911",
      name: "سارة الفيروزية",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      badge: "نخبة",
      badgeColor: "bg-teal-500/20 text-teal-300 border border-teal-500/40",
    },
    type: "image",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    caption: "أجواء المساء الكحلي الهادئة 🌌💙",
    time: "20:55",
    likes: 19,
  },
  {
    id: 4,
    user: {
      id: "782910",
      name: "أمير الكحلي الملكي (أنت)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      badge: "VIP الملكي",
      badgeColor: "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold",
    },
    type: "text",
    content: "تحياتي للجميع، المنصة في غاية الجمال والإتقان 💙🔥",
    time: "21:02",
    likes: 12,
  },
];

export const INITIAL_FRIENDS = [
  {
    id: "f-1",
    user: {
      id: "100001",
      name: "المطور الرئيسي 👑",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      status: "متصل الآن",
      isOnline: true,
      badge: "مطور المنصة",
    },
    lastMessage: "شكراً لك على التفاعل في البث المباشر!",
    lastMessageTime: "21:10",
    unreadCount: 2,
    messages: [
      { id: 1, senderId: "100001", text: "مرحباً بك في منصة الكحلي!", time: "20:00", type: "text" },
      { id: 2, senderId: "782910", text: "أهلاً بك يا غالي، تصميم المنصة خيالي", time: "20:15", type: "text" },
      { id: 3, senderId: "100001", text: "شكراً لك على التفاعل في البث المباشر!", time: "21:10", type: "text" },
    ],
  },
  {
    id: "f-2",
    user: {
      id: "302911",
      name: "سارة الفيروزية",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      status: "متصل الآن",
      isOnline: true,
      badge: "صديق مقرب",
    },
    lastMessage: "صوت البصمة واضح جداً 👌",
    lastMessageTime: "19:40",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: "302911", text: "كيف حالك اليوم؟", time: "19:30", type: "text" },
      { id: 2, senderId: "782910", type: "voice", audioDuration: "0:09", time: "19:35" },
      { id: 3, senderId: "302911", text: "صوت البصمة واضح جداً 👌", time: "19:40", type: "text" },
    ],
  },
  {
    id: "f-3",
    user: {
      id: "449012",
      name: "فارس الليل",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      status: "غير متصل منذ ساعة",
      isOnline: false,
      badge: "VIP",
    },
    lastMessage: "نلتقي في سهرة البث القادمة بإذن الله",
    lastMessageTime: "أمس",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: "449012", text: "نلتقي في سهرة البث القادمة بإذن الله", time: "أمس", type: "text" },
    ],
  },
];

export const INITIAL_FRIEND_REQUESTS = [
  {
    id: "req-f1",
    user: {
      id: "882310",
      name: "هند القروازي 💎",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      mutualFriends: 6,
      date: "منذ 20 دقيقة",
    },
  },
  {
    id: "req-f2",
    user: {
      id: "559102",
      name: "ريان الكحلي ⚡",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      mutualFriends: 2,
      date: "منذ ساعتين",
    },
  },
];

export const INITIAL_STORIES = [
  {
    id: "story-1",
    author: {
      id: "100001",
      name: "المطور الكحلي 👑",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-lights-in-the-dark-41712-large.mp4",
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    caption: "إطلاق التحديث الملكي الجديد لمنصة الكحلي! أنوار قروازية وفخامة لا تضاهى 🌌💎 #الكحلي #تحديث_فاخر",
    song: "نغمات الكحلي الفاخرة 🎵 - ريمكس حصري",
    likesCount: 3840,
    commentsCount: 290,
    viewsCount: 18900,
    isLiked: false,
    comments: [
      { id: 1, user: "سارة الفيروزية", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80", text: "تصميم وإبداع لا يوصف ما شاء الله 💙✨" },
      { id: 2, user: "فارس الليل", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80", text: "أقوى منصة صوتية ومرئية في الوطن العربي 🔥" },
    ],
  },
  {
    id: "story-2",
    author: {
      id: "302911",
      name: "سارة الفيروزية 🦋",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      isVerified: false,
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glittering-lights-in-the-night-42998-large.mp4",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    caption: "سكون الليل وجمال الإضاءة القروازية.. ليلة سعيدة للجميع 🌙💙 #أجواء_كحلية #جمال",
    song: "هدوء البحر الأزرق 🌊 - صوت أصلي",
    likesCount: 2120,
    commentsCount: 145,
    viewsCount: 9400,
    isLiked: true,
    comments: [
      { id: 1, user: "أمير الكحلي الملكي", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80", text: "ذوق راقي جداً 💎" },
    ],
  },
  {
    id: "story-3",
    author: {
      id: "449012",
      name: "فارس الليل ⚡",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      isVerified: false,
    },
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-31912-large.mp4",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    caption: "تجهيز البث القادم ومسابقات الجوائز الكبرى! جهزوا المايكات 🏎️💎 #سهرة_الكحلي",
    song: "حماس السهرة 🔥 - DJ Kohli",
    likesCount: 5100,
    commentsCount: 412,
    viewsCount: 26300,
    isLiked: false,
    comments: [
      { id: 1, user: "ريان الكحلي", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80", text: "جاهزين لأقوى بث الليلة 🚀" },
    ],
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "بدأ بث المطور الرئيسي الآن 🎙️",
    desc: "انضم الآن إلى سهرة الكحلي وشارك في المايكات المفتوحة",
    time: "منذ دقيقتين",
    unread: true,
    type: "stream",
  },
  {
    id: "notif-2",
    title: "تم استلام هدية فاخرة 🎁",
    desc: "أرسل لك ماجد الدوسري (صقر ذهبي 🦅) في البث",
    time: "منذ 15 دقيقة",
    unread: true,
    type: "gift",
  },
  {
    id: "notif-3",
    title: "طلب صداقة جديد 👥",
    desc: "أرسلت لك هند القروازي طلب صداقة",
    time: "منذ 20 دقيقة",
    unread: false,
    type: "friend",
  },
];

export const STORE_COIN_PACKS = [
  { id: "pack-1", coins: 500, bonus: 50, priceUSD: "$1.99", popular: false, color: "from-cyan-500 to-blue-600" },
  { id: "pack-2", coins: 2500, bonus: 300, priceUSD: "$8.99", popular: true, color: "from-teal-400 to-cyan-600" },
  { id: "pack-3", coins: 7000, bonus: 1200, priceUSD: "$24.99", popular: false, color: "from-amber-400 to-yellow-600" },
  { id: "pack-4", coins: 20000, bonus: 5000, priceUSD: "$59.99", popular: false, color: "from-blue-600 to-indigo-800" },
];

export const STORE_VIP_FRAMES = [
  { id: "frame-1", name: "إطار التاج الكحلي 👑", price: 3000, previewBorder: "border-4 border-cyan-400 shadow-[0_0_15px_#00f7ff]" },
  { id: "frame-2", name: "إطار الذهب الملكي 🌟", price: 4500, previewBorder: "border-4 border-yellow-400 shadow-[0_0_15px_#facc15]" },
  { id: "frame-3", name: "إطار النيون القروازي ⚡", price: 2000, previewBorder: "border-4 border-teal-400 shadow-[0_0_15px_#2dd4bf]" },
  { id: "frame-4", name: "إطار الشبح الغامض 🌌", price: 6000, previewBorder: "border-4 border-purple-500 shadow-[0_0_15px_#a855f7]" },
];
