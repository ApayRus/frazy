/**
 * deletes materials by ids , and all related translations
 */
import adminSDK from 'firebase-admin'
import admin from './admin.js'

const db = admin.firestore()

const materialIds = `
nqoCXk4lgKoCr8WL8QEc
3VesZ3m1L8JKCFQ1qPp3
OU1ocw3DG2q5TAl6iJf8
Kxzc9DWhuDQFcBeOiLKR
SvIwuOpsZVAwmo7tmGUX
A3Q87mCLnkbEgt0pk6ap
tODpeKLyILP5Wjcmk1Yb
qyCgKVaigqyYkeTxmLQt
R3haxTLvxr7XMqHBIuvA
wxC0dzXZawHw0QV6Plup
RIeOGdKL4lY8Pm1iGVUW
bTOZTJs1b56KWLK6t842
lPvwWZIPtfuOPEGDKDXL
DWg5fylwIjePJlfEyb1q
Xx5D0dl4igXihSL7knhi
GasKkve4YlrUIIvhNT5j
RmZr5n4FZjV1rkAuPkcU
`

materialIds.split('\n').forEach(materialId => {
  if (materialId) {
    //delete material
    db.collection('material')
      .doc(materialId.trim())
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch(error => {
        console.error('Error removing document: ', error)
      })
    //delete all its translations
    db.collection('materialTr')
      .where('for', '==', materialId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
        })
      })

    //delete from events
    db.collection('lastEvents')
      .doc('main')
      .update({
        [materialId]: adminSDK.firestore.FieldValue.delete()
      })
  }
})
