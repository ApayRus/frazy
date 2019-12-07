import admin from './admin.js'

const db = admin.firestore()

const headingArrayToObject = headingArray =>
  headingArray.reduce((obj, item) => {
    let { id, createdAt, updatedAt, order, title } = item
    obj[id] = {
      title,
      order,
      created: { time: createdAt },
      updated: { time: updatedAt }
    }
    return obj
  }, {})

db.collection('unit')
  .get()
  .catch(function(error) {
    console.log('Error getting documents: ', error)
  })
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { heading: headingArray } = doc.data()
      const headingObject = headingArrayToObject(headingArray)
      db.collection('unit')
        .doc(doc.id)
        .update({ heading: headingObject })
    })
  })
