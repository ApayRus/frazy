import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MaterialForm from './MaterialForm'
import { fillPageContent } from '../../store/pageContentActions'
import CircularProgress from '@material-ui/core/CircularProgress'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 */
function MaterialFormHOC(props) {
  const { materialId, trLang } = props.match.params

  const dispatch = useDispatch()
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
          mode: 'forEdit',
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

/*
        _id: '5ed47711cb0e6b61da83fd4e',
        for: '5ed47585cb0e6b61da83fd4d', 
*/
