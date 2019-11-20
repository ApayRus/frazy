import firebase from './firebase'
import store from '../store/rootReducer'
import { createFirestoreInstance } from 'redux-firestore'

const rrfProps = {
  firebase,
  config: { userProfile: 'user', useFirestoreForProfile: true },
  dispatch: store.dispatch,
  createFirestoreInstance
}

export { rrfProps }
