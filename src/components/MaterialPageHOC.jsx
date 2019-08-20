import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { makePhrasesArray, addTranslation } from '../utils/phrases'
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
    // const { materialId } = props.match.params
    // console.log('materialId', materialId)

    const { mediaLink, unit, lang } = materialInfo
    let phrases = materialPhrases
    let title = { text: materialInfo.title }
    phrases = makePhrasesArray(materialPhrases)
    if (translationInfo) phrases = addTranslation(phrases, translationPhrases, translationInfo.lang)

    title = joinTitle(materialInfo, translationInfo)

    setMenuParameter(['unit', unit])
    setPageParameter(['title', title])
    setPageParameter(['lang', lang])
    setPageParameter(['phrases', phrases])
    setPageParameter(['mediaLinkDownloadUrl', ''])

    if (mediaLink.match('http')) {
      //is external link, with full path to file
      setPageParameter(['mediaLinkDownloadUrl', mediaLink])
    } else {
      //mediaLink is just id to the file on our hosting, we'll get downloadURL
      firebase
        .storage()
        .ref(mediaLink)
        .getDownloadURL()
        .then(url => {
          setPageParameter(['mediaLinkDownloadUrl', url])
        })
    }

    // const MP = React.memo(props => <MaterialPage />)

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
  const { trLang } = state.pageContent

  return {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases,
    trLang
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
    const { trLang } = props
    return [
      { collection: 'materialInfo', doc: materialId, storeAs: 'materialInfo' },
      { collection: 'materialPhrases', doc: materialId, storeAs: 'materialPhrases' },
      { collection: 'translationInfo', doc: `${materialId}_${trLang}`, storeAs: 'translationInfo' },
      {
        collection: 'translationPhrases',
        doc: `${materialId}_${trLang}`,
        storeAs: 'translationPhrases'
      }
      // { collection: "applications", where: [["tournamentId", "==", tournamentId]] }
    ]
  })
)(MaterialPageHOC)
