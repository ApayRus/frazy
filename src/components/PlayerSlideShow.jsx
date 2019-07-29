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
  number: {
    position: 'absolute',
    right: 2,
    bottom: 1,
    fontSize: 10,
    color: '#088dc2'
  }
}))

function PlayerSlideShow(props) {
  const classes = useStyles()
  const { currentPhraseNum, phrasesArray } = props
  const currentPhrase = phrasesArray[currentPhraseNum]
  const phrasesCount = phrasesArray.length

  return (
    <Paper className={classes.root}>
      {currentPhrase ? (
        <div>
          <Typography variant='body1'>{currentPhrase.text}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {currentPhrase.translations.ru}
          </Typography>
          <div className={classes.number}>{`${currentPhraseNum} / ${phrasesCount}`}</div>
        </div>
      ) : (
        <div>...</div>
      )}
    </Paper>
  )
}

const mapStateToProps = state => ({
  currentPhraseNum: state.playerState.currentPhraseNum
})

export default connect(mapStateToProps)(PlayerSlideShow)
