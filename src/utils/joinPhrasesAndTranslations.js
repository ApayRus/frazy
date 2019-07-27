import { map, orderBy } from 'lodash'

/**
 * 
 * @param {object} unit 
 * @param {object} translation 
 * @returns {object[]} phrasesArray 
 * @example 
 * const exapmlePhrase = {
    id: "q6ua1mrpcdg", 
    start: 4.35,
    end: 5.63,
    text: 'Chapter 1. ',
    translations: { ru: 'Глава 1.' }, 
    color: randomColor(0.5)
  }
 */

export function joinPhrasesAndTranslations(unit, translation) {
  const { phrases: orPhrases } = unit //original phrases
  const { phrases: trPhrases, lang: trLang } = translation

  //all existing translations we added to original phrases
  for (let key in trPhrases) {
    orPhrases[key]['translations'] = { [trLang]: trPhrases[key]['text'] }
  }
  //for all original phrases we added color
  for (let key in trPhrases) {
    orPhrases[key]['color'] = `rgba(247, 81, 227, 0.5)`
    orPhrases[key]['attributes'] = { label: orPhrases[key]['text'] }
  }
  //convert phrases object to array of objects, and external keys put inside to "id"
  let phrasesArray = map(orPhrases, (elem, key) => ({ ...elem, id: key }))

  phrasesArray = orderBy(phrasesArray, 'start')

  return phrasesArray
}

function randomColor(alpha) {
  return (
    'rgba(' +
    [~~(Math.random() * 255), ~~(Math.random() * 255), ~~(Math.random() * 255), alpha || 1] +
    ')'
  )
}
