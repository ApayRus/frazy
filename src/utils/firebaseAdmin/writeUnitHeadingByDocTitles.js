/**
 * we get all Docs by UnitId, sort their titles and writes to Unit.
 * Then it will be used in heading menu (opens by sandwitch button)
 */

import admin from 'firebase-admin'
import firebaseConfig from '../../config/firebaseConfig.js'
import serviceAccount from '../../config/firebaseAdminKey.json'
import _ from 'lodash'
import { docTimestamps } from './functions.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

const db = admin.firestore()

/* 
    unit: '6minuteEnglishFromBBC',
    title: '6 minute English from BBC',
    logo: 'http://sun9-12.userapi.com/c633221/v633221204/85d1/BNXy9Jf9jCU.jpg?ava=1',
    background: 'https://png.pngtree.com/thumb_back/fh260/back_pic/02/68/42/5957908fe6d9740.jpg',
    author: 'There is no info for this unit yet'
 */

async function assembleHeading(collectionName, unitId) {
  let querySnapshot = await db
    .collection(collectionName)
    .where('unit', '==', unitId)
    .get()
    .catch(function(error) {
      console.log('Error getting documents: ', error)
    })

  const heading = []
  querySnapshot.forEach(doc => {
    const { title, order } = doc.data()
    const { createdAt, updatedAt } = docTimestamps(doc)
    heading.push({ id: doc.id, title, order, createdAt, updatedAt })
  })

  return _.orderBy(heading, ['order', 'createdAt'])
}

function rewriteUnitHeading(unitId, object) {
  db.collection('unit')
    .doc(unitId)
    .set({ ...object }, { merge: true })
    .then(snapshot => console.log(snapshot))
    .catch(error => console.log('error', error))
}

const unitInfo = {
  title: `לחיות, לעבוד ולשמוח בעברית : שיטה ללימוד הפעלים`,
  author: `יוחנן אליחי`,
  logo: `hs/500HebrewVerbs.jpg`
}
const unitId = '500HebrewVerbs'

assembleHeading('material', unitId).then(heading => {
  rewriteUnitHeading(unitId, { ...unitInfo, heading })
})
