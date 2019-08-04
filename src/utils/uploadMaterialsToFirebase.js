/**
 * this module uploads documents to firestore database
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'
/**
firebaseAdminKey.json is given by Firebase, on the project console: Project Overview --> Permissions --> Service accounts
and  it should be replaced to .json. 
{
  "type": "***",
  "project_id": "***",
  "private_key_id": "****",
  "private_key": "***",
  "client_email": "****",
  "client_id": "***",
  "auth_uri": "***",
  "token_uri": "***",
  "auth_provider_x509_cert_url": "***",
  "client_x509_cert_url": "***"
}
*/

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
