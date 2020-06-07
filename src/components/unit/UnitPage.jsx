import React from 'react'
import HeadingFirebaseContainer from './UnitPageDataContainer'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import { loginDialog as local } from '../../localization/en'
import { setAppStateParam } from '../../store/appStateActions'
import UnitForm from './UnitForm'

const useStyles = makeStyles(theme => ({
  background: props => ({
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${props.background})`
  }),
  editForm: {
    padding: 10
  }
}))

function HeadingPage(props) {
  const { unitId = '' } = props.match.params || {}
  const { lang, background } = useSelector(state => state.menu)
  const { editMode } = useSelector(state => state.appState)
  const theme = langTheme(lang)
  const classes = useStyles({ background })
  const dispatch = useDispatch()

  const EditButton = () => (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        actionOnSuccess={() => dispatch(setAppStateParam({ editMode: !editMode }))}
        message={local.loginButtonMessageForAddMaterial}
        buttonIcon={<EditIcon />}
      />
    </div>
  )

  return (
    <MuiThemeProvider theme={theme}>
      <div style={!editMode ? { display: 'block' } : { display: 'none' }}>
        <Grid container>
          <Grid className={classes.background} item xs={0} sm={2} md={4}></Grid>
          <Grid item xs={12} sm={8} md={4}>
            <div style={{ boxShadow: `0px 1px 5px lightgrey` }}>
              <HeadingFirebaseContainer unitId={unitId} displayMode='page' />
              <EditButton />
            </div>
          </Grid>
          <Grid className={classes.background} item xs={0} sm={2} md={4}></Grid>
        </Grid>
      </div>

      <div style={editMode ? { display: 'block' } : { display: 'none' }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <div style={{ boxShadow: `0px 1px 5px lightgrey` }}>
              <HeadingFirebaseContainer unitId={unitId} displayMode='page' />
              <EditButton />
            </div>
          </Grid>
          <Grid className={classes.editForm} item xs={12} sm={4} md={4}>
            <UnitForm />
          </Grid>
          <Grid className={classes.editForm} item xs={12} sm={4} md={4}>
            <UnitForm />
          </Grid>
        </Grid>
      </div>

      <LangFonts lang={lang} />
    </MuiThemeProvider>
  )
}

export default HeadingPage
