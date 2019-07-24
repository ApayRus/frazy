import {
  plainTextToPhrasesObject,
  assRowPhraseObject,
  assSubtitlesToPhrases,
  writePhrasesWithText
} from './plainTextToPhrasesObject'

const translation = `Хоббит
Глава 1.
Неожиданные гости 

не в отвратительной, грязной, мокрой норе, 
заполненной хвостами червей  и затхлым запахом тины # end — конец, край # oozy — илистый, влажный, 
но и не в сухой, голой, песчаной норе в которой нет ничего, на чем /можно/ посидеть или /что можно/ съесть: 
это была нора хоббита, 
а это значит — комфортная /нора/.  #comfort — утешение, успокоение; уют
`

it('text + timing = phrases', () => {
  const timing = `Dialogue: 0,0:00:00.04,0:00:01.11,Default,,0,0,0,,
Dialogue: 0,0:00:04.35,0:00:05.63,Default,,0,0,0,,
Dialogue: 0,0:00:07.54,0:00:09.24,Default,,0,0,0,,

Dialogue: 0,0:00:16.37,0:00:19.06,Default,,0,0,0,,
Dialogue: 0,0:00:19.13,0:00:21.98,Default,,0,0,0,,
Dialogue: 0,0:00:21.98,0:00:27.29,Default,,0,0,0,,
Dialogue: 0,0:00:28.05,0:00:29.56,Default,,0,0,0,,
Dialogue: 0,0:00:29.56,0:00:31.73,Default,,0,0,0,,
`
  const text = `The Hobbit
Chapter 1. 
An Unexpected Party 

Not a nasty, dirty, wet hole, 
filled with the ends of worms  and an oozy smell, 
nor yet a dry, bare, sandy hole  with nothing in it to sit down on  or to eat: 
it was a hobbit-hole, 
and that means comfort.
`
  const phrases = {
    '1': {
      start: 0.04,
      end: 1.11,
      text: 'The Hobbit'
    },
    '2': {
      start: 4.35,
      end: 5.63,
      text: 'Chapter 1. '
    },
    '3': {
      start: 7.54,
      end: 9.24,
      text: 'An Unexpected Party '
    },
    '4': {
      start: '',
      end: '',
      text: ''
    },
    '5': {
      start: 16.37,
      end: 19.06,
      text: 'Not a nasty, dirty, wet hole, '
    },
    '6': {
      start: 19.13,
      end: 21.98,
      text: 'filled with the ends of worms  and an oozy smell, '
    },
    '7': {
      start: 21.98,
      end: 27.29,
      text: 'nor yet a dry, bare, sandy hole  with nothing in it to sit down on  or to eat: '
    },
    '8': {
      start: 28.05,
      end: 29.56,
      text: 'it was a hobbit-hole, '
    },
    '9': {
      start: 29.56,
      end: 31.73,
      text: 'and that means comfort.'
    }
  }

  expect(plainTextToPhrasesObject(timing, text)).toEqual(phrases)
})

const phrases = {
  ovkn4s83m5o: {
    start: 0.04,
    end: 1.11,
    text: 'first phrase'
  },
  '6ok7g02flig': {
    start: 4.35,
    end: 5.63,
    text: 'second phrase'
  },
  '7rmfpjlqrhg': {
    start: 7.54,
    end: 9.24,
    text: 'third phrase'
  },
  a5enr655fvo: {
    start: 13.08,
    end: 15.74,
    text: '4th phrase'
  },
  g6ass5deea8: {
    start: 16.37,
    end: 19.06,
    text: '5th phrase'
  },
  hbo8c1cmrio: {
    start: 19.13,
    end: 21.98,
    text: '6th phrase'
  },
  nh16hivul3g: {
    start: 21.98,
    end: 27.29,
    text: '7th phrase'
  },
  nrn9em65dv: {
    start: 28.05,
    end: 29.56,
    text: '8th phrase'
  },
  '3m2afac1d9o': {
    start: 29.56,
    end: 31.73,
    text: '9th phrase'
  }
}

it.skip('assSubtitlesToPhrases (doesnt work because of random values)', () => {
  const subtitles = `Dialogue: 0,0:00:00.04,0:00:01.11,Default,,0,0,0,,first phrase
Dialogue: 0,0:00:04.35,0:00:05.63,Default,,0,0,0,,second phrase
Dialogue: 0,0:00:07.54,0:00:09.24,Default,,0,0,0,,third phrase
Dialogue: 0,0:00:13.08,0:00:15.74,Default,,0,0,0,,4th phrase
Dialogue: 0,0:00:16.37,0:00:19.06,Default,,0,0,0,,5th phrase
Dialogue: 0,0:00:19.13,0:00:21.98,Default,,0,0,0,,6th phrase
Dialogue: 0,0:00:21.98,0:00:27.29,Default,,0,0,0,,7th phrase
Dialogue: 0,0:00:28.05,0:00:29.56,Default,,0,0,0,,8th phrase
Dialogue: 0,0:00:29.56,0:00:31.73,Default,,0,0,0,,9th phrase
`

  expect(assSubtitlesToPhrases(subtitles)).toEqual(phrases)
})

it('rewritePhrasesWithText ', () => {
  const phrases = {
    ovkn4s83m5o: {
      start: 0.04,
      end: 1.11,
      text: 'first phrase'
    },
    '6ok7g02flig': {
      start: 4.35,
      end: 5.63,
      text: 'second phrase'
    },
    '7rmfpjlqrhg': {
      start: 7.54,
      end: 9.24,
      text: 'third phrase'
    },
    a5enr655fvo: {
      start: 13.08,
      end: 15.74,
      text: '4th phrase'
    },
    g6ass5deea8: {
      start: 16.37,
      end: 19.06,
      text: '5th phrase'
    },
    hbo8c1cmrio: {
      start: 19.13,
      end: 21.98,
      text: '6th phrase'
    },
    nh16hivul3g: {
      start: 21.98,
      end: 27.29,
      text: '7th phrase'
    },
    nrn9em65dv: {
      start: 28.05,
      end: 29.56,
      text: '8th phrase'
    },
    '3m2afac1d9o': {
      start: 29.56,
      end: 31.73,
      text: '9th phrase'
    }
  }

  const text = `rewrited 1
rewrited 2
rewrited 3
rewrited 4
rewrited 5
rewrited 6
rewrited 7
rewrited 8
rewrited 9
`
  /*   const rewritedPhrasesArray = [
    { end: 1.11, id: 'ovkn4s83m5o', start: 0.04, text: 'rewrited 1' },
    { end: 5.63, id: '6ok7g02flig', start: 4.35, text: 'rewrited 2' },
    { end: 9.24, id: '7rmfpjlqrhg', start: 7.54, text: 'rewrited 3' },
    { end: 15.74, id: 'a5enr655fvo', start: 13.08, text: 'rewrited 4' },
    { end: 19.06, id: 'g6ass5deea8', start: 16.37, text: 'rewrited 5' },
    { end: 21.98, id: 'hbo8c1cmrio', start: 19.13, text: 'rewrited 6' },
    { end: 27.29, id: 'nh16hivul3g', start: 21.98, text: 'rewrited 7' },
    { end: 29.56, id: 'nrn9em65dv', start: 28.05, text: 'rewrited 8' },
    { end: 31.73, id: '3m2afac1d9o', start: 29.56, text: 'rewrited 9' }
  ] */

  const rewritedPhrasesObject = {
    ovkn4s83m5o: { end: 1.11, start: 0.04, text: 'rewrited 1' },
    '6ok7g02flig': { end: 5.63, start: 4.35, text: 'rewrited 2' },
    '7rmfpjlqrhg': { end: 9.24, start: 7.54, text: 'rewrited 3' },
    a5enr655fvo: { end: 15.74, start: 13.08, text: 'rewrited 4' },
    g6ass5deea8: { end: 19.06, start: 16.37, text: 'rewrited 5' },
    hbo8c1cmrio: { end: 21.98, start: 19.13, text: 'rewrited 6' },
    nh16hivul3g: { end: 27.29, start: 21.98, text: 'rewrited 7' },
    nrn9em65dv: { end: 29.56, start: 28.05, text: 'rewrited 8' },
    '3m2afac1d9o': { end: 31.73, start: 29.56, text: 'rewrited 9' }
  }

  expect(writePhrasesWithText(phrases, text, 'original')).toEqual(rewritedPhrasesObject)
})

it('writePhrasesWithText translations', () => {
  const phrases = {
    ovkn4s83m5o: {
      start: 0.04,
      end: 1.11,
      text: 'first phrase'
    },
    '6ok7g02flig': {
      start: 4.35,
      end: 5.63,
      text: 'second phrase'
    },
    '7rmfpjlqrhg': {
      start: 7.54,
      end: 9.24,
      text: 'third phrase'
    },
    a5enr655fvo: {
      start: 13.08,
      end: 15.74,
      text: '4th phrase'
    },
    g6ass5deea8: {
      start: 16.37,
      end: 19.06,
      text: '5th phrase'
    },
    hbo8c1cmrio: {
      start: 19.13,
      end: 21.98,
      text: '6th phrase'
    },
    nh16hivul3g: {
      start: 21.98,
      end: 27.29,
      text: '7th phrase'
    },
    nrn9em65dv: {
      start: 28.05,
      end: 29.56,
      text: '8th phrase'
    },
    '3m2afac1d9o': {
      start: 29.56,
      end: 31.73,
      text: '9th phrase'
    }
  }

  const writedTranslationObject = {
    ovkn4s83m5o: { text: 'Хоббит' },
    '6ok7g02flig': { text: 'Глава 1.' },
    '7rmfpjlqrhg': { text: 'Неожиданные гости' },
    a5enr655fvo: { text: 'в норе под землей: «в земле»;  жил-был хоббит. ' },
    g6ass5deea8: { text: 'не в отвратительной, грязной, мокрой норе, ' },
    hbo8c1cmrio: { text: 'заполненной хвостами червей  и затхлым запахом тины ' },
    nh16hivul3g: { text: 'но и не в сухой, голой, песчаной норе, не на чем посидеть или съесть:' },
    nrn9em65dv: { text: 'это была нора хоббита, ' },
    '3m2afac1d9o': {
      text: 'а это значит — комфортная /нора/.  #comfort — утешение, успокоение; уют'
    }
  }

  const translationText = `Хоббит
Глава 1.
Неожиданные гости
в норе под землей: «в земле»;  жил-был хоббит. 
не в отвратительной, грязной, мокрой норе, 
заполненной хвостами червей  и затхлым запахом тины 
но и не в сухой, голой, песчаной норе, не на чем посидеть или съесть:
это была нора хоббита, 
а это значит — комфортная /нора/.  #comfort — утешение, успокоение; уют
  `

  expect(writePhrasesWithText(phrases, translationText, 'translation')).toEqual(
    writedTranslationObject
  )
})
