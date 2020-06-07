import React, { Fragment, useState } from 'react'
import Fab from '@material-ui/core/Fab'
// import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import LoginPopover from './LoginPopover'
import { useFirebase } from 'react-redux-firebase'

// const useStyles = makeStyles(theme => ({}))

function ButtonWithAuthPopover(props) {
  const { message, actionOnSuccess, buttonIcon } = props
  const firebase = useFirebase()
  //   const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)

  //start POPOVER
  const [anchorEl, setAnchorEl] = useState(null)
  const loginPopoverOpen = Boolean(anchorEl)
  const loginPopoverId = loginPopoverOpen ? 'simple-popover' : undefined

  const handleCloseLoginPopover = () => {
    setAnchorEl(null)
  }

  const popoverProps = {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase,
    message,
    buttonIcon,
    actionOnSuccess
  }
  //end Popover

  const handleClick = event => {
    if (auth.uid) {
      actionOnSuccess()
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <Fragment>
      <Fab onClick={handleClick} color='primary' size='medium'>
        {buttonIcon}
      </Fab>
      <LoginPopover {...popoverProps} />
    </Fragment>
  )
}

export default ButtonWithAuthPopover
