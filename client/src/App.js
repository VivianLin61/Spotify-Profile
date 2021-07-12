import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.js'
import useAuth from '../src/hooks/useAuth.js'
const code = new URLSearchParams(window.location.search).get('code')
function App() {
  const accessToken = useAuth(code)
  console.log(accessToken)
  return accessToken ? <Dashboard token={accessToken} /> : <Login />
}

export default App
