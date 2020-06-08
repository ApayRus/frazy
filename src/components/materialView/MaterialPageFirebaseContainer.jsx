import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialPage from './MaterialPage'
import MaterialBar from './MaterialBar'
import {
  fillPageContent,
  setPageParameters,
  clearPageContent
} from '../../store/pageContentActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import DrawerSettings from '../layout/DrawerSettings'
import HeadingFirebaseHOC from '../unit/UnitPageDataContainer'
import { fetchRequest } from '../../utils/fetch'
import { getDownloadUrlById } from '../../utils/firebase'

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
      const [materialResponse, translationResponse] = await Promise.all([
        fetchRequest(`/api/material?_id=${materialId}`),
        fetchRequest(`/api/material-tr?for=${materialId}&lang=${trLang}`)
      ])
      const { data: material } = materialResponse
      const { data: translation } = translationResponse
      dispatch(
        fillPageContent({
          materialId,
          material,
          translation,
          mode: 'forView'
        })
      )
      setAllDataIsLoaded(true)
      const getAsyncMediaUrl = async () => {
        const { mediaLink = '' } = material
        if (!mediaLink.match('http')) {
          const [mediaLinkUrl] = await getDownloadUrlById([mediaLink])
          dispatch(setPageParameters({ mediaLinkUrl }))
        } else {
          dispatch(setPageParameters({ mediaLinkUrl: mediaLink }))
        }
      }
      getAsyncMediaUrl()
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
