import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import MaterialPage from './MaterialPage'
import MaterialBar from './MaterialBar'
import { fillPageContent } from '../../store/pageContentActions'
import { setMenuParameter } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import DrawerSettings from '../DrawerSettings'
import HeadingFirebaseHOC from '../materialHeading/HeadingFirebaseContainer'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageHOC(props) {
  const { material, translation } = props
  const dispatch = useDispatch()
  const { materialId } = props.match.params
  if (isLoaded(material, translation)) {
    const { lang, unit } = material
    dispatch(fillPageContent({ materialId, material, translation }))
    dispatch(setMenuParameter(['unit', unit]))

    const theme = langTheme(material.lang)

    return (
      <MuiThemeProvider theme={theme}>
        <MaterialPage />
        <MaterialBar />
        {unit ? <HeadingFirebaseHOC unitId={unit} /> : null}
        <DrawerSettings />
        <LangFonts lang={lang} />
      </MuiThemeProvider>
    )
  } else {
    return <CircularProgress size={100} />
  }
}

const mapStateToProps = state => {
  const fs = state.firestore.data
  return { material: fs.material, translation: fs.translation }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    const { materialId, trLang } = props.match.params
    return [
      { collection: 'material', doc: materialId, storeAs: 'material' },
      { collection: 'materialTr', doc: `${materialId}_${trLang}`, storeAs: 'translation' }
    ]
  })
)(MaterialPageHOC)
