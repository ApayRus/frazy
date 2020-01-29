import React from 'react'
import Typography from '@material-ui/core/Typography'

function Donate() {
  return (
    <div style={{ marginLeft: 20 }}>
      <Typography variant='body2'>
        Please, donate us, via{' '}
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
      <Typography variant='body2'>We are good people and deserve food for our work.</Typography>
    </div>
  )
}

export default Donate
