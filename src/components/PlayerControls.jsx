import React from 'react'
import {
  PlayArrow,
  Pause,
  SkipNext as PlayNext,
  SkipPrevious as PlayPrev,
  Replay,
  Edit as Dictation
} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
//import { audio } from '../howler'

function PlayerControls(props) {
  const { play, pause, playPhrase, isPlay, currentPhraseId } = props

  return (
    <div className='playerControls'>
      <IconButton aria-label='Previous'>
        <PlayPrev />
      </IconButton>
      {isPlay ? (
        <IconButton onClick={pause} aria-label='Pause'>
          <Pause />
        </IconButton>
      ) : (
        <IconButton onClick={play} aria-label='Play'>
          <PlayArrow />
        </IconButton>
      )}
      <IconButton aria-label='Dictation'>
        <Dictation />
      </IconButton>
      <IconButton onClick={playPhrase(currentPhraseId)} aria-label='Replay'>
        <Replay />
      </IconButton>
      <IconButton /* onClick={playPhrase('9')} */ aria-label='Next'>
        <PlayNext />
      </IconButton>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isPlay: state.playerState.play,
    currentPhraseId: state.playerState.currentPhraseId
  }
}

export default connect(mapStateToProps)(PlayerControls)
