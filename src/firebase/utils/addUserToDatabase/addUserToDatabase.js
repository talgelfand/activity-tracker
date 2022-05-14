import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config'

const addUserToDatabase = async (userParameters) => {
  const { email, gender, height, weight, dateOfBirth } = userParameters

  await setDoc(doc(db, 'users', email), {
    gender,
    height,
    weight,
    dateOfBirth,
    activities: [],
  })
}

export default addUserToDatabase
