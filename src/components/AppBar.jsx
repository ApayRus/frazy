import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu, Settings, Help } from '@material-ui/icons'
import { store } from '../dumyStore'

function Appbar() {
  const toggleHeadingDrawer = () => {
    store.headingDrawerOpen = !store.headingDrawerOpen
  }

  return (
    <AppBar>
      <Toolbar>
        <IconButton onClick={toggleHeadingDrawer} color='inherit' aria-label='Menu'>
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

export default Appbar
