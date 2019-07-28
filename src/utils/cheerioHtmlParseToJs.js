import { assSubtitlesToPhrases, writePhrasesWithText } from './plainTextToPhrasesObject.js'
import cheerio from 'cheerio'
import fs from 'fs'

/**
 * @example
 const timingCount = $('.time').length
 const originalCount = $('.original').length
 const translationCount = $('.translation').length
 
 console.log(
   'timingCount',
   timingCount,
   'originalCount',
   originalCount,
   'translationCount',
   translationCount
 )
 * 
 */

/**
 * gets file of book, with 3 text block types: timing, originalText, translationText
 * makes from each 3 block by ids ti-1_1 + or-1_1 + tr-1_1, 2 objects
 * and writes 2 json files: units and translations
 */

function generatePhrasesAndTranscription(filePathFrom, folderPathTo) {
  const $ = cheerio.load(fs.readFileSync(filePathFrom))

  const headingText = $('.chapters.translation.main').text()

  const unitIds = headingToIds(headingText)

  const units = {}
  const translations = {}
  const heading = generateHeading(headingText)

  unitIds.forEach(unitId => {
    const timingText = $(`#ti-${unitId}`).text()
    const originalText = $(`#or-${unitId}`).text()
    const translationText = $(`#tr-${unitId}`).text()

    const unitInfo = {
      id: `hobbit${unitId}_en`,
      mediaLink: `../audio/hobbit${unitId}.mp3`,
      lang: 'en'
    }

    const translationInfo = {
      id: `hobbit${unitId}_ru`,
      lang: 'ru',
      for: `hobbit${unitId}_en`
    }

    let phrases = assSubtitlesToPhrases(timingText) //just timing, empty text
    const translationPhrases = writePhrasesWithText(phrases, translationText, 'translation')
    phrases = writePhrasesWithText(phrases, originalText, 'original')

    const unit = { ...unitInfo, phrases }
    units[`hobbit${unitId}_en`] = unit

    const translation = { ...translationInfo, phrases: translationPhrases }
    translations[`hobbit${unitId}_ru`] = translation
  })

  fs.writeFileSync(`${folderPathTo}/GENERATEDunits.js`, JSON.stringify(units), 'utf-8')
  fs.writeFileSync(
    `${folderPathTo}/GENERATEDtranslations.js`,
    JSON.stringify(translations),
    'utf-8'
  )

  fs.writeFileSync(`${folderPathTo}/GENERATEDheading.js`, JSON.stringify(heading), 'utf-8')
}

/**
 * gets multiline text started with 1.1. , 1.2, ,, 1.13
 * @returns {array} ["1_1", "1_2", ... , "1_13"]
 */
function headingToIds(heading) {
  const headingArray = heading.trim().split('\n')
  const unitIds = headingArray.map(elem => {
    const [chapterId, subchapterId] = elem.split('.')
    return `${chapterId}_${subchapterId}`
  })

  return unitIds
}

function generateHeading(headingText) {
  const headingArray = headingText.trim().split('\n')
  const heading = headingArray.map(elem => {
    const [chapterId, subchapterId] = elem.split('.')
    const id = `hobbit${chapterId}_${subchapterId}_en`
    const ru = elem
    return { id, title: { ru } }
  })
  return heading
}

generatePhrasesAndTranscription('../dumyData/hobbit.html', '../dumyData')

console.log('finished')
