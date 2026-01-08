import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const StoryViewer = ({ story, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          if (hasNext) {
            onNext()
          } else {
            onClose()
          }
          return 100
        }
        return prev + 1
      })
    }, 50) // 5 seconds total (100 * 50ms)

    return () => clearInterval(timer)
  }, [story, hasNext, onNext, onClose])

  if (!story || !story.content) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/50 z-10">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Previous Button */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-10 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Next Button */}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-10 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Story Content */}
      <div className="relative max-w-md w-full h-full flex items-center justify-center">
        <motion.div
          key={story.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full max-h-[90vh] rounded-2xl overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={story.content.url}
            alt={story.user.name}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

          {/* User Info */}
          <div className="absolute top-6 left-6 right-6 flex items-center space-x-3">
            <img
              src={story.user.avatar}
              alt={story.user.name}
              className="w-10 h-10 rounded-full ring-2 ring-white"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{story.user.name}</h3>
              <p className="text-white/80 text-sm">{story.content.timestamp}</p>
            </div>
          </div>

          {/* Story Text */}
          {story.content.text && (
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-lg font-medium">
                {story.content.text}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StoryViewer
