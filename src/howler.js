import { Howl, Howler } from 'howler'
import { exampleChapter } from './dumyData/exampleChapter'

// console.log('exampleChapter', exampleChapter)
const sprite = {}
const { phrases, audioLink } = exampleChapter

for (let key in phrases) {
  const { start, end } = phrases[key] //in seconds
  const spriteStart = start * 1000
  const duration = (end - start) * 1000
  sprite[key] = [spriteStart, duration]
}

// console.log('sprite', sprite)

const audio = new Howl({
  src: [audioLink],
  sprite
})

export { audio }
