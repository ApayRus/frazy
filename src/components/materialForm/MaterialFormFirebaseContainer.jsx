import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import {
  makePhrasesArray,
  addTranslation,
  localPhrasesToText,
  localPhrasesToTrText
} from '../../utils/phrases'
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
  const {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases,
    setPageParameter
  } = props

  const { materialId } = props.match.params
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded(materialInfo, materialPhrases, translationInfo, translationPhrases)) {
      const { mediaLink, lang, title, unit, order } = materialInfo
      let phrases = materialPhrases
      phrases = makePhrasesArray(materialPhrases)
      const fillReduxStore = () => {
        setPageParameter(['materialId', materialId])
        setPageParameter(['unit', unit])
        setPageParameter(['order', order])
        setPageParameter(['lang', lang])
        setPageParameter(['title', title])
        setPageParameter(['mediaLink', mediaLink])
        const text = localPhrasesToText(phrases)
        setPageParameter(['text', text])
        // setPageParameter(['mediaLinkDownloadUrl', ''])
        //TRANSLATION
        if (translationInfo) {
          const { lang: trLang, title: trTitle } = translationInfo
          setPageParameter(['trLang', trLang])
          setPageParameter(['trTitle', trTitle])
          if (translationPhrases) {
            phrases = addTranslation(phrases, translationPhrases, trLang)
            const trText = localPhrasesToTrText(phrases, trLang)
            setPageParameter(['trText', trText])
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
  }, [materialInfo, materialPhrases, translationInfo, translationPhrases])

  return isDataLoaded ? <MaterialForm /> : <CircularProgress />
}

const mapStateToProps = state => {
  const fs = state.firestore.data
  return {
    materialInfo: fs.materialInfo,
    materialPhrases: fs.materialPhrases,
    translationInfo: fs.translationInfo,
    translationPhrases: fs.translationPhrases
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
      { collection: 'materialInfo', doc: materialId, storeAs: 'materialInfo' },
      { collection: 'materialPhrases', doc: materialId, storeAs: 'materialPhrases' },
      { collection: 'translationInfo', doc: `${materialId}_${trLang}`, storeAs: 'translationInfo' },
      {
        collection: 'translationPhrases',
        doc: `${materialId}_${trLang}`,
        storeAs: 'translationPhrases'
      }
    ]
  })
)(MaterialFormHOC)
