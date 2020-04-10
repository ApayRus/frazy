import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import MaterialPage from './MaterialPage'
import MaterialBar from './MaterialBar'
import { fillPageContent, clearPageContent } from '../../store/pageContentActions'
import { clearCachedDocs } from '../../store/appStateActions'
import { setMenuParameter } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import DrawerSettings from '../layout/DrawerSettings'
import HeadingFirebaseHOC from '../materialHeading/HeadingFirebaseContainer'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageFirebaseContainer(props) {
  const { material, translation } = useSelector((state) => state.firestore.data)
  const dispatch = useDispatch()
  const { materialId, trLang } = props.match.params

  useFirestoreConnect(() => {
    return [
      { collection: 'material', doc: materialId, storeAs: 'material' },
      { collection: 'materialTr', doc: `${materialId}_${trLang}`, storeAs: 'translation' },
    ]
  })

  useEffect(() => {
    return () => {
      dispatch(clearPageContent())
      dispatch(clearCachedDocs())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoaded(material, translation)) {
    const { lang, unit } = material
    dispatch(fillPageContent({ materialId, material, translation }))
    dispatch(setMenuParameter(['unit', unit]))

    const theme = langTheme(material.lang)

    return (
      <div style={{ textAlign: 'center' }}>
        <MuiThemeProvider theme={theme}>
          <MaterialPage />
          <MaterialBar />
          {unit ? <HeadingFirebaseHOC unitId={unit} /> : null}
          <DrawerSettings />
          <LangFonts lang={lang} />
        </MuiThemeProvider>
      </div>
    )
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={100} />
      </div>
    )
  }
}

export default MaterialPageFirebaseContainer
