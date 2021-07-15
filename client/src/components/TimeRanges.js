import React from 'react'

function TimeRanges({ setTimeRange, activeItem }) {
  return (
    <div className='time-ranges'>
      <button
        onClick={() => {
          setTimeRange('short_term')
        }}
        className={activeItem === 'short_term' ? 'active-button' : 'button'}
      >
        This Month
      </button>
      <button
        onClick={() => {
          setTimeRange('medium_term')
        }}
        className={activeItem === 'medium_term' ? 'active-button' : 'button'}
      >
        6 Months
      </button>
      <button
        onClick={() => {
          setTimeRange('long_term')
        }}
        className={activeItem === 'long_term' ? 'active-button' : 'button'}
      >
        All Time
      </button>
    </div>
  )
}

export default TimeRanges
