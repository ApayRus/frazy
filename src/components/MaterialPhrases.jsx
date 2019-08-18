import React from 'react'
import { PlayArrow } from '@material-ui/icons'
// import { audio } from '../howler'
import { ButtonBase, Grid } from '@material-ui/core'
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
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    display: 'inline-block',
    overflowX: 'scroll',
    fontSize: 13,
    lineHeight: '15px'
  },
  textareaOriginal: {
    width: 'calc(100% - 46px)'
  },
  textareaTranslation: {
    width: '100%'
  },
  phrases: {
    verticalAlign: 'top',
    marginTop: 3,
    display: 'inline-block',
    minWidth: 40
  }
}))

function Phrases(props) {
  const { phrases, currentPhraseId, setPageParameter, text, trText, trLang } = props

  const classes = useStyles()

  const handleTextChanged = event => {
    const newText = event.target.value.split('\n')
    setPageParameter(['text', newText])

    let newPhrases = phrases

    phrases.forEach((elem, index) => {
      const { id } = elem
      const label = newText[index] || ''
      wavesurferModule.wavesurfer.regions.list[id].update({ attributes: { label } })
      newPhrases[index]['text'] = label
    })

    setPageParameter(['phrases', newPhrases])
  }

  const handleTrTextChanged = event => {
    const newText = event.target.value.split('\n')
    setPageParameter(['trText', newText])

    let newPhrases = phrases

    phrases.forEach((elem, index) => {
      // const { id } = elem
      const trText = newText[index] || ''
      // translations: {ru: Хоббит, es: El Hobboto, ua: Хиббит}
      const oldTranslations = elem.translations || {}
      const newTranslations = { ...oldTranslations, [trLang]: trText }
      newPhrases[index]['translations'] = newTranslations
    })

    setPageParameter(['phrases', newPhrases])
  }

  const playPhrase = id => event => {
    wavesurferModule.wavesurfer.regions.list[id].play()
  }

  const PhrasesColumn = () => (
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
              className={classes.id + ' ' + (currentPhraseId === phrase.id ? classes.current : '')}
            >
              {index + 1} <PlayArrow fontSize='inherit' />{' '}
            </div>
          </ButtonBase>
        )
      })}
    </div>
  )

  return (
    <Grid style={{ padding: 10 }} container>
      <Grid item sm={7} xs={12}>
        <PhrasesColumn />
        <textarea
          value={text.join('\n')}
          onChange={handleTextChanged}
          rows={phrases.length}
          className={`${classes.textarea} ${classes.textareaOriginal}`}
        />
      </Grid>
      <Grid item sm={5} xs={12}>
        <textarea
          value={trText.join('\n')}
          onChange={handleTrTextChanged}
          rows={phrases.length}
          className={`${classes.textarea} ${classes.textareaTranslation}`}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    currentPhraseId: state.playerState.currentPhraseId,
    phrases: state.pageContent.phrases,
    text: state.pageContent.text,
    trText: state.pageContent.trText,
    trLang: state.pageContent.trLang
  }
}

const mapDispatchToProps = dispatch => ({
  setPageParameter: payload => dispatch(setPageParameter(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phrases)
