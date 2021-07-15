import React from 'react'
import { Card } from 'react-bootstrap'
function ArtistCard({ artist }) {
  return (
    <Card className='artist-card'>
      <img
        alt='no img'
        src={artist.images[0].url}
        style={{ height: '150px', width: '150px', cursor: 'pointer' }}
        
      />
      <div>{artist.name}</div>
      <div className='text-muted'>Artist</div>
    </Card>
  )
}

export default ArtistCard
