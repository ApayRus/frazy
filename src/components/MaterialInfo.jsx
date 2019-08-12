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
  },
  materialInfo: {
    marginLeft: 40
  }
}))

function MaterialInfo(props) {
  const classes = useStyles()
  return (
    <div className={classes.materialInfo}>
      <div>
        <TextField className={classes.textField} fullWidth id='title' label='Title'>
          Title
        </TextField>
      </div>
      <MediaAddDeleteButton />
      <TextField className={classes.textField} id='lang' label='Lang'>
        Lang
      </TextField>
      <TextField className={classes.textField} id='unit' label='Unit'>
        Unit
      </TextField>
      <TextField className={classes.textField} id='order' label='Order'>
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
