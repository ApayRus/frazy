import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { setPageParameter } from '../../store/pageContentActions'
import MediaAddDeleteButton from './MediaAddDeleteButton'

const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: 10,
    marginBottom: 20
  }
}))

function MaterialInfo(props) {
  const classes = useStyles()
  const { setPageParameter, unit, order } = props

  const handleChange = event => {
    const { id, value } = event.target
    setPageParameter([id, value])
  }

  return (
    <div style={{ padding: 10 }}>
      <MediaAddDeleteButton />
      <TextField
        defaultValue={unit}
        onChange={handleChange}
        className={classes.textField}
        id='unit'
        label='Unit'
      />
      <TextField
        defaultValue={order}
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

const mapStateToProps = state => {
  const pc = state.pageContent
  return {
    unit: pc.unit,
    order: pc.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPageParameter: payload => dispatch(setPageParameter(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialInfo)
