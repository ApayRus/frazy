import React from 'react'

import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import PlayNext from '@material-ui/icons/SkipNext'
import PlayPrev from '@material-ui/icons/SkipPrevious'
import Replay from '@material-ui/icons/Replay'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
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
        <Typography
          style={{ width: 24, fontWeight: 700 }}
          title='dictation'
          color={dictationTimerId ? 'error' : 'inherit'}
        >
          D
        </Typography>
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
