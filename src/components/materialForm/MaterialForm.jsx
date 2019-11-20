import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { Save as SaveIcon } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'
import Waveform from '../Waveform'
/* import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase' */
import { connect } from 'react-redux'
import { setPageParameter } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialFormInfo'
import firebase from '../../firebase/firebase'
import { map } from 'lodash'

import {
  subtitlesToLocalPhrases,
  localPhrasesToDBphrases,
  localPhrasesToDBtranslations
} from '../../utils/phrases'

import PhrasesForTextArea from './MaterialFormPhrases'

const MaterialForm = props => {
  const { mediaLinkDownloadUrl, uploadProgress, redirectTo, setPageParameter, text } = props

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
    const { title, mediaLink, lang, unit, order, phrases } = props

    let { materialId } = props

    const materialPhrases = localPhrasesToDBphrases(phrases)

    const material = { title, mediaLink, lang, unit, order, phrases: materialPhrases }

    const db = firebase.firestore()

    // refs to 2 documents in 2 collections:
    const materialDocRef = materialId
      ? db.collection(`material`).doc(materialId)
      : db.collection(`material`).doc()
    materialId = materialDocRef.id // if it was generated now, we updated it

    //upload promices
    //  material
    const uploadMaterialTask = materialDocRef
      .set(material)
      .then(snapshot => console.log('material uploaded'))
      .catch(error => console.log('error', error))

    //  translation

    // TRANSLATION
    const { trLang, trTitle /* trText */ } = props
    const translationPhrases = localPhrasesToDBtranslations(phrases, trLang)
    const translation = {
      title: trTitle,
      lang: trLang,
      for: materialId,
      phrases: translationPhrases
    }

    // 2 documents in 2 collections:

    //INFO
    let uploadTranslationTask
    if (trLang && trTitle) {
      const translationDocRef = db.doc(`materialTr/${materialId}_${trLang}`)
      uploadTranslationTask = translationDocRef
        .set(translation)
        .then(snapshot => console.log('translation uploaded'))
        .catch(error => console.log('error', error))
    }

    Promise.all([uploadMaterialTask, uploadTranslationTask]).then(values => {
      setPageParameter(['redirectTo', `${materialId}/${trLang}`])
      const eventsRef = db.collection(`events`)
      eventsRef.add({ lang, trLang, title, trTitle, materialId, time: Date.now(), unit })
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm)
