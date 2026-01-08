import { useState, useEffect } from 'react'
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
  User,
  Users
} from 'lucide-react'
import { listenToUserChats, addOrUpdateUser, listenToUsers, createOrGetDirectChat } from '../../services/chatService'
import NewChatModal from '../Chat/NewChatModal'

const ChatPanel = ({ currentUser, onChatSelect, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showNewChat, setShowNewChat] = useState(false)
  const [chats, setChats] = useState([])
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    if (!currentUser) return

    // Add/update user in Firestore
    addOrUpdateUser(currentUser.id, {
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`,
      bio: currentUser.bio || ''
    })

    // Listen to user's chats
    const unsubscribeChats = listenToUserChats(currentUser.id, (userChats) => {
      setChats(userChats)
    })

    // Listen to all users
    const unsubscribeUsers = listenToUsers((users) => {
      const filteredUsers = users.filter(u => u.id !== currentUser?.id)
      setAllUsers(filteredUsers)
    })

    return () => {
      unsubscribeChats()
      unsubscribeUsers()
    }
  }, [currentUser])

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartChat = async (user) => {
    try {
      const chatId = await createOrGetDirectChat(currentUser.id, user.id)
      onChatSelect({
        id: chatId,
        type: 'direct',
        otherUser: user,
        name: user.name,
        avatar: user.avatar
      })
    } catch (error) {
      console.error('Error starting chat:', error)
    }
  }

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
          onClick={() => setShowNewChat(true)}
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
        {chats.length === 0 ? (
          <div className="py-4">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-300 mb-1">No chats yet</h3>
              <p className="text-sm text-slate-500">Start a conversation with someone</p>
            </div>
            
            {/* Available Users */}
            {allUsers.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 px-3 mb-3">
                  <Users className="w-4 h-4 text-slate-500" />
                  <h4 className="text-sm font-semibold text-slate-400">Available Users ({allUsers.length})</h4>
                </div>
                <div className="space-y-1">
                  {allUsers.slice(0, 10).map((user, index) => (
                    <motion.button
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStartChat(user)}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 
                               cursor-pointer transition-all group"
                    >
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                      />
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-slate-100">{user.name}</h3>
                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                      </div>
                    </motion.button>
                  ))}
                  {allUsers.length > 10 && (
                    <button
                      onClick={() => setShowNewChat(true)}
                      className="w-full py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      View all {allUsers.length} users
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat, index) => {
              const isGroup = chat.type === 'group'
              const displayName = isGroup ? chat.name : (chat.otherUser?.name || 'Unknown')
              const displayAvatar = isGroup ? chat.avatar : (chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`)
              
              return (
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
                      src={displayAvatar}
                      alt={displayName}
                      className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                    />
                    {isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-500 rounded-full 
                                    border-2 border-slate-900 flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Chat info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <h3 className="font-semibold text-slate-100 truncate">
                        {displayName}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 truncate">
                      {chat.lastMessage || 'No messages yet'}
                    </p>
                  </div>

                  {/* Timestamp */}
                  {chat.lastMessageTime && (
                    <div className="flex-shrink-0 text-xs text-slate-500">
                      {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      <AnimatePresence>
        {showNewChat && (
          <NewChatModal
            currentUser={currentUser}
            onClose={() => setShowNewChat(false)}
            onChatCreated={(chat) => {
              onChatSelect(chat)
              setShowNewChat(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatPanel
