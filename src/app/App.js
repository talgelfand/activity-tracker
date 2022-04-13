import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Statistics from '../components/Statistics'

import { auth } from '../firebase'

function App() {
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.displayName)
      } else setUserEmail('')
    })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile email={userEmail} />} />
      </Routes>
    </Router>
  )
}

export default App
