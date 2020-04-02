import React, { useRef } from 'react'
import PlayPauseButton from '../PlayPauseButton'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import CopyIcon from '@material-ui/icons/FileCopy'
import DeleteIcon from '@material-ui/icons/Delete'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Icon from '@material-ui/core/Icon'
import { useSelector, useDispatch } from 'react-redux'
import { clonePhrases, movePhrases, deletePhrases } from '../../store/pageContentActions'
import InputsViewSwitcher from './InputsViewSwitcher'
import WaveformZoom from '../WaveformZoom'
import PushPinIcon from './pushPin.svg'
import { setPlayerSettings } from '../../store/playerSettingsActions'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  pinSticked: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  pinUnSticked: {
    transform: 'rotate(45deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }
}))

function ControlsPanel(props) {
  const { selectedPhrases, waveformRenderProgress } = useSelector(state => state.pageContent)
  const { sticked: playerSticked } = useSelector(state => state.playerSettings)
  const { editMode } = props
  const dispatch = useDispatch()
  const deltaInput = useRef()

  const classes = useStyles()

  const handleMovePhrases = direction => event => {
    const deltaValue = deltaInput.current.value
    const delta = direction === 'back' ? +deltaValue * -1 : +deltaValue
    dispatch(movePhrases({ delta, selectedPhrases }))
  }

  const togglePlayerSticked = () => {
    dispatch(setPlayerSettings(['sticked', !playerSticked]))
  }

  const PlayPause = (
    <div style={{ display: 'inline-block' }}>
      <PlayPauseButton />
    </div>
  )

  const StickUnstickPlayer = (
    <IconButton title='Stick/unstick player' onClick={togglePlayerSticked}>
      <Icon>
        <img
          className={clsx(
            { [classes.pinSticked]: playerSticked },
            { [classes.pinUnSticked]: !playerSticked }
          )}
          src={PushPinIcon}
          alt='push-pin'
          width={24}
          height={24}
        />
      </Icon>
    </IconButton>
  )

  const ViewSwitcher = (
    <div style={{ display: 'inline-block', marginLeft: 10, marginRight: 10 }}>
      <InputsViewSwitcher />
    </div>
  )

  const PhrasesCloneMoveDelete =
    selectedPhrases.length > 0 ? (
      <div style={{ display: 'inline-block' }}>
        <IconButton
          title='clone selected phrases'
          onClick={() => dispatch(clonePhrases({ selectedPhrases }))}
        >
          <CopyIcon />
        </IconButton>
        <IconButton
          title='delete selected phrases'
          onClick={() => dispatch(deletePhrases({ selectedPhrases }))}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton title='move selected phrases back' onClick={handleMovePhrases('back')}>
          <ArrowBackIcon />
        </IconButton>
        <div style={{ display: 'inline-block' }} title='step for moving phrases (in seconds)'>
          <input
            defaultValue='1'
            min={0}
            step='0.1'
            ref={deltaInput}
            type='number'
            style={{ width: 50 }}
          />
        </div>
        <IconButton title='move selected phrases forward' onClick={handleMovePhrases('forward')}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    ) : null

  const Zoom = (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      {waveformRenderProgress === 100 && <WaveformZoom />}
    </div>
  )

  return (
    <div
      style={{
        marginTop: editMode ? -10 : -24,
        borderBottom: editMode ? '1px solid lightgrey' : 'none'
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={8}>
          {editMode && (
            <div>
              {PlayPause}
              {StickUnstickPlayer}
              {ViewSwitcher}
              {PhrasesCloneMoveDelete}
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {Zoom}
        </Grid>
      </Grid>
    </div>
  )
}

export default ControlsPanel
