import React from 'react'
import RoundButtonsBlock from '../translations/RoundButtonsBlock'
import { useSelector } from 'react-redux'
import switchTranslation from './switchTranslation'

function TranslationSwitcher() {
  const { trLang, translations, materialId } = useSelector((state) => state.pageContent)

  const updateTranslation = (lang, trLang) => (event) => {
    const docId = `${materialId}_${trLang}`
    console.log('docId', docId)
    switchTranslation(docId)
  }

  return (
    <RoundButtonsBlock
      activeLang={trLang}
      size={20}
      onClick={updateTranslation}
      langs={translations}
      title='available translation'
    />
  )
}

export default TranslationSwitcher
