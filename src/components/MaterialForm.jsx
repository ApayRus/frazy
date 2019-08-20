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
    const materialInfoDocRef = db.collection(`materialInfo`).doc()
    const materialId = materialInfoDocRef.id
    const materialPhrasesDocRef = db.doc(`materialPhrases/${materialId}`)

    // TRANSLATION
    const { trLang, trTitle } = props
    const translationInfo = { title: trTitle, lang: trLang, for: materialId }
    const translationPhrases = localPhrasesToDBtranslations(phrases, trLang)

    // refs to 2 documents in 2 collections:
    const translationInfoDocRef = db.doc(`translationInfo/${materialId}_${trLang}`)
    const translationPhrasesDocRef = db.doc(`translationPhrases/${materialId}_${trLang}`)

    //upload promices
    //  material
    const uploadMaterialInfoTask = materialInfoDocRef.set(materialInfo)
    const uploadMaterialPhrasesTask = materialPhrasesDocRef.set(materialPhrases)
    //  translation
    const uploadTranslationInfoTask = translationInfoDocRef.set(translationInfo)
    const uploadTranslationPhrasesTask = translationPhrasesDocRef.set(translationPhrases)

    // responses after upload
    uploadMaterialInfoTask
      .then(snapshot => console.log('materialInfo uploaded'))
      .catch(error => console.log('error', error))
    uploadMaterialPhrasesTask
      .then(snapshot => console.log('materialPhrases uploaded'))
      .catch(error => console.log('error', error))

    uploadTranslationInfoTask
      .then(snapshot => console.log('translationInfo uploaded'))
      .catch(error => console.log('error', error))
    uploadTranslationPhrasesTask
      .then(snapshot => console.log('translationPhrases uploaded'))
      .catch(error => console.log('error', error))

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
        <div>
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
    trTitle: pc.trTitle
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
