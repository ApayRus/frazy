import React from 'react'
import { Typography } from '@material-ui/core'
import PlayerControls from './PlayerControls'

function Player() {
  return (
    <div>
      <Typography variant='h3'>Player</Typography>
      <PlayerControls />
    </div>
  )
}

export default Player
