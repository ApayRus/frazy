import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import MaterialForm from './MaterialForm'
import { fillPageContent } from '../../store/pageContentActions'
import { clearCachedDocs } from '../../store/appStateActions'
// import { setMenuParameter } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialFormHOC(props) {
  const dispatch = useDispatch()
  const { material, translation } = useSelector(state => state.firestore.data)
  const { materialId } = props.match.params
  const [allDataIsLoaded, setAllDataIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded(material, translation)) {
      dispatch(fillPageContent({ materialId, material, translation }))
      setAllDataIsLoaded(true)
    }
    return () => {
      //on unmount
      dispatch(clearCachedDocs())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material, translation])

  return allDataIsLoaded ? <MaterialForm /> : <CircularProgress />
}

export default firestoreConnect(props => {
  const { materialId, trLang } = props.match.params
  return [
    { collection: 'material', doc: materialId, storeAs: 'material' },
    { collection: 'materialTr', doc: `${materialId}_${trLang}`, storeAs: 'translation' }
  ]
})(MaterialFormHOC)
