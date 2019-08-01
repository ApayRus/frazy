import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    height: 150,
    width: '85%',
    maxWidth: 350,
    display: 'inline-block',
    position: 'relative',
    marginTop: 10,
    padding: 20
  },
  currentPhrase: {
    position: 'absolute',
    right: 2,
    bottom: 1,
    fontSize: 10,
    color: '#088dc2'
  },
  dictationCurrentRepeat: {
    position: 'absolute',
    left: 2,
    bottom: 1,
    fontSize: 10,
    color: 'red'
  }
}))

function PlayerSlideShow(props) {
  const classes = useStyles()
  const {
    currentPhraseNum,
    phrasesArray,
    dictationCurrentRepeat,
    dictationRepeats,
    dictationTimerId,
    dictationDelay,
    showOriginalText,
    showTranslation
  } = props
  const currentPhrase = phrasesArray[currentPhraseNum]
  const phrasesCount = phrasesArray.length

  return (
    <Paper className={classes.root}>
      {currentPhrase ? (
        <div>
          {showOriginalText ? <Typography variant='body1'>{currentPhrase.text}</Typography> : null}
          {showTranslation ? (
            <Typography variant='body2' color='textSecondary'>
              {currentPhrase.translations.ru}
            </Typography>
          ) : null}
          <div className={classes.currentPhrase}>{`${currentPhraseNum + 1} / ${phrasesCount}`}</div>
          {dictationTimerId ? (
            <div
              className={classes.dictationCurrentRepeat}
            >{`${dictationCurrentRepeat} / ${dictationRepeats} x${dictationDelay}`}</div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div>...</div>
      )}
    </Paper>
  )
}

const mapStateToProps = state => ({
  showTranslation: state.playerSettings.showTranslation,
  showOriginalText: state.playerSettings.showOriginalText
})

export default connect(mapStateToProps)(PlayerSlideShow)
