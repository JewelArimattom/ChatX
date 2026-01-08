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

const ChatConversation = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
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
    <div className="h-full w-full flex flex-col bg-slate-900">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </motion.button>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`}
                  alt={chat.name || chat.otherUser?.name}
                  className="w-11 h-11 rounded-full ring-2 ring-slate-700"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h2 className="font-semibold text-slate-100">
                    {chat.type === 'group' ? chat.name : (chat.otherUser?.name || chat.name)}
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  {chat.type === 'group' ? `${(chat.participants || []).length} members` : 'Active now'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-5 h-5 text-slate-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Video className="w-5 h-5 text-slate-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Search className="w-5 h-5 text-slate-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Date divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-4 py-1.5 rounded-full bg-slate-800/60 backdrop-blur-sm text-xs text-slate-400 font-medium">
              Today
            </div>
          </div>

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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[75%] ${
                  isMine ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {!isMine && (
                    <img
                      src={chat.avatar || chat.otherUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderName}`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full flex-shrink-0 ring-2 ring-slate-800"
                    />
                  )}
                  <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    {!isMine && chat.type === 'group' && (
                      <span className="text-xs text-slate-400 mb-1 px-3 font-medium">{message.senderName}</span>
                    )}
                    <div className={`${
                      isMine 
                        ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-2xl rounded-br-md' 
                        : 'bg-slate-800 text-slate-100 rounded-2xl rounded-bl-md'
                    } px-4 py-2.5 shadow-lg max-w-full`}>
                      <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    </div>
                    <span className="text-xs text-slate-500 mt-1.5 px-1">
                      {timeString}
                    </span>
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
      <div className="px-4 py-4 border-t border-slate-800 bg-slate-900/95 backdrop-blur-md">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            {/* Attachment buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Paperclip className="w-5 h-5 text-slate-400" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl hover:bg-slate-800 transition-colors"
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
                placeholder="Type a message..."
                className="w-full px-5 py-3.5 pr-12 rounded-2xl bg-slate-800/80 border border-slate-700/50 
                         text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 
                         focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 
                         hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Smile className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Send/Voice button */}
            {newMessage.trim() ? (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-primary text-white shadow-glow 
                         hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Mic className="w-5 h-5 text-slate-400" />
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatConversation
