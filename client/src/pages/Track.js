import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { millisToMinutesAndSeconds } from '../utils/index.js'
import Loader from '../components/Loader.js'
function Track(props) {
  const { spotifyApi, match } = props
  const [track, setTrack] = useState()
  const [lyrics, setLyrics] = useState('')
  const [audioFeatures, setAudioFeatures] = useState()

  useEffect(() => {
    spotifyApi.getTrack(match.params.trackId).then(
      function (data) {
        setTrack(data.body)
      },
      function (err) {
        console.error(err)
      }
    )
    spotifyApi.getAudioAnalysisForTrack(match.params.trackId).then(
      function (data) {
        setAudioFeatures(data.body)
        console.log(data.body)
      },
      function (err) {
        console.log(err)
      }
    )
  }, [match.params.trackId, spotifyApi])

  useEffect(() => {
    if (!track) return
    axios
      .get('http://localhost:4000/lyrics', {
        params: {
          track: track.name,
          artist: track.artists[0].name,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics)
      })
  }, [track])
  const updateBackground = (color) => {
    document.getElementsByClassName('app')[0].style.background =
      'var(--main-color)'
  }
  return (
    <div className='app-container'>
      {track && (
        <div className='d-flex m-2 align-items-center'>
          <img
            alt='no img'
            src={track.album.images[0].url}
            style={{ height: '200px', width: '200px' }}
            onLoad={() => {
              updateBackground()
            }}
          />
          <div className='search-result ml-3'>
            <div className='track-name'>{track.name}</div>
            <div className='text-muted'>{track.artists[0].name}</div>
            <div className='text-muted'>
              <span>Popularity: {track.popularity}% </span>
              <span>Release Date: {track.album.release_date}</span>
            </div>
            <div className='text-muted'>
              <span>
                Duration: {millisToMinutesAndSeconds(track.duration_ms, true)}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className='lyrics-container'>
        {lyrics ? (
          <div style={{ whiteSpace: 'pre' }}>{lyrics}</div>
        ) : (
          <Loader />
        )}
      </div>
      {/* <div className='audio-features'>{audioFeatures}</div> */}
    </div>
  )
}

export default Track
