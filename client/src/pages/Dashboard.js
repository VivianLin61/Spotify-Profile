import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth.js'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from '../components/TrackSearchResult.js'
import Player from '../components/Player.js'
import axios from 'axios'
import Layout from '../components/Layout.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Profile from '../pages/Profile.js'
import Artists from '../pages/Artists.js'
import Tracks from '../pages/Tracks.js'
const spotifyApi = new SpotifyWebApi({
  clientId: '8515d3f514614d3da7c8e1b533e664c2',
})
function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState('')
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get('http://localhost:4000/lyrics', {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return
    let cancel = false

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })
    //If a new request it made while seraching cancel the request.
    return () => (cancel = true)
  }, [search, accessToken])
  return (
    <Layout>
      <Route exact path='/' component={Profile} />
      <Route exact path='/artists' component={Artists}></Route>
      <Route exact path='/tracks' component={Tracks}></Route>
    </Layout>
  )
}

export default Dashboard
