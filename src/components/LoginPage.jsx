import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useHistory } from 'react-router-dom'
// import GoogleButton from 'react-google-button'

function LoginPage() {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)
  let history = useHistory()

  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          signInSuccessUrl: '/signedIn',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              firebase.handleRedirectResult(authResult).then(() => {
                history.push(redirectUrl) //if you use react router to redirect
              })
              return false
            }
          }
        }}
        firebaseAuth={firebase.auth()}
      />
      <div>
        <h2>Auth</h2>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <div>
            <img alt='avatar' src={auth.photoURL} />
            <pre>{JSON.stringify(auth, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
