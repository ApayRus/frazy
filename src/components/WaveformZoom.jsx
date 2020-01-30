import React from 'react'
import Slider from '@material-ui/core/Slider'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import IconButton from '@material-ui/core/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerSettings } from '../store/playerSettingsActions'

function Zoom(props) {
  const { wavesurfer } = props
  const { waveformZoom } = useSelector(state => state.playerSettings)
  const dispatch = useDispatch()
  const changeZoom = newValue => {
    wavesurfer.zoom(newValue)
    dispatch(setPlayerSettings(['waveformZoom', newValue]))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        size='small'
        onClick={() => {
          changeZoom(waveformZoom - 1)
        }}
      >
        <ZoomOutIcon />
      </IconButton>
      <div>
        <Slider
          value={waveformZoom}
          onChange={(event, newValue) => {
            changeZoom(newValue)
          }}
          style={{ margin: 10, width: 150 }}
          valueLabelDisplay='auto'
          min={5}
          max={200}
          step={1}
        />
      </div>
      <IconButton size='small' onClick={() => changeZoom(waveformZoom + 1)}>
        <ZoomInIcon />
      </IconButton>
    </div>
  )
}

export default Zoom
