import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Phrase from './Phrase'
import { phraseTextToObject } from '../../utils/phrasesXmlParser'

const useStyles = makeStyles(theme => ({
  phrases: {
    textAlign: 'left',
    display: 'inline-block',
    maxWidth: 400
  }
}))

function Phrases(props) {
  const { playPhrase } = props
  const { showOriginalText, showTranslation } = useSelector(state => state.playerSettings)
  const { currentPhraseId } = useSelector(state => state.playerState)
  const { phrases, trLang, lang } = useSelector(state => state.pageContent)
  const classes = useStyles()
  return (
    <div className={classes.phrases}>
      {phrases.map((phrase, index) => {
        const isCurrentPhrase = currentPhraseId === phrase.id

        const phraseTextObject = phraseTextToObject(phrase.text)
        const phraseTrTextObject = phraseTextToObject(phrase.translations[trLang])
        const newPhrase = {
          ...phrase,
          ...phraseTextObject,
          translations: { [trLang]: { ...phraseTrTextObject } }
        }

        const phraseProps = {
          showOriginalText,
          showTranslation,
          isCurrentPhrase,
          trLang,
          lang,
          num: index + 1,
          phrase: newPhrase,
          playPhrase
        }

        return <Phrase key={`phrase-${phrase.id}`} {...phraseProps} />
      })}
    </div>
  )
}

export default Phrases
