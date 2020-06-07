import React from 'react'
import HeadingFirebaseContainer from './UnitPageDataContainer'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import ButtonWithAuthPopover from '../auth/ButtonWithAuthPopover'
import { loginDialog as local } from '../../localization/en'
import { setAppStateParams } from '../../store/appStateActions'
import UnitForm from './UnitForm'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  background: props => ({
    backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7)), url(${props.background})`
  }),
  editForm: {
    marginBottom: 10
  },
  blockTitle: {
    backgroundColor: 'skyblue',
    width: '100%',
    textAlign: 'center'
  },
  middleBlock: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 16,
      paddingRight: 16
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 8,
      paddingRight: 8
    }
  }
}))

function HeadingPage(props) {
  const { unitId = '' } = props.match.params || {}
  const { lang, background } = useSelector(state => state.menu)
  const { editMode } = useSelector(state => state.appState)
  const theme = langTheme(lang)
  const classes = useStyles({ background })
  const dispatch = useDispatch()

  const toggleEditMode = () => dispatch(setAppStateParams({ editMode: !editMode }))

  const EditButton = () => (
    <div style={{ position: 'fixed', bottom: 2, zIndex: 1, right: 2 }}>
      <ButtonWithAuthPopover
        actionOnSuccess={toggleEditMode}
        message={local.loginButtonMessageForAddMaterial}
        buttonIcon={<EditIcon />}
      />
    </div>
  )

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ display: !editMode ? 'block' : 'none' }}>
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

      <div style={{ display: editMode ? 'block' : 'none' }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <div className={classes.blockTitle}>
              <Typography variant='subtitle1'>Preview</Typography>
            </div>
            <div style={{ boxShadow: `0px 1px 5px lightgrey` }}>
              <HeadingFirebaseContainer unitId={unitId} displayMode='page' />
            </div>
          </Grid>
          <Grid className={clsx(classes.editForm, classes.middleBlock)} item xs={12} sm={4} md={4}>
            <div className={classes.blockTitle}>
              <Typography variant='subtitle1'>Unit (original)</Typography>
            </div>
            <UnitForm />
          </Grid>
          <Grid className={classes.editForm} item xs={12} sm={4} md={4}>
            <div className={classes.blockTitle}>
              <Typography variant='subtitle1'>Unit (translation)</Typography>
            </div>
            <UnitForm />
            <div style={{ marginTop: 20, padding: 5, textAlign: 'right' }}>
              <Button
                variant='contained'
                color='default'
                style={{ marginRight: 10 }}
                onClick={toggleEditMode}
              >
                Cancel
              </Button>
              <Button variant='contained' color='primary'>
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

      <LangFonts lang={lang} />
    </MuiThemeProvider>
  )
}

export default HeadingPage
