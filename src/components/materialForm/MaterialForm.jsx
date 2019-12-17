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
import { connect, useDispatch } from 'react-redux'
import { setPageParameter, fillPageContent } from '../../store/pageContentActions'
import wavesurferModule from '../../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialFormInfo'
import MaterialExportTable from './ExportTable'
import { parseFrazyExportTable } from '../../utils/phrases'
import { dbSet, dbUpdate, getNewDocId } from '../../utils/firebase'
import { diff } from 'deep-object-diff'

import { localPhrasesToDBphrases, localPhrasesToDBtranslations } from '../../utils/phrases'

import PhrasesForTextArea from './MaterialFormPhrases'

const MaterialForm = props => {
  const { mediaLink, uploadProgress } = props
  const history = useHistory()
  const [prevMaterial, setPrevMaterial] = useState({})
  const [prevTranslation, setPrevTranslation] = useState({})
  const [materialAction, setMaterialAction] = useState('')
  const dispatch = useDispatch()

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
    //if id of doc (material or translation) exists, then we are updating the doc, elsewhere we are adding the doc
    if (props.materialId) {
      setMaterialAction('material updated')
    } else {
      setMaterialAction('material added')
      //we'll use this id where create translationId (+_trLang) and fileId (the same)
      dispatch(setPageParameter(['materialId', getNewDocId('material')]))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const playPause = () => {
    wavesurferModule.wavesurfer.playPause()
  }

  const readSubtitles = () => {
    const { textareaOriginal } = props
    const { materialId, material, translation } = parseFrazyExportTable(textareaOriginal)
    if (!material.mediaLink) material.mediaLink = mediaLink
    dispatch(fillPageContent({ materialId, material, translation }))
  }

  const clearRegions = () => {
    wavesurferModule.wavesurfer.clearRegions()
  }

  const handleSubmit = () => {
    const waitPromisesBeforeRedirect = []

    // MATERIAL data for submit
    const {
      title,
      mediaLink,
      lang,
      unit,
      order,
      phrases,
      translations: oldTranslations = [],
      duration,
      profile,
      materialId
    } = props

    let actions = [] // materialAction and translationAction both, or one of them.

    const createInfo = (profile, time) => ({
      created: { userId: profile.uid, userName: profile.displayName, time },
      updated: { userId: profile.uid, userName: profile.displayName, time }
    })

    const updateInfo = (profile, time) => ({
      updated: { userId: profile.uid, userName: profile.displayName, time }
    })

    const materialPhrases = localPhrasesToDBphrases(phrases)

    // TRANSLATION data for submit
    const { trLang, trTitle } = props
    let translationContent = {}
    const translationAction = oldTranslations.includes(trLang)
      ? 'translation updated'
      : 'translation added'

    const translationId = `${materialId}_${trLang}`
    if (trLang && trTitle) {
      const translationPhrases = localPhrasesToDBtranslations(phrases, trLang)
      translationContent = {
        title: trTitle,
        lang: trLang,
        for: materialId,
        phrases: translationPhrases
      }
    }

    //new material after user input:
    const materialContent = {
      title,
      mediaLink,
      lang,
      unit,
      order,
      phrases: materialPhrases
    }

    const newTranslations = oldTranslations.includes(trLang)
      ? oldTranslations
      : oldTranslations.concat(trLang)

    const diffMaterial = diff(prevMaterial, materialContent) //diff object after user input
    const diffTranslation = diff(prevTranslation, translationContent) //diff object after user input

    // console.log('diffMaterial', diffMaterial)
    // console.log('diffTranslation', diffTranslation)
    // console.log('detailedDiffMaterial', detailedDiffMaterial)
    // console.log('detailedDiffTranslation', detailedDiffTranslation)

    //material has created or changed
    if (Object.entries(diffMaterial).length) {
      actions.push(materialAction)
      const materialCreateUpdateInfo =
        materialAction === 'material added'
          ? createInfo(profile, Date.now())
          : updateInfo(profile, Date.now())

      const materialMeta = {
        ...materialCreateUpdateInfo,
        duration,
        translations: newTranslations
      }

      const uploadMaterialTask = dbSet('material', materialId, {
        ...materialContent,
        meta: materialMeta
      })

      waitPromisesBeforeRedirect.push(uploadMaterialTask)
    }

    //translation is not empty, has created or changed
    if (Object.keys(translationContent).length && Object.entries(diffTranslation).length) {
      actions.push(translationAction)
      const translationCreateUpdateInfo =
        translationAction === 'translation added'
          ? createInfo(profile, Date.now())
          : updateInfo(profile, Date.now())

      const translationMeta = { ...translationCreateUpdateInfo }

      const uploadTranslationTask = dbSet('materialTr', translationId, {
        ...translationContent,
        meta: translationMeta
      })

      //if translation added we need update material too
      const uploadMaterialTask =
        translationAction === 'translation added'
          ? dbSet('material', materialId, {
              meta: { translations: newTranslations }
            })
          : null

      waitPromisesBeforeRedirect.push(uploadTranslationTask, uploadMaterialTask)
    }

    Promise.all([waitPromisesBeforeRedirect]).then(values => {
      const event = {
        title,
        lang,
        translations: newTranslations,
        trTitle,
        trLang,
        actions,
        time: Date.now()
      }

      dbUpdate('lastEvents', 'main', { [materialId]: event })
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
      {mediaLink ? (
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 2 }}>
          <Waveform />
          <Button onClick={playPause}>Play/Pause </Button>
        </div>
      ) : null}
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

const mapStateToProps = state => {
  const pc = state.pageContent
  return {
    //from Material
    materialId: pc.materialId,
    title: pc.title,
    mediaLink: pc.mediaLink,
    lang: pc.lang,
    unit: pc.unit,
    order: pc.order,
    materialPhrases: pc.materialPhrases,
    duration: pc.duration,
    translations: pc.translations,
    //from Translation (MaterialTr)
    trTitle: pc.trTitle,
    trLang: pc.trLang,
    for: pc.for,
    translationPhrases: pc.translationPhrases,
    translationRevisions: pc.translationRevisions,
    //combined phrases Material+Translation
    phrases: pc.phrases,
    //temporary values
    uploadProgress: pc.uploadProgress,
    textareaOriginal: pc.textareaOriginal,
    //auth, profile
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(MaterialForm)
