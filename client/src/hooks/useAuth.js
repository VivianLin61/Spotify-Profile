import { useState, useEffect } from 'react'
import axios from 'axios'

const setTokenExpiresIn = () =>
  window.localStorage.setItem('spotify_token_expires_in', Date.now())
const setLocalAccessToken = (token) => {
  window.localStorage.setItem('spotify_access_token', token)
}
const setLocalRefreshToken = (token) =>
  window.localStorage.setItem('spotify_refresh_token', token)
const getTokenExpiresIn = () =>
  window.localStorage.getItem('spotify_token_expires_in')
const getLocalAccessToken = () =>
  window.localStorage.getItem('spotify_access_token')
const getLocalRefreshToken = () =>
  window.localStorage.getItem('spotify_refresh_token')

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const localAccessToken = getLocalAccessToken()

  const getAccessToken = async () => {
    try {
      // If access token already exists in local storage
      if (localAccessToken || localAccessToken !== null) {
        setRefreshToken(getLocalRefreshToken())
        setAccessToken(getLocalAccessToken())
        setExpiresIn(getTokenExpiresIn())
        return
      }
      const { data } = await axios.post('http://localhost:4000/login', {
        code,
      })
      if (data) {
        setRefreshToken(data.refreshToken)
        setAccessToken(data.accessToken)
        setExpiresIn(data.expiresIn)
        setLocalAccessToken(data.accessToken)
        setLocalRefreshToken(data.refreshToken)
        setTokenExpiresIn(data.expiresIn)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAccessToken()
  }, [])

  return accessToken
}
