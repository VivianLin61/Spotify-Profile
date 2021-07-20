import React, { useEffect, useState } from 'react'
import PlaylistCard from '../components/PlaylistCard.js'
import Loader from '../components/Loader.js'
import { getAccessToken } from '../spotifyAPI/index.js'
function Playlists(props) {
  const { spotifyApi } = props
  const [playlists, setPlaylists] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        setUser(data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
        spotifyApi.setAccessToken(getAccessToken())
      }
    )
  }, [spotifyApi])

  useEffect(() => {
    if (user) {
      spotifyApi.getUserPlaylists(user.id).then(
        function (data) {
          setPlaylists(data.body.items)
        },
        function (err) {
          console.log('Something went wrong!', err)
          spotifyApi.setAccessToken(getAccessToken())
        }
      )
    }
  }, [spotifyApi, user])
  const updateBackground = (color) => {
    document.getElementsByClassName('app')[0].style.background =
      'var(--main-color)'
  }
  return (
    <div
      className='app-container'
      onLoad={() => {
        updateBackground()
      }}
    >
      <div className='header'>
        <h1>Playlists</h1>
      </div>

      <div className='playlists'>
        {playlists ? (
          playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Playlists
