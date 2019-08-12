import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import Waveform from './Waveform'
import { connect } from 'react-redux'
import { setPageParameter } from '../store/pageContentActions'
import wavesurferModule from '../wavesurfer/wavesurfer'
import MaterialInfo from './MaterialInfo'

import PhrasesForTextArea from './MaterialPhrases'

const Uploader = props => {
  const { mediaLinkDownloadUrl, uploadProgress } = props

  const playPause = () => {
    wavesurferModule.wavesurfer.playPause()
  }

  return (
    <div style={{ textAlign: 'left', padding: 10 }}>
      <MaterialInfo />
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <div>
          <Typography variant='body2' color='textSecondary'>
            File uploading ...
          </Typography>
          <CircularProgress value={uploadProgress} variant='static' />
        </div>
      ) : null}
      {mediaLinkDownloadUrl ? (
        <div>
          <Waveform />
          <Button onClick={playPause}>Play/Pause </Button>
        </div>
      ) : null}
      <div>
        <PhrasesForTextArea />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { mediaLinkDownloadUrl, uploadProgress } = state.pageContent
  return { mediaLinkDownloadUrl, uploadProgress }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)
