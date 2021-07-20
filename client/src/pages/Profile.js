import React, { useEffect, useState, createRef } from 'react'
import ArtistCard from '../components/ArtistCard.js'
import TrackCard from '../components/TrackCard.js'
import ColorThief from 'colorthief'
import PlaylistCard from '../components/PlaylistCard.js'
import Loader from '../components/Loader.js'
import TrackHeader from '../components/TrackHeader.js'
function Profile(props) {
  const { spotifyApi } = props
  const [user, setUser] = useState()
  const [topArtists, setTopArtists] = useState()
  const [topTracks, setTopTracks] = useState()
  const [playlists, setPlaylists] = useState()

  const imgRef = createRef()
  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        setUser(data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [spotifyApi])
  useEffect(() => {
    spotifyApi.getMyTopArtists({ limit: 5 }).then(
      function (data) {
        setTopArtists(data.body.items)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [spotifyApi])
  useEffect(() => {
    spotifyApi.getMyTopTracks({ limit: 5 }).then((data) => {
      setTopTracks(data.body.items)
    })
  }, [spotifyApi])
  useEffect(() => {
    if (user) {
      spotifyApi.getUserPlaylists(user.id, { limit: 5 }).then(
        function (data) {
          setPlaylists(data.body.items)
        },
        function (err) {
          console.log('Something went wrong!', err)
        }
      )
    }
  }, [spotifyApi, user])
  const updateBackground = (color) => {
    document.getElementsByClassName('app')[0].style.background =
      'var(--main-color)'
  }
  return (
    //user, topartists, toptracks, playlists
    <div className='app-container'>
      {user && topArtists && topTracks && playlists ? (
        <>
          <div className='user-info d-flex m-2 align-items-center'>
            <img
              alt='no img'
              ref={imgRef}
              crossOrigin={'anonymous'}
              src={
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              style={{ height: '250px', width: '250px' }}
              className='profile-img'
              onLoad={() => {
                const colorThief = new ColorThief()
                const img = imgRef.current
                const result = colorThief.getColor(img, 25)
                updateBackground(result)
              }}
            />
            <div className='ml-3'>
              <div>PROFILE</div>
              <div>{user.display_name}</div>
              <div>{user.followers.total} Followers</div>
            </div>
          </div>
          <div className='top-artists'>
            <h1>Top Artists This Month</h1>
            <div className='artists'>
              {topArtists &&
                topArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
          </div>
          <div className='top-tracks'>
            <h1>Top Tracks This Month</h1>
            <TrackHeader />
            {topTracks &&
              topTracks.map((track) => (
                <TrackCard key={track.id} track={track}>
                  track
                </TrackCard>
              ))}
          </div>
          <div className='top-playlists'>
            <h1>Playlists</h1>
            <div className='playlists'>
              {playlists &&
                playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  )
}

export default Profile
