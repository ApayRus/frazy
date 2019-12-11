import React from 'react'
import Typography from '@material-ui/core/Typography'
import RoundButton from '../translations/RoundButton'
import TranslationSwitcher from '../translations/TranslationSwitcher'
import { useSelector } from 'react-redux'

function MaterialTitle() {
  const { title, trTitle, lang } = useSelector(state => state.pageContent)

  return (
    <div style={{ margin: 20, position: 'relative' }}>
      <RoundButton color='skyblue' size={20} onClick={() => {}} lang={lang} />
      <Typography style={{ display: 'inline' }} variant='h5'>
        {title}
      </Typography>
      {trTitle ? (
        <div style={{ position: 'relative' }}>
          <Typography style={{ display: 'inline' }} variant='subtitle2'>
            {trTitle}
          </Typography>
        </div>
      ) : null}
      <div>
        <TranslationSwitcher />
      </div>
    </div>
  )
}

export default MaterialTitle
