import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useSelector } from 'react-redux'

function UnitForm() {
  const { lang, title, author, description, logo, background } = useSelector(state => state.menu)
  return (
    <div style={{ width: '100%' }}>
      <TextField value={lang} label='Lang' />
      <TextField value={title} label='Title' />
      <TextField value={author} label='Author' />
      <TextField value={description} multiline label='Description' />
      <TextField value={logo} label='Logo' />
      <TextField value={background} label='Background' />
    </div>
  )
}

export default UnitForm
