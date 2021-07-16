import React, { useEffect } from 'react'
import Sidebar from './Sidebar.js'
import Search from './Search.js'
function Layout(props) {
  const { token, spotifyApi } = props
  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  return (
    <>
      <Sidebar />
      <Search accessToken={token} spotifyApi={spotifyApi} />
      {props.children}
    </>
  )
}

export default Layout
