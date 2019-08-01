import React, { Component } from 'react'
// WAVESURFER
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
//REDUX
import { connect } from 'react-redux'
import { setPlayerState } from '../store/playerStateActions'
import './Wavesurfer.css'

import { CircularProgress } from '@material-ui/core'

import wavesurferModule from './wavesurfer'

export class Waveform extends Component {
  constructor(props) {
    super(props)
    this.waveformElem = null
    this.timelineElem = null
    this.state = { isReady: false }
  }

  componentDidMount() {
    const { phrasesArray: phrasesArray0, mediaLink, setPlayerState, readOnly } = this.props

    const readModeRegionOptions = { drag: false, resize: false } // should be added to each region
    let phrasesArray = phrasesArray0
    let dragSelection = true

    if (readOnly) {
      phrasesArray = phrasesArray0.map(elem => ({ ...elem, ...readModeRegionOptions }))
      dragSelection = false
    }

    wavesurferModule.wavesurfer = WaveSurfer.create({
      container: this.waveformElem,
      scrollParent: true,
      //   minPxPerSec: 200,
      plugins: [
        RegionsPlugin.create({
          regions: phrasesArray,
          dragSelection
        }),
        TimelinePlugin.create({
          container: this.timelineElem
        })
      ]
    })

    if (mediaLink) wavesurferModule.wavesurfer.load(mediaLink)

    wavesurferModule.wavesurfer.on('ready', e => {
      this.setState({ isReady: true })
    })

    wavesurferModule.wavesurfer.on('region-click', (region, e) => {
      e.stopPropagation()
      // this.playRegion(region);
      region.play()
    })

    wavesurferModule.wavesurfer.on('region-in', region => {
      const { id } = region
      setPlayerState(['currentPhraseId', id])
      //console.log('region in', region.id)
    })
    wavesurferModule.wavesurfer.on('region-out', region => {
      //console.log('region out', region.id)
      //this.props.setPlayerState(['currentPhraseNum', 10])
    })
    wavesurferModule.wavesurfer.on('play', () => {
      setPlayerState(['play', true])
    })
    wavesurferModule.wavesurfer.on('pause', () => {
      setPlayerState(['play', false])
    })
    /* 
    wavesurfer.on('audioprocess', () => {
      console.log('on play', wavesurfer.getCurrentTime())
    })
     */
  }

  componentWillUnmount() {
    wavesurferModule.wavesurfer.destroy()
  }

  render() {
    const { isReady } = this.state
    return (
      <div style={{ border: '1px solid gold', marginTop: 75 }}>
        {isReady ? '' : <CircularProgress />}
        <div ref={el => (this.waveformElem = el)} />
        <div ref={el => (this.timelineElem = el)} />
      </div>
    )
  }
}

/* 
const mapStateToProps = state => {
  return {
    currentPhraseNum: state.playerState.currentPhraseNum,
    currentTime: state.playerState.currentTime
  }
}
 */

const mapDispatchToProps = dispatch => {
  return {
    setPlayerState: payload => dispatch(setPlayerState(payload))
  }
}

export default connect(
  /* mapStateToProps */
  null,
  mapDispatchToProps
)(Waveform)
