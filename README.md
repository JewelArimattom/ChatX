# ChatX - Modern Social Communication Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-10.16-FF0080?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

## 🎨 Design Philosophy

ChatX is a next-generation social communication platform that seamlessly merges real-time messaging with social content discovery. Built for the **PIXELCRAFT UI/UX Design Challenge**, this project prioritizes visual aesthetics, emotional comfort, and intuitive user experience.

### Design Highlights

- **Split-Layout Interface**: Chat ecosystem (left) + Social feed (right) in perfect harmony
- **Dark Mode Elegance**: Deep slate backgrounds with vibrant violet-fuchsia gradient accents
- **Micro-interactions**: Smooth transitions, hover states, and purposeful animations
- **Typography**: Inter font family for modern, clean readability
- **8px Grid System**: Consistent spacing and visual rhythm
- **Component-Driven**: Reusable, semantic React components

## ✨ Features

### 🔐 Authentication
- Beautiful login and signup screens
- Social authentication UI (Google, GitHub)
- Animated backgrounds with gradient orbs
- Form validation and smooth transitions

### 💬 Chat Experience
- Real-time-style messaging interface
- Online status indicators
- Unread message badges
- Message timestamps
- Typing indicators
- Voice message support
- Media attachments
- Search functionality

### 📱 Social Feed
- Instagram-inspired content cards
- Stories carousel
- Like, comment, and save interactions
- Image posts with captions
- User verification badges
- Infinite scroll-ready layout

### 🎯 User Experience
- Fully responsive (mobile, tablet, desktop)
- Smooth page transitions
- Hover and focus states
- Accessible color contrast
- Loading animations
- Empty states

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone or navigate to the project**
```bash
cd ChatX
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Slate 950 | `#020617` | Primary background |
| Slate 900 | `#0f172a` | Panel background |
| Slate 800 | `#1e293b` | Card background |
| Slate 50 | `#f8fafc` | Primary text |
| Slate 400 | `#94a3b8` | Secondary text |
| Violet 500 | `#a855f7` | Accent (gradient start) |
| Fuchsia 500 | `#ec4899` | Accent (gradient end) |
| Emerald 400 | `#34d399` | Online status |
| Rose 500 | `#f43f5e` | Unread badges |

### Typography Scale

- **Display**: 32px / 2rem (Bold)
- **H1**: 24px / 1.5rem (Bold)
- **H2**: 18px / 1.125rem (Semibold)
- **Body**: 14px / 0.875rem (Regular)
- **Caption**: 12px / 0.75rem (Regular)

### Spacing System

All spacing follows an 8px base grid:
- **XS**: 8px
- **SM**: 16px
- **MD**: 24px
- **LG**: 32px
- **XL**: 48px

## 🏗️ Project Structure

```
ChatX/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   └── SocialFeed.jsx
│   │   └── Chat/
│   │       └── ChatConversation.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎭 Screens

### 1. Authentication (Login/Signup)
- Centered layout with animated background
- Email/password inputs with icons
- Social login options
- Smooth transitions between forms
- Terms and privacy policy links

### 2. Main Dashboard
- **Left Panel**: Chat list with search, online indicators, unread badges
- **Right Panel**: Stories carousel and social feed with posts
- Split-screen responsive layout
- Action buttons (new chat, calls, settings)

### 3. Chat Conversation
- Full-screen chat interface
- Message bubbles (sent/received)
- Real-time-style input with emoji picker
- Voice and media attachment options
- Chat header with user info and actions

## 🎯 Technical Highlights

- **React 18**: Latest features including hooks
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, consistent icons
- **Vite**: Lightning-fast build tool
- **Mock Data**: Realistic placeholder content

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column, chat or feed)
- **Tablet**: 768px - 1024px (Optimized split view)
- **Desktop**: > 1024px (Full split layout)

## 🌟 Animations

- **Page transitions**: Fade and slide
- **Button interactions**: Scale on hover/tap
- **Message appearance**: Staggered animation
- **Typing indicator**: Bouncing dots
- **Story carousel**: Smooth horizontal scroll
- **Like animation**: Heart fill transition

## 🎨 UI Components

All components follow these principles:
- **Semantic HTML**: Proper tags for accessibility
- **Reusable**: DRY principle
- **Responsive**: Mobile-first approach
- **Accessible**: ARIA labels where needed
- **Performant**: Optimized re-renders

## 📝 Mock Data

The application includes realistic mock data:
- 8 chat conversations
- 6 message exchanges
- 5 social posts
- 8 stories
- User profiles with avatars

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 🎯 Design Decisions

1. **Dark Mode First**: Modern, reduced eye strain, premium feel
2. **Gradient Accents**: Visual interest without overwhelming
3. **Card-Based Layout**: Clean content separation
4. **Generous Whitespace**: Breathing room, visual clarity
5. **Micro-interactions**: Delightful, purposeful feedback
6. **Familiar Patterns**: Instagram + WhatsApp design language

## 🔮 Future Enhancements

- Real-time WebSocket integration
- Push notifications
- Voice/video calling
- Group chat management
- Story creation and viewing
- Direct messaging from feed
- Advanced search and filters
- Settings and customization
- Profile editing
- File sharing

## 📄 License

This project was created for the PIXELCRAFT UI/UX Design Challenge.

## 🙏 Acknowledgments

- Design inspiration from Instagram and WhatsApp
- Icons by Lucide
- Avatars by DiceBear
- Images by Unsplash
- Fonts by Google Fonts (Inter)

---

<div align="center">
  <strong>Built with ❤️ for PIXELCRAFT UI/UX Design Challenge</strong>
  <br />
  <em>Prioritizing visual excellence and user delight</em>
</div>
