import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import './Wavesurfer.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import wavesurferModule from '../wavesurfer/wavesurfer'
import { afterFirebaseFileDownloadUrlReady } from '../utils/firebase'

function Waveform(props) {
  let waveformElem = useRef(),
    timelineElem = useRef()
  const [isReady, setIsReady] = useState(false)
  const { phrases, mediaLink, readOnly, waveformRenderProgress } = props

  useEffect(() => {
    //component will mount
    setIsReady(false)
    if (mediaLink.match('http')) {
      wavesurferModule.wavesurfer = wavesurferModule.init(
        waveformElem.current,
        timelineElem.current,
        mediaLink,
        phrases,
        readOnly
      )
      wavesurferModule.wavesurfer.on('ready', e => {
        setIsReady(true)
      })
    } else {
      afterFirebaseFileDownloadUrlReady(mediaLink, url => {
        wavesurferModule.wavesurfer = wavesurferModule.init(
          waveformElem.current,
          timelineElem.current,
          url,
          phrases,
          readOnly
        )
        wavesurferModule.wavesurfer.on('ready', e => {
          setIsReady(true)
        })
      })
    }

    return () => {
      //component will UNmount
      if (mediaLink) {
        wavesurferModule.wavesurfer.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLink])

  return (
    <div className='waveform'>
      {!isReady && (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='body2' color='textSecondary'>
            Waveform rendering...
          </Typography>
          <CircularProgress value={waveformRenderProgress} variant='static' color='secondary' />
        </div>
      )}
      <div style={isReady ? {} : { visibility: 'hidden' }}>
        <div ref={waveformElem} />
        <div ref={timelineElem} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { mediaLink, phrases, waveformRenderProgress } = state.pageContent
  return { mediaLink, phrases, waveformRenderProgress }
}

export default connect(mapStateToProps)(Waveform)
