import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  phrases: {
    textAlign: 'left',
    display: 'inline-block',
    maxWidth: 400
  },
  phrase: {
    boxShadow: '0px 1px 5px lightgrey',
    textAlign: 'left',
    padding: '10px 10px 10px 10px',
    cursor: 'pointer',
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
    color: '#088dc2'
  }
}))

function Phrases(props) {
  const { playPhrase } = props
  const { showOriginalText, showTranslation } = useSelector(state => state.playerSettings)
  const { currentPhraseId } = useSelector(state => state.playerState)
  const { phrases, trLang } = useSelector(state => state.pageContent)
  const classes = useStyles()
  return (
    <div className={classes.phrases}>
      {phrases.map((phrase, index) => {
        const isCurrentPhrase = currentPhraseId === phrase.id
        return (
          <ButtonBase
            style={{ display: 'block', width: '100%' }}
            onClick={playPhrase(phrase.id)}
            key={`phrase-${phrase.id}`}
          >
            <div className={classes.phrase} onClick={playPhrase(phrase.id)}>
              <div
                className={clsx(classes.id, { [classes.currentId]: isCurrentPhrase })}
                //without clsx: classes.id + ' ' + ( isCurrentPhrase ? classes.currentId : '' )
              >
                {index + 1} <PlayArrow fontSize='inherit' />{' '}
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
        )
      })}
    </div>
  )
}

export default Phrases
