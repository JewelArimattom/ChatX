import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Image as ImageIcon, Type, Smile, Palette } from 'lucide-react'
import { getCurrentUser } from '../../utils/auth'

const AddStoryModal = ({ onClose, onStoryAdded }) => {
  const [storyImage, setStoryImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [storyText, setStoryText] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#7c3aed')
  const currentUser = getCurrentUser()

  const colors = [
    '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', 
    '#8b5cf6', '#ef4444', '#06b6d4', '#f97316', '#14b8a6'
  ]

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setStoryImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddStory = () => {
    if (!imagePreview && !storyText.trim()) {
      alert('Please add an image or text to your story')
      return
    }

    const newStory = {
      id: `story-${Date.now()}`,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`,
        verified: false,
        viewed: false
      },
      content: imagePreview || null,
      text: storyText,
      backgroundColor: imagePreview ? null : backgroundColor,
      timestamp: new Date().toISOString()
    }

    onStoryAdded(newStory)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 rounded-2xl w-full max-w-md border border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-100">Add to Story</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6">
          <div 
            className="relative w-full h-96 rounded-2xl overflow-hidden mb-4 flex items-center justify-center"
            style={{ backgroundColor: imagePreview ? '#000' : backgroundColor }}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Story preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setStoryImage(null)
                    setImagePreview(null)
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-slate-200" />
                </button>
              </>
            ) : (
              <div className="text-center p-8">
                <Type className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <p className="text-white text-2xl font-bold mb-2">
                  {storyText || 'Add text to your story'}
                </p>
              </div>
            )}
          </div>

          {/* Text Input */}
          {!imagePreview && (
            <>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Type your story text..."
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none mb-4"
                rows="3"
              />

              {/* Color Picker */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        backgroundColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Add Image Button */}
          <label className="w-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <div className="w-full p-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-primary-500 transition-colors flex items-center justify-center space-x-2 text-slate-400 hover:text-primary-400">
              <ImageIcon className="w-5 h-5" />
              <span className="font-medium">{imagePreview ? 'Change Image' : 'Add Image'}</span>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddStory}
            disabled={!imagePreview && !storyText.trim()}
            className="w-full px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Add to Story
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AddStoryModal
