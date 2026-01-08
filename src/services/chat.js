import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase'

const dmKey = (uidA, uidB) => [uidA, uidB].sort().join('_')

export const listenToUsers = (onUsers) => {
  const q = query(collection(db, 'users'), orderBy('displayName', 'asc'))
  return onSnapshot(q, (snap) => {
    const users = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    onUsers(users)
  })
}

export const listenToGroups = (onGroups) => {
  // Intentionally no orderBy here to avoid requiring a composite index.
  const q = query(collection(db, 'conversations'), where('type', '==', 'group'))
  return onSnapshot(q, (snap) => {
    const groups = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const at = a?.createdAt?.toMillis ? a.createdAt.toMillis() : 0
        const bt = b?.createdAt?.toMillis ? b.createdAt.toMillis() : 0
        return bt - at
      })
    onGroups(groups)
  })
}

export const createOrGetDmConversation = async ({ myUid, otherUid }) => {
  const key = dmKey(myUid, otherUid)
  const q = query(collection(db, 'conversations'), where('type', '==', 'dm'), where('key', '==', key), limit(1))
  const snap = await getDocs(q)
  if (!snap.empty) {
    const d = snap.docs[0]
    return { id: d.id, ...d.data() }
  }

  const ref = await addDoc(collection(db, 'conversations'), {
    type: 'dm',
    key,
    participants: [myUid, otherUid],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessageText: '',
    lastMessageAt: null
  })

  return {
    id: ref.id,
    type: 'dm',
    key,
    participants: [myUid, otherUid]
  }
}

export const createGroupConversation = async ({ name, creatorUid }) => {
  const ref = await addDoc(collection(db, 'conversations'), {
    type: 'group',
    name,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`,
    participants: [creatorUid],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessageText: '',
    lastMessageAt: null
  })

  return {
    id: ref.id,
    type: 'group',
    name,
    participants: [creatorUid]
  }
}

export const joinGroup = async ({ conversationId, uid }) => {
  const ref = doc(db, 'conversations', conversationId)
  await updateDoc(ref, {
    participants: arrayUnion(uid),
    updatedAt: serverTimestamp()
  })
}

export const listenToMessages = ({ conversationId, onMessages }) => {
  const q = query(collection(db, 'conversations', conversationId, 'messages'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    onMessages(messages)
  })
}

export const sendMessage = async ({ conversationId, senderId, text }) => {
  const msgRef = await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
    senderId,
    text,
    createdAt: serverTimestamp()
  })

  await updateDoc(doc(db, 'conversations', conversationId), {
    lastMessageText: text,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })

  return msgRef.id
}
