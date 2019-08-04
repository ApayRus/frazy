/**
 * this module uploads files to firebase storage
 */

import admin from 'firebase-admin'
import firebaseConfig from '../config/firebaseConfig.js'
import serviceAccount from '../config/firebaseAdminKey.json'
import materials from '../dumyData/GENERATEDmaterials.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket
})

let folderName = 'hobbit'

let bucket = admin.storage().bucket()

/* 
bucket.upload(filePath).then(function(result) {
  //   fs.writeFileSync('./downloadLog.js', JSON.stringify(result))
  const { name: fileName, bucket } = result[1]
  const fileUrl = `gs://${bucket}/${fileName}`
  console.log('fileUrl', fileUrl)
})
 */

for (let key in materials) {
  let fileName = key

  let filePath = `../../public/audio/${fileName}.mp3`

  const uploadOptions = { destination: `${folderName}/${fileName}.mp3` }

  bucket.upload(filePath, uploadOptions).then(result => {
    const { name: fileName, bucket } = result[1]
    const fileUrl = `gs://${bucket}/${fileName}`
    console.log('fileUrl', fileUrl)
  })
}
