import firebase from '../firebase/firebase'

export function afterFirebaseFileDownloadUrlReady(fileId, callback) {
  firebase
    .storage()
    .ref(fileId)
    .getDownloadURL()
    .then(url => {
      callback(url)
    })
}
