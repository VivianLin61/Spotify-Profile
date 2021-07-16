import React, { useEffect, useState } from 'react'
import PlaylistCard from '../components/PlaylistCard.js'
function Playlists(props) {
  const { spotifyApi } = props
  const [playlists, setPlaylists] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        setUser(data.body)
        console.log(data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [spotifyApi])

  useEffect(() => {
    if (user) {
      spotifyApi.getUserPlaylists(user.id).then(
        function (data) {
          setPlaylists(data.body.items)
          console.log(data.body)
        },
        function (err) {
          console.log('Something went wrong!', err)
        }
      )
    }
  }, [spotifyApi, user])
  return (
    <div className='app-container'>
      <div className='header'>
        <h1>Playlists</h1>
      </div>

      <div className='playlists'>
        {playlists &&
          playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
      </div>
    </div>
  )
}

export default Playlists
