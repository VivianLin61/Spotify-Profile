import React, { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard.js'
import TimeRanges from '../components/TimeRanges.js'
function Artists({ spotifyApi }) {
  const [artists, setArtists] = useState()
  const [timeRange, setTimeRange] = useState('short_term')

  useEffect(() => {
    spotifyApi.getMyTopArtists({ time_range: timeRange }).then(
      function (data) {
        setArtists(data.body.items)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }, [spotifyApi, timeRange])
  return (
    <div className='app-container'>
      <div className='header'>
        <h1>Top Artists</h1>
        <TimeRanges setTimeRange={setTimeRange} activeItem={timeRange} />
      </div>

      <div className='artists'>
        {artists &&
          artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
      </div>
    </div>
  )
}

export default Artists
