import firebase from './firebase'
import store from '../store/rootReducer'
import { createFirestoreInstance } from 'redux-firestore'

/* 
// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
 */

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
}

export { rrfProps }
