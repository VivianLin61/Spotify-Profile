import React, { useEffect, useState } from 'react'
import TrackCard from '../components/TrackCard.js'
import TimeRanges from '../components/TimeRanges.js'
import Loader from '../components/Loader.js'
import TrackHeader from '../components/TrackHeader.js'
import { getAccessToken } from '../spotifyAPI/index.js'
function Tracks({ spotifyApi }) {
  const [tracks, setTracks] = useState()
  const [timeRange, setTimeRange] = useState('short_term')

  useEffect(() => {
    spotifyApi.getMyTopTracks({ time_range: timeRange }).then(
      function (data) {
        setTracks(data.body.items)
      },
      function (err) {
        spotifyApi.setAccessToken(getAccessToken())
        console.log('Something went wrong!', err)
      }
    )
  }, [spotifyApi, timeRange])
  return (
    <div className='app-container'>
      <div className='header'>
        <h1>Top Tracks</h1>
        <TimeRanges setTimeRange={setTimeRange} activeItem={timeRange} />
      </div>

      <div className='tracks'>
        <TrackHeader />
        {tracks ? (
          tracks.map((track) => (
            <TrackCard key={track.id} track={track}>
              track
            </TrackCard>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default Tracks
