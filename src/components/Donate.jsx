import React from 'react'
import Typography from '@material-ui/core/Typography'

function Donate() {
  return (
    <div style={{ marginLeft: 20, marginTop: 10 }}>
      <Typography variant='body1'>
        Please donate to us via{' '}
        <a target='_blank' rel='noopener noreferrer' href='https://www.paypal.me/aparus'>
          PayPal
        </a>{' '}
        or{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://money.yandex.ru/to/41001512310147'
        >
          YandexMoney
        </a>
        .
      </Typography>
      <Typography variant='subtitle1'>For what we need money? </Typography>
    </div>
  )
}

export default Donate
