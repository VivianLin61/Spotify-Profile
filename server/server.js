require('dotenv').config()
const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const lyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: `${process.env.REDIRECT_URI}`,
    clientId: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400)
    })
})
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: `${process.env.REDIRECT_URI}`,
    clientId: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      res.sendStatus(400)
    })
})
app.listen(3001)
