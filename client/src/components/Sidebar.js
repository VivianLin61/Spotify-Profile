import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { CgProfile, CgMusic } from 'react-icons/cg'
import { MdLibraryMusic } from 'react-icons/md'
import { GiMicrophone } from 'react-icons/gi'
import { Link } from 'react-router-dom'
function Sidebar(props) {
  return (
    <nav class='navbar'>
      <ul class='navbar-nav'>
        <li class='nav-item'>
          <div className='logo'>
            <FaSpotify />
          </div>
        </li>
        <li class='nav-item'>
          <div className='nav-link'></div>
        </li>

        <li class='nav-item'>
          <Link to='/' class='nav-link'>
            <CgProfile />
            <span class='link-text'>Profile</span>
          </Link>
        </li>

        <li class='nav-item'>
          <Link to='/artists' class='nav-link'>
            <GiMicrophone />
            <span class='link-text'>Artists</span>
          </Link>
        </li>
        <li class='nav-item'>
          <Link to='/tracks' class='nav-link'>
            <CgMusic />
            <span class='link-text'>Tracks</span>
          </Link>
        </li>
        <li class='nav-item'>
          <Link to='/playlists' class='nav-link'>
            <MdLibraryMusic />
            <span class='link-text'>Playlists</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
