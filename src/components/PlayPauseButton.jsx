import React from 'react'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import IconButton from '@material-ui/core/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState } from '../store/playerStateActions'
import wavesurferModule from '../wavesurfer/wavesurfer'

function Zoom(props) {
  const { wavesurfer } = wavesurferModule
  const { play } = useSelector((state) => state.playerState)
  const dispatch = useDispatch()

  const playClick = () => {
    wavesurfer.play()
    dispatch(setPlayerState(['play', true]))
  }

  const pauseClick = () => {
    wavesurfer.pause()
    dispatch(setPlayerState(['play', false]))
  }

  return (
    <div>
      {!play ? (
        <IconButton title='play' onClick={playClick}>
          <PlayIcon />
        </IconButton>
      ) : (
        <IconButton title='pause' onClick={pauseClick}>
          <PauseIcon />
        </IconButton>
      )}
    </div>
  )
}

export default Zoom
