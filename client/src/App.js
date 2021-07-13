import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.js'
import { token } from '../src/spotifyAPI/index.js'
function App() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    var value = Promise.resolve(token)
    value.then(function (i) {
      setAccessToken(i)
    })
  }, [])

  return accessToken ? <Dashboard token={accessToken} /> : <Login />
}

export default App
