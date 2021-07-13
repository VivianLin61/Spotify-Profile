import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div className='searchResults' style={{ cursor: 'pointer' }}>
      <div className='ml-3'>
        <div>{track.title}</div>
        <div className='text-muted'>{track.artist}</div>
      </div>
    </div>
  )
}
