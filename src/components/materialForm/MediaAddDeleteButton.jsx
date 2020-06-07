/**
 * uploads media to the server or deletes it
 * displays Upload button , or link + Delete
 */
import React from 'react'
import { Button, TextField, IconButton, CircularProgress, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setPageParameters } from '../../store/pageContentActions'
import { Audiotrack as AudioIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import firebase from '../../firebase/firebase'

const MediaAddDeleteButton = props => {
  const { mediaLink, uploadProgress, materialId } = useSelector(state => state.pageContent)
  const { profile } = useSelector(state => state.firebase)
  const dispatch = useDispatch()
  const handleFileDelete = () => {
    // console.log('mediaLink', mediaLink)
    const resetMediaSettings = () => {
      dispatch(
        setPageParameters({
          mediaLink: '',
          uploadProgress: -1,
          waveformRenderProgress: -1
        })
      )
    }

    //file on our hosting, not external link
    if (!mediaLink.match('http')) {
      const fileRef = firebase.storage().ref(mediaLink)

      const deleteTask = fileRef.delete()

      deleteTask
        .then(() => {
          // File deleted successfully
          console.log('File deleted successfully')
          resetMediaSettings()
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error)
        })
    } else {
      //file is external link
      resetMediaSettings()
    }
  }

  const handleExternalMedialink = event => {
    const link = event.target.value
    dispatch(setPageParameters({ mediaLink: link }))
  }

  const handleFileSelect = event => {
    const [file] = event.target.files
    const fileRef = firebase.storage().ref(materialId)
    const metadata = {
      customMetadata: {
        owner: profile.uid
      }
    }
    const uploadTask = fileRef.put(file, metadata)

    uploadTask.on('state_changed', snapshot => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // console.log('uploadProgress', uploadProgress)
      dispatch(setPageParameters({ uploadProgress: +uploadProgress.toFixed(0) }))
    })

    uploadTask
      .then(snapshot => {
        // console.log('fullPath', snapshot.ref.fullPath)
        dispatch(setPageParameters({ mediaLink: snapshot.ref.fullPath }))
        return snapshot.ref.getDownloadURL()
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

  const mediaState = stateOfMedia(mediaLink, uploadProgress)

  // console.log('mediaState', mediaState)

  const MediaNotExists = () => (
    <div style={{ marginTop: 0, marginRight: 10, position: 'relative' }}>
      <input
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='audio/*'
        id='contained-button-file'
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span'>
          Upload <AudioIcon />
          {mediaState === 'loading' ? <CircularProgress size={20} /> : null}
        </Button>
        <Typography type='body1' style={{ display: 'inline-block', margin: 20 }}>
          or type{' '}
        </Typography>
        <TextField
          label='external link'
          onBlur={handleExternalMedialink}
          defaultValue={mediaLink}
          style={{ width: 250 }}
        />
      </label>
    </div>
  )

  const MediaExists = () => (
    <div style={{ marginRight: 10 }}>
      <TextField label='media' disabled defaultValue={mediaLink} style={{ width: 250 }} />
      <IconButton onClick={handleFileDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  )

  return (
    <div style={{ display: 'inline-block' }}>
      {mediaState === 'exists' ? <MediaExists /> : <MediaNotExists />}
    </div>
  )
}

export default MediaAddDeleteButton
