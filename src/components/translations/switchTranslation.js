import store from '../../store/rootReducer'
// import firebase from '../../firebase/firebase'
import { updateFromTranslation, updateTranslationRevisions } from '../../store/pageContentActions'
import { fetchRequest } from '../../utils/fetch'

// const db = firebase.firestore()

/**
 * Reads translation from Firestore and updates with it Redux-Store
 * @param {string} docId
 */
const switchTranslation = async docId => {
        const { data: doc } = await fetchRequest(`/api/material-tr?_id=${docId}`)
        store.dispatch(updateFromTranslation({ doc }))
    }
    // store.dispatch(updateTranslationRevisions({ doc: doc.data() }))

export default switchTranslation