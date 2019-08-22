import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { Save as SaveIcon } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'
import Waveform from './Waveform'
/* import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase' */
import { connect } from 'react-redux'
import { setPageParameter } from '../store/pageContentActions'
import wavesurferModule from '../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialInfo'
import firebase from '../firebase/firebase'
import { map } from 'lodash'

import {
  subtitlesToLocalPhrases,
  localPhrasesToDBphrases,
  localPhrasesToDBtranslations
} from '../utils/phrases'

import PhrasesForTextArea from './MaterialPhrases'

const MaterialForm = props => {
  const {
    mediaLinkDownloadUrl,
    uploadProgress,
    redirectTo,
    setPageParameter,
    text,
    phrases
  } = props

  let { materialId } = props

  setPageParameter(['redirectTo', ''])

  const playPause = () => {
    wavesurferModule.wavesurfer.playPause()
  }

  const readSubtitles = () => {
    const phrases = subtitlesToLocalPhrases(text.join('\n'))
    // console.log('phrases', phrases)
    setPageParameter(['phrases', phrases])

    if (wavesurferModule.wavesurfer) {
      phrases.forEach(phrase => {
        wavesurferModule.wavesurfer.addRegion(phrase)
      })
    }
    setPageParameter(['text', map(phrases, 'text')])
  }

  const clearRegions = () => {
    wavesurferModule.wavesurfer.clearRegions()
  }

  const handleSubmit = () => {
    // MATERIAL data for submit
    const { title, mediaLink, lang, unit, order } = props

    const materialInfo = { title, mediaLink, lang, unit, order }
    const materialPhrases = localPhrasesToDBphrases(phrases)

    const db = firebase.firestore()

    // refs to 2 documents in 2 collections:
    let materialInfoDocRef
    //exist materialId => it is update material
    if (materialId) {
      materialInfoDocRef = db.doc(`materialInfo/${materialId}`)
    }
    //not exist materialId => it is create material
    else {
      materialInfoDocRef = db.collection(`materialInfo`).doc()
      materialId = materialInfoDocRef.id
    }
    const materialPhrasesDocRef = db.doc(`materialPhrases/${materialId}`)

    //upload promices
    //  material
    const uploadMaterialInfoTask = materialInfoDocRef
      .set(materialInfo)
      .then(snapshot => console.log('materialInfo uploaded'))
      .catch(error => console.log('error', error))

    const uploadMaterialPhrasesTask = materialPhrasesDocRef
      .set(materialPhrases)
      .then(snapshot => console.log('materialPhrases uploaded'))
      .catch(error => console.log('error', error))

    //  translation

    // TRANSLATION
    const { trLang, trTitle, trText } = props
    const translationInfo = { title: trTitle, lang: trLang, for: materialId }

    // 2 documents in 2 collections:

    //INFO
    let uploadTranslationInfoTask
    if (trLang && trTitle) {
      const translationInfoDocRef = db.doc(`translationInfo/${materialId}_${trLang}`)
      uploadTranslationInfoTask = translationInfoDocRef
        .set(translationInfo)
        .then(snapshot => console.log('translationInfo uploaded'))
        .catch(error => console.log('error', error))
    }

    //PHRASES
    let uploadTranslationPhrasesTask
    if (trText.length > 0) {
      const translationPhrases = localPhrasesToDBtranslations(phrases, trLang)
      const translationPhrasesDocRef = db.doc(`translationPhrases/${materialId}_${trLang}`)
      uploadTranslationPhrasesTask = translationPhrasesDocRef
        .set(translationPhrases)
        .then(snapshot => console.log('translationPhrases uploaded'))
        .catch(error => console.log('error', error))
    }

    Promise.all([
      uploadMaterialInfoTask,
      uploadMaterialPhrasesTask,
      uploadTranslationInfoTask,
      uploadTranslationPhrasesTask
    ]).then(values => setPageParameter(['redirectTo', materialId]))
  }

  return (
    <div style={{ textAlign: 'left', paddingBottom: 50 }}>
      <MaterialInfo />
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='body2' color='textSecondary'>
            File uploading ...
          </Typography>
          <CircularProgress value={uploadProgress} variant='static' />
        </div>
      ) : null}
      {mediaLinkDownloadUrl ? (
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2 }}>
          <Waveform />
          <Button onClick={playPause}>Play/Pause </Button>
        </div>
      ) : null}
      <div>
        <PhrasesForTextArea />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button style={{ margin: 10 }} onClick={readSubtitles} variant='outlined'>
          Import subtitles
        </Button>
        <Button style={{ margin: 10 }} onClick={clearRegions} variant='outlined'>
          Remove Regions
        </Button>
        <Button style={{ margin: 10 }} onClick={handleSubmit} variant='contained' color='primary'>
          Save <SaveIcon style={{ marginLeft: 10 }} />
        </Button>
      </div>
      {redirectTo ? <Redirect to={`/material/${redirectTo}`} /> : null}
    </div>
  )
}

const mapStateToProps = state => {
  const pc = state.pageContent
  return {
    mediaLinkDownloadUrl: pc.mediaLinkDownloadUrl,
    uploadProgress: pc.uploadProgress,
    title: pc.title,
    mediaLink: pc.mediaLink,
    lang: pc.lang,
    unit: pc.unit,
    order: pc.order,
    redirectTo: pc.redirectTo,
    text: pc.text,
    phrases: pc.phrases,
    trLang: pc.trLang,
    trTitle: pc.trTitle,
    trText: pc.trText,
    materialId: pc.materialId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialForm)
