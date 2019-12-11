import React from 'react'
import RoundButton from './RoundButton'

const RoundButtonsBlock = props => {
  const { langs = [], size } = props
  return langs.map(lang => (
    <RoundButton
      key={lang}
      lang={lang}
      size={size}
      color={props.activeLang === lang ? 'skyblue' : 'lightgray'}
      materialId={props.materialId}
      trLang={lang}
      onClick={props.onClick}
    />
  ))
}

export default RoundButtonsBlock
