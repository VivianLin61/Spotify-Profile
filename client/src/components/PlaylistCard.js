import React from 'react'
import { Link } from 'react-router-dom'
function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist.id}`} className='playlist-card'>
      <img
        alt='no img'
        src={playlist.images[0].url}
        style={{ height: '160px', width: '160px', cursor: 'pointer' }}
      />
      <div>{playlist.name}</div>
      <div className='text-muted'>{playlist.description}</div>
    </Link>
  )
}

export default PlaylistCard
