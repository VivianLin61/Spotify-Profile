import React, { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard.js'
import TrackCard from '../components/TrackCard.js'
function Profile(props) {
  const { token, spotifyApi } = props
  const [user, setUser] = useState()
  const [topArtists, setTopArtists] = useState()
  const [topTracks, setTopTracks] = useState()
  // useEffect(() => {
  //   if (!token) return
  //   spotifyApi.setAccessToken(token)
  // }, [spotifyApi, token])

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
  return (
    <div className='app-container'>
      {user && (
        <div className='user-info d-flex m-2 align-items-center'>
          <img
            alt='no img'
            src={
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            style={{ height: '250px', width: '250px' }}
            className='profile-img'
          />
          <div className='ml-3'>
            <div>PROFILE</div>
            <div>{user.display_name}</div>
            <div>{user.followers.total} Followers</div>
          </div>
        </div>
      )}
      <div className='top-artists'>
        <h1>Top Artists This Month</h1>
        <div className='artists'>
          {topArtists &&
            topArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
      </div>
      <div>
        <h1>Top Tracks This Month</h1>
        <div className='track-header'>
          <div className='m-2'>TITLE</div>
          <div>ALBUM</div>
          <div>RELEASE DATE</div>
          <div>DURATION</div>
        </div>
        {topTracks &&
          topTracks.map((track) => (
            <TrackCard key={track.id} track={track}>
              track
            </TrackCard>
          ))}
      </div>
      <div>
        <h1>Playlists</h1>
      </div>
    </div>
  )
}

export default Profile
