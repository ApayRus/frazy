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

import PhrasesForTextArea from './MaterialPhrases'

const MaterialForm = props => {
  const { mediaLinkDownloadUrl, uploadProgress, redirectTo, setPageParameter } = props

  setPageParameter(['redirectTo', ''])

  const playPause = () => {
    wavesurferModule.wavesurfer.playPause()
  }

  const wavesurferRegionsToFirestorePhrases = regions => {
    // console.log('regions', wavesurferModule.wavesurfer.regions.list)
    // console.log('wavesurfer', wavesurferModule.wavesurfer)
    const phrasesRaw = regions
    const phrases = {}

    for (let id in phrasesRaw) {
      let {
        start,
        end,
        attributes: { label: text }
      } = phrasesRaw[id]

      id = id.replace('wavesurfer_', '')
      start = +start.toFixed(2)
      end = +end.toFixed(2)
      text = text || ''

      phrases[id] = { start, end, text }
    }

    return phrases
  }

  const handleSave = () => {
    //data for submit
    const materialPhrases = wavesurferRegionsToFirestorePhrases(
      wavesurferModule.wavesurfer.regions.list
    )
    const { title, mediaLink, lang, unit, order } = props
    const materialInfo = { title, mediaLink, lang, unit, order }

    const db = firebase.firestore()

    // refs to 2 documents in 2 collections:
    const materialInfoDocRef = db.collection(`materialInfo`).doc()
    const materialId = materialInfoDocRef.id
    console.log('materialId', materialId)
    const materialPhrasesDocRef = db.doc(`materialPhrases/${materialId}`)

    //upload promices
    const uploadMaterialInfoTask = materialInfoDocRef.set(materialInfo)
    const uploadMaterialPhrasesTask = materialPhrasesDocRef.set(materialPhrases)

    // responses after upload
    uploadMaterialInfoTask
      .then(snapshot => console.log('materialInfo uploaded'))
      .catch(error => console.log('error', error))

    uploadMaterialPhrasesTask
      .then(snapshot => console.log('materialPhrases uploaded'))
      .catch(error => console.log('error', error))

    Promise.all([uploadMaterialInfoTask, uploadMaterialPhrasesTask]).then(values =>
      setPageParameter(['redirectTo', materialId])
    )
  }

  return (
    <div style={{ textAlign: 'left', padding: 10, paddingBottom: 50 }}>
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
        <Button style={{ margin: 10 }} onClick={handleSave} variant='outlined'>
          Save <SaveIcon style={{ marginLeft: 10 }} />
        </Button>
      </div>
      {redirectTo ? <Redirect to={`/material/${redirectTo}`} /> : null}
    </div>
  )
}

const mapStateToProps = state => {
  const {
    mediaLinkDownloadUrl,
    uploadProgress,
    title,
    mediaLink,
    lang,
    unit,
    order,
    redirectTo
  } = state.pageContent
  return { mediaLinkDownloadUrl, uploadProgress, title, mediaLink, lang, unit, order, redirectTo }
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
