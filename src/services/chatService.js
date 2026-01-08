import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create or get a 1-to-1 chat
export const createOrGetDirectChat = async (currentUserId, otherUserId) => {
  try {
    // Create a consistent chat ID by sorting user IDs
    const chatId = [currentUserId, otherUserId].sort().join('_');
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      // Create new chat
      await setDoc(chatRef, {
        type: 'direct',
        participants: [currentUserId, otherUserId],
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: serverTimestamp()
      });
    }

    return chatId;
  } catch (error) {
    console.error('Error creating/getting chat:', error);
    throw error;
  }
};

// Create a group chat
export const createGroupChat = async (creatorId, groupName, groupDescription = '') => {
  try {
    const groupRef = await addDoc(collection(db, 'chats'), {
      type: 'group',
      name: groupName,
      description: groupDescription,
      creator: creatorId,
      participants: [creatorId],
      pendingInvites: [],
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: serverTimestamp(),
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${groupName}`
    });

    return groupRef.id;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Join a group chat
export const joinGroupChat = async (chatId, userId) => {
  try {
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      participants: arrayUnion(userId),
      pendingInvites: arrayUnion(userId)
    });
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

// Accept group invitation
export const acceptGroupInvite = async (chatId, userId) => {
  try {
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);
    
    if (chatDoc.exists()) {
      const data = chatDoc.data();
      const pendingInvites = data.pendingInvites || [];
      const participants = data.participants || [];
      
      // Remove from pending and add to participants if not already there
      const newPendingInvites = pendingInvites.filter(id => id !== userId);
      const newParticipants = participants.includes(userId) ? participants : [...participants, userId];
      
      await updateDoc(chatRef, {
        participants: newParticipants,
        pendingInvites: newPendingInvites
      });
    }
  } catch (error) {
    console.error('Error accepting invite:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatId, senderId, senderName, text) => {
  try {
    const messageRef = await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderId,
      senderName,
      text,
      timestamp: serverTimestamp(),
      read: false
    });

    // Update last message in chat
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageTime: serverTimestamp()
    });

    return messageRef.id;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Listen to messages in a chat
export const listenToMessages = (chatId, callback) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      });
    });
    callback(messages);
  });
};

// Listen to user's chats
export const listenToUserChats = (userId, callback) => {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef, 
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );
  
  return onSnapshot(q, async (snapshot) => {
    const chats = [];
    
    for (const chatDoc of snapshot.docs) {
      const chatData = chatDoc.data();
      const chat = {
        id: chatDoc.id,
        ...chatData,
        lastMessageTime: chatData.lastMessageTime?.toDate()
      };

      // For direct chats, fetch the other user's info
      if (chatData.type === 'direct') {
        const otherUserId = chatData.participants.find(id => id !== userId);
        if (otherUserId) {
          try {
            const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
            if (otherUserDoc.exists()) {
              chat.otherUser = {
                id: otherUserDoc.id,
                ...otherUserDoc.data()
              };
            }
          } catch (error) {
            console.error('Error fetching other user:', error);
          }
        }
      }
      
      chats.push(chat);
    }
    
    callback(chats);
  });
};

// Get all users
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = [];
    
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Listen to all users (real-time)
export const listenToUsers = (callback) => {
  const usersRef = collection(db, 'users');
  
  return onSnapshot(usersRef, (snapshot) => {
    const users = [];
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(users);
  });
};

// Listen to all groups (real-time)
export const listenToAllGroups = (callback) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('type', '==', 'group'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const groups = [];
    snapshot.forEach((doc) => {
      groups.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastMessageTime: doc.data().lastMessageTime?.toDate()
      });
    });
    callback(groups);
  });
};

// Add or update user in Firestore
export const addOrUpdateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      lastActive: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error adding/updating user:', error);
    throw error;
  }
};
