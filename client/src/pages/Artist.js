import React, { useState, useEffect } from 'react'
import TrackCard from '../components/TrackCard.js'
import { numberWithCommas } from '../utils/index.js'
function Artist({ spotifyApi, match }) {
  const [artist, setArtist] = useState()
  const [artistTracks, setArtistTracks] = useState()
  useEffect(() => {
    spotifyApi.getArtist(match.params.artistId).then(
      function (data) {
        console.log('Artist information', data.body)
        setArtist(data.body)
      },
      function (err) {
        console.error(err)
      }
    )
  }, [match.params.artistId, spotifyApi])

  useEffect(() => {
    spotifyApi.getArtistTopTracks(match.params.artistId, 'US').then(
      function (data) {
        console.log('Artist information', data.body)
        setArtistTracks(data.body.tracks)
      },
      function (err) {
        console.error(err)
      }
    )
  }, [match.params.artistId, spotifyApi])
  return (
    <div className='app-container'>
      {artist && (
        <div className='artist-info d-flex m-2 align-items-center'>
          <img
            alt='no img'
            src={artist.images ? artist.images[0].url : ''}
            style={{ height: '250px', width: '250px' }}
            className='artist-img'
          />
          <div className='ml-3'>
            <div>ARTIST</div>
            <div>{artist.name}</div>
            <div>{numberWithCommas(artist.followers.total)} Followers</div>
            <div>{artist.popularity} Popularity</div>
            {artist.genres.map((genre, index) => (
              <span key={index}>
                {index === artist.genres.length - 1 ? (
                  <span>{genre} </span>
                ) : (
                  <span>{genre} &middot; </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      <div>
        <div>Popular Songs</div>
        <div className='track-header'>
          <div className='m-2'>TITLE</div>
          <div>ALBUM</div>
          <div>RELEASE DATE</div>
          <div>DURATION</div>
        </div>
        {artistTracks &&
          artistTracks.map((track) => (
            <TrackCard key={track.id} track={track}>
              track
            </TrackCard>
          ))}
      </div>
    </div>
  )
}

export default Artist
