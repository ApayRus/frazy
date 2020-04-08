import React from 'react'
import Typography from '@material-ui/core/Typography'
import MultipleSelect from '../layout/MultipleSelect'
import { useDispatch, useSelector } from 'react-redux'
import { setAppStateParam } from '../../store/appStateActions'

function ToolBar() {
  const dispatch = useDispatch()
  const { lastEventsDoc } = useSelector((state) => state.firestore.data)
  const { langsUserInterestedIn } = useSelector((state) => state.appState)

  const extractOriginalLangs = (lastEventsDoc = {}) => {
    let langs = new Set()

    Object.keys(lastEventsDoc).forEach((key) => {
      const { lang } = lastEventsDoc[key]
      langs.add(lang)
    })

    langs = Array.from(langs).sort()
    return langs
  }

  const langs = extractOriginalLangs(lastEventsDoc)

  const handleChangeLang = (event) => {
    dispatch(setAppStateParam({ langsUserInterestedIn: event.target.value }))
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginLeft: 10, display: 'inline-block' }}>
        <Typography variant='subtitle1'>Latest updates for: </Typography>
      </div>
      <div style={{ marginLeft: 10, display: 'inline-block' }}>
        <MultipleSelect
          options={langs}
          onChange={handleChangeLang}
          selected={langsUserInterestedIn}
        />
      </div>
    </div>
  )
}

export default ToolBar
