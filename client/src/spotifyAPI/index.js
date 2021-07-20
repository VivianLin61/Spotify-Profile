import axios from 'axios'

const EXPIRATION_TIME = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => {
  window.localStorage.setItem('spotify_token_timestamp', Date.now())
}
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

const code = new URLSearchParams(window.location.search).get('code')
// Get access token off of query params
export const getAccessToken = async () => {
  try {
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
      console.warn('Access token has expired, refreshing...')
      refreshAccessToken()
    }

    const localAccessToken = getLocalAccessToken()
    // If access token already exists in local storage
    if (localAccessToken || localAccessToken !== null) {
      return getLocalAccessToken()
    }
    // Get new token
    const { data } = await axios.post('http://localhost:4000/login', {
      code,
    })

    if (data) {
      setLocalAccessToken(data.accessToken)
      setLocalRefreshToken(data.refreshToken)
      return data.accessToken
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
    setLocalAccessToken(data.accessToken)
    window.location.reload()
  } catch (e) {
    console.log(e)
  }
}
export const token = getAccessToken()

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp')
  window.localStorage.removeItem('spotify_access_token')
  window.localStorage.removeItem('spotify_refresh_token')
  window.location.reload()
}
