import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard.js'

const code = new URLSearchParams(window.location.search).get('code')
function App() {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App
