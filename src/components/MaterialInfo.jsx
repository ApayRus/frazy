import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { setPageParameter } from '../store/pageContentActions'
import MediaAddDeleteButton from './MediaAddDeleteButton'

const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: 10,
    marginBottom: 20
  }
}))

function MaterialInfo(props) {
  const classes = useStyles()
  const { setPageParameter } = props

  const handleChange = event => {
    const { id, value } = event.target
    setPageParameter([id, value])
  }

  return (
    <div style={{ padding: 10 }}>
      <TextField
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 50 }}
        id='lang'
        label='Lang'
      />
      <TextField
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 'calc(100% - 80px)' }}
        id='title'
        label='Title'
      />

      <TextField
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 50 }}
        id='trLang'
        label='TrLang'
      />
      <TextField
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 'calc(100% - 80px)' }}
        id='trTitle'
        label='Title (Translation)'
      />

      <MediaAddDeleteButton />
      <TextField onChange={handleChange} className={classes.textField} id='unit' label='Unit' />
      <TextField
        onChange={handleChange}
        className={classes.textField}
        style={{ width: 60 }}
        id='order'
        type='number'
        label='Order'
      />
    </div>
  )
}

/* const mapStateToProps = state => {
  const { mediaLink } = state.pageContent
  return { mediaLink }
} */

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MaterialInfo)
