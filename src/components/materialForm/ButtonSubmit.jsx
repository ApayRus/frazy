import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameters } from '../../store/pageContentActions'
import { diff } from 'deep-object-diff'
import { localPhrasesToDBphrases, localPhrasesToDBtranslations } from '../../utils/phrases'
import firebase from '../../firebase/firebase'
import nanoid from 'nanoid'
import { fetchRequest } from '../../utils/fetch'

export default function MaterialForm(props) {
  const { materialId, trLang } = useSelector(state => state.appState)

  const {
    phrases,
    materialAction,
    translationAction,
    title,
    mediaLink,
    youtubeId,
    lang,
    unit,
    order,
    duration,
    trTitle,
    translationId
  } = useSelector(state => state.pageContent)

  const {
    material: initMaterial,
    materialTranslations: { [trLang]: initTranslation }
  } = useSelector(state => state.data)

  const history = useHistory()

  const dispatch = useDispatch()

  // extracting Material model data from redux-store
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

  // extracting MaterialTr model data from redux-store
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
      console.log('from checkMaterialTranslationIds')
      dispatch(setPageParameters({ translationId: nanoid(24) }))
    }
  }

  useEffect(() => {
    //onMount
    checkMaterialTranslationIds()
    /*     setInitMaterial(getSnapshotFromMaterial())
    setInitTranslation(getSnapshotFromTranslation()) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    // MATERIAL data for submit

    const finalMaterial = getSnapshotFromMaterial()
    const finalTranslation = getSnapshotFromTranslation()

    // const diffMaterial = diff(initMaterial, finalMaterial) //diff object after user input
    // const diffTranslation = diff(initTranslation, finalTranslation) //diff object after user input

    const authtoken = await firebase.auth().currentUser.getIdToken(true)

    console.log('initMaterial', initMaterial)
    console.log('finalMaterial', finalMaterial)
    console.log('initTranslation', initTranslation)
    console.log('finalTranslation', finalTranslation)

    const materialToSend = { ...finalMaterial, action: materialAction }

    const translationToSend = { ...finalTranslation, action: translationAction }

    /*     const materialRes = fetchRequest('/api/material', 'PATCH', authtoken, materialToSend)
    const translationRes = fetchRequest('/api/material-tr', 'PATCH', authtoken, translationToSend)

    const response = await Promise.all([materialRes, translationRes])
    console.log('response', response)
    const [materialResponse, translationResponse] = response

    if (materialResponse.success && translationResponse.success) {
      history.push(`/material/${materialId}/${trLang}`)
    } */

    // const eventTask = sendToServer('/api/event', 'PATCH', authtoken, getEvent())

    // history.push(`/material/${materialId}/${trLang}`)
  }

  return (
    <>
      <Button style={{ margin: 10 }} onClick={handleSubmit} variant='contained' color='primary'>
        Save <SaveIcon style={{ marginLeft: 10 }} />
      </Button>
    </>
  )
}
