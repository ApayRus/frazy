import { assRowToPhraseObject } from './subtitlesFunctions.js'
import _ from 'lodash'

/**
 * gets subtitle rows, and returns phrases object with ids
 */
export function assSubtitlesToPhrases(subsTiming) {
  const assRows = subsTiming.trim().split('\n')
  const phrases = {}
  assRows.forEach(row => {
    phrases[getId('')] = assRowToPhraseObject(row)
  })
  return phrases
}

/**
 * get multirow text, phrases object and rewrites each phrase.text with row-text
 * @param {object} phrases - object with phrases
 * @param {string} text - multiline text, for rewrite "text" property in all {phrases}
 * @param {string} mode - "original" or "translation"
 */
export function writePhrasesWithText(phrases, text, mode) {
  const textArray = text.trim().split('\n')
  const phrasesObject = {}

  let phrasesArray = _.map(phrases, (elem, key) => {
    return { ...elem, id: key }
  })

  phrasesArray = _.orderBy(phrasesArray, 'start')

  phrasesArray.forEach((phrase, index) => {
    const { id, start, end } = phrase
    const text = textArray[index]
    let newPhrase
    if (mode === 'original') newPhrase = { start, end, text }
    if (mode === 'translation') newPhrase = { text }

    phrasesObject[id] = newPhrase
  })

  return phrasesObject
}

/**
 *
 * @param {string} timing - multi string text
 * @param {string} text - multi string text
 * @returns {Object} phrases= { id: {start: 0.1, end: 2.2, text: "blabla"} }
 *
 */
export function plainTextToPhrasesObject(timing, text) {
  const phrases = {}

  const timingArray = timing.trim().split('\n')
  const textArray = text.trim().split('\n')
  timingArray.forEach((elem, index) => {
    const { start, end } = assRowToPhraseObject(elem)
    const text = textArray[index]
    phrases[index + 1] = { start, end, text }
  })

  return phrases
}

function getId(prefix) {
  if (prefix === undefined) {
    prefix = 'wavesurfer_'
  }
  return (
    prefix +
    Math.random()
      .toString(32)
      .substring(2)
  )
}
