import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { setMenuParameters } from '../../store/menuActions'

const useStyles = makeStyles(theme => ({
  field: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5
  }
}))

export default function UnitTrForm() {
  const classes = useStyles()
  const { trLang, trTitle, trAuthor, trDescription } = useSelector(state => state.menu)

  const dispatch = useDispatch()

  const handleTextFieldChange = event => {
    const { id, value } = event.target
    dispatch(setMenuParameters({ [id]: value }))
  }

  return (
    <div>
      <form onChange={handleTextFieldChange}>
        <TextField id='trLang' className={classes.field} value={trLang} label='trLang' />
        <TextField id='trTitle' className={classes.field} value={trTitle} label='trTitle' />
        <TextField id='trAuthor' className={classes.field} value={trAuthor} label='trAuthor' />
        <TextField
          id='trDescription'
          className={classes.field}
          value={trDescription}
          multiline
          label='trDescription'
        />
      </form>
    </div>
  )
}
