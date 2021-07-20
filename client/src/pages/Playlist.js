import React, { useState, useEffect } from 'react'
import TrackCard from '../components/TrackCard.js'
import { numberWithCommas } from '../utils/index.js'
import Loader from '../components/Loader.js'
import TrackHeader from '../components/TrackHeader.js'
function Playlist({ match, spotifyApi }) {
  const [playlist, setPlaylist] = useState()
  const [playlistTracks, setPlaylistTracks] = useState()

  useEffect(() => {
    spotifyApi.getPlaylist(match.params.playlistId).then(
      function (data) {
        setPlaylist(data.body)
        setPlaylistTracks(data.body.tracks.items)
      },
      function (err) {
        console.error(err)
      }
    )
  }, [match.params.playlistId, spotifyApi])
  return (
    <div className='app-container'>
      {playlist && playlistTracks ? (
        <>
          <div className='artist-info d-flex m-2 align-items-center'>
            <img
              alt='no img'
              src={playlist.images[0].url}
              style={{ height: '250px', width: '250px' }}
              className='artist-img'
            />
            <div className='ml-3'>
              <div>PLAYLIST</div>
              <div>{playlist.name}</div>
              <div>{numberWithCommas(playlist.followers.total)} Followers</div>
            </div>
          </div>
          <div>
            <TrackHeader />
            {playlistTracks &&
              playlistTracks.map((track, index) => (
                <div key={index}>
                  {track.track && (
                    <TrackCard track={track.track}>track</TrackCard>
                  )}
                </div>
              ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Playlist
