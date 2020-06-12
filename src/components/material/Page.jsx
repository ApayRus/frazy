/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPageParameters, fillPageContent } from '../../store/pageContentActions'
import AboveWaveformView from './layers/AboveWaveformView'
import AboveWaveformEdit from './layers/AboveWaveformEdit'
import BelowWaveformView from './layers/BelowWaveformView'
import BelowWaveformEdit from './layers/BelowWaveformEdit'
import Waveform from '../Waveform'
import { getDownloadUrlById } from '../../utils/firebase'
import DrawerSettings from '../layout/DrawerSettings'
import MaterialBar from '../materialView/MaterialBar'

export default function MaterialPage() {
  const { editMode, trLang, materialId } = useSelector(state => state.appState)
  const {
    material: { mediaLink },
    material,
    materialTranslations: { [trLang]: translation },
    isLoadedMaterial,
    isLoadedMaterialTr
  } = useSelector(state => state.data)

  const dispatch = useDispatch()

  // MEDIA LINK URL
  useEffect(() => {
    const getAsyncMediaUrl = async () => {
      if (!mediaLink.match('http')) {
        const [mediaLinkUrl] = await getDownloadUrlById([mediaLink])
        dispatch(setPageParameters({ mediaLinkUrl }))
      } else {
        dispatch(setPageParameters({ mediaLinkUrl: mediaLink }))
      }
    }
    if (mediaLink) {
      getAsyncMediaUrl()
    }
  }, [mediaLink])

  // PHRASES
  useEffect(() => {
    if (isLoadedMaterial && isLoadedMaterialTr) {
      dispatch(
        fillPageContent({
          materialId,
          material,
          translation,
          mode: 'forView'
        })
      )
    }
  }, [isLoadedMaterial, isLoadedMaterialTr, material, translation])

  const AboveWaveform = () => (!editMode ? <AboveWaveformView /> : <AboveWaveformEdit />)
  const BelowWaveform = () => (!editMode ? <BelowWaveformView /> : <BelowWaveformEdit />)

  return (
    <div style={{ textAlign: 'center' }}>
      <AboveWaveform />
      <Waveform />
      <BelowWaveform />

      <DrawerSettings />
      <MaterialBar />
    </div>
  )
}
