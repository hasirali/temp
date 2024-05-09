import { Avatar} from '@mui/material'
import React from 'react'
import './Sidebar.css'

export default function Sidebar_Row({src, Icon,title}) {
  return (
    <div className='sidebar_row'>
        {src && <Avatar src={src} />}
        {Icon && <Icon/>}
        <h4>{title}</h4>
    </div>
  )
}
