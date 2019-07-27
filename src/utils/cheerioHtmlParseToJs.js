import { assSubtitlesToPhrases } from './plainTextToPhrasesObject.js'
import cheerio from 'cheerio'
import fs from 'fs'

const $ = cheerio.load(fs.readFileSync('../dumyData/hobbit.html'))

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
function counts() {}

const headingArray = $('.chapters.translation.main')
  .text()
  .trim()
  .split('\n')

const unitIds = headingArray.map(elem => {
  const [chapterId, subchapterId] = elem.split('.')
  return `${chapterId}_${subchapterId}`
})

const timingText = $(`#ti-${unitIds[0]}`).text()
const phrases = assSubtitlesToPhrases(timingText)

console.log(phrases)
