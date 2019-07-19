import React from 'react'
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Replay,
  Edit
} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { audio } from './howler'

function PlayerControls() {
  const play = () => {
    audio.play()
  }

  const pause = () => {
    audio.pause()
  }

  const playPhrase = id => event => {
    audio.pause()
    audio.play(id)
  }

  return (
    <div className='playerControls'>
      <IconButton aria-label='Previous'>
        <SkipPrevious />
      </IconButton>
      <IconButton onClick={play} aria-label='Play'>
        <PlayArrow />
      </IconButton>
      <IconButton onClick={pause} aria-label='Pause'>
        <Pause />
      </IconButton>
      <IconButton aria-label='Dictation'>
        <Edit />
      </IconButton>
      <IconButton onClick={playPhrase('8')} aria-label='Replay'>
        <Replay />
      </IconButton>
      <IconButton onClick={playPhrase('9')} aria-label='Next'>
        <SkipNext />
      </IconButton>
    </div>
  )
}

export default PlayerControls
