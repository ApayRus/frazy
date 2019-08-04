/**
 * this module uploads documents to firestore database
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'
/* import materials from '../dumyData/GENERATEDmaterials.js'
const collection = 'materials' */
import materials from '../dumyData/GENERATEDtranslations.js'
const collection = 'translations'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

for (let key in materials) {
  console.log('key', key)
  const materialId = key
  const material = materials[materialId]
  db.doc(`${collection}/${materialId}`)
    .set(material)
    .then(snapshot => console.log(snapshot))
    .catch(error => console.log('error', error))
}
