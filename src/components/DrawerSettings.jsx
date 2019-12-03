import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import PlayerSettings from './PlayerSettings'
import { connect } from 'react-redux'
import { toggleSettingsDrawer } from '../store/appStateActions'

function DrawerHeading(props) {
  const { showSettingsDrawer, toggleSettingsDrawer } = props

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={showSettingsDrawer}
        onOpen={() => {
          toggleSettingsDrawer({ showSettingsDrawer: true })
        }}
        onClose={() => {
          toggleSettingsDrawer({ showSettingsDrawer: false })
        }}
      >
        <PlayerSettings />
      </SwipeableDrawer>
    </div>
  )
}

const mapStateToProps = state => {
  return { showSettingsDrawer: state.appState.showSettingsDrawer }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsDrawer: payload => dispatch(toggleSettingsDrawer(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeading)
