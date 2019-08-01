import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'

import store from '../store/rootReducer'
import { setPlayerState } from '../store/playerStateActions'

let wavesurfer

const init = (waveformConteiner, timelineContainer, mediaLink, phrasesArray0, readOnly) => {
  const readModeRegionOptions = { drag: false, resize: false } // should be added to each region
  let phrasesArray = phrasesArray0
  let dragSelection = true

  if (readOnly) {
    phrasesArray = phrasesArray0.map(elem => ({ ...elem, ...readModeRegionOptions }))
    dragSelection = false
  }

  wavesurfer = WaveSurfer.create({
    container: waveformConteiner,
    scrollParent: true,
    //   minPxPerSec: 200,
    plugins: [
      RegionsPlugin.create({
        regions: phrasesArray,
        dragSelection
      }),
      TimelinePlugin.create({
        container: timelineContainer
      })
    ]
  })

  wavesurfer.load(mediaLink)

  wavesurfer.on('region-click', (region, e) => {
    e.stopPropagation()
    region.play()
  })

  wavesurfer.on('region-in', region => {
    const { id } = region
    store.dispatch(setPlayerState(['currentPhraseId', id]))
  })

  wavesurfer.on('region-out', region => {
    //console.log('region out', region.id)
  })

  wavesurfer.on('play', () => {
    store.dispatch(setPlayerState(['play', true]))
  })
  wavesurfer.on('pause', () => {
    store.dispatch(setPlayerState(['play', false]))
  })

  return wavesurfer
}

export default { wavesurfer, init }
