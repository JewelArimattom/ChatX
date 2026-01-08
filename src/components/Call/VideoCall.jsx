import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  X, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff,
  Maximize2,
  MessageSquare,
  MoreVertical
} from 'lucide-react'

const VideoCall = ({ contact, onClose }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950 z-50 flex flex-col"
    >
      {/* Remote Video (Main) */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        {/* Mock Video Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-purple-900/20" />
        
        {/* Contact Avatar (simulating video) */}
        <div className="relative z-10 text-center">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={contact.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
            alt={contact.name}
            className="w-48 h-48 rounded-full ring-4 ring-primary-500/30 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-white mb-2">{contact.name}</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-lg text-slate-300">{formatDuration(callDuration)}</p>
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">Video Call</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <motion.div
          drag
          dragConstraints={{ top: -300, left: -600, right: 600, bottom: 300 }}
          className="absolute top-24 right-6 w-48 h-36 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-2xl cursor-move"
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {isVideoOff ? (
              <div className="text-center">
                <VideoOff className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Camera Off</p>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                <span className="text-slate-400 text-sm">You</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="p-8 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md">
        <div className="flex items-center justify-center space-x-6">
          {/* Mute/Unmute */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`p-5 rounded-full transition-all ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* Video On/Off */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-5 rounded-full transition-all ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-white" />
            ) : (
              <Video className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* End Call */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-5 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="w-7 h-7 text-white" />
          </motion.button>

          {/* Chat */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </motion.button>

          {/* More Options */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <MoreVertical className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCall
