/**
 * uploads media to the server or deletes it
 * displays Upload button , or link + Delete
 */
import React from 'react'
import { Button, TextField, IconButton, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import firebase from '../firebase/firebase'
import ImageIcon from '@material-ui/icons/Image'

/**
 * * final goal is: 
 * 1) upload or delete file to/from server 
 * 2) to set up 2 values: mediaLink and mediaLinkUrl
 * in case of external link both are the same
 * in case of bucket file, we'll get downloadUrl async(mediaLink)
 * 
 * @param {Object} props
 * @param {object} props.icon -
 * @param {string} props.mediaLink - path in bucket 'audio/fileid', or external link 'https://bbc.com/audios/file.mp3
 * @param {string} props.mediaLinkUrl - async generated download link, or external link
 * 

 */

export default function MediaAddDeleteButton(props) {
  const {
    buttonTitle = 'upload',
    mediaLink,
    mediaLinkUrl,
    uploadProgress,
    onUploading,
    onUploaded,
    onDelete,
    iconComponent: Icon = ImageIcon,
    accept
  } = props
  const { profile } = useSelector(state => state.firebase)

  const handleFileDelete = () => {
    //file on our hosting, not external link
    if (!mediaLink.match('http')) {
      const fileRef = firebase.storage().ref(mediaLink)
      const deleteTask = fileRef.delete()
      deleteTask.then(() => onDelete()).catch(error => console.log(error))
    } else {
      //file is external link
      onDelete()
    }
  }

  const handleExternalMedialink = event => {
    const mediaLinkUrl = event.target.value
    if (mediaLinkUrl.match('http')) {
      onUploaded(mediaLinkUrl, mediaLinkUrl)
    }
  }

  const handleFileSelect = event => {
    const [file] = event.target.files
    const fileRef = firebase.storage().ref(mediaLink)
    const metadata = {
      customMetadata: {
        owner: profile.uid
      }
    }
    const uploadTask = fileRef.put(file, metadata)

    uploadTask.on('state_changed', snapshot => {
      let uploadProgress = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
      // console.log('uploadProgress', uploadProgress)
      onUploading(uploadProgress)
    })

    uploadTask
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => onUploaded(mediaLink, url))
      })
      .catch(err => console.error('error uploading file', err))
  }

  /**
   * notExist -> loading -> exist
   */
  const stateOfMedia = (mediaLinkUrl, progress) => {
    if (progress < 0 && !mediaLinkUrl) return 'notExists'
    else if (progress >= 0 && !mediaLinkUrl) return 'loading'
    else if (mediaLinkUrl) return 'exists'
  }

  const mediaState = stateOfMedia(mediaLinkUrl, uploadProgress)

  // console.log('mediaState', mediaState)

  const MediaNotExists = () => (
    <div style={{ marginTop: 0, marginRight: 10, position: 'relative', marginBottom: 10 }}>
      <input
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept={accept}
        id='contained-button-file'
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' size='small' component='span' style={{ marginTop: 15 }}>
          {buttonTitle} <Icon />
          {mediaState === 'loading' ? <CircularProgress size={20} /> : null}
        </Button>
        <TextField
          label='or type external link'
          onBlur={handleExternalMedialink}
          defaultValue={mediaLinkUrl}
          style={{ marginLeft: 15, width: 148 }}
        />
      </label>
    </div>
  )

  const MediaExists = () => (
    <div style={{ marginRight: 10 }}>
      <TextField label='media' disabled defaultValue={mediaLink} style={{ width: 148 }} />
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
