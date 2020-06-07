import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  field: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  }
}))

function UnitForm() {
  const classes = useStyles()
  const { lang, title, author, description, logo, background } = useSelector(state => state.menu)
  return (
    <div>
      <TextField className={classes.field} value={lang} label='Lang' />
      <TextField className={classes.field} value={title} label='Title' />
      <TextField className={classes.field} value={author} label='Author' />
      <TextField className={classes.field} value={description} multiline label='Description' />
      <TextField className={classes.field} value={logo} label='Logo' />
      <TextField className={classes.field} value={background} label='Background' />
    </div>
  )
}

export default UnitForm
