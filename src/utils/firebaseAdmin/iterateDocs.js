import admin from './admin.js'
import adminSDK from 'firebase-admin'

const db = admin.firestore()

// iterate materials by unit, and add some default meta
db.collection('material')
  .where('unit', '==', '***')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.update({
        meta: {
          translations: ['ru'],
          created: {
            userId: '***',
            userName: '***',
            time: 1566164966501
          },
          updated: {
            userId: '***',
            userName: '***',
            time: 1566164966501
          }
        },
        createdAt: adminSDK.firestore.FieldValue.delete(),
        updatedAt: adminSDK.firestore.FieldValue.delete()
      })
    })
  })
  .catch(error => {
    console.log('Error getting documents: ', error)
  })
