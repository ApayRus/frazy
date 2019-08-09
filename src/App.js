import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import './App.css'
import AppBar from './components/AppBar'
import UnitPage from './components/UnitPage'
import MaterialPageHOC from './components/MaterialPageHOC'
import MaterialAdd from './components/MaterialAdd'
import DrawerSettings from './components/DrawerSettings'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

function App(props) {
  const { lang } = props
  let theme = createMuiTheme()
  console.log('theme.typography', theme.typography)
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
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <AppBar />
          <Route path='/materials/add/' component={MaterialAdd} />
          <Route path='/unit/:unitId' component={UnitPage} />
          <Route path='/material/:materialId' component={MaterialPageHOC} />
          <DrawerSettings />
        </div>
        {lang === 'ar' ? (
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Scheherazade:300,400,500,700&display=swap'
          />
        ) : null}
      </MuiThemeProvider>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  lang: state.pageContent.lang
})

export default connect(mapStateToProps)(App)
