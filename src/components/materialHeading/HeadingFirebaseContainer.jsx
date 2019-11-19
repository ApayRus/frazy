import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import firebase from '../../firebase/firebase'
import { setMenuParameter } from '../../store/menuActions'
import { CircularProgress } from '@material-ui/core'
import HeadingDrawerHOC from './HeadingDrawerContainer'

/**
 * this component loads data from Firebase
 * @param {} props
 */
function HeadingFirebaseHOC(props) {
  const { unitInfo, heading, setMenuParameter, unit } = props

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
    title: unit,
    logo: 'default-files/default-logo.png',
    background: 'default-files/default-background.jpg'
  }

  if (isLoaded(unitInfo, heading)) {
    if (unitInfo) {
      //may be unitInfo not exists
      const { title, author, logo, background } = unitInfo
      setMenuParameter(['title', title ? title : defaultUnitInfo.title])
      setMenuParameter(['author', author ? author : defaultUnitInfo.author])
      setParamAsync('logo', logo ? logo : defaultUnitInfo.logo)
      setParamAsync('background', background ? background : defaultUnitInfo.background)
    } else {
      //default heading when unit data not exists
      setMenuParameter(['title', defaultUnitInfo.title])
      setMenuParameter(['author', defaultUnitInfo.author])
      setParamAsync('logo', defaultUnitInfo.logo)
      setParamAsync('background', defaultUnitInfo.background)
    }

    if (heading) {
      setMenuParameter(['heading', heading])
    }

    return <HeadingDrawerHOC />
  } else {
    return <CircularProgress />
  }
}

const mapStateToProps = state => {
  const { unitInfo } = state.firestore.data
  const { heading } = state.firestore.ordered
  const { unit } = state.menu
  return { unitInfo, heading, unit }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenuParameter: payload => dispatch(setMenuParameter(payload))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    // const { materialId } = props.match.params
    const { unit } = props
    return [
      { collection: 'units', doc: unit, storeAs: 'unitInfo' },
      {
        collection: 'materialInfo',
        where: [['unit', '==', unit]],
        storeAs: 'heading'
      } //[materialInfo]
    ]
  })
)(HeadingFirebaseHOC)
