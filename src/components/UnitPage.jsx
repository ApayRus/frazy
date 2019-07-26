import React, { useRef } from 'react'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import Waveform from './Waveform'
import { regions } from '../dumyData/regions'

function UnitPage() {
  const waveformComponent = useRef(null)

  const play = () => {
    waveformComponent.current.wavesurfer.play()
  }
  const pause = () => {
    waveformComponent.current.wavesurfer.pause()
  }

  const playPhrase = id => event => {
    waveformComponent.current.wavesurfer.regions.list[id].play()
  }

  return (
    <div>
      <Waveform ref={waveformComponent} />
      <PlayerControls play={play} pause={pause} playPhrase={playPhrase} />
      <Phrases phrases={regions} playPhrase={playPhrase} />
    </div>
  )
}

export default UnitPage
