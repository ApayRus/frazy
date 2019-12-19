const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const { detailedDiff } = require('deep-object-diff')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

/**
 * revision - is an old (previous) version of document
 * after material or translation was updated, we add Revision with id = userId.
 * each user can have only one stored revision in doc subcollection 'Revisions'
 * @param {string} collection
 */
function createRevision(collection) {
  return functions
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
}

/**
 * when doc in material has created/updated, if it has unit, and changed title,
 * we write it to correspond doc in unit
 *
 * @param {string} collectionSourceOfAction
 * @param {string} collectionRecieverOfAction
 * @example
 * rewriteHeading(material, unit) //
 * rewriteHeading(materialTr, unitTr) //
 */
function rewriteHeading(collectionSourceOfAction, collectionRecieverOfAction) {
  return functions
    .region('europe-west1')
    .firestore.document(`${collectionSourceOfAction}/{doc}`)
    .onWrite((doc, context) => {
      //   const docAfter = doc.after.data()
      const { doc: docSourceId } = context.params
      const { title: titleBefore = '', order: orderBefore = '' } = doc.before.data() || {}
      const { unit: docRecieverId, title, order } = doc.after.data()

      if (titleBefore !== title || orderBefore !== order) {
        db.collection(collectionRecieverOfAction)
          .doc(docRecieverId)
          .set({ heading: { [docSourceId]: { title, order } } }, { merge: true })
          .catch(error => console.log(error))
      }
    })
}

//Firestore triggers:
exports.materialUpdated = createRevision('material')
exports.translationUpdated = createRevision('materialTr')
exports.rewriteUnitHeading = rewriteHeading('material', 'unit')

//sudo firebase deploy --only functions
