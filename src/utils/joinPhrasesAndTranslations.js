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
  //convert phrases object to array of objects, and external keys put inside to "id"
  let phrasesArray = map(orPhrases, (elem, key) => {
    const tr = trPhrases[key]
    const transl = tr ? tr.text : ''
    return {
      ...elem,
      id: key,
      attributes: { label: elem.text },
      color: randomColor(0.5),
      translations: { [trLang]: transl }
    }
  })

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
