import React from 'react'
import { PlayArrow } from '@material-ui/icons'
// import { audio } from '../howler'
import { ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../store/pageContentActions'
import wavesurferModule from '../wavesurfer/wavesurfer'

import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  id: {
    color: 'gray',
    fontSize: 9
  },
  current: {
    color: 'red'
  },
  playButton: {
    display: 'block',
    width: 40,
    height: 15
  },
  textarea: {
    resize: 'none',
    width: '85%',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    display: 'inline-block',
    overflowX: 'scroll',
    fontSize: 13,
    lineHeight: '15px'
  },
  phrases: {
    verticalAlign: 'top',
    marginTop: 3,
    display: 'inline-block',
    minWidth: 40
  }
}))

function Phrases(props) {
  const { phrases, currentPhraseId, setPageParameter, text } = props

  const classes = useStyles()

  const handleTextChanged = event => {
    const newText = event.target.value.split('\n')
    setPageParameter(['text', newText])
    phrases.forEach((elem, index) => {
      const { id } = elem
      const label = newText[index] || ''
      wavesurferModule.wavesurfer.regions.list[id].update({ attributes: { label } })
    })
  }

  const playPhrase = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <div className={classes.phrases}>
        {phrases.map((phrase, index) => {
          return (
            <ButtonBase
              className={classes.playButton}
              onClick={playPhrase(phrase.id)}
              key={`phrase-${phrase.id}`}
              style={{ backgroundColor: phrase.color }}
            >
              <div
                className={
                  classes.id + ' ' + (currentPhraseId === phrase.id ? classes.current : '')
                }
              >
                {index + 1} <PlayArrow fontSize='inherit' />{' '}
              </div>
            </ButtonBase>
          )
        })}
      </div>
      <textarea
        value={text.join('\n')}
        onChange={handleTextChanged}
        rows={phrases.length}
        className={classes.textarea}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentPhraseId: state.playerState.currentPhraseId,
    phrases: state.pageContent.phrases,
    text: state.pageContent.text
  }
}

const mapDispatchToProps = dispatch => ({
  setPageParameter: payload => dispatch(setPageParameter(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phrases)
