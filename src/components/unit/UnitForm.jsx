import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MediaAddDeleteButton from '../MediaAddDeleteButton'
import { setMenuParameters } from '../../store/menuActions'
import BackgroundIcon from '@material-ui/icons/Wallpaper'
import LogoIcon from '@material-ui/icons/Image'

const useStyles = makeStyles(theme => ({
  field: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  }
}))

function UnitForm() {
  const classes = useStyles()
  const {
    _id: unitId,
    lang,
    title,
    author,
    description,
    logo,
    logoUrl,
    background,
    backgroundUrl
  } = useSelector(state => state.menu)

  const dispatch = useDispatch()

  const handleTextFieldChange = event => {
    const { id, value } = event.target
    dispatch(setMenuParameters({ [id]: value }))
  }

  const logoUploadButtonProps = {
    buttonTitle: 'upload logo',
    iconComponent: LogoIcon,
    mediaLink: logo ? logo : `logo/${unitId}`, // default naming of file (on create first)
    mediaLinkUrl: logoUrl,
    uploadProgress: () => {},
    accept: 'image/*',
    onDelete: () => {
      dispatch(
        setMenuParameters({
          logoUrl: '',
          logo: ''
        })
      )
      console.log('file successefully deleted')
    },
    onUploaded: (logo, logoUrl) => {
      dispatch(setMenuParameters({ logo, logoUrl }))
    },
    onUploading: () => {}
  }

  const backgroundUploadButtonProps = {
    buttonTitle: 'upload background',
    iconComponent: BackgroundIcon,
    mediaLink: background ? background : `background/${unitId}`, // default naming of file (on create first)
    mediaLinkUrl: backgroundUrl,
    uploadProgress: () => {},
    accept: 'image/*',
    onDelete: () => {
      dispatch(
        setMenuParameters({
          backgroundUrl: '',
          background: ''
        })
      )
      console.log('file successefully deleted')
    },
    onUploaded: (background, backgroundUrl) => {
      dispatch(setMenuParameters({ background, backgroundUrl }))
    },
    onUploading: () => {}
  }

  return (
    <div>
      <form onChange={handleTextFieldChange}>
        <TextField id='lang' className={classes.field} value={lang} label='Lang' />
        <TextField id='title' className={classes.field} value={title} label='Title' />
        <TextField id='author' className={classes.field} value={author} label='Author' />
        <TextField
          id='description'
          className={classes.field}
          value={description}
          multiline
          label='Description'
        />
      </form>
      <MediaAddDeleteButton {...logoUploadButtonProps} />
      <MediaAddDeleteButton {...backgroundUploadButtonProps} />
    </div>
  )
}

export default UnitForm
