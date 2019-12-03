import React, { Fragment, useState } from 'react'
import Fab from '@material-ui/core/Fab'
// import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginPopover from './LoginPopover'
import { useFirebase } from 'react-redux-firebase'

// const useStyles = makeStyles(theme => ({}))

function ButtonWithAuthPopover(props) {
  const { message, redirectUrl, buttonIcon } = props
  const firebase = useFirebase()
  //   const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)
  const history = useHistory()

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
    history,
    redirectUrl,
    message,
    buttonIcon
  }
  //end Popover

  const handleClick = event => {
    console.log('auth', auth)
    if (auth.uid) {
      history.push(redirectUrl)
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
