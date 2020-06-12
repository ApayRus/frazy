import React from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { setPageParameters } from '../../store/pageContentActions'
import { useDispatch, useSelector } from 'react-redux'
// import switchTranslation from '../translations/switchTranslation'
import HelperTooltip from './HelperIconTooltip'
import { materialEditHelpers as local } from '../../localization/en'
import htmlParser from 'html-react-parser'
import nanoid from 'nanoid'

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
  let {
    material: { translations = [] }
  } = useSelector(state => state.data)
  const classes = useStyles()

  const handleChange = event => {
    const { id, value } = event.target
    dispatch(setPageParameters({ [id]: value }))
    // if user types a new lang into trLang field, we should generate Id for a new doc
    // if user returns to one of existing codes, we should get Id from existing ids
    if (id === 'trLang') {
      const trCode = event.target.value

      const actionAfterTrLangChanged = (trCode, translations) => {
        const { _id: translationId } = translations.find(elem => elem.lang === trCode) || {}

        return translationId
          ? {
              translationId,
              translationAction: 'update'
            }
          : {
              translationId: nanoid(24),
              translationAction: 'create'
            }
      }

      dispatch(setPageParameters(actionAfterTrLangChanged(trCode, translations)))
    }
  }

  return (
    <div>
      <HelperTooltip title={htmlParser(local.langInput)} />
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
        style={{ width: 'calc(100% - 100px)' }}
        id={titleId}
        label={titleLabel}
      />
    </div>
  )
}

export default MaterialFormTitle
