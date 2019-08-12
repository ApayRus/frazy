import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { joinPhrasesAndTranslations } from '../utils/joinPhrasesAndTranslations'
import { joinTitle } from '../utils/joinTitle'
import MaterialPage from './MaterialPage'
import firebase from '../firebase/firebase'
import { setPageParameter } from '../store/pageContentActions'
import { setMenuParameter } from '../store/menuActions'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageHOC(props) {
  const {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases,
    setMenuParameter,
    setPageParameter
  } = props

  if (isLoaded(materialInfo, materialPhrases, translationInfo, translationPhrases)) {
    const { mediaLink, unit, lang } = materialInfo
    let phrases = materialPhrases
    let title = { text: materialInfo.title }

    phrases = joinPhrasesAndTranslations(materialPhrases, translationPhrases, translationInfo)

    title = joinTitle(materialInfo, translationInfo)

    setMenuParameter(['unit', unit])
    setPageParameter(['title', title])
    setPageParameter(['lang', lang])
    setPageParameter(['phrases', phrases])
    setPageParameter(['mediaLinkDownloadUrl', ''])
    firebase
      .storage()
      .ref(mediaLink)
      .getDownloadURL()
      .then(url => {
        setPageParameter(['mediaLinkDownloadUrl', url])
      })

    return <MaterialPage />
  } else {
    return <div>loading</div>
  }
}

const mapStateToProps = state => {
  const {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases
  } = state.firestore.data

  return {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload)),
    setMenuParameter: payload => dispatch(setMenuParameter(payload))
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    const { materialId } = props.match.params
    return [
      { collection: 'materialInfo', doc: materialId, storeAs: 'materialInfo' },
      { collection: 'materialPhrases', doc: materialId, storeAs: 'materialPhrases' },
      { collection: 'translationInfo', doc: `${materialId}_ru`, storeAs: 'translationInfo' },
      { collection: 'translationPhrases', doc: `${materialId}_ru`, storeAs: 'translationPhrases' }
      // { collection: "applications", where: [["tournamentId", "==", tournamentId]] }
    ]
  })
)(MaterialPageHOC)
