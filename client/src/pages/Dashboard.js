import React from 'react'
import useAuth from '../hooks/useAuth.js'
import SpotifyWebApi from 'spotify-web-api-node'
import Layout from '../components/Layout.js'
import { Route } from 'react-router-dom'
import Profile from '../pages/Profile.js'
import Artists from '../pages/Artists.js'
import Tracks from '../pages/Tracks.js'
import Playlists from '../pages/Playlists.js'
import Track from '../pages/Track.js'
import Artist from '../pages/Artist.js'
const spotifyApi = new SpotifyWebApi({
  clientId: '8515d3f514614d3da7c8e1b533e664c2',
})

function Dashboard({ token }) {
  // const accessToken = useAuth(code)

  return (
    <Layout accessToken={token} spotifyApi={spotifyApi}>
      <Route exact path='/' component={Profile} />
      <Route exact path='/artists' component={Artists}></Route>
      <Route exact path='/tracks' component={Tracks}></Route>
      <Route exact path='/playlists' component={Playlists}></Route>
      <Route exact path='track/:trackId' component={Track}></Route>
      <Route exact path='/artist/:artistId' component={Artist}></Route>
    </Layout>
  )
}

export default Dashboard
