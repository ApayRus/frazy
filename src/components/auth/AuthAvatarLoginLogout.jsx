import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginPopover from './LoginPopover'
import LogoutPopover from './LogoutPopover'
import { useFirebase } from 'react-redux-firebase'
import { Person as AnonymIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  avatar: {
    position: 'fixed',
    bottom: 2,
    zIndex: 1,
    right: 1,
    top: 1,
    maxHeight: 40
  }
}))

function Appbar(props) {
  const firebase = useFirebase()
  const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)
  const history = useHistory()

  //start POPOVER
  const [anchorEl, setAnchorEl] = React.useState(null)
  const loginPopoverOpen = Boolean(anchorEl)
  const loginPopoverId = loginPopoverOpen ? 'simple-popover' : undefined

  const handleCloseLoginPopover = () => {
    setAnchorEl(null)
  }

  const redirectAfterLogout = '/'

  const popoverProps = {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase,
    history,
    message: `Authentication allows you to add and edit materials.`
  }
  //end Popover

  const onClickAvatar = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className={`${classes.avatar}`}>
      <IconButton size='small' onClick={onClickAvatar}>
        {auth.uid ? (
          <Avatar alt='avatar' src={auth.photoURL} />
        ) : (
          <Avatar>
            <AnonymIcon />
          </Avatar>
        )}
      </IconButton>
      {auth.uid ? (
        <LogoutPopover {...popoverProps} redirectUrl={redirectAfterLogout} />
      ) : (
        <LoginPopover {...popoverProps} />
      )}
    </div>
  )
}

export default Appbar
