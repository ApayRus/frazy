import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'
import materials from '../content/GENERATEDmaterials.js'

// import materials from '../content/GENERATEDtranslations.js'

const materialIds = Object.keys(materials)

//console.log('materialIds', materialIds)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

const collection = 'materialInfo'

materialIds.forEach((materialId, index) => {
  db.doc(`${collection}/${materialId}`)
    .set({ order: index }, { merge: true })
    .then(snapshot => console.log(snapshot))
    .catch(error => console.log('error', error))
})
