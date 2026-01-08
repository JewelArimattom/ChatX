import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCXlfVtbQskMZzfyINAm5wCnYJAfzgaKVA',
  authDomain: 'codex-a0fde.firebaseapp.com',
  projectId: 'codex-a0fde',
  storageBucket: 'codex-a0fde.firebasestorage.app',
  messagingSenderId: '651728663940',
  appId: '1:651728663940:web:2fae3e74fc62bafb7c19d1',
  measurementId: 'G-51W0BD53G0'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

// Optional (won't crash in environments where analytics isn't supported)
export const analyticsPromise = isSupported().then((supported) => {
  if (!supported) return null
  return getAnalytics(firebaseApp)
})
