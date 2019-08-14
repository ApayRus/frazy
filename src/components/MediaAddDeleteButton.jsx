/**
 * uploads media to the server or deletes it
 * displays Upload button , or link + Delete
 */
import React from 'react'
import { Button, TextField, IconButton, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { setPageParameter } from '../store/pageContentActions'
import { Audiotrack as AudioIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import firebase from '../firebase/firebase'

const MediaAddDeleteButton = props => {
  const { mediaLinkDownloadUrl, mediaLink, uploadProgress, setPageParameter } = props

  const handleFileDelete = () => {
    console.log('mediaLink', mediaLink)
    const fileRef = firebase.storage().ref(mediaLink)

    const deleteTask = fileRef.delete()

    deleteTask
      .then(() => {
        // File deleted successfully
        console.log('File deleted successfully')
        setPageParameter(['mediaLinkDownloadUrl', ''])
        setPageParameter(['mediaLink', ''])
        setPageParameter(['uploadProgress', -1])
        setPageParameter(['waveformRenderProgress', -1])
      })
      .catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error)
      })
  }

  const handleFileSelect = event => {
    setPageParameter(['mediaLinkDownloadUrl', ''])
    const [file] = event.target.files
    const fileRef = firebase.storage().ref(`hs/${file.name}`)
    const uploadTask = fileRef.put(file)

    uploadTask.on('state_changed', snapshot => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // console.log('uploadProgress', uploadProgress)
      setPageParameter(['uploadProgress', +uploadProgress.toFixed(0)])
    })

    uploadTask
      .then(snapshot => {
        // console.log('fullPath', snapshot.ref.fullPath)
        setPageParameter(['mediaLink', snapshot.ref.fullPath])
        return snapshot.ref.getDownloadURL()
      })
      .then(downloadURL => {
        // console.log(`Successfully uploaded file and got download link - ${downloadURL}`)
        setPageParameter(['mediaLinkDownloadUrl', downloadURL])
        return downloadURL
      })
      .catch(err => console.error('error uploading file', err))
  }

  /**
   * notExist -> loading -> exist
   */
  const stateOfMedia = (link, progress) => {
    if (progress < 0 && !link) return 'notExists'
    else if (progress >= 0 && !link) return 'loading'
    else if (link) return 'exists'
  }

  const mediaState = stateOfMedia(mediaLinkDownloadUrl, uploadProgress)

  // console.log('mediaState', mediaState)

  const MediaNotExists = () => (
    <div style={{ marginTop: 13, marginRight: 10, position: 'relative' }}>
      <input
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='audio/*'
        id='contained-button-file'
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span'>
          Media <AudioIcon />
          {mediaState === 'loading' ? <CircularProgress size={20} /> : null}
        </Button>
      </label>
    </div>
  )

  const MediaExists = () => (
    <div style={{ marginRight: 10 }}>
      <TextField label='media' disabled defaultValue={mediaLink} color='textSecondary' />
      <IconButton onClick={handleFileDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  )

  const MediaButton = props => {
    switch (props.mediaState) {
      case 'notExists':
        return <MediaNotExists />
      case 'loading':
        return <MediaNotExists />
      case 'exists':
        return <MediaExists />

      default:
        return null
    }
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <MediaButton mediaState={mediaState} />
    </div>
  )
}

const mapStateToProps = state => {
  const { mediaLinkDownloadUrl, uploadProgress, mediaLink } = state.pageContent
  return { mediaLinkDownloadUrl, uploadProgress, mediaLink }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaAddDeleteButton)
