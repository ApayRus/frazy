import React from 'react'
import RoundButtonsBlock from './RoundButtonsBlock'
import { useSelector, useDispatch } from 'react-redux'
import { setAppStateParams } from '../../store/appStateActions'

function TranslationSwitcher() {
  const { translations } = useSelector(state => state.data.material)
  const { trLang } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const updateTranslation = trLang => event => {
    dispatch(setAppStateParams({ trLang }))
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
