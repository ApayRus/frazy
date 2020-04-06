import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import PlayerSettings from './PlayerSettings'
import { connect } from 'react-redux'
import { setAppStateParam } from '../../store/appStateActions'

function DrawerHeading(props) {
  const { showSettingsDrawer, setAppStateParam } = props

  return (
    <div>
      <SwipeableDrawer
        anchor='bottom'
        open={showSettingsDrawer}
        onOpen={() => {
          setAppStateParam({ showSettingsDrawer: true })
        }}
        onClose={() => {
          setAppStateParam({ showSettingsDrawer: false })
        }}
      >
        <PlayerSettings />
      </SwipeableDrawer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { showSettingsDrawer: state.appState.showSettingsDrawer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAppStateParam: (payload) => dispatch(setAppStateParam(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeading)
