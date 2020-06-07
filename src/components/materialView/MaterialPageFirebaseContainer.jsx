import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialPage from './MaterialPage'
import MaterialBar from './MaterialBar'
import { fillPageContent, clearPageContent } from '../../store/pageContentActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import DrawerSettings from '../layout/DrawerSettings'
import HeadingFirebaseHOC from '../materialHeading/HeadingFirebaseContainer'
import { fetchRequest } from '../../utils/fetch'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageFirebaseContainer(props) {
  const { unit, lang } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const { materialId, trLang } = props.match.params
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [material, translation] = await Promise.all([
        fetchRequest(`/api/material?_id=${materialId}`),
        fetchRequest(`/api/material-tr?for=${materialId}&lang=${trLang}`)
      ])
      dispatch(
        fillPageContent({
          materialId,
          material: { ...material.data },
          translation: translation.data,
          mode: 'forEdit'
        })
      )
      setAllDataIsLoaded(true)
    }
    fetchData()
    return () => {
      dispatch(clearPageContent())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId])

  return allDataIsLoaded ? (
    <div style={{ textAlign: 'center' }}>
      <MuiThemeProvider theme={langTheme(lang)}>
        <MaterialPage />
        <MaterialBar />
        {unit ? <HeadingFirebaseHOC unitId={unit} displayMode='drawer' /> : null}
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
