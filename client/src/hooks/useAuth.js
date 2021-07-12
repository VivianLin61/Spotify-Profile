import { useState, useEffect } from 'react'
import axios from 'axios'

const EXPIRATION_TIME = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () =>
  window.localStorage.setItem('spotify_token_timestamp', Date.now())
window.localStorage.setItem('spotify_token_timestamp', Date.now())
const setLocalAccessToken = (token) => {
  setTokenTimestamp()
  window.localStorage.setItem('spotify_access_token', token)
}
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem('spotify_refresh_token', token)
const getTokenTimestamp = () =>
  window.localStorage.getItem('spotify_token_timestamp')
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token')
const getLocalRefreshToken = () =>
  window.localStorage.getItem('spotify_refresh_token')

export default function useAuth({ code, logout }) {
  const [accessToken, setAccessToken] = useState()
  // eslint-disable-next-line no-unused-vars
  const [refreshToken, setRefreshToken] = useState()

  const getAccessToken = async () => {
    try {
      //Token has expired
      if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...')
        refreshAccessToken()
        return
      }

      const localAccessToken = getLocalAccessToken()
      // If access token already exists in local storage
      if (localAccessToken || localAccessToken !== null) {
        setRefreshToken(getLocalRefreshToken())
        setAccessToken(getLocalAccessToken())
        return
      }

      // Get new token
      const { data } = await axios.post('http://localhost:4000/login', {
        code,
      })
      if (data) {
        setRefreshToken(data.refreshToken)
        setAccessToken(data.accessToken)
        setLocalAccessToken(data.accessToken)
        setLocalRefreshToken(data.refreshToken)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const refreshAccessToken = async () => {
    let token = getLocalRefreshToken()

    try {
      const { data } = await axios.post('http://localhost:4000/refresh', {
        token,
      })
      setAccessToken(data.accessToken)
      setLocalAccessToken(data.accessToken)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (!logout) {
      getAccessToken()
    } else {
      //logout
      window.localStorage.removeItem('spotify_token_timestamp')
      window.localStorage.removeItem('spotify_access_token')
      window.localStorage.removeItem('spotify_refresh_token')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return accessToken
}
