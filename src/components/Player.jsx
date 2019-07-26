import React from 'react'
import { Typography } from '@material-ui/core'
import PlayerControls from './PlayerControls'

import DrawerHeading from './DrawerHeading'
import DrawerSettings from './DrawerSettings'

function Player(props) {
  return (
    <div>
      <DrawerHeading />
      <DrawerSettings />
      <Typography variant='h3'>Player</Typography>
      <PlayerControls />
    </div>
  )
}

export default Player
