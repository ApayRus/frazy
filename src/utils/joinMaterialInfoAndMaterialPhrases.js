/**
 * at the beginning of project there was two collection materialInfo and materialPhrases,
 * then I decided to join them because of billing
 * (also translationInfo + translationPhrases)
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

db.collection('translationInfo')
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(docMaterialInfo) {
      db.collection('translationPhrases')
        .doc(docMaterialInfo.id)
        .get()
        .then(function(docMaterialPhrases) {
          const joinedDoc = {
            ...docMaterialInfo.data(),
            phrases: docMaterialPhrases.data(),
            createdAt: getTimestamp(docMaterialInfo.createTime),
            updatedAt: getTimestamp(docMaterialInfo.updateTime)
          }
          // console.log(JSON.stringify(joinedDoc))
          db.collection('materialTr')
            .doc(docMaterialInfo.id)
            .set(joinedDoc)
            .then(snapshot => console.log(snapshot))
            .catch(error => console.log('error', error))
        })
        .catch(function(error) {
          console.log('Error getting document:', error)
        })
    })
  })
  .catch(function(error) {
    console.log('Error getting documents: ', error)
  })

function getTimestamp(docTime) {
  return `${docTime.seconds}${docTime.nanoseconds}`.substr(0, 13)
}
