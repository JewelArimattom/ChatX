// Mock chat data
export const chats = [
  {
    id: 1,
    name: "Abhinav Khare",
    username: "@abhi_traveler",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav",
    lastMessage: "That sounds amazing! Let's plan it",
    timestamp: "11:55 am",
    unread: 0,
    online: true,
    verified: true
  },
  {
    id: 2,
    name: "Jewel Martinez",
    username: "@jewel_designs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jewel",
    lastMessage: "https://dribbble.com/shots/15865452-...",
    timestamp: "12:01 pm",
    unread: 0,
    online: false,
    verified: false
  },
  {
    id: 3,
    name: "3rd YEAR SGC",
    username: "@sgc_group",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=SGC",
    lastMessage: "Johnson Johny: 📸 Photo",
    timestamp: "11:52 am",
    unread: 2,
    online: false,
    isGroup: true
  },
  {
    id: 4,
    name: "BCA & MCA 📚",
    username: "@bca_mca",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=BCA",
    lastMessage: "📚 This message was deleted",
    timestamp: "11:19 am",
    unread: 2,
    online: false,
    isGroup: true
  },
  {
    id: 5,
    name: "Jitto Kumar",
    username: "@jitto_dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jitto",
    lastMessage: "Oke",
    timestamp: "10:48 am",
    unread: 0,
    online: true,
    verified: false
  },
  {
    id: 6,
    name: "YAMAL-ESTORE",
    username: "@yamal_store",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Yamal",
    lastMessage: "amahl jr: 📄 Sticker",
    timestamp: "10:43 am",
    unread: 7,
    online: false,
    verified: true
  },
  {
    id: 7,
    name: "Sarah Chen",
    username: "@sarahc_photo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "The new camera is incredible!",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
    verified: true
  },
  {
    id: 8,
    name: "Dev Community",
    username: "@dev_comm",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Dev",
    lastMessage: "Alex: Check out this new framework",
    timestamp: "Yesterday",
    unread: 12,
    online: false,
    isGroup: true
  }
];

// Mock messages for selected chat
export const messages = [
  {
    id: 1,
    sender: "them",
    text: "Hey! How's your day going?",
    timestamp: "10:30 am",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav"
  },
  {
    id: 2,
    sender: "me",
    text: "Pretty good! Just working on this new project for the hackathon",
    timestamp: "10:32 am"
  },
  {
    id: 3,
    sender: "them",
    text: "Oh nice! What's it about?",
    timestamp: "10:33 am",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav"
  },
  {
    id: 4,
    sender: "me",
    text: "A social communication platform that combines chat and content feed",
    timestamp: "10:35 am"
  },
  {
    id: 5,
    sender: "me",
    text: "Think Instagram meets WhatsApp but with better UX",
    timestamp: "10:35 am"
  },
  {
    id: 6,
    sender: "them",
    text: "That sounds amazing! Let's plan it",
    timestamp: "11:55 am",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav"
  }
];

// Mock social feed posts
export const posts = [
  {
    id: 1,
    user: {
      name: "Sonya Leena",
      username: "@soul_rule",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonya",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop",
    likes: 380,
    comments: 42,
    caption: "You can never quit my sparkle ✨",
    timestamp: "2h ago",
    liked: true
  },
  {
    id: 2,
    user: {
      name: "Adam Addsin",
      username: "@adam_captures",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adam",
      verified: false
    },
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    likes: 260,
    comments: 28,
    caption: "In photography, there is a reality so subtle that...",
    timestamp: "4h ago",
    liked: false
  },
  {
    id: 3,
    user: {
      name: "Andrew Dewitt",
      username: "@andrew_tales",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    likes: 390,
    comments: 56,
    caption: "The unexpected moment is always sweetest",
    timestamp: "5h ago",
    liked: true
  },
  {
    id: 4,
    user: {
      name: "Nicole Segal",
      username: "@nico_daily",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicole",
      verified: false
    },
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=600&fit=crop",
    likes: 445,
    comments: 67,
    caption: "Colors of life 🌈",
    timestamp: "6h ago",
    liked: false
  },
  {
    id: 5,
    user: {
      name: "Michael Gilmore",
      username: "@mike_creative",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      verified: true
    },
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
    likes: 521,
    comments: 89,
    caption: "Adventure awaits those who seek it",
    timestamp: "8h ago",
    liked: true
  }
];

// Mock stories
export const stories = [
  {
    id: "your-story",
    user: {
      name: "Your story",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      hasStory: false
    }
  },
  {
    id: 1,
    user: {
      name: "Sonya",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonya",
      hasStory: true,
      viewed: false
    }
  },
  {
    id: 2,
    user: {
      name: "Adam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adam",
      hasStory: true,
      viewed: false
    }
  },
  {
    id: 3,
    user: {
      name: "Andrew",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew",
      hasStory: true,
      viewed: true
    }
  },
  {
    id: 4,
    user: {
      name: "Nicole",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicole",
      hasStory: true,
      viewed: false
    }
  },
  {
    id: 5,
    user: {
      name: "Ashley",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley",
      hasStory: true,
      viewed: true
    }
  },
  {
    id: 6,
    user: {
      name: "Michael",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      hasStory: true,
      viewed: false
    }
  },
  {
    id: 7,
    user: {
      name: "Damian",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Damian",
      hasStory: true,
      viewed: true
    }
  }
];
