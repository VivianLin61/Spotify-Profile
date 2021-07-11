import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { CgProfile, CgMusic } from 'react-icons/cg'
import { MdLibraryMusic } from 'react-icons/md'
import { GiMicrophone } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Sidebar() {
  function SidebarItem(props) {
    return (
      <li class='nav-item'>
        <Link to={props.link} class='nav-link'>
          <props.icon />
          <span class='link-text'>{props.title}</span>
        </Link>
      </li>
    )
  }
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
        <SidebarItem icon={CgProfile} title={'Profile'} link={'/'} />
        <SidebarItem icon={GiMicrophone} title={'Artists'} link={'/artists'} />
        <SidebarItem icon={CgMusic} title={'Tracks'} link={'/tracks'} />
        <SidebarItem
          icon={MdLibraryMusic}
          title={'Playlists'}
          link={'/playlists'}
        />
      </ul>
    </nav>
  )
}

export default Sidebar
