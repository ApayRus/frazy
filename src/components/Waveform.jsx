import React, { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'

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

export default Waveform
