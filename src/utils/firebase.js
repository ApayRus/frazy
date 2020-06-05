import firebase from '../firebase/firebase'

/**
 *
 * @param  {String[]} ids - array of file ids to get dowloadUrls
 */
export function getDownloadUrlById(ids = []) {
    return Promise.all(ids.map(fileId => firebase.storage().ref(fileId).getDownloadURL()))
}