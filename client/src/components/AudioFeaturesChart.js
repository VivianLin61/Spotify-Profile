import React from 'react'
import { Pie } from 'react-chartjs-2'

function AudioFeaturesChart({ features }) {
  return (
    <div>
      <div
        style={{ textAlign: 'center', fontSize: '35px', paddingBottom: '10px' }}
      >
        Audio Features
      </div>
      <div>
        <Pie
          data={{
            labels: [
              'acousticness',
              'danceability',
              'energy',
              'instrumentalness',
              'liveness',
              'speechiness',
            ],
            datasets: [
              {
                label: '# of votes',
                data: [
                  features.acousticness,
                  features.danceability,
                  features.instrumentalness,
                  features.energy,
                  features.liveness,
                  features.speechiness,
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default AudioFeaturesChart
