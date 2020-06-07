import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Heading from './Heading'
import { setAppStateParam } from '../../store/appStateActions'
import { useDispatch, useSelector } from 'react-redux'
import { langDirection } from '../../theme/functions'

function HeadingDrawerContainer() {
  const dispatch = useDispatch()
  const { showHeadingDrawer } = useSelector((state) => state.appState)
  const { lang } = useSelector((state) => state.pageContent)
  const direction = langDirection(lang)

  return (
    <div>
      <SwipeableDrawer
        anchor={direction === 'ltr' ? 'left' : 'right'}
        open={showHeadingDrawer}
        onOpen={() => dispatch(setAppStateParam({ showHeadingDrawer: true }))}
        onClose={() => dispatch(setAppStateParam({ showHeadingDrawer: false }))}
      >
        <Heading />
      </SwipeableDrawer>
    </div>
  )
}

export default HeadingDrawerContainer
