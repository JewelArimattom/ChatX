import ChatPanel from './ChatPanel'
import SocialFeed from './SocialFeed'

const Dashboard = ({ currentUser, onChatSelect, onLogout, onProfileClick }) => {
  // Show loading if currentUser is not ready
  if (!currentUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex bg-slate-950">
      {/* Left Side - Chat Panel */}
      <div className="w-full md:w-96 lg:w-[420px] flex-shrink-0 border-r border-slate-800 h-full">
        <ChatPanel currentUser={currentUser} onChatSelect={onChatSelect} onLogout={onLogout} />
      </div>

      {/* Right Side - Social Feed */}
      <div className="hidden md:flex flex-1 overflow-hidden h-full">
        <SocialFeed onProfileClick={onProfileClick} />
      </div>
    </div>
  )
}

export default Dashboard
