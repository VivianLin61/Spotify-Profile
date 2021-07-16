import React from 'react'
import { Link } from 'react-router-dom'
function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className='artist-card'>
      <img
        alt='no img'
        src={artist.images[0].url}
        style={{ height: '150px', width: '150px', cursor: 'pointer' }}
      />
      <div>{artist.name}</div>
      <div className='text-muted'>Artist</div>
    </Link>
  )
}

export default ArtistCard
