import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MaterialForm from './MaterialForm'
import { fillPageContent, setPageParameters } from '../../store/pageContentActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fetchRequest } from '../../utils/fetch'
import { getDownloadUrlById } from '../../utils/firebase'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 */
function MaterialFormHOC(props) {
  const { materialId, trLang } = props.match.params

  const dispatch = useDispatch()
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
          mode: 'forEdit'
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
      // dispatch(clearPageContent())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialId])

  return allDataIsLoaded ? <MaterialForm /> : <CircularProgress />
}

export default MaterialFormHOC
