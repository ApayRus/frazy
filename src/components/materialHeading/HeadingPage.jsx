import React from 'react'
import HeadingFirebaseContainer from './HeadingFirebaseContainer'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import { useSelector } from 'react-redux'

function HeadingPage(props) {
  // console.log('props', props)
  const { unitId = '' } = props.match.params || {}
  const { lang } = useSelector((state) => state.menu)
  const theme = langTheme(lang)
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={0} sm={2} md={4}></Grid>
        <Grid item xs={12} sm={8} md={4}>
          <div style={{ boxShadow: `0px 1px 5px lightgrey` }}>
            <HeadingFirebaseContainer unitId={unitId} displayMode='page' />
          </div>
        </Grid>
        <Grid item xs={0} sm={2} md={4}></Grid>
      </Grid>
      <LangFonts lang={lang} />
    </MuiThemeProvider>
  )
}

export default HeadingPage
