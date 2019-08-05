import React, { Component } from 'react'
import './Wavesurfer.css'
import { CircularProgress } from '@material-ui/core'
import wavesurferModule from '../wavesurfer/wavesurfer'

export class Waveform extends Component {
  constructor(props) {
    super(props)
    this.waveformElem = null
    this.timelineElem = null
    this.state = { isReady: false }
  }

  componentDidMount() {
    const { phrasesArray, mediaLink, readOnly } = this.props

    wavesurferModule.wavesurfer = wavesurferModule.init(
      this.waveformElem,
      this.timelineElem,
      mediaLink,
      phrasesArray,
      readOnly
    )

    wavesurferModule.wavesurfer.on('ready', e => {
      this.setState({ isReady: true })
    })
  }

  componentWillUnmount() {
    wavesurferModule.wavesurfer.destroy()
  }

  render() {
    const { isReady } = this.state
    return (
      <div className='waveform'>
        {isReady ? '' : <CircularProgress />}
        <div style={isReady ? {} : { visibility: 'hidden' }}>
          <div ref={el => (this.waveformElem = el)} />
          <div ref={el => (this.timelineElem = el)} />
        </div>
      </div>
    )
  }
}

export default Waveform
