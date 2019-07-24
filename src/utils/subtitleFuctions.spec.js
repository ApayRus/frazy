import { assRowToPhraseObject } from './subtitlesFunctions'

it('assRow -> seconds', () => {
  expect(
    assRowToPhraseObject(
      `Dialogue: 0,0:16:03.74,0:16:05.70,Default,,0,0,0,,short practice of surgery`
    )
  ).toEqual({ start: 963.74, end: 965.7, text: 'short practice of surgery' })
})
