// Authentication utility functions

const AUTH_STORAGE_KEY = 'chatx_users'
const SESSION_STORAGE_KEY = 'chatx_current_user'
const EXPIRY_DAYS = 2

// Get all users from localStorage
export const getStoredUsers = () => {
  try {
    const users = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!users) return []
    
    const parsedUsers = JSON.parse(users)
    const now = new Date().getTime()
    
    // Filter out expired users
    const validUsers = parsedUsers.filter(user => {
      const createdAt = new Date(user.createdAt).getTime()
      const expiryTime = createdAt + (EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      return now < expiryTime
    })
    
    // Update localStorage with only valid users
    if (validUsers.length !== parsedUsers.length) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(validUsers))
    }
    
    return validUsers
  } catch (error) {
    console.error('Error getting stored users:', error)
    return []
  }
}

// Save a new user to localStorage
export const saveUser = (userData) => {
  try {
    const users = getStoredUsers()
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email)
    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }
    
    // Create new user with timestamp
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
    }
    
    users.push(newUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users))
    
    return { success: true, user: newUser }
  } catch (error) {
    console.error('Error saving user:', error)
    return { success: false, error: 'Failed to save user' }
  }
}

// Validate login credentials
export const validateLogin = (email, password) => {
  try {
    const users = getStoredUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      // Save current session
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        loggedInAt: new Date().toISOString()
      }))
      return { success: true, user }
    }
    
    return { success: false, error: 'Invalid email or password' }
  } catch (error) {
    console.error('Error validating login:', error)
    return { success: false, error: 'Login failed' }
  }
}

// Get current logged-in user
export const getCurrentUser = () => {
  try {
    const session = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return session ? JSON.parse(session) : null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Logout user
export const logoutUser = () => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
    return { success: true }
  } catch (error) {
    console.error('Error logging out:', error)
    return { success: false }
  }
}

// Clear expired users (can be called on app init)
export const clearExpiredUsers = () => {
  getStoredUsers() // This will automatically clear expired users
}
