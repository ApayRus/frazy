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

  const headingTextOriginal = $('.chapters.en').text()
  const headingTextTranslation = $('.chapters.ru').text()

  const unitIds = headingToIds(headingTextOriginal)

  const units = {}
  const translations = {}
  const heading = generateHeading(headingTextOriginal, headingTextTranslation)

  const headingOriginalArray = headingTextOriginal.trim().split('\n')
  const headingTranslationArray = headingTextTranslation.trim().split('\n')

  unitIds.forEach((unitId, index) => {
    const timingText = $(`#ti-${unitId}`).text()
    const originalText = $(`#or-${unitId}`).text()
    const translationText = $(`#tr-${unitId}`).text()

    const title = headingOriginalArray[index]
    const titleTranslation = headingTranslationArray[index]

    const unitInfo = {
      id: `hobbit${unitId}`,
      title,
      mediaLink: `../audio/hobbit${unitId}.mp3`,
      lang: 'en'
    }

    const translationInfo = {
      id: `hobbit${unitId}_ru`,
      for: `hobbit${unitId}`,
      lang: 'ru',
      title: titleTranslation
    }

    let phrases = assSubtitlesToPhrases(timingText) //just timing, empty text
    const translationPhrases = writePhrasesWithText(phrases, translationText, 'translation')
    phrases = writePhrasesWithText(phrases, originalText, 'original')

    const unit = { ...unitInfo, phrases }
    units[`hobbit${unitId}`] = unit

    const translation = { ...translationInfo, phrases: translationPhrases }
    translations[`hobbit${unitId}_ru`] = translation
  })

  fs.writeFileSync(
    `${folderPathTo}/GENERATEDunits.js`,
    'export default ' + JSON.stringify(units),
    'utf-8'
  )
  fs.writeFileSync(
    `${folderPathTo}/GENERATEDtranslations.js`,
    'export default ' + JSON.stringify(translations),
    'utf-8'
  )

  fs.writeFileSync(
    `${folderPathTo}/GENERATEDheading.js`,
    'export default ' + JSON.stringify(heading),
    'utf-8'
  )
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

function generateHeading(headingOriginalText, headingTranslationText) {
  const bookInfo = {
    author: { en: 'J.R.R. Tolkien', ru: 'Дж.Р.Р. Толкиен' },
    title: { en: '', ru: '' }
  }
  const headingOriginalArray = headingOriginalText.trim().split('\n')
  const headingTranslationArray = headingTranslationText.trim().split('\n')
  const heading = headingOriginalArray.map((elem, index) => {
    const [chapterId, subchapterId] = elem.split('.')
    const id = `hobbit${chapterId}_${subchapterId}`
    const en = elem
    const ru = headingTranslationArray[index]

    return { id, title: { en, ru } }
  })
  return { ...bookInfo, heading }
}

generatePhrasesAndTranscription('../dumyData/hobbit.html', '../content')

console.log('finished')
