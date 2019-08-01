import React from 'react'
import { Fab } from '@material-ui/core'
import { Menu as MenuIcon, Settings as SettingsIcon, Help as HelpIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { toggleHeadingDrawer, toggleSettingsDrawer } from '../store/appStateActions'

const useStyles = makeStyles(theme => ({
  bottom: {
    position: 'fixed',
    bottom: 2,
    zIndex: 1
  },
  menu: {
    left: 3
  },
  settings: {
    right: 3
  },
  help: {
    right: 55
  }
}))

function Appbar(props) {
  const { toggleHeadingDrawer, toggleSettingsDrawer } = props
  const classes = useStyles()

  return (
    <div>
      <Fab
        className={`${classes.bottom} ${classes.menu}`}
        onClick={() => {
          toggleHeadingDrawer({ showHeadingDrawer: true })
        }}
        color='primary'
        size='medium'
      >
        <MenuIcon />
      </Fab>
      <Fab className={`${classes.bottom} ${classes.help}`} color='primary' size='medium'>
        <HelpIcon />
      </Fab>
      <Fab
        className={`${classes.bottom} ${classes.settings}`}
        onClick={() => {
          toggleSettingsDrawer({ showSettingsDrawer: true })
        }}
        color='primary'
        size='medium'
      >
        <SettingsIcon />
      </Fab>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload)),
    toggleSettingsDrawer: payload => dispatch(toggleSettingsDrawer(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Appbar)
