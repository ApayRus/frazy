import React from 'react'

import { createMuiTheme } from '@material-ui/core/styles'

export function langTheme(lang) {
  // LANGUAGE THEME
  let theme = createMuiTheme()
  // console.log('theme.typography', theme.typography)
  const { h5, h6, subtitle1, body1 } = theme.typography
  const remChange = (remSize, delta) => {
    return +remSize.replace('rem', '') + delta + 'rem' // "0.5rem" + 1 = "1.5rem"
  }
  if (lang === 'ar') {
    theme = createMuiTheme({
      typography: {
        h5: {
          fontFamily: `'Scheherazade', serif`,
          fontSize: remChange(h5.fontSize, 0.75),
          direction: 'rtl'
        },
        h6: {
          fontFamily: `'Scheherazade', serif`,
          fontSize: remChange(h6.fontSize, 0.75),
          direction: 'rtl'
        },
        subtitle1: {
          fontFamily: `'Scheherazade', serif`,
          fontSize: remChange(subtitle1.fontSize, 0.75),
          direction: 'rtl'
        },
        body1: {
          fontFamily: `'Scheherazade', serif`,
          fontSize: remChange(body1.fontSize, 0.75),
          direction: 'rtl',
          textAlign: 'right'
        }
      }
    })
  }

  return theme
}

export function LangFonts(props) {
  const { lang } = props

  switch (lang) {
    case 'ar':
      return (
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Scheherazade:300,400,500,700&display=swap'
        />
      )

    default:
      return null
  }
}

/**
 *
 * @param {string} lang - language code, 'en', 'ar', 'ru'
 * @returns {string} - 'rtl' or 'ltr'
 */
export function langDirection(lang) {
  const rtlLanguages = ['ar', 'he']
  const direction = rtlLanguages.includes(lang) ? 'rtl' : 'ltr'
  return direction
}
