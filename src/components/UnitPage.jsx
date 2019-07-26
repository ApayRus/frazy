import React, { useRef } from 'react'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import Waveform from './Waveform'
//REDUX
import { connect } from 'react-redux'
import { setUnitContent, setUnitTranslation } from '../store/pageContentActions'

import { regions } from '../dumyData/regions'

import { units } from '../dumyData/units'
import { translations } from '../dumyData/translations'

function UnitPage(props) {
  const waveformComponent = useRef(null)
  const { unit, unitTranslations } = props

  setUnitContent(units['hobbit1_1_en'])
  setUnitTranslation(translations['hobbit1_1_ru'])

  console.log('unit', unit)
  console.log('unitTranslations', unitTranslations)

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

//export default UnitPage

const mapStateToProps = state => {
  return {
    unit: state.pageContent.unit,
    unitTranslations: state.pageContent.unitTranslations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUnitContent: payload => dispatch(setUnitContent(payload)),
    setUnitTranslation: payload => dispatch(setUnitTranslation(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitPage)
