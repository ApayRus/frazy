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
  const {
    play,
    pause,
    playPhrase,
    playNext,
    playPrev,
    playDictation,
    isPlay,
    currentPhraseId,
    dictationTimerId
  } = props

  return (
    <div className='playerControls'>
      <IconButton onClick={playPrev} aria-label='Previous'>
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
      <IconButton onClick={playDictation} aria-label='Dictation'>
        <Dictation color={dictationTimerId ? 'error' : 'inherit'} />
      </IconButton>
      <IconButton onClick={playPhrase(currentPhraseId)} aria-label='Replay'>
        <Replay />
      </IconButton>
      <IconButton onClick={playNext} aria-label='Next'>
        <PlayNext />
      </IconButton>
    </div>
  )
}

const mapStateToProps = state => {
  const { play: isPlay, currentPhraseId, dictationTimerId } = state.playerState

  return { isPlay, currentPhraseId, dictationTimerId }
}

export default connect(mapStateToProps)(PlayerControls)
