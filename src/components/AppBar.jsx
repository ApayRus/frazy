import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu, Settings, Help } from '@material-ui/icons'
import { connect } from 'react-redux'
import { toggleHeadingDrawer } from '../store/appStateActions'

function Appbar(props) {
  const { toggleHeadingDrawer } = props

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          onClick={() => {
            toggleHeadingDrawer({ showHeadingDrawer: true })
          }}
          color='inherit'
          aria-label='Menu'
        >
          <Menu />
        </IconButton>
        <Typography variant='h6'>FraZish</Typography>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton color='inherit' aria-label='Settings'>
            <Help />
          </IconButton>
          <IconButton color='inherit' aria-label='Settings'>
            <Settings />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleHeadingDrawer: payload => dispatch(toggleHeadingDrawer(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Appbar)
