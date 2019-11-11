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
  const {
    materialInfo,
    materialPhrases,
    translationInfo,
    translationPhrases,
    setMenuParameter,
    setPageParameter
  } = props

  console.log(
    'isLoaded all ',
    isLoaded(materialInfo, materialPhrases, translationInfo, translationPhrases)
  )

  if (isLoaded(materialInfo, materialPhrases, translationInfo, translationPhrases)) {
    // const { materialId } = props.match.params
    // console.log('materialId', materialId)

    const { mediaLink, unit, lang, title } = materialInfo
    let phrases = materialPhrases
    phrases = makePhrasesArray(materialPhrases)

    if (translationInfo) {
      const { lang, title } = translationInfo
      setPageParameter(['trLang', lang])
      setPageParameter(['trTitle', title])
      if (translationPhrases) {
        phrases = addTranslation(phrases, translationPhrases, translationInfo.lang)
      }
    }

    const { materialId } = props.match.params
    setMenuParameter(['unit', unit])
    setPageParameter(['materialId', materialId])
    setPageParameter(['title', title])
    setPageParameter(['lang', lang])
    setPageParameter(['phrases', phrases])
    setPageParameter(['mediaLinkDownloadUrl', ''])
    console.log('mediaLink', mediaLink)
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
          console.log('url', url)

          setPageParameter(['mediaLinkDownloadUrl', url])
        })
    }

    const theme = langTheme(lang)

    return (
      <MuiThemeProvider theme={theme}>
        <MaterialPage />
        <MaterialBar />
        {unit ? <HeadingFirebaseHOC /> : null}
        <DrawerSettings />
        <LangFonts lang={lang} />
      </MuiThemeProvider>
    )
  } else {
    return <CircularProgress size={100} />
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
      // { collection: "applications", where: [["tournamentId", "==", tournamentId]] }
    ]
  })
)(MaterialPageHOC)
