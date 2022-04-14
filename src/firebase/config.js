import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: move keys to .env file to avoid exposing them (security risks)
// TODO: not now, this will be a separate story
const firebaseConfig = {
  apiKey: 'AIzaSyDumGurMDtibi-fCYmlRWwrefGFbXykKLU',
  authDomain: 'activitytracker-22ea7.firebaseapp.com',
  projectId: 'activitytracker-22ea7',
  storageBucket: 'activitytracker-22ea7.appspot.com',
  messagingSenderId: '219308013355',
  appId: '1:219308013355:web:9e729d254d7ff55e09b76e',
  measurementId: 'G-F1PG1XJMFN',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app)
