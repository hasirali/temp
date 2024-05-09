import React from 'react'
import { useState, useEffect } from 'react';
import logo from '../logo/logo.png'
import tlogo from '../logo/text.png'
import "./header.css"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Logos
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@mui/material';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Header({ user }) {

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => console.log('Signed out successfully'))
      .catch((error) => console.log('Error signing out:', error));
  }


  return (
    <div className='header'>
      <div className='header_left'>
        <img src={logo} alt="Logo" className='logo' />
        <img src={tlogo} alt="Logo" className='tlogo' />
        <div className='header_input'>
          <SearchIcon />
          <input type='text' placeholder='Search Linkloop' />
        </div>
      </div>


      <div className='header_center'>
        <div className='header_options header_options--active'>
          <HomeIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <FlagIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <SubscriptionsOutlinedIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <StorefrontOutlinedIcon fontSize='large' />
        </div>
        <div className='header_options'>
          <SupervisedUserCircleOutlinedIcon fontSize='large' />
        </div>
      </div>


      <div className='header_right'>
        <div className='header_info'>
          {user && <Avatar src={user.photoURL} />}
          {user && <h4>{user.displayName}</h4>}
          <div className='icons'>
            <IconButton>
              <AddIcon />
            </IconButton>
            <IconButton>
              <ForumIcon />
            </IconButton>
            <IconButton>
              <NotificationsActiveIcon />
            </IconButton>
          </div>
          <IconButton className='expand'>
            <ExpandMoreIcon />
          </IconButton>
          <IconButton onClick={handleSignOut} >
            <ExitToAppIcon />
            <p className='signout' >Log-out</p>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
