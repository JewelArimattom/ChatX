import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  X, 
  Mic, 
  MicOff, 
  PhoneOff,
  Volume2,
  VolumeX,
  User
} from 'lucide-react'

const AudioCall = ({ contact, onClose }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
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
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        {/* Close Button */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </motion.button>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-12">
          {/* Avatar with Pulse Animation */}
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary-500 rounded-full blur-2xl"
            />
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={contact.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
              alt={contact.name}
              className="relative w-40 h-40 rounded-full ring-8 ring-primary-500/30 shadow-2xl"
            />
            {/* Pulse Rings */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 border-4 border-primary-500 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3,
              }}
              className="absolute inset-0 border-4 border-primary-400 rounded-full"
            />
          </div>

          {/* Name and Status */}
          <h2 className="text-4xl font-bold text-white mb-3">{contact.name}</h2>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-lg text-slate-300">Connected</p>
          </div>
          <p className="text-2xl text-primary-400 font-mono font-semibold">
            {formatDuration(callDuration)}
          </p>
        </div>

        {/* Audio Waves Visualization */}
        <div className="flex items-center justify-center space-x-2 mb-12 h-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: isMuted ? "8px" : ["8px", "48px", "8px"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              className="w-2 bg-primary-500 rounded-full"
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6">
          {/* Speaker Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-6 rounded-full transition-all ${
              isSpeakerOn
                ? 'bg-slate-700 hover:bg-slate-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isSpeakerOn ? (
              <Volume2 className="w-7 h-7 text-white" />
            ) : (
              <VolumeX className="w-7 h-7 text-white" />
            )}
          </motion.button>

          {/* End Call */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 135 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-7 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-2xl shadow-red-500/50"
          >
            <PhoneOff className="w-8 h-8 text-white" />
          </motion.button>

          {/* Mute Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`p-6 rounded-full transition-all ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-7 h-7 text-white" />
            ) : (
              <Mic className="w-7 h-7 text-white" />
            )}
          </motion.button>
        </div>

        {/* Status Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            {isMuted ? 'You are muted' : 'Audio is active'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AudioCall
