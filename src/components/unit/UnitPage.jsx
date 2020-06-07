import React from 'react'
import HeadingFirebaseContainer from './UnitPageDataContainer'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import { useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import { loginDialog as local } from '../../localization/en'

const useStyles = makeStyles(theme => ({
  background: props => ({
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${props.background})`
  })
}))

function HeadingPage(props) {
  const AddButton = () => (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        actionOnSuccess={() => console.log('switch edit mode')}
        message={local.loginButtonMessageForAddMaterial}
        buttonIcon={<EditIcon />}
      />
    </div>
  )

  const { unitId = '' } = props.match.params || {}
  const { lang, background } = useSelector(state => state.menu)
  const theme = langTheme(lang)
  const classes = useStyles({ background })
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid className={classes.background} item xs={0} sm={2} md={4}></Grid>
        <Grid item xs={12} sm={8} md={4}>
          <div style={{ boxShadow: `0px 1px 5px lightgrey` }}>
            <HeadingFirebaseContainer unitId={unitId} displayMode='page' />
            <AddButton />
          </div>
        </Grid>
        <Grid className={classes.background} item xs={0} sm={2} md={4}></Grid>
      </Grid>
      <LangFonts lang={lang} />
    </MuiThemeProvider>
  )
}

export default HeadingPage
