import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { makePhrasesArray, addTranslation } from '../../utils/phrases'
import MaterialPage from './MaterialPage'
import MaterialBar from './MaterialBar'
import firebase from '../../firebase/firebase'
import { setPageParameter } from '../../store/pageContentActions'
import { setMenuParameter } from '../../store/menuActions'
import { CircularProgress } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { langTheme, LangFonts } from '../../theme/functions'
import DrawerSettings from '../DrawerSettings'
import HeadingFirebaseHOC from '../materialHeading/HeadingFirebaseContainer'

/**
 * this component loads data from Firebase:  material and translation, join them and pass for display
 * @param {} props
 */
function MaterialPageHOC(props) {
  const { material, translation, setMenuParameter, setPageParameter } = props

  if (isLoaded(material, translation)) {
    const { mediaLink, unit, lang, title } = material
    console.log('translation', translation)
    let phrases = material.phrases
    phrases = makePhrasesArray(phrases)

    if (translation) {
      const { lang, title } = translation
      setPageParameter(['trLang', lang])
      setPageParameter(['trTitle', title])
      if (translation) {
        phrases = addTranslation(phrases, translation.phrases, translation.lang)
      }
    }

    const { materialId } = props.match.params

    setMenuParameter(['unit', unit])
    setPageParameter(['materialId', materialId])
    setPageParameter(['title', title])
    setPageParameter(['lang', lang])
    setPageParameter(['phrases', phrases])
    setPageParameter(['mediaLinkDownloadUrl', ''])
    setPageParameter(['waveformRenderProgress', -1])

    // console.log('mediaLink', mediaLink)
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

    /*     console.log('material', JSON.stringify({ ...materialInfo, phrases: { ...materialPhrases } }))
    console.log(
      'translation',
      JSON.stringify({ ...translationInfo, phrases: { ...translationPhrases } })
    ) */

    const theme = langTheme(lang)

    return (
      <MuiThemeProvider theme={theme}>
        <MaterialPage />
        <MaterialBar />
        {unit ? <HeadingFirebaseHOC unitId={unit} /> : null}
        <DrawerSettings />
        <LangFonts lang={lang} />
      </MuiThemeProvider>
    )
  } else {
    return <CircularProgress size={100} />
  }
}

const mapStateToProps = state => {
  const fs = state.firestore.data
  return { material: fs.material, translation: fs.translation }
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
)(MaterialPageHOC)
