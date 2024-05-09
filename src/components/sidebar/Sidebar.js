import React from 'react'
import './Sidebar.css'
import Sidebar_Row from './Sidebar_Row'
// icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Sidebar({ user }) {
  return (
    <div className='sidebar'>
      <Sidebar_Row src={user.photoURL} title={user.displayName}/>
      <Sidebar_Row Icon={LocalHospitalIcon} title='COVID-19 Information Center'/>

      <Sidebar_Row Icon={EmojiFlagsIcon} title='Pages'/>
      <Sidebar_Row Icon={PeopleIcon} title='Friends'/>
      <Sidebar_Row Icon={ChatIcon} title='Messenger'/>
      <Sidebar_Row Icon={StorefrontIcon} title='Marketplace'/>
      <Sidebar_Row Icon={VideoLibraryIcon} title='Videos'/>
      <Sidebar_Row Icon={ExpandMoreIcon} title='Marketplace'/>
    </div>
  )
}
