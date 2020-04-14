import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'
import { setMenuParameter } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import HeadingDrawer from './HeadingDrawerContainer'
import Heading from './Heading'
import { afterFirebaseFileDownloadUrlReady } from '../../utils/firebase'

/**
 * this component loads data from Firebase
 * @param {} props
 */
function HeadingFirebaseContainer(props) {
  const { unit } = useSelector((state) => state.firestore.data)
  const { unitId, displayMode } = props
  const dispatch = useDispatch()
  const [dataLoaded, setDataLoaded] = useState(false)

  useFirestoreConnect(() => {
    return [{ collection: 'unit', doc: unitId, storeAs: 'unit' }]
  })

  useEffect(() => {
    const setParamAsync = (paramName, firebaseId) =>
      afterFirebaseFileDownloadUrlReady(firebaseId, (url) =>
        dispatch(setMenuParameter([paramName, url]))
      )

    const defaultUnitInfo = {
      author: 'There is no info for this unit yet',
      title: 'There should be a title here',
      logo: 'default-files/default-logo.png',
      background: 'default-files/default-background.jpg',
    }
    if (isLoaded(unit)) {
      if (unit) {
        //may be unitInfo not exists
        const { title, author, logo, background, lang } = unit
        dispatch(setMenuParameter(['title', title ? title : defaultUnitInfo.title]))
        dispatch(setMenuParameter(['author', author ? author : defaultUnitInfo.author]))
        dispatch(setMenuParameter(['lang', lang]))
        setParamAsync('logo', logo ? logo : defaultUnitInfo.logo)
        setParamAsync('background', background ? background : defaultUnitInfo.background)
        if (unit.heading) {
          dispatch(setMenuParameter(['heading', unit.heading]))
        }
      } else {
        //default heading when unit data not exists
        dispatch(setMenuParameter(['title', defaultUnitInfo.title]))
        dispatch(setMenuParameter(['author', defaultUnitInfo.author]))
        setParamAsync('logo', defaultUnitInfo.logo)
        setParamAsync('background', defaultUnitInfo.background)
      }
      setDataLoaded(true)
    }
    return () => {
      //cleanup
    }
  }, [dispatch, unit])

  return dataLoaded ? (
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
