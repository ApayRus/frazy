import React, { useRef } from 'react'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import Waveform from './Waveform'
import Button from '@material-ui/core/Button'
//REDUX
import { connect } from 'react-redux'

//TEMPORARY
import {
  setUnitContent,
  setUnitTranslation,
  setPhrasesArray,
  setMediaLink
} from '../store/pageContentActions'

// import { regions } from '../dumyData/regions'
import { joinPhrasesAndTranslations } from '../utils/joinPhrasesAndTranslations'

import { units } from '../dumyData/units'
import { translations } from '../dumyData/translations'

function UnitPage(props) {
  const waveformComponent = useRef(null)
  const {
    unit,
    unitTranslations,
    phrasesArray,
    setUnitContent,
    setUnitTranslation,
    setPhrasesArray,
    setMediaLink
  } = props

  const setDataToRedux = () => {
    setUnitContent(units['hobbit1_1_en'])
    setUnitTranslation(translations['hobbit1_1_ru'])
    const mediaLink = units['hobbit1_1_en']['mediaLink']
    setMediaLink(mediaLink)
  }

  const setPhrasesArrayToRedux = () => {
    const phrasesArray = joinPhrasesAndTranslations(unit, unitTranslations['ru'])
    setPhrasesArray(phrasesArray)
  }

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
      {phrasesArray.length ? (
        <div>
          <Waveform ref={waveformComponent} />
          <PlayerControls play={play} pause={pause} playPhrase={playPhrase} />
          <Phrases playPhrase={playPhrase} />
        </div>
      ) : (
        <div style={{ marginTop: 200 }}>
          <Button onClick={setDataToRedux}>1. Set Data to Redux</Button>
          <br />
          <Button onClick={setPhrasesArrayToRedux}>2. Set phrasesArray to Redux</Button>
        </div>
      )}
    </div>
  )
}

//export default UnitPage

const mapStateToProps = state => {
  return {
    unit: state.pageContent.unit,
    unitTranslations: state.pageContent.unitTranslations,
    phrasesArray: state.pageContent.phrasesArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUnitContent: payload => dispatch(setUnitContent(payload)),
    setUnitTranslation: payload => dispatch(setUnitTranslation(payload)),
    setPhrasesArray: payload => dispatch(setPhrasesArray(payload)),
    setMediaLink: payload => dispatch(setMediaLink(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitPage)
