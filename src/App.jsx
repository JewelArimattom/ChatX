import { useState, useEffect } from 'react'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import ChatConversation from './components/Chat/ChatConversation'
import { logoutUser, onAuthChange } from './utils/auth'

function App() {
  const [currentView, setCurrentView] = useState('login') // login, signup, dashboard, chat
  const [selectedChat, setSelectedChat] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  // Firebase auth session on mount
  useEffect(() => {
    const unsub = onAuthChange((user) => {
      setCurrentUser(user)
      if (user) {
        setCurrentView('dashboard')
      } else {
        setCurrentView('login')
        setSelectedChat(null)
      }
    })
    return () => unsub?.()
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
  }

  return (
    <div className="h-full w-full">
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
          currentUser={currentUser}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  )
}

export default App
