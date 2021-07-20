import React from 'react'
import { millisToMinutesAndSeconds } from '../utils/index.js'
import { Link } from 'react-router-dom'
function TrackCard({ track }) {
  const { name, popularity, album, duration_ms } = track
  return (
    <>
      {track && (
        <Link
          to={`/track/${track.id}`}
          style={{ cursor: 'pointer' }}
          className='track-card'
        >
          <div
            className='d-flex p-2 align-items-center'
            style={{ cursor: 'pointer' }}
          >
            <img
              alt='no img'
              src={album.images[0].url}
              style={{ height: '64px', width: '64px' }}
            />
            <div style={{ width: '100%' }} className='ml-3'>
              <div style={{ width: '100%' }}>{name}</div>
              <div style={{ width: '100%' }} className='text-muted'>
                {album.artists[0].name}
              </div>
            </div>
          </div>
          <div className='p-2'>{album.name}</div>
          <div className='p-2'>{album.release_date}</div>
          <div className='p-2'>{popularity}%</div>
          <div className='p-2'>
            {millisToMinutesAndSeconds(duration_ms, false)}
          </div>
        </Link>
      )}
    </>
  )
}

export default TrackCard
