import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Layout from '../components/Layout.js'
import { Route } from 'react-router-dom'
import Profile from '../pages/Profile.js'
import Artists from '../pages/Artists.js'
import Tracks from '../pages/Tracks.js'
import Playlists from '../pages/Playlists.js'
import Track from '../pages/Track.js'
import Artist from '../pages/Artist.js'
import Playlist from '../pages/Playlist.js'

const redirectUri = `${process.env.REACT_APP_REDIRECT_URI}`
const clientId = `${process.env.REACT_APP_CLIENT_ID}`

const spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
})

function Dashboard({ token }) {
  const [user, setUser] = useState()
  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        setUser(data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [])
  return (
    <Layout token={token} spotifyApi={spotifyApi}>
      <Route
        exact
        path='/'
        render={() => <Profile token={token} spotifyApi={spotifyApi} />}
      />
      <Route
        exact
        path='/artists'
        render={() => <Artists token={token} spotifyApi={spotifyApi} />}
      ></Route>
      <Route
        exact
        path='/tracks'
        render={() => <Tracks spotifyApi={spotifyApi} />}
      ></Route>
      <Route
        exact
        path='/playlists'
        render={() => <Playlists user={user} spotifyApi={spotifyApi} />}
      ></Route>
      <Route
        exact
        path='/track/:trackId'
        render={({ match, location }) => (
          <Track
            location={location}
            match={match}
            accessToken={token}
            spotifyApi={spotifyApi}
          />
        )}
      ></Route>
      <Route
        exact
        path='/artist/:artistId'
        render={({ match, location }) => (
          <Artist
            location={location}
            match={match}
            accessToken={token}
            spotifyApi={spotifyApi}
          />
        )}
      ></Route>
      <Route
        exact
        path='/playlist/:playlistId'
        render={({ match, location }) => (
          <Playlist
            location={location}
            match={match}
            accessToken={token}
            spotifyApi={spotifyApi}
          />
        )}
      ></Route>
    </Layout>
  )
}

export default Dashboard
