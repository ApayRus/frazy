import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  popoverContainer: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))

export default function LogoutPopover(props) {
  const {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase,
    /*     history,
    redirectUrl */
  } = props
  const classes = useStyles()

  const { profile } = useSelector((state) => state.firebase)

  const handleLogout = () => {
    firebase.logout()
    handleCloseLoginPopover()
  }

  return (
    <div>
      <Popover
        id={loginPopoverId}
        open={loginPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleCloseLoginPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.popoverContainer}>
          <Typography variant='body2'>Display name: {profile.displayName}</Typography>
          <Typography variant='body2'>email: {profile.email}</Typography>
          <Typography variant='body2'>
            uid:
            <span style={{ fontSize: 10 }}> {profile.uid}</span>
          </Typography>
          <div style={{ marginBottom: 10, marginTop: 10 }}>
            <img alt='avatar' src={profile.avatarUrl} style={{ width: 200, borderRadius: 10 }} />
          </div>
          <Button variant='contained' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Popover>
    </div>
  )
}
