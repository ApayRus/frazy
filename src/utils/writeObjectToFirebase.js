/**
 * this module uploads documents to firestore database
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

const addObjectToCollection = (collection, object, id) => {
  //if id is undefined it will be generated
  if (id) {
    db.collection(collection)
      .doc(id)
      .set(object)
      .then(snapshot => console.log(snapshot))
      .catch(error => console.log('error', error))
  } else {
    db.collection(collection)
      .add(object)
      .then(snapshot => console.log(snapshot))
      .catch(error => console.log('error', error))
  }
}

const object = {
  author: 'British Broadcasting Corporation (BBC)',
  logo: 'hs/6min-english-logo.jpeg',
  title: '6 minute English from BBC',
  heading: [
    {
      id: 'inZIHvfygWyD8k8lieTT',
      title: 'Is shame always bad?',
      order: '001'
    },
    {
      id: 'XbWByczZEZHC6B1HJFCR',
      title: 'Cryptocurrencies',
      order: '002'
    },
    {
      id: 'eCfFcp5GoFnjQrjG46TZ',
      title: 'Is happiness genetic?',
      order: '003'
    },
    {
      id: 'AMzk4X42zpsdMasIZ7Y1',
      title: 'Is modern life making us tired?',
      order: '004'
    }
  ]
}
// addObjectToCollection('material', object)
addObjectToCollection('unit', object, '6minuteEnglishFromBBC')
