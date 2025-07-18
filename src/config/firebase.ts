import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCUoCrl4lm-eyYn6axfGBRPHmSVIv4AOlQ",
  authDomain: "socialchat-b6382.firebaseapp.com",
  databaseURL: "https://socialchat-b6382-default-rtdb.firebaseio.com",
  projectId: "socialchat-b6382",
  storageBucket: "socialchat-b6382.firebasestorage.app",
  messagingSenderId: "753198655677",
  appId: "1:753198655677:web:942fc9658bfc05e69eafd4",
  measurementId: "G-JQ817X706H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase Cloud Messaging (only if supported)
let messaging: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export { messaging };

// Simple notification service for the app
export const NotificationService = {
  initialize: async () => {
    // Initialize notification service
    console.log('Notification service initialized');
    return true;
  },
  
  onMessage: (callback: (payload: any) => void) => {
    console.log('Setting up message listener');
    // Return unsubscribe function
    return () => {
      console.log('Message listener removed');
    };
  },
  
  // Request notification permission
  requestPermission: async () => {
    if ('Notification' in window) {
      const permission = await Notification.permission;
      if (permission === 'granted') {
        return true;
      }
      
      try {
        const result = await Notification.requestPermission();
        return result === 'granted';
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }
    return false;
  }
};

export default app;