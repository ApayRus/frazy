import { map, orderBy } from 'lodash'
import { assRowToPhraseObject, tsvRowToPhraseObject } from './subtitlesFunctions.js'

// phrases = { id: { start, end, text } } - how it stored in DB
// make array [ id, start, end, text ]
// add colors [ ..., color ]
// add label (for wavesurfer) [... , attributes: { label }]

// add translations [..., translations: {ru: some text} ]

/**
 * Converts phrasesObject from DB to array of objects,  with additional id, color and label
 * @param {*} phrasesObject
 */
export function makePhrasesArray(phrasesObject) {
  let phrasesArray = []

  phrasesArray = map(phrasesObject, (elem, key) => {
    return {
      ...elem, //start, end, text - for
      id: key,
      attributes: { label1: elem.text }, //for wavesurfer
      color: randomColor(0.5) //for wavesurfer
    }
  })

  phrasesArray = orderBy(phrasesArray, 'start')

  return phrasesArray
}

/**
 *
 * @param {array} phrases - array
 * @param {object} trPhrases - object
 * @param {string} trLang - ru, en, ch, es
 */
export function addTranslation(phrases, translation) {
  const { phrases: trPhrases, lang: trLang } = translation
  return phrases.map(elem => {
    const tr = trPhrases[elem.id]
    const trText = tr ? tr.text : ''
    const oldTranslations = elem.translations
    const newTranslation = { [trLang]: trText }
    return {
      ...elem,
      attributes: { ...elem.attributes, label2: trText },
      translations: { ...oldTranslations, ...newTranslation }
    }
  })
}

/**
 *
 * @param {string} subsTiming - multi string text .ass subtitles format
 * @returns {Object} phrases= { id: {start: 0.1, end: 2.2, text: "blabla"} }
 *
 */
export function assToPhrases(subsTiming) {
  const assRows = subsTiming.trim().split('\n')
  const phrases = {}
  assRows.forEach(row => {
    phrases[getId('')] = assRowToPhraseObject(row)
  })
  return phrases
}

export function tsvToPhrases(subsTiming) {
  const tsvRows = subsTiming.trim().split('\n')
  const phrases = {}
  tsvRows.forEach(row => {
    phrases[getId('')] = tsvRowToPhraseObject(row)
  })
  return phrases
}

export function subtitlesToLocalPhrases(text) {
  //know format of text, now is tsv, then ass, srt and others
  const dbPhrases = tsvToPhrases(text)
  const localPhrases = makePhrasesArray(dbPhrases)
  return localPhrases
}

// array to object, format for DB
export function localPhrasesToDBphrases(phrases) {
  return phrases.reduce((obj, item) => {
    let { id, start, end, text } = item

    id = id.replace('wavesurfer_', '')
    start = +start.toFixed(2)
    end = +end.toFixed(2)
    text = text || ''

    obj[id] = { start, end, text }
    return obj
  }, {})
}

/**
 *
 * recieves [{id,  color, text, start, end, translations: {ru:"frasa  1", en:"phrase 1", }}]
 * returns [{id, text}]
 */
export function localPhrasesToDBtranslations(phrases, trLang) {
  return phrases.reduce((obj, item) => {
    let { id, translations } = item
    const text = translations[trLang] || ''
    id = id.replace('wavesurfer_', '')
    obj[id] = { text }
    return obj
  }, {})
}

/**
 *
 *makes text array from phrases
 */
export function localPhrasesToText(phrases) {
  return map(phrases, 'text')
}

export function localPhrasesToTrText(phrases, trLang) {
  const pathToValue = `translations.${trLang}`
  return map(phrases, pathToValue)
}

export function randomColor(alpha) {
  return (
    'rgba(' +
    [~~(Math.random() * 255), ~~(Math.random() * 255), ~~(Math.random() * 255), alpha || 1] +
    ')'
  )
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
