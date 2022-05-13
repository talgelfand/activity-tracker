import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config'

const addUserToDatabase = async (email, gender, height, weight, dateOfBirth) => {
  await setDoc(doc(db, 'users', email), {
    gender,
    height,
    weight,
    dateOfBirth,
    activities: [],
  })
}

export default addUserToDatabase
