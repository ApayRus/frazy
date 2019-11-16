import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './Wavesurfer.css'
import { CircularProgress, Typography } from '@material-ui/core'
import wavesurferModule from '../wavesurfer/wavesurfer'

function Waveform(props) {
  let waveformElem,
    timelineElem = null
  const [isReady, setIsReady] = useState(false)
  const { phrases, mediaLinkDownloadUrl, readOnly, waveformRenderProgress } = props

  useEffect(() => {
    //component will mount
    setIsReady(false)
    if (mediaLinkDownloadUrl) {
      wavesurferModule.wavesurfer = wavesurferModule.init(
        waveformElem,
        timelineElem,
        mediaLinkDownloadUrl,
        phrases,
        readOnly
      )

      wavesurferModule.wavesurfer.on('ready', e => {
        setIsReady(true)
      })
    }

    return () => {
      //component will UNmount
      if (mediaLinkDownloadUrl) {
        wavesurferModule.wavesurfer.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLinkDownloadUrl])

  return (
    <div className='waveform'>
      {isReady ? (
        ''
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='body2' color='textSecondary'>
            Waveform rendering...
          </Typography>
          <CircularProgress value={waveformRenderProgress} variant='static' color='secondary' />
        </div>
      )}
      <div style={isReady ? {} : { visibility: 'hidden' }}>
        <div ref={el => (waveformElem = el)} />
        <div ref={el => (timelineElem = el)} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { mediaLinkDownloadUrl, phrases, waveformRenderProgress } = state.pageContent
  return { mediaLinkDownloadUrl, phrases, waveformRenderProgress }
}

export default connect(mapStateToProps)(Waveform)
