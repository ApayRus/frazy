import { writePhrasesWithText } from './plainTextToPhrasesObject'
import { assToPhrases, tsvToPhrases } from './phrases'
//doesnt work because of random values
it.skip('assSubtitlesToPhrases', () => {
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

  const { subtitles } = {
    subtitles: `Dialogue: 0,0:00:00.04,0:00:01.11,Default,,0,0,0,,first phrase
Dialogue: 0,0:00:04.35,0:00:05.63,Default,,0,0,0,,second phrase
Dialogue: 0,0:00:07.54,0:00:09.24,Default,,0,0,0,,third phrase
Dialogue: 0,0:00:13.08,0:00:15.74,Default,,0,0,0,,4th phrase
Dialogue: 0,0:00:16.37,0:00:19.06,Default,,0,0,0,,5th phrase
Dialogue: 0,0:00:19.13,0:00:21.98,Default,,0,0,0,,6th phrase
Dialogue: 0,0:00:21.98,0:00:27.29,Default,,0,0,0,,7th phrase
Dialogue: 0,0:00:28.05,0:00:29.56,Default,,0,0,0,,8th phrase
Dialogue: 0,0:00:29.56,0:00:31.73,Default,,0,0,0,,9th phrase
`
  }
  expect(assToPhrases(subtitles)).toEqual(phrases)
})

it('writePhrasesWithText (original text) ', () => {
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

  const { text } = {
    text: `rewrited 1
rewrited 2
rewrited 3
rewrited 4
rewrited 5
rewrited 6
rewrited 7
rewrited 8
rewrited 9
`
  }

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

  const { translationText } = {
    translationText: `Хоббит
Глава 1.
Неожиданные гости
в норе под землей: «в земле»;  жил-был хоббит. 
не в отвратительной, грязной, мокрой норе, 
заполненной хвостами червей  и затхлым запахом тины 
но и не в сухой, голой, песчаной норе, не на чем посидеть или съесть:
это была нора хоббита, 
а это значит — комфортная /нора/.  #comfort — утешение, успокоение; уют
  `
  }

  expect(writePhrasesWithText(phrases, translationText, 'translation')).toEqual(
    writedTranslationObject
  )
})

it.skip('tsv to phrases', () => {
  const tsvText = `0,029705	1,616553	1
2,005215	3,153061	2
3,910884	5,028798	3
  `
  const phrases = {
    '1': { start: 0.3, end: 1.62, text: '1' },
    '2': { start: 2.01, end: 3.15, text: '2' },
    '3': { start: 3.91, end: 5.03, text: '3' }
  }

  expect(tsvToPhrases(tsvText)).toEqual(phrases)
})
