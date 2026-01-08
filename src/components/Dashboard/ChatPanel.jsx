import { useEffect, useMemo, useState } from 'react'
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
import {
  createGroupConversation,
  createOrGetDmConversation,
  joinGroup,
  listenToGroups,
  listenToUsers
} from '../../services/chat'

const ChatPanel = ({ currentUser, onChatSelect, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const unsubUsers = listenToUsers(setUsers)
    const unsubGroups = listenToGroups(setGroups)
    return () => {
      unsubUsers?.()
      unsubGroups?.()
    }
  }, [])

  const q = searchQuery.trim().toLowerCase()

  const filteredUsers = useMemo(() => {
    const list = users.filter((u) => u?.uid && u.uid !== currentUser?.uid)
    if (!q) return list
    return list.filter((u) => (u.displayName || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q))
  }, [users, currentUser?.uid, q])

  const filteredGroups = useMemo(() => {
    if (!q) return groups
    return groups.filter((g) => (g.name || '').toLowerCase().includes(q))
  }, [groups, q])

  const handleUserClick = async (u) => {
    if (!currentUser?.uid) return
    const conv = await createOrGetDmConversation({ myUid: currentUser.uid, otherUid: u.uid })
    onChatSelect({
      id: conv.id,
      type: 'dm',
      name: u.displayName || u.email || 'User',
      avatar: u.avatar,
      online: !!u.online,
      isGroup: false
    })
  }

  const handleGroupClick = async (g) => {
    if (!currentUser?.uid) return
    const isMember = Array.isArray(g.participants) && g.participants.includes(currentUser.uid)
    if (!isMember) {
      const ok = window.confirm(`Join group "${g.name || 'Group'}"?`)
      if (!ok) return
      await joinGroup({ conversationId: g.id, uid: currentUser.uid })
    }
    onChatSelect({
      id: g.id,
      type: 'group',
      name: g.name || 'Group',
      avatar: g.avatar,
      isGroup: true
    })
  }

  const handleCreateGroup = async () => {
    if (!currentUser?.uid) return
    const name = window.prompt('Enter group name')
    if (!name || !name.trim()) return
    const conv = await createGroupConversation({ name: name.trim(), creatorUid: currentUser.uid })
    onChatSelect({
      id: conv.id,
      type: 'group',
      name: name.trim(),
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name.trim())}`,
      isGroup: true
    })
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
          onClick={handleCreateGroup}
          className="flex-1 py-2 rounded-lg bg-gradient-primary text-white text-sm font-semibold
                   shadow-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>New Group</span>
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
          {/* Users section */}
          <div className="px-3 pt-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Users
          </div>
          {filteredUsers.map((u, index) => (
            <motion.div
              key={u.uid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleUserClick(u)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 
                       cursor-pointer transition-all group"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={u.avatar}
                  alt={u.displayName}
                  className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                />
                {!!u.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full 
                                border-2 border-slate-900"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 truncate">{u.displayName || u.email}</h3>
                <p className="text-sm text-slate-400 truncate">{u.email}</p>
              </div>
            </motion.div>
          ))}

          {/* Groups section */}
          <div className="px-3 pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Groups
          </div>
          {filteredGroups.map((g, index) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleGroupClick(g)}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 
                       cursor-pointer transition-all group"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={g.avatar}
                  alt={g.name}
                  className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-primary-500 transition-all"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 truncate">{g.name}</h3>
                <p className="text-sm text-slate-400 truncate">
                  {Array.isArray(g.participants) ? `${g.participants.length} members` : 'Group'}
                </p>
              </div>

              {!Array.isArray(g.participants) || !g.participants.includes(currentUser?.uid) ? (
                <div className="flex-shrink-0 text-xs text-slate-500">Join</div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
