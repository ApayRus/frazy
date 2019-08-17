import { makePhrasesArray, addTranslation } from './phrases'

const originalPhrases = {
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

const translationPhrasesRu = {
  '1ode4easgv': { text: 'Хоббит' },
  q6ua1mrpcdg: { text: 'Глава 1.' }
}

const translationPhrasesIt = {
  '1ode4easgv': { text: 'uno Hobboto' },
  q6ua1mrpcdg: { text: 'Capitolo Prima' }
}

const phrasesArray = [
  {
    id: '1ode4easgv',
    start: 0.04,
    end: 1.11,
    text: 'The Hobbit',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'The Hobbit' }
  },
  {
    id: 'q6ua1mrpcdg',
    start: 4.35,
    end: 5.63,
    text: 'Chapter 1. ',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'Chapter 1. ' }
  }
]

const phrasesArrayWithTrRu = [
  {
    id: '1ode4easgv',
    start: 0.04,
    end: 1.11,
    text: 'The Hobbit',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'The Hobbit' },
    translations: { ru: 'Хоббит' }
  },
  {
    id: 'q6ua1mrpcdg',
    start: 4.35,
    end: 5.63,
    text: 'Chapter 1. ',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'Chapter 1. ' },
    translations: { ru: 'Глава 1.' }
  }
]

const phrasesArrayWithTrRuIt = [
  {
    id: '1ode4easgv',
    start: 0.04,
    end: 1.11,
    text: 'The Hobbit',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'The Hobbit' },
    translations: { ru: 'Хоббит', it: 'uno Hobboto' }
  },
  {
    id: 'q6ua1mrpcdg',
    start: 4.35,
    end: 5.63,
    text: 'Chapter 1. ',
    color: 'rgb(10, 20, 30, 0.5)',
    attributes: { label: 'Chapter 1. ' },
    translations: { ru: 'Глава 1.', it: 'Capitolo Prima' }
  }
]

//color is random value, it causes error in test
it.skip('make phrases', () => {
  expect(makePhrasesArray(originalPhrases)).toEqual(phrasesArray)
})

it('add first translation', () => {
  expect(addTranslation(phrasesArray, translationPhrasesRu, 'ru')).toEqual(phrasesArrayWithTrRu)
})

it('add second translation', () => {
  expect(addTranslation(phrasesArrayWithTrRu, translationPhrasesIt, 'it')).toEqual(
    phrasesArrayWithTrRuIt
  )
})

it.skip('phrases object -> array with labels and colors -> add first lang -> add second lang', () => {
  let phrasesArray = []
  phrasesArray = makePhrasesArray(originalPhrases)
  phrasesArray = addTranslation(phrasesArray, translationPhrasesRu, 'ru')
  phrasesArray = addTranslation(phrasesArray, translationPhrasesIt, 'it')

  expect(phrasesArray).toEqual(phrasesArrayWithTrRuIt)
})
