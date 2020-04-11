import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setPageParameter } from '../../store/pageContentActions'
import MediaAddDeleteButton from './MediaAddDeleteButton'
import HelperTooltip from './HelperIconTooltip'
import { materialEditHelpers as local } from '../../localization/en'
import htmlParser from 'html-react-parser'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: 10,
    marginBottom: 20,
  },
}))

function MaterialInfo(props) {
  const { unit, order } = useSelector((state) => state.pageContent)
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleChange = (event) => {
    const { id, value } = event.target
    dispatch(setPageParameter([id, value]))
  }

  return (
    <div style={{ padding: 10 }}>
      <HelperTooltip title={htmlParser(local.mediaAddDelete)} />
      <MediaAddDeleteButton />
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
    </div>
  )
}

export default MaterialInfo
