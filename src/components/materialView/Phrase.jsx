import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Actor from './Actor'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles(theme => ({
  phrase: {
    boxShadow: '0px 1px 5px lightgrey',
    textAlign: 'left',
    padding: '10px 10px 10px 10px',
    position: 'relative',
    margin: 5
  },
  translation: {
    color: 'gray'
  },
  id: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    fontSize: 9,
    color: 'gray'
  },
  currentId: {
    color: theme.palette.primary.main
  }
}))

function Phrases(props) {
  const {
    showOriginalText,
    showTranslation,
    isCurrentPhrase,
    trLang,
    num,
    phrase,
    playPhrase
  } = props
  const classes = useStyles()
  return (
    <div>
      {phrase.actor && <Actor actor={phrase.actor} />}
      <ButtonBase style={{ display: 'block', width: '100%' }} onClick={playPhrase(phrase.id)}>
        <div className={classes.phrase}>
          <div className={clsx(classes.id, { [classes.currentId]: isCurrentPhrase })}>
            {num} <PlayArrow fontSize='inherit' />{' '}
          </div>
          {showOriginalText ? (
            <div>
              <Typography variant='body1'>{phrase.text}</Typography>
            </div>
          ) : null}
          {showTranslation && phrase.translations ? (
            <div className={classes.translation}>
              <Typography variant='body2'>{phrase.translations[trLang]}</Typography>
            </div>
          ) : null}
        </div>
      </ButtonBase>
    </div>
  )
}

export default Phrases
