import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon, Video, Smile, MapPin, Users } from 'lucide-react'
import { getCurrentUser } from '../../utils/auth'

const CreatePostModal = ({ onClose, onPostCreated }) => {
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const currentUser = getCurrentUser()

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handlePost = () => {
    if (!postText.trim() && !selectedImage) {
      alert('Please add some content to your post')
      return
    }

    const newPost = {
      id: Date.now(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`,
        verified: false
      },
      content: postText,
      image: imagePreview,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    }

    onPostCreated(newPost)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 rounded-2xl w-full max-w-2xl border border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-100">Create Post</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
              alt={currentUser?.name}
              className="w-12 h-12 rounded-full ring-2 ring-slate-700"
            />
            <div>
              <h3 className="font-semibold text-slate-100">{currentUser?.name}</h3>
              <button className="text-xs text-slate-400 hover:text-slate-300 transition-colors flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>Public</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-4 max-h-[60vh] overflow-y-auto scrollbar-thin">
          {/* Text Area */}
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`What's on your mind, ${currentUser?.name}?`}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 
                     text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 
                     focus:ring-primary-500/50 resize-none min-h-[120px]"
            autoFocus
          />

          {/* Image Preview */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 relative rounded-xl overflow-hidden"
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto rounded-xl"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 
                           hover:bg-slate-900 transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-slate-200" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add to Post */}
          <div className="mt-4 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">Add to your post</span>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <div className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <ImageIcon className="w-6 h-6 text-green-500" />
                  </div>
                </label>
                <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <Video className="w-6 h-6 text-rose-500" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <Smile className="w-6 h-6 text-yellow-500" />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <MapPin className="w-6 h-6 text-rose-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePost}
            disabled={!postText.trim() && !selectedImage}
            className="w-full px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold 
                     shadow-glow hover:shadow-xl transition-all disabled:opacity-50 
                     disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Post
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CreatePostModal
