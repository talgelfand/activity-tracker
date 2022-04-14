import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../config'

const addActivityToDatabase = async (userEmail, activity) => {
  const currentDate = new Date().toLocaleDateString().replaceAll('/', '.')

  const userRef = doc(db, 'users', userEmail)

  await updateDoc(userRef, {
    activities: arrayUnion({ ...activity, currentDate }),
  })
}

export default addActivityToDatabase
