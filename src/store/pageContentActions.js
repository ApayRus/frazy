/**
 *
 * @param {Object} payload - unit data
 *@example
const exampleSetUnitContent = {
  type: 'SET_UNIT_CONTENT',
  payload: {
    id: 'hobbit1_1_en',
    mediaLink: 'https://booktits.firebaseapp.com/hobbit/audio/hobbit1_1.mp3',
    lang: 'en',
    phrases: {
      '1ode4easgv': {
        start: 0.04,
        end: 1.11,
        text: 'The Hobbit'
      },
      q6ua1mrpcdg: {
        start: 4.35,
        end: 5.63,
        text: 'Chapter 1. '
      }
    }
  }
}
 */
export const setUnitContent = payload => {
  return {
    type: 'SET_UNIT_CONTENT',
    payload
  }
}

/**
 *
 * @param {Object} payload - unit translation
 *@example
const exampleSetUnitTranslation = {
    type: "SET_UNIT_TRANSLATION", 
    payload: {
        id: 'hobbit1_1_ru',
        lang: 'ru',
        for: 'hobbit1_1',
        phrases: {
          '1ode4easgv': { text: 'Хоббит' },
          q6ua1mrpcdg: { text: 'Глава 1.' }
        }
      }
}
 */
export const setUnitTranslation = payload => {
  return {
    type: 'SET_UNIT_TRANSLATION',
    payload
  }
}

/**
 *
 * @param {Array} payload - ordered array with unitPhrases + unitTranslations + color + label
 *@example
const setPhrasesArrayExample = {
    type:'SET_PHRASES_ARRAY', 
    payload: [
        {
          id: '1ode4easgv',
          start: 0.04,
          end: 1.11,
          text: 'The Hobbit',
          attributes: { label: 'The Hobbit' },
          color: 'rgba(247, 81, 227, 0.5)',
          translations: { ru: 'Хоббит' }
        },
        {
          id: 'q6ua1mrpcdg',
          start: 4.35,
          end: 5.63,
          text: 'Chapter 1. ',
          attributes: { label: 'Chapter 1. ' },
          color: 'rgba(247, 81, 227, 0.5)',
          translations: { ru: 'Глава 1.' }
        }]
}
 */
export const setPhrasesArray = payload => {
  return {
    type: 'SET_PHRASES_ARRAY',
    payload
  }
}
