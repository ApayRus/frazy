import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameters } from '../../store/pageContentActions'
import MediaAddDeleteButton from '../MediaAddDeleteButton'
import HelperTooltip from './HelperIconTooltip'
import { materialEditHelpers as local } from '../../localization/en'
import htmlParser from 'html-react-parser'
import AudioIcon from '@material-ui/icons/Audiotrack'

const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: 10,
    marginBottom: 20
  }
}))

function MaterialInfo(props) {
  const {
    materialId,
    unit,
    order,
    youtubeId,
    mediaLink,
    mediaLinkUrl,
    uploadProgress
  } = useSelector(state => state.pageContent)
  const dispatch = useDispatch()
  const classes = useStyles()

  const uploadButtonProps = {
    parentId: materialId,
    iconComponent: AudioIcon,
    mediaLink: mediaLink ? mediaLink : materialId,
    mediaLinkUrl,
    uploadProgress,
    accept: 'audio/*',
    onDelete: () => {
      dispatch(
        setPageParameters({
          mediaLinkUrl: '',
          mediaLink: '',
          uploadProgress: -1,
          waveformRenderProgress: -1
        })
      )
      console.log('file successefully deleted')
    },
    onUploaded: (mediaLink, mediaLinkUrl) => {
      dispatch(setPageParameters({ mediaLink, mediaLinkUrl }))
    },
    onUploading: uploadProgress => {
      dispatch(setPageParameters({ uploadProgress }))
    }
  }

  const handleChange = event => {
    const { id, value } = event.target
    dispatch(setPageParameters({ [id]: value }))
  }

  return (
    <div style={{ padding: 10 }}>
      <HelperTooltip title={htmlParser(local.mediaAddDelete)} />
      <MediaAddDeleteButton {...uploadButtonProps} />
      <HelperTooltip title={htmlParser(local.unitInput)} />
      <TextField
        value={unit}
        onChange={handleChange}
        className={classes.textField}
        id='unit'
        label='Unit'
      />
      <HelperTooltip title={htmlParser(local.orderInput)} />
      <TextField
        value={order}
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 60 }}
        id='order'
        label='Order'
      />
      <HelperTooltip title={htmlParser(local.youtubeIdInput)} />
      <TextField
        value={youtubeId}
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 105 }}
        id='youtubeId'
        label='youtubeId'
      />
    </div>
  )
}

export default MaterialInfo
