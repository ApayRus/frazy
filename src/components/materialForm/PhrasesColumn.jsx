import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  id: {
    color: 'gray',
    fontSize: 9,
    display: 'inline-block'
  },
  current: {
    color: 'red'
  },
  playButton: {
    display: 'block',
    width: 40,
    height: 15
  },
  phrases: {
    verticalAlign: 'top',
    display: 'inline-block',
    minWidth: 40
  }
}))

function Phrases(props) {
  const { phrases } = useSelector(state => state.pageContent)

  const { currentPhraseId } = useSelector(state => state.playerState)
  const dispatch = useDispatch()
  const classes = useStyles()

  const playPhrase = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
  }

  return (
    <div className={classes.phrases}>
      {phrases.map((phrase, index) => {
        const isCurrentPhrase = currentPhraseId === phrase.id
        return (
          <ButtonBase
            className={classes.playButton}
            key={`phrase-${phrase.id}`}
            style={{ backgroundColor: phrase.color }}
          >
            <div
              onClick={playPhrase(phrase.id)}
              // className={classes.id + ' ' + (isCurrentPhrase ? classes.current : '')}
              className={clsx(classes.id, { [classes.current]: isCurrentPhrase })}
            >
              {index + 1} <PlayArrow fontSize='inherit' />{' '}
            </div>
          </ButtonBase>
        )
      })}
    </div>
  )
}

export default Phrases
