import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Heading from './Heading'
import { connect } from 'react-redux'
import { toggleHeadingDrawer } from '../../store/appStateActions'

function HeadingDrawerHOC(props) {
  const { showHeadingDrawer, toggleHeadingDrawer } = props

  return (
    <div>
      <SwipeableDrawer
        anchor='left'
        open={showHeadingDrawer}
        onOpen={() => toggleHeadingDrawer({ showHeadingDrawer: true })}
        onClose={() => toggleHeadingDrawer({ showHeadingDrawer: false })}
      >
        <Heading />
      </SwipeableDrawer>
    </div>
  )
}

const mapStateToProps = state => {
  return { showHeadingDrawer: state.appState.showHeadingDrawer }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadingDrawerHOC)
