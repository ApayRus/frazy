import React from 'react'
import { PlayArrow } from '@material-ui/icons'
// import { audio } from '../howler'
import { ButtonBase, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import MaterialFormTitle from './MaterialFormTitle'
import { map } from 'lodash'

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
  const { phrases, currentPhraseId, setPageParameter, lang, trLang, title, trTitle } = props

  const classes = useStyles()

  const text = map(phrases, 'text').join('\n') //textarea content original text
  const trText = map(phrases, `translations.${trLang}`).join('\n') //textarea content translation text

  const handleTextChanged = event => {
    const newText = event.target.value.split('\n')

    let newPhrases = phrases

    phrases.forEach((elem, index) => {
      const { id } = elem
      const label1 = newText[index] || ''
      wavesurferModule.wavesurfer.regions.list[id].update({ attributes: { label1 } })
      newPhrases[index]['text'] = label1
    })
    setPageParameter(['phrases', newPhrases])
  }

  const handleTrTextChanged = event => {
    const newText = event.target.value.split('\n')

    let newPhrases = phrases

    phrases.forEach((elem, index) => {
      const { id } = elem
      const label2 = newText[index] || ''
      // translations: {ru: Хоббит, es: El Hobboto, ua: Хиббит}
      const oldTranslations = elem.translations || {}
      const newTranslations = { ...oldTranslations, [trLang]: label2 }
      wavesurferModule.wavesurfer.regions.list[id].update({ attributes: { label2 } })
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
        <div style={{ marginLeft: 40 }}>
          <MaterialFormTitle
            title={title}
            lang={lang}
            langId='lang'
            langLabel='Lang'
            titleId='title'
            titleLabel='Title'
          />
        </div>
        <PhrasesColumn />
        <textarea
          value={text}
          onChange={handleTextChanged}
          rows={phrases.length}
          className={`${classes.textarea} ${classes.textareaOriginal}`}
        />
      </Grid>
      <Grid item sm={5} xs={12}>
        <MaterialFormTitle
          title={trTitle}
          lang={trLang}
          langId='trLang'
          langLabel='TrLang'
          titleId='trTitle'
          titleLabel='Title of translation'
        />
        <textarea
          value={trText}
          onChange={handleTrTextChanged}
          rows={phrases.length}
          className={`${classes.textarea} ${classes.textareaTranslation}`}
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  const pc = state.pageContent
  return {
    phrases: pc.phrases,
    lang: pc.lang,
    trLang: pc.trLang,
    title: pc.title,
    trTitle: pc.trTitle,
    currentPhraseId: state.playerState.currentPhraseId
  }
}

const mapDispatchToProps = dispatch => ({
  setPageParameter: payload => dispatch(setPageParameter(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Phrases)
