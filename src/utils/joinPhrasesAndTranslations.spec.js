import { joinPhrasesAndTranslations } from './joinPhrasesAndTranslations'

const phrasesArray = [
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
  },
  {
    id: 'q100k7uc9oo',
    start: 7.54,
    end: 9.24,
    text: 'An Unexpected Party ',
    attributes: { label: 'An Unexpected Party ' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: { ru: 'Неожиданные гости' }
  },
  {
    id: '5rvnsng7l2g',
    start: 13.08,
    end: 15.74,
    text: 'In a hole in the ground there lived a hobbit. ',
    attributes: { label: 'In a hole in the ground there lived a hobbit. ' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: { ru: 'в норе под землей: «в земле»; жил-был хоббит. #hole — дыра, отверстие' }
  },
  {
    id: 'hah15q1q6fo',
    start: 16.37,
    end: 19.06,
    text: 'Not a nasty, dirty, wet hole, ',
    attributes: { label: 'Not a nasty, dirty, wet hole, ' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: { ru: 'не в отвратительной, грязной, мокрой норе, ' }
  },
  {
    id: '806tvi51obg',
    start: 19.13,
    end: 21.98,
    text: 'filled with the ends of worms and an oozy smell, ',
    attributes: { label: 'filled with the ends of worms and an oozy smell, ' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: {
      ru:
        'заполненной хвостами червей и затхлым запахом тины # end — конец, край # oozy — илистый, влажный, '
    }
  },
  {
    id: 'lein5gglml',
    start: 21.98,
    end: 27.29,
    text: 'nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: ',
    attributes: {
      label: 'nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: '
    },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: {
      ru:
        'но и не в сухой, голой, песчаной норе в которой нет ничего, на чем /можно/ посидеть или /что можно/ съесть:'
    }
  },
  {
    id: 'q1170tula4',
    start: 28.05,
    end: 29.56,
    text: 'it was a hobbit-hole, ',
    attributes: { label: 'it was a hobbit-hole, ' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: { ru: 'это была нора хоббита, ' }
  },
  {
    id: 'jsdhvifo85o',
    start: 29.56,
    end: 31.73,
    text: 'and that means comfort.',
    attributes: { label: 'and that means comfort.' },
    color: 'rgba(247, 81, 227, 0.5)',
    translations: { ru: 'а это значит — комфортная /нора/. #comfort — утешение, успокоение; уют' }
  }
]
it('unit(object) + translation (object)= regions (array of ordered objects)', () => {
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
    },
    q100k7uc9oo: {
      start: 7.54,
      end: 9.24,
      text: 'An Unexpected Party '
    },
    '5rvnsng7l2g': {
      start: 13.08,
      end: 15.74,
      text: 'In a hole in the ground there lived a hobbit. '
    },
    hah15q1q6fo: {
      start: 16.37,
      end: 19.06,
      text: 'Not a nasty, dirty, wet hole, '
    },
    '806tvi51obg': {
      start: 19.13,
      end: 21.98,
      text: 'filled with the ends of worms and an oozy smell, '
    },
    lein5gglml: {
      start: 21.98,
      end: 27.29,
      text: 'nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: '
    },
    q1170tula4: {
      start: 28.05,
      end: 29.56,
      text: 'it was a hobbit-hole, '
    },
    jsdhvifo85o: {
      start: 29.56,
      end: 31.73,
      text: 'and that means comfort.'
    }
  }

  const translationPhrases = {
    '1ode4easgv': { text: 'Хоббит' },
    q6ua1mrpcdg: { text: 'Глава 1.' },
    q100k7uc9oo: { text: 'Неожиданные гости' },
    '5rvnsng7l2g': {
      text: 'в норе под землей: «в земле»; жил-был хоббит. #hole — дыра, отверстие'
    },
    hah15q1q6fo: { text: 'не в отвратительной, грязной, мокрой норе, ' },
    '806tvi51obg': {
      text:
        'заполненной хвостами червей и затхлым запахом тины # end — конец, край # oozy — илистый, влажный, '
    },
    lein5gglml: {
      text:
        'но и не в сухой, голой, песчаной норе в которой нет ничего, на чем /можно/ посидеть или /что можно/ съесть:'
    },
    q1170tula4: { text: 'это была нора хоббита, ' },
    jsdhvifo85o: {
      text: 'а это значит — комфортная /нора/. #comfort — утешение, успокоение; уют'
    }
  }

  const trLang = 'ru'

  expect(joinPhrasesAndTranslations(originalPhrases, translationPhrases, trLang)).toEqual(
    phrasesArray
  )
})
