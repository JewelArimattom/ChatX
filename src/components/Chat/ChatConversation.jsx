import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic,
  Send,
  Info,
  Search,
  Image as ImageIcon
} from 'lucide-react'
import { listenToMessages, sendMessage } from '../../services/chatService'
import { getCurrentUser } from '../../utils/auth'
import VideoCall from '../Call/VideoCall'
import AudioCall from '../Call/AudioCall'

const ChatConversation = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [showAudioCall, setShowAudioCall] = useState(false)
  const messagesEndRef = useRef(null)
  const currentUser = getCurrentUser()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!chat?.id) return

    // Listen to messages in this chat
    const unsubscribe = listenToMessages(chat.id, (newMessages) => {
      setMessages(newMessages)
    })

    return () => unsubscribe()
  }, [chat?.id])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (newMessage.trim() && currentUser) {
      try {
        await sendMessage(chat.id, currentUser.id, currentUser.name, newMessage.trim())
        setNewMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
        alert('Failed to send message')
      }
    }
  }

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-slate-800/50 bg-slate-900/90 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2.5 rounded-xl bg-slate-800/50 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </motion.button>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`}
                  alt={chat.name || chat.otherUser?.name}
                  className="w-12 h-12 rounded-full ring-2 ring-primary-500/30 shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-lg" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-100 tracking-tight">
                  {chat.type === 'group' ? chat.name : (chat.otherUser?.name || chat.name)}
                </h2>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-xs text-green-400 font-medium">
                    {chat.type === 'group' ? `${(chat.participants || []).length} members` : 'Online'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAudioCall(true)}
              className="p-2.5 rounded-xl transition-all"
            >
              <Phone className="w-5 h-5 text-green-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVideoCall(true)}
              className="p-2.5 rounded-xl transition-all"
            >
              <Video className="w-5 h-5 text-blue-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(100, 116, 139, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl transition-all"
            >
              <Info className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)' }}>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message for empty chat */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
                <img
                  src={chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2">
                Start chatting with {chat.otherUser?.name || chat.name}
              </h3>
              <p className="text-slate-500 text-sm">Say hello and break the ice! 👋</p>
            </motion.div>
          )}

          {/* Date divider */}
          {messages.length > 0 && (
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
              <div className="px-4 py-1.5 mx-4 rounded-full bg-slate-800/80 backdrop-blur-sm text-xs text-slate-400 font-medium shadow-lg">
                Today
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => {
            const isMine = message.senderId === currentUser?.id
            const timeString = message.timestamp ? new Date(message.timestamp).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit', 
              hour12: true 
            }) : ''

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.02, type: 'spring', stiffness: 500, damping: 30 }}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2.5 max-w-[80%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isMine && (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderName}`}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full flex-shrink-0 ring-2 ring-slate-700/50 shadow-lg cursor-pointer"
                    />
                  )}
                  <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    {!isMine && chat.type === 'group' && (
                      <span className="text-xs text-primary-400 mb-1.5 px-1 font-semibold">{message.senderName}</span>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`${
                        isMine 
                          ? 'bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-xl shadow-primary-500/20' 
                          : 'bg-slate-800/90 backdrop-blur-sm text-slate-100 rounded-2xl rounded-bl-sm shadow-xl shadow-black/20 border border-slate-700/50'
                      } px-4 py-3 max-w-full`}
                    >
                      <p className="text-[15px] leading-relaxed break-words">{message.text}</p>
                    </motion.div>
                    <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${isMine ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {timeString}
                      </span>
                      {isMine && (
                        <div className="flex items-center">
                          <svg className="w-3.5 h-3.5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-end space-x-2"
              >
                <img
                  src={chat.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-slate-700 rounded-2xl rounded-bl-sm px-5 py-3">
                  <div className="flex space-x-1.5">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="px-4 py-4 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-800/50 border border-slate-700/50 shadow-xl">
            {/* Attachment buttons */}
            <div className="flex items-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl transition-all"
              >
                <Paperclip className="w-5 h-5 text-slate-400" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl transition-all"
              >
                <ImageIcon className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>

            {/* Input field */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 rounded-xl bg-transparent text-slate-100 
                         placeholder-slate-500 focus:outline-none text-[15px]"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 
                         hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <Smile className="w-5 h-5 text-yellow-400" />
              </motion.button>
            </div>

            {/* Send/Voice button */}
            {newMessage.trim() ? (
              <motion.button
                type="submit"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 text-white 
                         shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <Mic className="w-5 h-5 text-slate-400" />
              </motion.button>
            )}
          </div>
        </form>
      </div>

      {/* Video Call Modal */}
      <AnimatePresence>
        {showVideoCall && (
          <VideoCall
            contact={{
              name: chat.type === 'group' ? chat.name : (chat.otherUser?.name || chat.name),
              avatar: chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`
            }}
            onClose={() => setShowVideoCall(false)}
          />
        )}
      </AnimatePresence>

      {/* Audio Call Modal */}
      <AnimatePresence>
        {showAudioCall && (
          <AudioCall
            contact={{
              name: chat.type === 'group' ? chat.name : (chat.otherUser?.name || chat.name),
              avatar: chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`
            }}
            onClose={() => setShowAudioCall(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatConversation
