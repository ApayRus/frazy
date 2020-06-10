import React from 'react'
import RoundButton from './RoundButton'

const RoundButtonsBlock = props => {
  const { langs = [], title, size } = props
  console.log('props', props)
  return langs.map(lang => {
    const { lang: langCode, _id } = lang
    return (
      <RoundButton
        key={langCode}
        lang={langCode}
        size={size}
        title={title}
        _id={_id}
        color={props.activeLang === langCode ? 'skyblue' : 'lightgray'}
        materialId={props.materialId}
        trLang={langCode}
        onClick={props.onClick}
      />
    )
  })
}

export default RoundButtonsBlock
