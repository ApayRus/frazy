import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Heading from './Heading'
import { toggleHeadingDrawer } from '../../store/appStateActions'
import { useDispatch, useSelector } from 'react-redux'

function HeadingDrawerContainer() {
  const dispatch = useDispatch()
  const { showHeadingDrawer } = useSelector(state => state.appState)

  return (
    <div>
      <SwipeableDrawer
        anchor='left'
        open={showHeadingDrawer}
        onOpen={() => dispatch(toggleHeadingDrawer({ showHeadingDrawer: true }))}
        onClose={() => dispatch(toggleHeadingDrawer({ showHeadingDrawer: false }))}
      >
        <Heading />
      </SwipeableDrawer>
    </div>
  )
}

export default HeadingDrawerContainer
