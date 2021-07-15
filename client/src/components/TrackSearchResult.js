import React from 'react'
import { Link } from 'react-router-dom'
export default function TrackSearchResult({ track, setShow }) {
  return (
    <Link
      className='d-flex m-2 align-items-center search-item'
      style={{ cursor: 'pointer' }}
      to={`/track/${track.id}`}
      onClick={() => {
        setShow(false)
      }}
    >
      <img
        alt='no img'
        src={track.albumUrl}
        style={{ height: '64px', width: '64px' }}
      />
      <div className='search-result ml-3'>
        <div className='track-name'>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </div>
    </Link>
  )
}
