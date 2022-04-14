import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config'

const addUserToDatabase = async (email) => {
  await setDoc(doc(db, 'users', email), {
    activities: [],
  })
}

export default addUserToDatabase
