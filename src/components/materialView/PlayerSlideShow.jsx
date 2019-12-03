import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
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
    phrases,
    dictationCurrentRepeat,
    dictationRepeats,
    dictationTimerId,
    dictationDelay,
    showOriginalText,
    showTranslation,
    trLang
  } = props
  const currentPhrase = phrases[currentPhraseNum]
  const phrasesCount = phrases.length

  return (
    <Paper className={classes.root}>
      {currentPhrase ? (
        <div>
          {showOriginalText ? (
            <Typography variant='subtitle1'>{currentPhrase.text}</Typography>
          ) : null}
          {showTranslation && currentPhrase.translations ? (
            <Typography variant='body2' color='textSecondary'>
              {currentPhrase.translations[trLang]}
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

const mapStateToProps = state => {
  const {
    showTranslation,
    showOriginalText,
    dictationDelay,
    dictationRepeats
  } = state.playerSettings

  const { dictationTimerId, dictationCurrentRepeat } = state.playerState

  const { phrases, trLang } = state.pageContent

  return {
    showTranslation,
    showOriginalText,
    phrases,
    dictationDelay,
    dictationRepeats,
    dictationTimerId,
    dictationCurrentRepeat,
    trLang
  }
}

export default connect(mapStateToProps)(PlayerSlideShow)
