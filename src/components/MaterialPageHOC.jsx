import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { joinPhrasesAndTranslations } from '../utils/joinPhrasesAndTranslations'
import MaterialPage from './MaterialPage'
import firebase from '../firebase/firebase'
import { setMediaLink } from '../store/pageContentActions'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageHOC(props) {
  const { material, translation, setMediaLink } = props

  if (isLoaded(material, translation)) {
    const phrasesArray = joinPhrasesAndTranslations(material, translation)
    const { title: titleOriginal, mediaLink, lang: langOriginal } = material
    const { title: titleTranslation, lang: langTranslation } = translation
    const title = { [langOriginal]: titleOriginal, [langTranslation]: titleTranslation }

    // console.log('mediaLink1', mediaLink)

    firebase
      .storage()
      .refFromURL(mediaLink)
      .getDownloadURL()
      .then(url => {
        setMediaLink('')

        setTimeout(() => {
          setMediaLink(url)
        }, 1)
        // console.log('mediaLink2', mediaLink)
      })

    const propsMP = {
      phrasesArray,
      title
    }

    return <MaterialPage {...propsMP} />
  } else {
    return <div>loading</div>
  }
}

const mapStateToProps = state => {
  const { material, translation } = state.firestore.data

  return { material, translation }
}

const mapDispatchToProps = dispatch => {
  return {
    setMediaLink: payload => dispatch(setMediaLink(payload))
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
      { collection: 'materials', doc: materialId, storeAs: 'material' },
      { collection: 'translations', doc: `${materialId}_ru`, storeAs: 'translation' }
      // { collection: "applications", where: [["tournamentId", "==", tournamentId]] }
    ]
  })
)(MaterialPageHOC)
