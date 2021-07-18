import React from 'react'

function Loader(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div class='lds-facebook'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
