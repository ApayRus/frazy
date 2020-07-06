import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { langDirection } from '../../theme/functions'

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    height: props.hasImage ? 265 : 150,
    width: '85%',
    maxWidth: 350,
    display: 'inline-block',
    position: 'relative',
    marginTop: 10,
    padding: 20,
  }),
  currentPhrase: {
    position: 'absolute',
    right: 2,
    bottom: 1,
    fontSize: 10,
    color: '#088dc2',
  },
  img: {
    height: 200,
  },
  dictationCurrentRepeat: {
    position: 'absolute',
    left: 2,
    bottom: 1,
    fontSize: 10,
    color: 'red',
  },
}))

function PlayerSlideShow(props) {
  const {
    currentPhraseNum,
    phrases,
    dictationCurrentRepeat,
    dictationRepeats,
    dictationTimerId,
    dictationDelay,
    showOriginalText,
    showTranslation,
    trLang,
    lang,
  } = props
  const currentPhrase = phrases[currentPhraseNum]
  const { img = {} } = currentPhrase || {}
  const classes = useStyles({ hasImage: Boolean(img.src) })
  const phrasesCount = phrases.length
  const direction = langDirection(lang)

  return (
    <Paper className={classes.root}>
      {currentPhrase ? (
        <div>
          {img.src && (
            <div>
              <img src={img.src} className={classes.img} alt={currentPhrase.text} />
            </div>
          )}
          {showOriginalText ? (
            <Typography variant='subtitle1' style={{ direction }}>
              {currentPhrase.text}
            </Typography>
          ) : null}
          {showTranslation && currentPhrase.translations ? (
            <Typography variant='body2' color='textSecondary'>
              {currentPhrase.translations[trLang].text}
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

const mapStateToProps = (state) => {
  const {
    showTranslation,
    showOriginalText,
    dictationDelay,
    dictationRepeats,
  } = state.playerSettings

  const { dictationTimerId, dictationCurrentRepeat } = state.playerState

  const { phrases, trLang, lang } = state.pageContent

  return {
    showTranslation,
    showOriginalText,
    phrases,
    dictationDelay,
    dictationRepeats,
    dictationTimerId,
    dictationCurrentRepeat,
    trLang,
    lang,
  }
}

export default connect(mapStateToProps)(PlayerSlideShow)
