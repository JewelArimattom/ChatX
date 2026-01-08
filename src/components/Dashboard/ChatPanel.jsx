import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Video, 
  Settings, 
  MoreVertical,
  Edit3,
  LogOut,
  User
} from 'lucide-react'
import { chats } from '../../data/mockData'

const ChatPanel = ({ onChatSelect, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
              ChatX
            </h1>
          </div>
          
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </motion.button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-48 card p-2 z-10"
                >
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-left">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-left">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Settings</span>
                  </button>
                  <div className="my-1 border-t border-slate-700"></div>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span className="text-sm text-rose-400">Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 
                     text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 
                     focus:ring-primary-500/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 py-4 flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2 rounded-lg bg-gradient-primary text-white text-sm font-semibold
                   shadow-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>New Chat</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <Phone className="w-5 h-5 text-slate-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <Video className="w-5 h-5 text-slate-400" />
        </motion.button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3">
        <div className="space-y-1">
          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onChatSelect(chat)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 
                       cursor-pointer transition-all group"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full 
                                border-2 border-slate-900"></div>
                )}
                {chat.unread > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full 
                             flex items-center justify-center text-xs font-bold text-white"
                  >
                    {chat.unread}
                  </motion.div>
                )}
              </div>

              {/* Chat info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  <h3 className="font-semibold text-slate-100 truncate">
                    {chat.name}
                  </h3>
                  {chat.verified && (
                    <svg className="w-4 h-4 text-primary-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Timestamp */}
              <div className="flex-shrink-0 text-xs text-slate-500">
                {chat.timestamp}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
