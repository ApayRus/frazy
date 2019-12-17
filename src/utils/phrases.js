import { map, orderBy } from 'lodash'
import { assRowToPhraseObject } from './subtitlesFunctions.js'

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

/**
 * Frazy export table has this structure:
  header row:    |  (empty) | materialId | mediaLink |     unit    |       order     |
  material data: |          |            |           |             |                 |
  header row:    | phraseId |   start    |    end    | lang: title | trLang: trTitle |
  phrases data:  |          |            |           |             |                 |

  at the end function returns 2 object: material and translation, as we recieved them from the server
  and we can dispatch action fillPageContent with returned value

 * @param {string} tableText, multiline text. rows separated by \n, columns by \t
 */
export function parseFrazyExportTable(tableText) {
  const tableTextArray = tableText.split('\n')
  const materialInfo1Array = tableTextArray[1].split('\t')
  const [, materialId, mediaLink, unit, order] = materialInfo1Array
  const materialInfo2Array = tableTextArray[2].split('\t')
  const [, , , langAndTitle, trLangAndTrTitle] = materialInfo2Array
  const [lang, ...titleArray] = langAndTitle.split(':')
  const title = titleArray.join(':').trim()
  const [trLang, ...trTitleArray] = trLangAndTrTitle.split(':')
  const trTitle = trTitleArray.join(':').trim()

  const phrasesTextArray = tableTextArray.slice(3)

  const materialPhrases = {},
    translationPhrases = {}
  phrasesTextArray.forEach(elem => {
    const [id, start, end, text, trText] = elem.split('\t')
    materialPhrases[id] = { start: +start, end: +end, text }
    translationPhrases[id] = { text: trText }
  })

  const material = {
    title,
    mediaLink,
    unit,
    order,
    lang,
    phrases: materialPhrases
  }

  const translation = {
    lang: trLang,
    title: trTitle,
    for: materialId,
    phrases: translationPhrases
  }
  // console.log(phrasesTextArray)
  // const phrases =
  return {
    materialId,
    material,
    translation
  }
}
