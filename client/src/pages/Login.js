import React from 'react'
import { Container } from 'react-bootstrap'
const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=8515d3f514614d3da7c8e1b533e664c2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-read-recently-played%20user-follow-read%20user-follow-modify%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public'
function Login(props) {
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}
    >
      <a className='btn btn-success btn-lg login-button' href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}

export default Login
