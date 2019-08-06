/**
 * this module uploads documents to firestore database
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'

// import materials from '../content/GENERATEDmaterials.js'

import materials from '../content/GENERATEDtranslations.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

// const collection1 = 'materialInfo'
// const collection2 = 'materialPhrases'

const collection1 = 'translationInfo'
const collection2 = 'translationPhrases'

for (let key in materials) {
  console.log('key', key)

  const materialId = key
  const material = materials[materialId]

  // const { title, unit, mediaLink, lang } = material
  const { title, lang } = material //and "for"

  const { phrases } = material

  const materialInfo = { title, lang, for: material['for'] }

  const materialPhrases = phrases

  db.doc(`${collection1}/${materialId}`)
    .set(materialInfo)
    .then(snapshot => console.log(snapshot))
    .catch(error => console.log('error', error))

  db.doc(`${collection2}/${materialId}`)
    .set(materialPhrases)
    .then(snapshot => console.log(snapshot))
    .catch(error => console.log('error', error))
}
