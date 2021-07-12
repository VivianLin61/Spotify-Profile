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

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const localAccessToken = getLocalAccessToken()

  const getAccessToken = async () => {
    try {
      if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...')
        refreshAccessToken()
        return
      }
      // If access token already exists in local storage
      if (localAccessToken || localAccessToken !== null) {
        setRefreshToken(getLocalRefreshToken())
        setAccessToken(getLocalAccessToken())
        return
      }

      // If token has expired

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
      console.log(data)
      setAccessToken(data.accessToken)
      setLocalAccessToken(data.accessToken)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAccessToken()
  }, [])

  return accessToken
}
