import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import Waveform from './Waveform'
import { connect } from 'react-redux'
import { setPageParameter } from '../store/pageContentActions'
import firebase from '../firebase/firebase'

const Uploader = props => {
  const { mediaLink, uploadProgress, setPageParameter } = props
  const fileSelect = event => {
    setPageParameter(['mediaLink', ''])
    const { storage } = firebase
    const [file] = event.target.files
    const fileRef = storage().ref(`hs/${file.name}`)
    const uploadTask = fileRef.put(file)

    uploadTask.on('state_changed', snapshot => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setPageParameter(['uploadProgress', +uploadProgress.toFixed(0)])
    })

    uploadTask
      .then(snapshot => {
        return snapshot.ref.getDownloadURL()
      })
      .then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`)
        setPageParameter(['mediaLink', downloadURL])
        return downloadURL
      })
      .catch(err => console.error('error uploading file', err))
    // console.log('event', event.target.files)
  }

  return (
    <div>
      <br />
      <br />
      <input
        style={{ display: 'none' }}
        onChange={fileSelect}
        accept='audio/*'
        id='contained-button-file'
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span'>
          Upload
        </Button>
      </label>
      <br />
      <br />
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <div>
          <Typography variant='body2' color='textSecondary'>
            File uploading ...
          </Typography>
          <CircularProgress value={uploadProgress} variant='static' />
        </div>
      ) : null}
      {mediaLink ? <Waveform /> : null}
    </div>
  )
}

const mapStateToProps = state => {
  const { mediaLink, uploadProgress } = state.pageContent
  return { mediaLink, uploadProgress }
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
