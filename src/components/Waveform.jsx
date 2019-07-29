import React, { Component } from 'react'
// WAVESURFER
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
//REDUX
import { connect } from 'react-redux'
import { setPlayerState } from '../store/playerStateActions'
import './Wavesurfer.css'

import findIndex from 'lodash/findIndex'
import { CircularProgress } from '@material-ui/core'

export class Waveform extends Component {
  constructor(props) {
    super(props)
    this.waveformElem = null
    this.timelineElem = null
    this.wavesurfer = null
    this.state = { isReady: false }
  }

  componentDidMount() {
    const { phrasesArray, mediaLink, setPlayerState } = this.props

    this.wavesurfer = WaveSurfer.create({
      container: this.waveformElem,
      scrollParent: true,
      //   minPxPerSec: 200,
      plugins: [
        RegionsPlugin.create({
          regions: phrasesArray,
          dragSelection: true
        }),
        TimelinePlugin.create({
          container: this.timelineElem
        })
      ]
    })

    if (mediaLink) this.wavesurfer.load(mediaLink)

    this.wavesurfer.on('ready', e => {
      this.setState({ isReady: true })
    })

    this.wavesurfer.on('region-click', (region, e) => {
      e.stopPropagation()
      // this.playRegion(region);
      region.play()
    })

    this.wavesurfer.on('region-in', region => {
      const { id } = region
      const num = findIndex(phrasesArray, { id }) + 1
      setPlayerState(['currentPhraseId', id])
      setPlayerState(['currentPhraseNum', num])
      //console.log('region in', region.id)
    })
    this.wavesurfer.on('region-out', region => {
      //console.log('region out', region.id)
      //this.props.setPlayerState(['currentPhraseNum', 10])
    })
    this.wavesurfer.on('play', () => {
      setPlayerState(['play', true])
    })
    this.wavesurfer.on('pause', () => {
      setPlayerState(['play', false])
    })
    /* 
    this.wavesurfer.on('audioprocess', () => {
      console.log('on play', this.wavesurfer.getCurrentTime())
    })
     */
  }

  componentWillUnmount() {
    this.wavesurfer.destroy()
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
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Waveform)
