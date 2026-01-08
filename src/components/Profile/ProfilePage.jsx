import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Grid, Bookmark, User, Settings, Edit2, Check, X } from 'lucide-react'
import { getCurrentUser } from '../../utils/auth'

const ProfilePage = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [bio, setBio] = useState(currentUser?.bio || "✨ Living my best life | 📸 Photography enthusiast | 🌍 Travel lover")
  const [tempBio, setTempBio] = useState(bio)
  const [tempName, setTempName] = useState(currentUser?.name || '')
  const [activeTab, setActiveTab] = useState('posts')
  const [viewingProfilePic, setViewingProfilePic] = useState(false)
  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updatedUser = { ...currentUser, avatar: e.target.result }
        setCurrentUser(updatedUser)
        // Update in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('chatx_users') || '[]')
        const userIndex = storedUsers.findIndex(u => u.email === currentUser.email)
        if (userIndex !== -1) {
          storedUsers[userIndex] = updatedUser
          localStorage.setItem('chatx_users', JSON.stringify(storedUsers))
          sessionStorage.setItem('chatx_current_user', JSON.stringify(updatedUser))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveBio = () => {
    setBio(tempBio)
    setIsEditingBio(false)
    const updatedUser = { ...currentUser, bio: tempBio }
    setCurrentUser(updatedUser)
    // Update in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('chatx_users') || '[]')
    const userIndex = storedUsers.findIndex(u => u.email === currentUser.email)
    if (userIndex !== -1) {
      storedUsers[userIndex] = updatedUser
      localStorage.setItem('chatx_users', JSON.stringify(storedUsers))
      sessionStorage.setItem('chatx_current_user', JSON.stringify(updatedUser))
    }
  }

  const handleCancelBio = () => {
    setTempBio(bio)
    setIsEditingBio(false)
  }

  const handleOpenEditProfile = () => {
    setTempName(currentUser?.name || '')
    setTempBio(bio)
    setIsEditingProfile(true)
  }

  const handleSaveProfile = () => {
    const updatedUser = { 
      ...currentUser, 
      name: tempName.trim() || currentUser?.name,
      bio: tempBio 
    }
    setCurrentUser(updatedUser)
    setBio(tempBio)
    
    // Update in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('chatx_users') || '[]')
    const userIndex = storedUsers.findIndex(u => u.email === currentUser.email)
    if (userIndex !== -1) {
      storedUsers[userIndex] = updatedUser
      localStorage.setItem('chatx_users', JSON.stringify(storedUsers))
      sessionStorage.setItem('chatx_current_user', JSON.stringify(updatedUser))
    }
    setIsEditingProfile(false)
  }

  const handleEditProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updatedUser = { ...currentUser, avatar: e.target.result }
        setCurrentUser(updatedUser)
        // Update in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('chatx_users') || '[]')
        const userIndex = storedUsers.findIndex(u => u.email === currentUser.email)
        if (userIndex !== -1) {
          storedUsers[userIndex] = updatedUser
          localStorage.setItem('chatx_users', JSON.stringify(storedUsers))
          sessionStorage.setItem('chatx_current_user', JSON.stringify(updatedUser))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Mock posts data
  const userPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop", likes: 234 },
    { id: 2, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", likes: 189 },
    { id: 3, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", likes: 456 },
    { id: 4, image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop", likes: 321 },
    { id: 5, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", likes: 567 },
    { id: 6, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop", likes: 678 },
  ]

  return (
    <div className="h-full w-full bg-slate-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-slate-100">{currentUser?.name}</h1>
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Settings className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
            {/* Profile Picture */}
            <div className="relative mb-6 md:mb-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <img
                  src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
                  alt={currentUser?.name}
                  onClick={() => setViewingProfilePic(true)}
                  className="w-full h-full rounded-full ring-4 ring-slate-800 object-cover cursor-pointer hover:ring-primary-500 transition-all"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Stats */}
            <div className="flex-1">
              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">42</div>
                  <div className="text-sm text-slate-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">1.2K</div>
                  <div className="text-sm text-slate-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-100">856</div>
                  <div className="text-sm text-slate-500">Following</div>
                </div>
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-slate-100 mb-2">{currentUser?.name}</h2>

              {/* Bio */}
              <div className="mb-4">
                {isEditingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                      rows="3"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveBio}
                        className="px-4 py-2 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelBio}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-all flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2">
                    <p className="text-slate-300 flex-1">{bio}</p>
                    <button
                      onClick={() => {
                        setTempBio(bio)
                        setIsEditingBio(true)
                      }}
                      className="p-1 rounded hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Edit Profile Button */}
              <button 
                onClick={handleOpenEditProfile}
                className="w-full md:w-auto px-6 py-2 rounded-lg bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-800">
          <div className="flex justify-center space-x-12 px-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 flex items-center space-x-2 border-t-2 transition-colors ${
                activeTab === 'posts'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Grid className="w-5 h-5" />
              <span className="font-semibold">POSTS</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 flex items-center space-x-2 border-t-2 transition-colors ${
                activeTab === 'saved'
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="font-semibold">SAVED</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="px-6 py-6">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {userPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                >
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white font-semibold">❤️ {post.likes}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-16 text-slate-500">
              <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No saved posts yet</p>
              <p className="text-sm mt-2">Save posts to see them here</p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Picture Viewer Modal */}
      <AnimatePresence>
        {viewingProfilePic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingProfilePic(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setViewingProfilePic(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Profile Picture */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
              alt={currentUser?.name}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            />

            {/* User Name */}
            <div className="absolute bottom-8 text-center">
              <p className="text-white text-xl font-semibold">{currentUser?.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditingProfile(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-100 mb-6">Edit Profile</h2>

              {/* Profile Picture Edit */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`}
                    alt={currentUser?.name}
                    className="w-24 h-24 rounded-full ring-4 ring-slate-700 object-cover"
                  />
                  <button
                    onClick={() => editFileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditProfilePicChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder="Your name"
                />
              </div>

              {/* Bio Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                  rows="3"
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-3 rounded-lg bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfilePage
