import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import firebase from '../../firebase/firebase'
import { setMenuParameter } from '../../store/menuActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import HeadingDrawerHOC from './HeadingDrawerContainer'

/**
 * this component loads data from Firebase
 * @param {} props
 */
function HeadingFirebaseHOC(props) {
  const { setMenuParameter, unit } = props
  console.log('unit', unit)
  const setParamAsync = (paramName, firebaseId) => {
    firebase
      .storage()
      .ref(firebaseId)
      .getDownloadURL()
      .then(url => {
        setMenuParameter([paramName, url])
      })
  }

  const defaultUnitInfo = {
    author: 'There is no info for this unit yet',
    title: 'there should be title',
    logo: 'default-files/default-logo.png',
    background: 'default-files/default-background.jpg'
  }

  if (isLoaded(unit)) {
    if (unit) {
      //may be unitInfo not exists
      const { title, author, logo, background } = unit
      setMenuParameter(['title', title ? title : defaultUnitInfo.title])
      setMenuParameter(['author', author ? author : defaultUnitInfo.author])
      setParamAsync('logo', logo ? logo : defaultUnitInfo.logo)
      setParamAsync('background', background ? background : defaultUnitInfo.background)
      if (unit.heading) {
        setMenuParameter(['heading', unit.heading])
      }
    } else {
      //default heading when unit data not exists
      setMenuParameter(['title', defaultUnitInfo.title])
      setMenuParameter(['author', defaultUnitInfo.author])
      setParamAsync('logo', defaultUnitInfo.logo)
      setParamAsync('background', defaultUnitInfo.background)
    }

    return <HeadingDrawerHOC />
  } else {
    return <CircularProgress />
  }
}

const mapStateToProps = state => {
  return {
    unit: state.firestore.data.unit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenuParameter: payload => dispatch(setMenuParameter(payload))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const { unitId } = props
    return [{ collection: 'unit', doc: unitId, storeAs: 'unit' }]
  })
)(HeadingFirebaseHOC)
