import admin from 'firebase-admin'
import firebaseConfig from '../../config/firebaseConfig.js'
import serviceAccount from '../../config/firebaseAdminKey.json'

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket
})
