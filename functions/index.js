const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const { detailedDiff } = require('deep-object-diff')

admin.initializeApp(functions.config().firebase)
// const db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase -  Aparus!')
// })

// exports.materialCreated = functions.firestore.document('material/{materialId}').onUpdate(doc => {
//   const docBefore = doc.before.data()
//   //   const docAfter = doc.after.data()
//   doc.after.ref.collection('revisions').add(docBefore)
// })
