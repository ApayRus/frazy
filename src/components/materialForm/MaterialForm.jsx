import React, { useState, useEffect } from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { Save as SaveIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import Waveform from '../Waveform'
/* import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase' */
import { connect } from 'react-redux'
import { setPageParameter } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialFormInfo'
import firebase from '../../firebase/firebase'
import { map } from 'lodash'
import { diff, detailedDiff } from 'deep-object-diff'

import {
  subtitlesToLocalPhrases,
  localPhrasesToDBphrases,
  localPhrasesToDBtranslations
} from '../../utils/phrases'

import PhrasesForTextArea from './MaterialFormPhrases'

const MaterialForm = props => {
  const { mediaLinkDownloadUrl, uploadProgress, setPageParameter, text } = props
  const history = useHistory()
  const [prevMaterial, setPrevMaterial] = useState({})
  const [prevTranslation, setPrevTranslation] = useState({})

  // we get initial data snapshots for compare them with user input
  // and detect what has changed
  useEffect(() => {
    //onMount
    // snapshot from material
    {
      const { title, mediaLink, lang, unit, order, materialPhrases: phrases } = props
      const materialData = { title, mediaLink, lang, unit, order, phrases }
      setPrevMaterial(materialData)
    }
    // snapshot from translation
    {
      const { trTitle: title, trLang: lang, translationPhrases: phrases, for: forMaterial } = props
      const translationData = { title, lang, phrases, for: forMaterial }
      setPrevTranslation(translationData)
    }
  }, [])

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
    const db = firebase.firestore()
    const waitPromisesBeforeRedirect = []

    // MATERIAL data for submit
    const { title, mediaLink, lang, unit, order, phrases, duration, profile } = props
    //if id of doc (material or translation) exists, then we are updating the doc, elsewhere we are adding the doc
    const materialAction = props.materialId ? 'material updated' : 'material added'
    const translationAction = props.translationId ? 'translation updated' : 'translation added'

    const createInfo = (profile, time) => ({
      createdBy: { userId: profile.uid, userName: profile.displayName },
      createdAt: time,
      updatedAt: time
    })

    const updateInfo = (profile, time) => ({
      updatedBy: { userId: profile.uid, userName: profile.displayName },
      updatedAt: time
    })

    const materialId = props.materialId || db.collection(`material`).doc().id
    const materialPhrases = localPhrasesToDBphrases(phrases)
    //new material after user input:
    const material = { title, mediaLink, lang, unit, order, phrases: materialPhrases, duration }

    // TRANSLATION data for submit
    const { trLang, trTitle /* trText */ } = props
    let translation = {}
    const translationId = props.translationId || `${materialId}_${trLang}`
    if (trLang && trTitle) {
      const translationPhrases = localPhrasesToDBtranslations(phrases, trLang)
      translation = {
        title: trTitle,
        lang: trLang,
        for: materialId,
        phrases: translationPhrases
      }
    }

    const diffMaterial = diff(prevMaterial, material) //diff object after user input
    const diffTranslation = diff(prevTranslation, translation) //diff object after user input

    const detailedDiffMaterial = detailedDiff(prevMaterial, material)
    const detailedDiffTranslation = detailedDiff(prevTranslation, translation)

    console.log('diffMaterial', diffMaterial)
    console.log('diffTranslation', diffTranslation)
    console.log('detailedDiffMaterial', detailedDiffMaterial)
    console.log('detailedDiffTranslation', detailedDiffTranslation)

    //material has created or changed
    if (Object.entries(diffMaterial).length) {
      const additionalInfo =
        materialAction === 'material added'
          ? createInfo(profile, Date.now())
          : updateInfo(profile, Date.now())

      const uploadMaterialTask = db
        .collection(`material`)
        .doc(materialId)
        .set({ ...material, ...additionalInfo })
        .then()
        .catch(error => console.log('error', error))
      waitPromisesBeforeRedirect.push(uploadMaterialTask)
    }
    //translation is not empty, has created or changed
    if (Object.keys(translation).length && Object.entries(diffTranslation).length) {
      console.log('trrrr')
      const additionalInfo =
        translationAction === 'translation added'
          ? createInfo(profile, Date.now())
          : updateInfo(profile, Date.now())
      const uploadTranslationTask = db
        .collection('materialTr')
        .doc(translationId)
        .set({ ...translation, ...additionalInfo })
        .then()
        .catch(error => console.log('error', error))
      waitPromisesBeforeRedirect.push(uploadTranslationTask)
    }

    Promise.all([waitPromisesBeforeRedirect]).then(values => {
      history.push(`/material/${materialId}/${trLang}`)
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
    </div>
  )
}

const mapStateToProps = state => {
  const pc = state.pageContent
  return {
    //from Material
    materialId: pc.materialId,
    translationId: pc.translationId,
    title: pc.title,
    mediaLink: pc.mediaLink,
    lang: pc.lang,
    unit: pc.unit,
    order: pc.order,
    materialPhrases: pc.materialPhrases,
    duration: pc.duration,
    //from Translation (MaterialTr)
    trTitle: pc.trTitle,
    trLang: pc.trLang,
    for: pc.for,
    translationPhrases: pc.translationPhrases,
    //combined phrases Material+Translation
    phrases: pc.phrases,
    //temporary values
    mediaLinkDownloadUrl: pc.mediaLinkDownloadUrl,
    text: pc.text,
    trText: pc.trText,
    uploadProgress: pc.uploadProgress,
    //auth, profile
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm)
