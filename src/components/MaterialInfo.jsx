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
    <div>
      <div>
        <TextField
          onChange={handleChange}
          className={classes.textField}
          fullWidth
          id='title'
          label='Title'
        >
          Title
        </TextField>
      </div>
      <MediaAddDeleteButton />
      <TextField onChange={handleChange} className={classes.textField} id='lang' label='Lang'>
        Lang
      </TextField>
      <TextField onChange={handleChange} className={classes.textField} id='unit' label='Unit'>
        Unit
      </TextField>
      <TextField onChange={handleChange} className={classes.textField} id='order' label='Order'>
        Order
      </TextField>
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
