import React from 'react'
import { FaSpotify } from 'react-icons/fa'
import { CgProfile, CgMusic } from 'react-icons/cg'
import { MdLibraryMusic } from 'react-icons/md'
import { GiMicrophone } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'
function Sidebar() {
  function SidebarItem(props) {
    return (
      <li className='nav-item'>
        <Link to={props.link} className='nav-link'>
          <props.icon />
          <span className='link-text'>{props.title}</span>
        </Link>
      </li>
    )
  }
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link className='logo' to={'/'}>
            <FaSpotify />
          </Link>
        </li>
        <li className='nav-item'>
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
        <li className='nav-item'>
          <div className='nav-link'></div>
        </li>
        <li className='nav-item'>
          <a
            href='https://github.com/VivianLin61/Spotify-Profile'
            className='nav-link'
          >
            <AiFillGithub />
            <span className='link-text'>{'Github'}</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
