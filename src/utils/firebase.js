import firebase from '../firebase/firebase'

const db = firebase.firestore()

export function afterFirebaseFileDownloadUrlReady(fileId, callback) {
  firebase
    .storage()
    .ref(fileId)
    .getDownloadURL()
    .then(url => {
      callback(url)
    })
}

export function dbSet(colName, docId, object) {
  db.collection(colName)
    .doc(docId)
    .set(object, { merge: true })
    .then(doc => console.log('has set doc:', doc.id))
    .catch(error => console.log('error', error))
}

export function dbUpdate(colName, docId, object) {
  db.collection(colName)
    .doc(docId)
    .update(object)
    .then(doc => console.log('has updated doc:', doc.id))
    .catch(error => console.log('error', error))
}

/**
 * used if we need id of new created doc befoure it was uploaded on server
 * @param {string} collection
 */
export function getNewDocId(colName) {
  return db.collection(colName).doc().id
}
