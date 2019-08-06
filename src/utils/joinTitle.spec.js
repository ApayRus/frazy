import { joinTitle } from './joinTitle'

it('join titles ', () => {
  const materialInfo = {
    lang: 'en',
    mediaLink: 'hobbit/hobbit1_5.mp3',
    title: '1.5. Eating, eating, talking, talking',
    unit: 'hobbit'
  }

  const translationInfo = {
    for: 'hobbit1_5',
    lang: 'ru',
    title: '1.5. Ели, ели, разговаривали, разговаривали'
  }

  const title = {
    text: '1.5. Eating, eating, talking, talking',
    translations: { ru: '1.5. Ели, ели, разговаривали, разговаривали' }
  }

  expect(joinTitle(materialInfo, translationInfo)).toEqual(title)
})
