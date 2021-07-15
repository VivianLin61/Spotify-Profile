import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Layout from '../components/Layout.js'
import { Route } from 'react-router-dom'
import Profile from '../pages/Profile.js'
import Artists from '../pages/Artists.js'
import Tracks from '../pages/Tracks.js'
import Playlists from '../pages/Playlists.js'
import Track from '../pages/Track.js'
import Artist from '../pages/Artist.js'
const scope =
  'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public'

const spotifyApi = new SpotifyWebApi({
  clientId: '8515d3f514614d3da7c8e1b533e664c2',
})
function Dashboard({ token }) {
  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  return (
    <Layout accessToken={token} spotifyApi={spotifyApi}>
      <Route
        exact
        path='/'
        render={() => <Profile token={token} spotifyApi={spotifyApi} />}
      />
      <Route
        exact
        path='/artists'
        render={() => <Artists spotifyApi={spotifyApi} />}
      ></Route>
      <Route
        exact
        path='/tracks'
        render={() => <Tracks spotifyApi={spotifyApi} />}
      ></Route>
      <Route exact path='/playlists' component={Playlists}></Route>
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
      <Route exact path='/artist/:artistId' component={Artist}></Route>
    </Layout>
  )
}

export default Dashboard
