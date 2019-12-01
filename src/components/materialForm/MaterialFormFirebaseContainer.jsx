import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { makePhrasesArray, addTranslation } from '../../utils/phrases'
import MaterialForm from './MaterialForm'
import firebase from '../../firebase/firebase'
import { setPageParameter } from '../../store/pageContentActions'
import { setMenuParameter } from '../../store/menuActions'
import { CircularProgress } from '@material-ui/core'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialFormHOC(props) {
  const { material, translation, setPageParameter } = props

  const { materialId } = props.match.params
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded(material, translation)) {
      const {
        mediaLink,
        lang,
        title,
        unit,
        order,
        phrases: materialPhrases,
        translations = []
      } = material
      let phrases = makePhrasesArray(materialPhrases)
      const fillReduxStore = () => {
        setPageParameter(['materialId', materialId])
        setPageParameter(['unit', unit])
        setPageParameter(['order', order])
        setPageParameter(['lang', lang])
        setPageParameter(['title', title])
        setPageParameter(['mediaLink', mediaLink])
        setPageParameter(['materialPhrases', materialPhrases])
        setPageParameter(['translations', translations])
        // setPageParameter(['mediaLinkDownloadUrl', ''])
        //TRANSLATION
        if (translation) {
          const {
            lang: trLang,
            title: trTitle,
            for: forMaterial,
            phrases: translationPhrases
          } = translation
          setPageParameter(['trLang', trLang])
          setPageParameter(['trTitle', trTitle])
          setPageParameter(['for', forMaterial])
          setPageParameter(['translationPhrases', translationPhrases])
          if (translation.phrases) {
            phrases = addTranslation(phrases, translation.phrases, trLang)
          }
        }
        setPageParameter(['phrases', phrases])
        // MEDIA-LINK
        //is external link, with full path to file
        if (mediaLink.match('http')) {
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
      }
      fillReduxStore()

      setIsDataLoaded(true)
    }
    return () => {
      //on unmount
    }
  }, [material, translation])

  return isDataLoaded ? <MaterialForm /> : <CircularProgress />
}

const mapStateToProps = state => {
  const fs = state.firestore.data
  return {
    material: fs.material,
    translation: fs.translation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload)),
    setMenuParameter: payload => dispatch(setMenuParameter(payload))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    const { materialId, trLang } = props.match.params

    return [
      { collection: 'material', doc: materialId, storeAs: 'material' },
      { collection: 'materialTr', doc: `${materialId}_${trLang}`, storeAs: 'translation' }
    ]
  })
)(MaterialFormHOC)
