import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  PlusCircle, 
  Heart, 
  MessageCircle as MessageIcon, 
  Send, 
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'
import { stories, posts as initialPosts } from '../../data/mockData'
import StoryViewer from '../Story/StoryViewer'
import CreatePostModal from '../Post/CreatePostModal'

const SocialFeed = ({ onProfileClick }) => {
  const [posts, setPosts] = useState(initialPosts)
  const [likedPosts, setLikedPosts] = useState(new Set([1, 3, 5]))
  const [savedPosts, setSavedPosts] = useState(new Set())
  const [selectedStory, setSelectedStory] = useState(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [showCreatePost, setShowCreatePost] = useState(false)

  // Filter out stories that have content (not "your story")
  const viewableStories = stories.filter(s => s.content)

  const openStory = (story) => {
    const index = viewableStories.findIndex(s => s.id === story.id)
    setCurrentStoryIndex(index)
    setSelectedStory(viewableStories[index])
  }

  const handleNextStory = () => {
    if (currentStoryIndex < viewableStories.length - 1) {
      const nextIndex = currentStoryIndex + 1
      setCurrentStoryIndex(nextIndex)
      setSelectedStory(viewableStories[nextIndex])
    }
  }

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1
      setCurrentStoryIndex(prevIndex)
      setSelectedStory(viewableStories[prevIndex])
    }
  }

  const closeStory = () => {
    setSelectedStory(null)
  }

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      {/* Top Navigation */}
      <div className="px-8 py-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 
                       text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-primary-500/50 transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 ml-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-6 h-6 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProfileClick}
              className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <User className="w-6 h-6 text-slate-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 rounded-xl bg-gradient-primary text-white font-semibold
                       shadow-glow hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="px-8 py-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Stories</h2>
        <div className="relative">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => story.content && openStory(story)}
                className="cursor-pointer"
              >
                <div className="relative">
                  {story.id === 'your-story' ? (
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed 
                                  border-slate-600 flex items-center justify-center">
                      <PlusCircle className="w-6 h-6 text-slate-500" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-full p-0.5 ${
                      story.user.viewed 
                        ? 'bg-slate-700' 
                        : 'bg-gradient-to-tr from-primary-500 to-fuchsia-500'
                    }`}>
                      <img
                        src={story.user.avatar}
                        alt={story.user.name}
                        className="w-full h-full rounded-full border-2 border-slate-900"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 text-center mt-2 w-16 truncate">
                  {story.user.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-8 py-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-6">Feed</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-10 h-10 rounded-full ring-2 ring-slate-700"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className="font-semibold text-slate-100 text-sm">
                          {post.user.name}
                        </h3>
                        {post.user.verified && (
                          <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{post.user.username}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Post Image */}
                <div className="relative w-full h-64 bg-slate-950">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(post.id)}
                        className="transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            likedPosts.has(post.id)
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-slate-400 hover:text-slate-300'
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="transition-colors"
                      >
                        <MessageIcon className="w-6 h-6 text-slate-400 hover:text-slate-300" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="transition-colors"
                      >
                        <Send className="w-6 h-6 text-slate-400 hover:text-slate-300" />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSave(post.id)}
                      className="transition-colors"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${
                          savedPosts.has(post.id)
                            ? 'fill-primary-500 text-primary-500'
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                      />
                    </motion.button>
                  </div>

                  {/* Likes count */}
                  <p className="font-semibold text-sm text-slate-100 mb-2">
                    {likedPosts.has(post.id) ? post.likes + 1 : post.likes} likes
                  </p>

                  {/* Caption */}
                  <div className="text-sm text-slate-300 mb-2">
                    <span className="font-semibold mr-2">{post.user.name}</span>
                    {post.caption}
                  </div>

                  {/* Comments */}
                  <button className="text-sm text-slate-500 hover:text-slate-400 transition-colors">
                    View all {post.comments} comments
                  </button>

                  {/* Timestamp */}
                  <p className="text-xs text-slate-600 mt-2">{post.timestamp}</p>
                </div>

                {/* Comment Input */}
                <div className="px-4 pb-4 border-t border-slate-700 pt-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-500 
                               focus:outline-none"
                    />
                    <button className="text-primary-500 font-semibold text-sm hover:text-primary-400 
                                     transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer */}
      <AnimatePresence>
        {selectedStory && (
          <StoryViewer
            story={selectedStory}
            onClose={closeStory}
            onNext={handleNextStory}
            onPrev={handlePrevStory}
            hasNext={currentStoryIndex < viewableStories.length - 1}
            hasPrev={currentStoryIndex > 0}
          />
        )}
      </AnimatePresence>
      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <CreatePostModal
            onClose={() => setShowCreatePost(false)}
            onPostCreated={(newPost) => {
              setPosts([newPost, ...posts])
              setShowCreatePost(false)
            }}
          />
        )}
      </AnimatePresence>    </div>
  )
}

export default SocialFeed
