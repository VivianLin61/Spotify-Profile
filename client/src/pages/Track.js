import React, { useState, useEffect } from 'react'
import { millisToMinutesAndSeconds } from '../utils/index.js'
import Loader from '../components/Loader.js'
import AudioFeaturesChart from '../components/AudioFeaturesChart.js'
import { getAccessToken, getLyrics } from '../spotifyAPI/index.js'

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
        spotifyApi.setAccessToken(getAccessToken())
        console.error(err)
      }
    )

    spotifyApi.getAudioFeaturesForTrack(match.params.trackId).then(
      function (data) {
        setAudioFeatures(data.body)
      },
      function (err) {
        spotifyApi.setAccessToken(getAccessToken())
        console.log(err)
      }
    )
  }, [match.params.trackId, spotifyApi])

  useEffect(() => {
    Promise.resolve(getLyrics(track)).then(function (data) {
      if (data) {
        setLyrics(data.data.lyrics)
      }
    })
  }, [track])

  return (
    <div
      onLoad={() => {
        document.getElementsByClassName('app')[0].style.background =
          'var(--main-color)'
      }}
      className='app-container'
    >
      {track && lyrics && audioFeatures ? (
        <>
          <div className='d-flex m-2 align-items-center'>
            <img
              alt='no img'
              src={track.album.images[0].url}
              style={{ height: '200px', width: '200px' }}
            />
            <div className='search-result ml-3'>
              <div className='track-name'>{track.name}</div>
              <div className='text-muted'>{track.artists[0].name}</div>
              <div className='text-muted'>
                <span>Popularity:</span> {track.popularity}%
              </div>

              <div className='text-muted'>
                <span> Release Date:</span> {track.album.release_date}
              </div>
              <div className='text-muted'>
                <span>
                  Duration: {millisToMinutesAndSeconds(track.duration_ms, true)}
                </span>
              </div>
            </div>
          </div>
          <div className='lyrics-container'>
            <div style={{ whiteSpace: 'pre' }}>
              {lyrics === 'No Lyrics Found' ? (
                console.error('No lyrics found')
              ) : (
                <> {lyrics}</>
              )}
            </div>
          </div>

          <div className='audio-features' style={{ marginTop: '70px' }}>
            <AudioFeaturesChart features={audioFeatures} />
            <div className='features-description'>
              <h1>Features Description</h1>
              <div>
                <span>Acousticness:</span> A confidence measure from 0.0 to 1.0
                of whether the track is acoustic.
              </div>
              <div>
                <span>Danceability:</span> Danceability describes how suitable a
                track is for dancing based on a combination of musical elements
                including tempo, rhythm stability, beat strength, and overall
                regularity.
              </div>
              <div>
                <span>Energy:</span> Energy is a measure from 0.0 to 1.0 and
                represents a perceptual measure of intensity and activity.
                Typically, energetic tracks feel fast, loud, and noisy.
              </div>
              <div>
                <span>Intrumentalness:</span> Predicts whether a track contains
                no vocals. “Ooh” and “aah” sounds are treated as instrumental in
                this context. Rap or spoken word tracks are clearly “vocal”. The
                closer the instrumentalness value is to 1.0, the greater
                likelihood the track contains no vocal content
              </div>
              <div>
                <span>Liveness:</span> Detects the presence of an audience in
                the recording. Higher liveness values represent an increased
                probability that the track was performed live. A value above 0.8
                provides strong likelihood that the track is live.
              </div>
              <div>
                <span>Speechiness:</span> Speechiness detects the presence of
                spoken words in a track. The more exclusively speech-like the
                recording (e.g. talk show, audio book, poetry), the closer to
                1.0 the attribute value
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Track
