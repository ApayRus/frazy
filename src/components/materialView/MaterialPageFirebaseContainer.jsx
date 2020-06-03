import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const { material } = useSelector((state) => state.firestore.data)
  const dispatch = useDispatch()
  const { materialId, trLang } = props.match.params
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const material0 = await fetch(`/api/material?_id=${materialId}`)
      const material = await material0.json()
      const translation0 = await fetch(`/api/material-tr?for=${materialId}&lang=${trLang}`)
      const translation = await translation0.json()
      dispatch(
        fillPageContent({
          materialId,
          material: material.data[0],
          translation: translation.data[0],
          mode: 'forEdit'
        })
      )
      // dispatch(setMenuParameter(['unit', unit]))
      setAllDataIsLoaded(true)
    }
    fetchData()
    return () => {
      dispatch(clearPageContent())
      dispatch(clearCachedDocs())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { lang = '' } = material || {}

  return allDataIsLoaded ? (
    <div style={{ textAlign: 'center' }}>
      <MuiThemeProvider theme={langTheme(lang)}>
        <MaterialPage />
        <MaterialBar />
        {/* {unit ? <HeadingFirebaseHOC unitId={unit} displayMode='drawer' /> : null} */}
        <DrawerSettings />
        <LangFonts lang={lang} />
      </MuiThemeProvider>
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress size={100} />
    </div>
  )
}

export default MaterialPageFirebaseContainer
