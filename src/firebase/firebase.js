import firebase from 'firebase/app'
import 'firebase/firestore'
//npmimport 'firebase/auth'
import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig)

firebase.firestore()

export default firebase
