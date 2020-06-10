import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAppStateParams } from '../../store/appStateActions'
import { setPageParameters, fillPageContent } from '../../store/pageContentActions'
import AboveWaveformView from './partials/AboveWaveformView'
import BelowWaveformView from './partials/BelowWaveformView'
import Waveform from '../Waveform'
import { getDownloadUrlById } from '../../utils/firebase'
import DrawerSettings from '../layout/DrawerSettings'

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
    if (isLoadedMaterial & isLoadedMaterialTr) {
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

  /*   const AboveWaveform = !editMode ? (

  ):(

  ) */

  return (
    <div style={{ textAlign: 'center' }}>
      <AboveWaveformView />
      <Waveform />
      <BelowWaveformView />

      <DrawerSettings />
    </div>
  )
}
