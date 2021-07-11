import React from 'react'
import Sidebar from './Sidebar.js'
function Layout(props) {
  return (
    <>
      <Sidebar />
      {/* <Container
        className='d-flex flex-column py-2'
        style={{ height: '100vh' }}
      >
        <Form.Control
          type='search'
          placeholder='Search Songs/Artists'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              chooseTrack={chooseTrack}
              track={track}
              key={track.uri}
            />
          ))}
          {searchResults.length === 0 && (
            <div className='text-center' style={{ whiteSpace: 'pre' }}>
              {lyrics}
            </div>
          )}
        </div>
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </Container> */}
      {props.children}
    </>
  )
}

export default Layout
