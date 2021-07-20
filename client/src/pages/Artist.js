import React, { useState, useEffect, createRef } from 'react'
import TrackCard from '../components/TrackCard.js'
import { numberWithCommas } from '../utils/index.js'
import ColorThief from 'colorthief'
import TrackHeader from '../components/TrackHeader.js'
import { getAccessToken } from '../spotifyAPI/index.js'

function Artist({ spotifyApi, match }) {
  const [artist, setArtist] = useState()
  const [artistTracks, setArtistTracks] = useState()

  const imgRef = createRef()
  useEffect(() => {
    spotifyApi.getArtist(match.params.artistId).then(
      function (data) {
        setArtist(data.body)
      },
      function (err) {
        spotifyApi.setAccessToken(getAccessToken())
        console.error(err)
      }
    )
  }, [match.params.artistId, spotifyApi])

  useEffect(() => {
    spotifyApi.getArtistTopTracks(match.params.artistId, 'US').then(
      function (data) {
        setArtistTracks(data.body.tracks)
      },
      function (err) {
        spotifyApi.setAccessToken(getAccessToken())
        console.error(err)
      }
    )
  }, [match.params.artistId, spotifyApi])

  const updateBackground = (color) => {
    document.getElementsByClassName(
      'app'
    )[0].style.background = `linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1) 47%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 1) 49%, rgba(24, 30, 20, 1) 100% )`
  }
  return (
    <div className='app-container'>
      {artist && (
        <div className='artist-info d-flex align-items-center'>
          <img
            alt='no img'
            ref={imgRef}
            crossOrigin={'anonymous'}
            src={artist.images ? artist.images[0].url : ''}
            style={{ height: '250px', width: '250px' }}
            className='artist-img'
            onLoad={() => {
              const colorThief = new ColorThief()
              const img = imgRef.current
              const result = colorThief.getColor(img, 25)
              updateBackground(result)
            }}
          />
          <div className='ml-3'>
            <div>ARTIST</div>
            <div>{artist.name}</div>
            <div>{numberWithCommas(artist.followers.total)} Followers</div>
            <div>{artist.popularity}% Popularity</div>
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
        <div
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            marginTop: '25px',
          }}
        >
          Popular Songs
        </div>
        <TrackHeader />
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
