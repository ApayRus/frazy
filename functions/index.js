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

// revision - is an old (previous) version of document
// after material or translation was updated, we add Revision with id = userId.
// each user can have only one stored revision in doc
const createRevision = collection =>
  functions
    .region('europe-west1')
    .firestore.document(`${collection}/{doc}`)
    .onUpdate(doc => {
      const docBefore = doc.before.data()
      //   const docAfter = doc.after.data()

      const { userId, userName, time } = docBefore.meta.updated

      //1) we write revision to subcollection
      //revisionId is the UserId who created docBefore (last updated doc)
      doc.after.ref
        .collection('revisions')
        .doc(userId)
        .set(docBefore)
        .catch(error => console.log(error))

      //2) we write short info about revision to doc
      const revisions = { [userId]: { userName, time } }
      doc.after.ref.set({ meta: { revisions } }, { merge: true })
    })

//Firestore triggers:
exports.materialUpdated = createRevision('material')
exports.translationUpdated = createRevision('materialTr')

//sudo firebase deploy --only functions
