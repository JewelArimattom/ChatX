import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, UserPlus, Search } from 'lucide-react'
import { listenToUsers, createOrGetDirectChat, createGroupChat } from '../../services/chatService'

const NewChatModal = ({ currentUser, onClose, onChatCreated }) => {
  const [allUsers, setAllUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showGroupCreate, setShowGroupCreate] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Listen to all users
    const unsubscribe = listenToUsers((users) => {
      // Filter out current user
      const filteredUsers = users.filter(u => u.id !== currentUser?.id)
      setAllUsers(filteredUsers)
    })

    return () => unsubscribe()
  }, [currentUser])

  const filteredUsers = allUsers.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStartDirectChat = async (otherUser) => {
    setLoading(true)
    try {
      const chatId = await createOrGetDirectChat(currentUser.id, otherUser.id)
      onChatCreated({
        id: chatId,
        type: 'direct',
        otherUser,
        name: otherUser.name,
        avatar: otherUser.avatar
      })
      onClose()
    } catch (error) {
      console.error('Error starting chat:', error)
      alert('Failed to start chat. Please try again.')
    }
    setLoading(false)
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert('Please enter a group name')
      return
    }

    setLoading(true)
    try {
      const chatId = await createGroupChat(currentUser.id, groupName, groupDescription)
      onChatCreated({
        id: chatId,
        type: 'group',
        name: groupName,
        description: groupDescription
      })
      onClose()
    } catch (error) {
      console.error('Error creating group:', error)
      alert('Failed to create group. Please try again.')
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-800"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-100">New Chat</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Tab Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setShowGroupCreate(false)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                !showGroupCreate
                  ? 'bg-gradient-primary text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4 inline mr-2" />
              Direct Chat
            </button>
            <button
              onClick={() => setShowGroupCreate(true)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showGroupCreate
                  ? 'bg-gradient-primary text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Create Group
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {!showGroupCreate ? (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>

              {/* Users List */}
              <div className="space-y-2">
                {filteredUsers.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No users found</p>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.button
                      key={user.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartDirectChat(user)}
                      disabled={loading}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full ring-2 ring-slate-700"
                      />
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-slate-100">{user.name}</h3>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              {/* Group Creation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="What's this group about?"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                  />
                </div>

                <button
                  onClick={handleCreateGroup}
                  disabled={loading || !groupName.trim()}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Group'}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NewChatModal
