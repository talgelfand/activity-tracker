import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config'

const fetchUserFromDatabase = async (userEmail) => {
  const docRef = doc(db, 'users', userEmail)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  }

  return null
}

export default fetchUserFromDatabase
