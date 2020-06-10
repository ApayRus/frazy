import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAppStateParams } from '../../store/appStateActions'
import AboveWaveformView from './partials/AboveWaveformView'

export default function MaterialPage() {
  const { editMode } = useSelector(state => state.appState)

  /*   const AboveWaveform = !editMode ? (

  ):(

  ) */

  return (
    <div>
      <AboveWaveformView />{' '}
    </div>
  )
}
