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
import { listenToMessages, sendMessage } from '../../services/chat'

const ChatConversation = ({ chat, currentUser, onBack }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!chat?.id) return
    const unsub = listenToMessages({
      conversationId: chat.id,
      onMessages: (msgs) => {
        setMessages(msgs)
      }
    })
    return () => unsub?.()
  }, [chat?.id])

  const formatTime = (ts) => {
    try {
      const d = ts?.toDate ? ts.toDate() : ts instanceof Date ? ts : null
      if (!d) return ''
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    } catch {
      return ''
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = newMessage.trim()
    if (!text) return
    if (!currentUser?.uid || !chat?.id) return

    setNewMessage('')
    setIsTyping(false)
    await sendMessage({
      conversationId: chat.id,
      senderId: currentUser.uid,
      text
    })
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
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-11 h-11 rounded-full ring-2 ring-slate-700"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full 
                                border-2 border-slate-900"></div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h2 className="font-semibold text-slate-100">{chat.name}</h2>
                  {chat.verified && (
                    <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {chat.online ? 'Active now' : 'Offline'}
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
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Date divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-4 py-1.5 rounded-full bg-slate-800 text-xs text-slate-400">
              Today
            </div>
          </div>

          {/* Messages */}
          {messages.map((message, index) => {
            const isMe = message.senderId === currentUser?.uid
            return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[70%] ${
                isMe ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}>
                {!isMe && (
                  <img
                    src={chat.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={isMe ? 'chat-bubble-sent' : 'chat-bubble-received'}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 px-2">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </motion.div>
          )})}

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
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
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
                className="w-full px-5 py-3 pr-12 rounded-2xl bg-slate-800 border border-slate-700 
                         text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 
                         focus:ring-primary-500/50 focus:border-transparent transition-all"
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
