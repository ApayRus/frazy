import React from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameter } from '../../store/pageContentActions'
import { useDispatch, useSelector } from 'react-redux'
import switchTranslation from '../translations/switchTranslation'

const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: 10,
    marginBottom: 20
  }
}))

/**
 *
 * This component renders Pair: Lang - Title,
 * used for original material and translation
 * and writes data to reducer "pageContent" like
 * "lang", "title", "trLang", "trTitle"
 */
function MaterialFormTitle(props) {
  const { lang, title, langId, langLabel, titleId, titleLabel } = props
  const dispatch = useDispatch()
  const { translations, materialId } = useSelector(state => state.pageContent)
  const classes = useStyles()

  const handleChange = event => {
    const { id, value } = event.target
    dispatch(setPageParameter([id, value]))
    if (id === 'trLang') {
      if (translations.includes(value)) {
        const docId = `${materialId}_${value}`
        switchTranslation(docId)
      }
    }
  }

  return (
    <div>
      <TextField
        onChange={handleChange}
        className={classes.textField}
        value={lang}
        style={{ width: 50 }}
        id={langId}
        label={langLabel}
      />
      <TextField
        onChange={handleChange}
        className={classes.textField}
        value={title}
        style={{ width: 'calc(100% - 80px)' }}
        id={titleId}
        label={titleLabel}
      />
    </div>
  )
}

export default MaterialFormTitle
