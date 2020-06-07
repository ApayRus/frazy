import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MaterialForm from './MaterialForm'
import { fillPageContent } from '../../store/pageContentActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fetchRequest } from '../../utils/fetch'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 */
function MaterialFormHOC(props) {
  const { materialId, trLang } = props.match.params

  const dispatch = useDispatch()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return allDataIsLoaded ? <MaterialForm /> : <CircularProgress />
}

export default MaterialFormHOC
