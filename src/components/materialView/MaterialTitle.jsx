import React from 'react'
import Typography from '@material-ui/core/Typography'
import RoundButton from '../translations/RoundButton'
import TranslationSwitcher from '../translations/TranslationSwitcher'
import { useSelector } from 'react-redux'

function MaterialTitle() {
  const { title, trTitle, lang } = useSelector(state => state.pageContent)

  return (
    <div style={{ margin: 20, position: 'relative' }}>
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='subtitle2'>{trTitle}</Typography>
      <div>
        <RoundButton color='skyblue' size={30} onClick={() => {}} lang={lang} />
        <TranslationSwitcher />
      </div>
    </div>
  )
}

export default MaterialTitle
