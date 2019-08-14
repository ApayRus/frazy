import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Wavesurfer.css'
import { CircularProgress, Typography } from '@material-ui/core'
import wavesurferModule from '../wavesurfer/wavesurfer'

export class Waveform extends Component {
  constructor(props) {
    super(props)
    this.waveformElem = null
    this.timelineElem = null
    this.state = { isReady: false }
  }

  componentDidMount() {
    const { phrases, mediaLinkDownloadUrl, readOnly } = this.props

    // console.log('mediaLinkDownloadUrl3', mediaLinkDownloadUrl)

    wavesurferModule.wavesurfer = wavesurferModule.init(
      this.waveformElem,
      this.timelineElem,
      mediaLinkDownloadUrl,
      phrases,
      readOnly
    )

    wavesurferModule.wavesurfer.on('ready', e => {
      this.setState({ isReady: true })
    })
  }

  componentWillUnmount() {
    wavesurferModule.wavesurfer.destroy()
    // console.log('Waveform unmounted')
  }

  render() {
    const { isReady } = this.state
    const { waveformRenderProgress } = this.props
    return (
      <div className='waveform'>
        {isReady ? (
          ''
        ) : (
          <div style={{textAlign:"center"}}>
            <Typography variant='body2' color='textSecondary'>
              Waveform rendering...
            </Typography>
            <CircularProgress value={waveformRenderProgress} variant='static' color='secondary' />
          </div>
        )}
        <div style={isReady ? {} : { visibility: 'hidden' }}>
          <div ref={el => (this.waveformElem = el)} />
          <div ref={el => (this.timelineElem = el)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { mediaLinkDownloadUrl, phrases, waveformRenderProgress } = state.pageContent
  return { mediaLinkDownloadUrl, phrases, waveformRenderProgress }
}

export default connect(mapStateToProps)(Waveform)
