import React from 'react'
import Sidebar from './Sidebar.js'
import Search from './Search.js'
function Layout(props) {
  const { accessToken, spotifyApi } = props
  return (
    <>
      <Sidebar />
      <Search accessToken={accessToken} spotifyApi={spotifyApi} />
      {props.children}
    </>
  )
}

export default Layout
