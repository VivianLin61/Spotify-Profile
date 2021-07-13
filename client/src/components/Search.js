import React, { useState, useEffect } from 'react'
import { Form, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import TrackSearchResult from '../components/TrackSearchResult.js'
import Player from '../components/Player.js'
import axios from 'axios'
import { logout } from '../spotifyAPI/index.js'
function Search(props) {
  const { accessToken, spotifyApi } = props
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
  }, [accessToken, spotifyApi])

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
  }, [search, accessToken, spotifyApi])

  return (
    <div className='app-container' style={{ height: '100vh' }}>
      <div className='search-container'>
        <Form.Control
          type='search'
          className='searchBar'
          placeholder='Search Songs/Artists'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <DropdownButton
          as={ButtonGroup}
          id={`dropdown-variants-Secondary`}
          variant={'secondary'}
          title={'Username'}
          className='menu'
        >
          <Dropdown.Item eventKey='1'>Action</Dropdown.Item>
          <Dropdown.Item eventKey='2'>Another action</Dropdown.Item>
          <Dropdown.Item eventKey='3' onClick={logout}>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default Search
