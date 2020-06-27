/**
 * rewrite WEBVTT header with additional info, like:
 * mediaLink, unit, order, youtubeId, lang, title
 * for automatically upload on the next step
 */


import { promises as fss } from 'fs'
import fs from 'fs'
const materialsDir = '../../../../aeneas-content/alices-adventures'
fs.readdir(`${materialsDir}/output`, (err, files) => {
    files.forEach((fileName, index) => {
        const newFileHeader = getFileHeader(fileName)

        const rewriteFile = async() => {
            const readPath = `${materialsDir}/output/${fileName}`
            const writePath = `${materialsDir}/import/${fileName}`
            const oldFile = await fss.readFile(readPath, "utf8")
            const newFile = oldFile.replace('WEBVTT', newFileHeader)
            await fss.writeFile(writePath, newFile)
                // console.log(newFile)
        }
        rewriteFile()
    })

})


// https://archive.org/download/aliceinwonderland_02_02/aliceinwonderland_01_01.mp3
function getMediaLink(mediaCollectionId, fileName) {
    return `https://archive.org/download/${mediaCollectionId}/${fileName}.mp3`
}

function getFileHeader(fileName) {
    const filePrefix = 'aliceinwonderland_'
    const fileNameWithoutExt = fileName.replace(/\..+$/, '')
    const order = fileNameWithoutExt.replace(filePrefix, '').replace(/_/g, '-')
    const materialPrefix = 'alice-in-wonderland-'
    const materialId = `${materialPrefix}${order}`
    const mediaLink = getMediaLink('aliceinwonderland_02_02', fileNameWithoutExt)
    const unit = 'Alices-Adventures-In-Wonderland-En'
    const lang = 'en'

    const newFileHeader = `WEBVTT
materialId: ${materialId}
title: ${materialId}
order: ${order}
mediaLink: ${mediaLink}
unit: ${unit}
lang: ${lang}`
    return newFileHeader
}