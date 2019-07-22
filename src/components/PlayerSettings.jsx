import React from 'react'
import { Settings as SettingsIcon } from '@material-ui/icons'
import { Typography, Checkbox, Slider, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: '1px',
    justifyItems: 'center',
    alignItems: 'center'
  }
})

function PlayerSettings() {
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    console.log('event.target.id, newValue', event.target.id, newValue)
  }

  return (
    <div style={{ margin: 10 }}>
      <Typography variant='h6'>
        <SettingsIcon style={{ marginTop: 5, fontSize: 17 }} /> Player settings
      </Typography>

      <Typography variant='subtitle1'>Display:</Typography>
      <div className={classes.grid}>
        <Typography variant='body2'>Show player</Typography>
        <Checkbox id='showPlayer' onChange={handleChange} />
        <Typography variant='body2'>Show original text</Typography>
        <Checkbox id='showOriginalText' onChange={handleChange} />
        <Typography variant='body2'>Show translation</Typography>
        <Checkbox id='showTranslation' onChange={handleChange} />
      </div>

      <Typography variant='subtitle1'>Playback:</Typography>
      <div className={classes.grid}>
        <Typography variant='body2'>Volume</Typography>
        <Slider id='volume' onChange={handleChange} style={{ width: '80%' }} />
        <Typography variant='body2'>Playback rate</Typography>
        <Slider id='playbackRate' onChange={handleChange} style={{ width: '80%' }} />
      </div>

      <Typography variant='subtitle1'>Dictation:</Typography>
      <div className={classes.grid}>
        <Typography variant='body2'>Repeat count</Typography>
        <Slider id='repeatCount' onChange={handleChange} style={{ width: '80%' }} />
        <Typography variant='body2'>Delay between repeats (x phrase length)</Typography>
        <Slider id='delayBetweenRepeats' onChange={handleChange} style={{ width: '80%' }} />
      </div>
    </div>
  )
}

export default PlayerSettings
