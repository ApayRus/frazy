import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const useStyles = makeStyles((theme) => ({
  popoverContainer: {
    padding: theme.spacing(2),
    height: 100,
  },
}))

export default function LoginPopover(props) {
  const {
    loginPopoverId,
    loginPopoverOpen,
    anchorEl,
    handleCloseLoginPopover,
    firebase,
    history,
    redirectUrl,
    message,
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
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className={classes.popoverContainer}>
          <Typography variant='body1'>{message}</Typography>
          <StyledFirebaseAuth
            uiConfig={{
              signInFlow: 'popup',
              signInSuccessUrl: '/signedIn',
              signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
              callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                  firebase.handleRedirectResult(authResult).then(() => {
                    if (redirectUrl) history.push(redirectUrl) //if you use react router to redirect
                    handleCloseLoginPopover()
                  })
                  return false
                },
              },
            }}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </Popover>
    </div>
  )
}
