import React, { useState, useEffect, useRef } from 'react'
import { Form, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import TrackSearchResult from '../components/TrackSearchResult.js'
import { logout } from '../spotifyAPI/index.js'
function Search(props) {
  const { accessToken, spotifyApi } = props
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [show, setShow] = useState(false)
  const node = useRef()

  useEffect(() => {
    if (search !== '') {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [search])

  useEffect(() => {
    let searchResultsContainer = document.querySelectorAll('.search-results')[0]
    if (searchResultsContainer && show) {
      let searchResultsContainer =
        document.querySelectorAll('.search-results')[0]
      searchResultsContainer.classList.add('display')
    } else if (searchResultsContainer && !show) {
      searchResultsContainer.classList.remove('display')
    }
  }, [show])
  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
  const handleClick = (e) => {
    if (node.current) {
      if (node.current.contains(e.target)) {
        return
      }
    }
    setShow(false)
  }

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
            id: track.id,
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
    <div className='app-container'>
      <div className='search-container'>
        <Form.Control
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
          <Dropdown.Item eventKey='3' onClick={logout}>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div ref={node} className='search-results'>
        <div>Search Results</div>
        <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              setShow={setShow}
              track={track}
              key={track.uri}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
