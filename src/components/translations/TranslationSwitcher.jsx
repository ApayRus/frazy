import React from 'react'
import RoundButtonsBlock from '../translations/RoundButtonsBlock'
import { useSelector } from 'react-redux'
import switchTranslation from './switchTranslation'

function TranslationSwitcher() {
  const { trLang, translations } = useSelector(state => state.pageContent)

  const updateTranslation = _id => event => {
    switchTranslation(_id)
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
