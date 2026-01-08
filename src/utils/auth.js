import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const userToSessionUser = (firebaseUser, profile) => {
  if (!firebaseUser) return null

  const displayName = profile?.displayName || firebaseUser.displayName || 'User'
  const avatar =
    profile?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`

  return {
    uid: firebaseUser.uid,
    id: firebaseUser.uid, // kept for backwards compatibility
    name: displayName,
    email: firebaseUser.email || profile?.email || '',
    avatar
  }
}

const ensureUserProfile = async (firebaseUser, displayNameOverride) => {
  const ref = doc(db, 'users', firebaseUser.uid)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data()

  const displayName =
    displayNameOverride || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
  const profile = {
    uid: firebaseUser.uid,
    displayName,
    email: firebaseUser.email || '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`,
    createdAt: serverTimestamp()
  }
  await setDoc(ref, profile)
  return profile
}

// Backwards-compatible no-op for old localStorage behavior
export const clearExpiredUsers = () => {}

// Backwards-compatible helper (not used anymore)
export const getStoredUsers = async () => []

export const saveUser = async (userData) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    const profile = await ensureUserProfile(cred.user, userData.name)
    return { success: true, user: userToSessionUser(cred.user, profile) }
  } catch (error) {
    const msg =
      error?.code === 'auth/email-already-in-use'
        ? 'Email already registered'
        : error?.message || 'Failed to create account'
    return { success: false, error: msg }
  }
}

export const validateLogin = async (email, password) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const profile = await ensureUserProfile(cred.user)
    return { success: true, user: userToSessionUser(cred.user, profile) }
  } catch (error) {
    const msg =
      error?.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : error?.message || 'Login failed'
    return { success: false, error: msg }
  }
}

// In Firebase, auth state is async; keep this as a lightweight getter.
export const getCurrentUser = () => {
  const u = auth.currentUser
  if (!u) return null
  return {
    uid: u.uid,
    id: u.uid,
    name: u.displayName || u.email?.split('@')[0] || 'User',
    email: u.email || '',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      u.displayName || u.email?.split('@')[0] || 'User'
    )}`
  }
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null)
      return
    }

    const profile = await ensureUserProfile(firebaseUser)
    callback(userToSessionUser(firebaseUser, profile))
  })
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    console.error('Error logging out:', error)
    return { success: false }
  }
}
