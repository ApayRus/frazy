import store from '../../store/rootReducer'
import firebase from '../../firebase/firebase'
import { updateFromTranslation, updateTranslationRevisions } from '../../store/pageContentActions'

const db = firebase.firestore()

/**
 * Reads translation from Firestore and updates with it Redux-Store
 * @param {string} docId
 */
const switchTranslation = docId => {
  db.collection('materialTr')
    .doc(docId)
    .get()
    .then(doc => {
      store.dispatch(updateFromTranslation({ doc: doc.data() }))
      store.dispatch(updateTranslationRevisions({ doc: doc.data() }))
    })
    .catch(error => console.log(error))
}

export default switchTranslation
