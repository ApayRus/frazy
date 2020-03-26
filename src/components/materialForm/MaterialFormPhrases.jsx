import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../../store/pageContentActions'
import MaterialFormTitle from './MaterialFormTitle'
import { map } from 'lodash'
import Revisions from './Revisions'
import { useDispatch, useSelector } from 'react-redux'
import TranslationSwitcher from '../translations/TranslationSwitcher'
import PhrasesColumn from './PhrasesColumn'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  textarea: {
    resize: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    display: 'inline-block',
    overflowX: 'scroll',
    fontSize: 13,
    lineHeight: '15px',
    /* horizontal lines: */
    backgroundImage: `linear-gradient(white, white 14px, #ccc 14px, #ccc 15px, white 15px)`,
    backgroundSize: `100% 15px`
  },
  rtl: { textAlign: 'right', direction: 'rtl' }
}))

function Phrases(props) {
  const {
    phrases,
    lang,
    trLang,
    title,
    trTitle,
    materialId,
    textareaOriginal,
    showOriginalInputs,
    showTranslationInputs
  } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const classes = useStyles()
  const text = phrases.length
    ? map(phrases, 'text')
        .join('\n')
        .trim()
    : //if phrases exists, we use textarea for display their text
      textareaOriginal //if phrases doesn't exist yet, we use textarea for paste import subtitles text

  const trText = map(phrases, `translations.${trLang}.text`)
    .join('\n')
    .trim() //textarea content translation text

  const handleTextChanged = event => {
    const textareaOriginal = event.target.value
    if (!phrases.length) {
      //it is import of subtitles
      dispatch(setPageParameter(['textareaOriginal', textareaOriginal]))
    } else {
      //we rewrite text of phrases from textarea lines
      const newText = textareaOriginal.split('\n')
      let newPhrases = [...phrases]
      newPhrases = phrases.map((elem, index) => {
        return { ...elem, text: newText[index] }
      })
      console.log('newPhrases', newPhrases)
      dispatch(setPageParameter(['phrases', newPhrases]))
    }
  }

  const handleTrTextChanged = event => {
    const newText = event.target.value.split('\n')
    let newPhrases = [...phrases]
    newPhrases = phrases.map((elem, index) => {
      return { ...elem, translations: { ...elem.translations, [trLang]: { text: newText[index] } } }
    })
    dispatch(setPageParameter(['phrases', newPhrases]))
  }

  const TitleOriginal = (
    <MaterialFormTitle
      title={title}
      lang={lang}
      langId='lang'
      langLabel='Lang'
      titleId='title'
      titleLabel='Title'
    />
  )

  const TitleTranslation = (
    <MaterialFormTitle
      title={trTitle}
      lang={trLang}
      langId='trLang'
      langLabel='TrLang'
      titleId='trTitle'
      titleLabel='Title of translation'
    />
  )
  // width: 'calc(100% - 46px)'
  const TextareaOriginal = width => (
    <textarea
      value={text}
      onChange={handleTextChanged}
      rows={phrases.length}
      className={clsx(classes.textarea, { [classes.rtl]: lang === 'ar' })}
      style={{ width }}
    />
  )

  const TextareaTranslation = width => (
    <textarea
      value={trText}
      onChange={handleTrTextChanged}
      rows={phrases.length}
      className={`${classes.textarea} ${classes.textareaTranslation}`}
      style={{ width }}
    />
  )

  const Output = (showOriginalInputs, showTranslationInputs) => {
    // SHOW BOTH
    if (showOriginalInputs && showTranslationInputs) {
      return (
        <Grid style={{ padding: 10 }} container>
          <Grid item sm={7} xs={12}>
            <div style={{ marginLeft: 40, marginTop: 24 }}>{TitleOriginal}</div>
            <PhrasesColumn />
            {TextareaOriginal('calc(100% - 46px)')}
            <div style={{ marginLeft: 40, marginRight: 1 }}>
              {materialId && <Revisions docId={materialId} collection='material' />}
            </div>
          </Grid>
          <Grid item sm={5} xs={12}>
            <div style={{ textAlign: 'right', minHeight: 24 }}>
              <TranslationSwitcher />
            </div>
            {TitleTranslation}
            {TextareaTranslation('100%')}
            {materialId && <Revisions docId={`${materialId}_${trLang}`} collection='materialTr' />}
          </Grid>
        </Grid>
      )
    }
    // SHOW ONLY ORIGINAL
    else if (showOriginalInputs && !showTranslationInputs) {
      return (
        <Grid style={{ padding: 10 }} container>
          <Grid item xs={12}>
            <div style={{ marginLeft: 40, marginTop: 24 }}>{TitleOriginal}</div>
            <PhrasesColumn />
            {TextareaOriginal('calc(100% - 46px)')}
            <div style={{ marginLeft: 40, marginRight: 1 }}>
              {materialId && <Revisions docId={materialId} collection='material' />}
            </div>
          </Grid>
        </Grid>
      )
    }
    // SHOW ONLY TRANSLATION
    else if (!showOriginalInputs && showTranslationInputs) {
      return (
        <Grid style={{ padding: 10 }} container>
          <Grid item xs={12}>
            <div style={{ textAlign: 'right', minHeight: 24 }}>
              <TranslationSwitcher />
            </div>
            <div style={{ marginLeft: 40 }}>{TitleTranslation}</div>
            <PhrasesColumn />
            {TextareaTranslation('calc(100% - 46px)')}
            <div style={{ marginLeft: 40, marginRight: 1 }}>
              {materialId && (
                <Revisions docId={`${materialId}_${trLang}`} collection='materialTr' />
              )}
            </div>
          </Grid>
        </Grid>
      )
    }
  }

  return Output(showOriginalInputs, showTranslationInputs)
}

export default Phrases
