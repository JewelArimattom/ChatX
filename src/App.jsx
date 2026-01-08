import { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import ChatConversation from './components/Chat/ChatConversation'
import LandingPage from './components/Landing/LandingPage'
import { getCurrentUser, logoutUser, clearExpiredUsers } from './utils/auth'

function App() {
  const [currentView, setCurrentView] = useState('landing') // landing, login, signup, dashboard, chat
  const [selectedChat, setSelectedChat] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    clearExpiredUsers() // Clean up expired users
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setCurrentView('dashboard')
    }
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
    setCurrentView('dashboard')
  }

  const handleSignup = (user) => {
    setCurrentUser(user)
    setCurrentView('dashboard')
  }

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    setCurrentView('chat')
  }

  const handleBackToDashboard = () => {
    setSelectedChat(null)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    logoutUser()
    setCurrentUser(null)
    setCurrentView('login')
    setSelectedChat(null)
  }

  return (
    <div className="h-full w-full">
      {currentView === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentView('login')} />
      )}
      
      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setCurrentView('signup')} 
        />
      )}
      
      {currentView === 'signup' && (
        <Signup 
          onSignup={handleSignup} 
          onSwitchToLogin={() => setCurrentView('login')} 
        />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard 
          currentUser={currentUser}
          onChatSelect={handleChatSelect}
          onLogout={handleLogout}
        />
      )}
      
      {currentView === 'chat' && selectedChat && (
        <ChatConversation 
          chat={selectedChat}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  )
}

export default App
