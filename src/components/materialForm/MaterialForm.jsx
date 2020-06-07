/**
 * In this  component joins together and happens many things
 * There is editing of two models: Material and Translation.
 * Maybe it is their creation, or update, both of them or only one of them.
 * Before editing we do snapshop of material and translation, and then using diff(obj1, obj2)
 * we decide what has happend and run related promises.
 * After promises fullfilled we writes Event about what happend, and redirect to material view page.
 * Also, if has created translation, we writes to material Doc new avaliableTranslation language.
 * If we not changed material, but only translation,
 * we should update 'translations' in material, but event won't include that record,
 * and we see on main page as if material not changed, only added translation.
 */

import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import { useHistory } from 'react-router-dom'
import Waveform from '../Waveform'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameters, fillPageContent } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialFormInfo'
import MaterialExportTable from './ExportTable'
import { parseImportedSubs } from '../../utils/phrases'
import { diff } from 'deep-object-diff'
import ControlsPanel from './ControlsPanel'
import { localPhrasesToDBphrases, localPhrasesToDBtranslations } from '../../utils/phrases'
import PhrasesForTextArea from './MaterialFormPhrases'
import YoutubePlayer from '../YoutubePlayer'
import firebase from '../../firebase/firebase'
import nanoid from 'nanoid'
import { fetchRequest } from '../../utils/fetch'

export default function MaterialForm(props) {
  const {
    //from Material
    materialId,
    title,
    mediaLink,
    youtubeId,
    lang,
    unit,
    order,
    duration,
    translations,
    materialCreated,
    //from Translation (MaterialTr)
    translationId,
    trTitle,
    trLang,
    for: forMaterial,
    translationRevisions,
    translationCreated,
    //combined phrases Material+Translation
    phrases,
    //temporary values
    uploadProgress,
    textareaOriginal,
    materialAction,
    translationAction
  } = useSelector(state => state.pageContent)

  const history = useHistory()
  const [initMaterial, setInitMaterial] = useState({})
  const [initTranslation, setInitTranslation] = useState({})
  const dispatch = useDispatch()
  const { sticked: playerSticked } = useSelector(state => state.playerSettings)

  // get actual data from redux, related to data-model
  // we'll make spapshots twice -
  // 1) on mount component 2) on submit
  // and will compare them
  // with inputed by user new data and detect what has changed
  const getSnapshotFromMaterial = () => {
    return {
      _id: materialId,
      title,
      mediaLink,
      youtubeId,
      lang,
      unit,
      order,
      phrases: localPhrasesToDBphrases(phrases),
      duration
    }
  }
  const getSnapshotFromTranslation = () => {
    return {
      _id: translationId,
      title: trTitle,
      lang: trLang,
      for: materialId,
      phrases: localPhrasesToDBtranslations(phrases, trLang)
    }
  }
  const checkMaterialTranslationIds = () => {
    // if id of doc (material or translation) exists, then we are updating the doc, elsewhere we are adding the doc
    // add or update is needed for Event
    if (materialId) {
      dispatch(setPageParameters({ materialAction: 'update' }))
    } else {
      //we'll use this id where create translationId (+_trLang) and fileId (the same)
      dispatch(setPageParameters({ materialId: nanoid(24) }))
    }
    if (translationId) {
      dispatch(setPageParameters({ translationAction: 'update' }))
    } else {
      dispatch(setPageParameters({ translationId: nanoid(24) }))
    }
  }

  useEffect(() => {
    //onMount
    checkMaterialTranslationIds()
    setInitMaterial(getSnapshotFromMaterial())
    setInitTranslation(getSnapshotFromTranslation())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const readSubtitles = () => {
    const { textareaOriginal, materialId: materialIdCurrent } = props
    const { materialId = materialIdCurrent, material, translation } = parseImportedSubs(
      textareaOriginal
    )
    if (!material.mediaLink) material.mediaLink = mediaLink
    dispatch(fillPageContent({ materialId, material, translation }))
  }

  const clearRegions = () => {
    wavesurferModule.wavesurfer.clearRegions()
  }

  const handleSubmit = async () => {
    // MATERIAL data for submit

    let actions = [] // materialAction and translationAction both, or one of them.

    // answers what finally has happend after user input
    const getEvent = () => {
      return {
        _id: nanoid(24),
        title,
        lang,
        materialId,
        translationId,
        trTitle,
        trLang,
        actions: ['added material', 'added translation'],
        time: Date.now(),
        action: 'create'
      }
    }

    const finalMaterial = getSnapshotFromMaterial()
    const finalTranslation = getSnapshotFromTranslation()

    const diffMaterial = diff(initMaterial, finalMaterial) //diff object after user input
    const diffTranslation = diff(initTranslation, finalTranslation) //diff object after user input

    const authtoken = await firebase.auth().currentUser.getIdToken(true)

    console.log('initMaterial', initMaterial)
    console.log('finalMaterial', finalMaterial)
    console.log('initTranslation', initTranslation)
    console.log('finalTranslation', finalTranslation)

    const materialToSend = { ...finalMaterial, action: materialAction }

    const translationToSend = { ...finalTranslation, action: translationAction }

    const materialRes = fetchRequest('/api/material', 'PATCH', authtoken, materialToSend)
    const translationRes = fetchRequest('/api/material-tr', 'PATCH', authtoken, translationToSend)

    const response = await Promise.all([materialRes, translationRes])
    console.log('response', response)
    const [materialResponse, translationResponse] = response
    if (materialResponse.success && translationResponse.success) {
      history.push(`/material/${materialId}/${trLang}`)
    }

    // const eventTask = sendToServer('/api/event', 'PATCH', authtoken, getEvent())

    // history.push(`/material/${materialId}/${trLang}`)
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
      <div
        style={{
          position: playerSticked ? 'sticky' : 'unset',
          top: 0,
          backgroundColor: 'white',
          zIndex: 2
        }}
      >
        {youtubeId && (
          <div>
            <YoutubePlayer videoId={youtubeId} />
          </div>
        )}
        {mediaLink && (
          <div>
            <Waveform />
            <ControlsPanel editMode />
          </div>
        )}
      </div>
      <div>
        <PhrasesForTextArea />
      </div>
      <div>
        <MaterialExportTable />
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
