import { promises as fss } from 'fs'
import fs from 'fs'
import { parseSrtWebvtt } from '../phrases.js'
import admin from '../firebaseAdmin/admin.js'

const db = admin.firestore()

//node --experimental-json-modules uploadVTT.js ru-crime-and-punishment
const [bookFolder] = process.argv.slice(2)
const materialsDir = `../../../../aeneas-content/${bookFolder}`

fs.readdir(`${materialsDir}/import`, (err, files) => {
    files.forEach((fileName, index) => {
        // if (index !== 0) return
        const uploadFile = async() => {
            const readPath = `${materialsDir}/import/${fileName}`
            const file = await fss.readFile(readPath, 'utf8')
            const { material } = parseSrtWebvtt(file)
            const { materialId } = material
            delete material.WEBVTT
            delete material.materialId
                // console.log(JSON.stringify(material, null, '\t'))
            db.collection('material')
                .doc(materialId)
                .set(material)
                .catch((error) => console.log('error', error))
        }
        uploadFile()
    })
})