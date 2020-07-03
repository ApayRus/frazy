/**
 * rewrite WEBVTT header with additional info, like:
 * mediaLink, unit, order, youtubeId, lang, title
 * for automatically upload on the next step
 *
 */

import { promises as fss } from 'fs'
import fs from 'fs'
// * $ node --experimental-json-modules rewriteVTT.js lz lz-sthayrin-yifen-gurush
const [lang, bookFolder] = process.argv.slice(2)
const materialsDir = `../../../../aeneas-content/${bookFolder}`
fs.readdir(`${materialsDir}/output`, (err, files) => {
    files.forEach((fileName, index) => {
        const newFileHeader = getFileHeader(fileName, bookFolder, lang)

        const rewriteFile = async() => {
            const readPath = `${materialsDir}/output/${fileName}`
            const writePath = `${materialsDir}/import/${fileName}`
            const oldFile = await fss.readFile(readPath, 'utf8')
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

function getFileHeader(fileName, unit, lang) {
    const filePrefix = unit
    const fileNameWithoutExt = fileName.replace(/\..+$/, '')
    const order = fileNameWithoutExt.replace(filePrefix, '').replace(/_/g, '-')
    const materialPrefix = unit
    const materialId = `${materialPrefix}-${order}`
    const mediaLink = getMediaLink(unit, fileNameWithoutExt)

    const newFileHeader = `WEBVTT
materialId: ${materialId}
title: ${materialId}
order: ${order}
mediaLink: ${mediaLink}
unit: ${unit}
lang: ${lang}`
    return newFileHeader
}