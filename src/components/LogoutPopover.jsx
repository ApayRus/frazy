import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Popover, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  popoverContainer: {
    padding: theme.spacing(2)
  }
}))

export default function SimplePopover(props) {
  const {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase
    /*     history,
    redirectUrl */
  } = props
  const classes = useStyles()

  return (
    <div>
      <Popover
        id={loginPopoverId}
        open={loginPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleCloseLoginPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <div className={classes.popoverContainer}>
          <Button variant='contained' onClick={firebase.logout}>
            Logout
          </Button>
        </div>
      </Popover>
    </div>
  )
}
