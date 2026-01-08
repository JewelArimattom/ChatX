import { motion } from 'framer-motion'
import ChatPanel from './ChatPanel'
import SocialFeed from './SocialFeed'

const Dashboard = ({ onChatSelect, onLogout, onProfileClick }) => {
  return (
    <div className="h-full w-full flex bg-slate-950">
      {/* Left Side - Chat Panel */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-96 lg:w-[420px] flex-shrink-0 border-r border-slate-800"
      >
        <ChatPanel onChatSelect={onChatSelect} onLogout={onLogout} />
      </motion.div>

      {/* Right Side - Social Feed */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:flex flex-1 overflow-hidden"
      >
        <SocialFeed onProfileClick={onProfileClick} />
      </motion.div>
    </div>
  )
}

export default Dashboard
