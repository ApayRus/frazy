import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMenuParameters } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import HeadingDrawer from './UnitDrawerContainer'
import Heading from './Heading'
import { fetchRequest } from '../../utils/fetch'

/**
 * this component loads data from Firebase
 * @param {} props
 */
function HeadingFirebaseContainer(props) {
  const { unitId, displayMode } = props
  const dispatch = useDispatch()
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const [unitResponse] = await Promise.all([fetchRequest(`/api/unit?_id=${unitId}`)])
      if (unitResponse.success) {
        dispatch(setMenuParameters({ ...unitResponse.data }))
      }

      setAllDataIsLoaded(true)
    }
    fetchData()

    return () => {
      //cleanup
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return allDataIsLoaded ? (
    displayMode === 'drawer' ? (
      <HeadingDrawer />
    ) : (
      <Heading />
    )
  ) : (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <CircularProgress />
    </div>
  )
}

export default HeadingFirebaseContainer
