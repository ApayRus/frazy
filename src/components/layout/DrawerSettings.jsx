import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import PlayerSettings from './PlayerSettings'
import { connect } from 'react-redux'
import { setAppStateParams } from '../../store/appStateActions'

function DrawerHeading(props) {
  const { showSettingsDrawer, setAppStateParams } = props

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={showSettingsDrawer}
        onOpen={() => {
          setAppStateParams({ showSettingsDrawer: true })
        }}
        onClose={() => {
          setAppStateParams({ showSettingsDrawer: false })
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
    setAppStateParams: payload => dispatch(setAppStateParams(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeading)
