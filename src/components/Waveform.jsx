import React, { Component } from 'react'
// WAVESURFER
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
//REDUX
import { connect } from 'react-redux'
import { setPlayerState } from '../store/playerStateActions'
//MY
import { regions } from '../dumyData/regions'
// const mediaLink = `https://booktits.firebaseapp.com/hobbit/audio/hobbit1_1.mp3`
const mediaLink = `../audio/hobbit1_1.mp3`

export class Waveform extends Component {
  constructor(props) {
    super(props)
    this.waveformElem = null
    this.timelineElem = null

    this.wavesurfer = null
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      container: this.waveformElem,
      scrollParent: true,
      //   minPxPerSec: 200,
      plugins: [
        RegionsPlugin.create({
          regions,
          dragSelection: true
        }),
        TimelinePlugin.create({
          container: this.timelineElem
        })
      ]
    })

    this.wavesurfer.load(mediaLink)

    this.wavesurfer.on('region-click', (region, e) => {
      e.stopPropagation()
      // this.playRegion(region);
      region.play()
    })
    this.wavesurfer.on('region-in', region => {
      this.props.setPlayerState(['currentPhraseId', region.id])
      //console.log('region in', region.id)
    })
    this.wavesurfer.on('region-out', region => {
      //console.log('region out', region.id)
      //this.props.setPlayerState(['currentPhraseNum', 10])
    })
    this.wavesurfer.on('play', () => {
      this.props.setPlayerState(['play', true])
    })
    this.wavesurfer.on('pause', () => {
      this.props.setPlayerState(['play', false])
    })
    /* 
    this.wavesurfer.on('audioprocess', () => {
      console.log('on play', this.wavesurfer.getCurrentTime())
    })
     */
  }

  render() {
    return (
      <div style={{ border: '1px solid gold', marginTop: 75 }}>
        <div ref={el => (this.waveformElem = el)} />
        <div ref={el => (this.timelineElem = el)} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPhraseNum: state.playerState.currentPhraseNum,
    currentTime: state.playerState.currentTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPlayerState: payload => dispatch(setPlayerState(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Waveform)
