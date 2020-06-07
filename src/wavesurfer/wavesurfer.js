import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min'
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min'
import { randomColor } from '../utils/phrases'
import store from '../store/rootReducer'
import { setPlayerState } from '../store/playerStateActions'
import { setPageParameters } from '../store/pageContentActions'
import { map, orderBy } from 'lodash'

import soundtouch from './soundtouchFilter'

let wavesurfer

const init = (waveformConteiner, timelineContainer, mediaLink, phrasesArray0, readOnly) => {
    const readModeRegionOptions = { drag: false, resize: false } // should be added to each region
    let phrasesArray = phrasesArray0
    let dragSelection = true

    if (readOnly) {
        phrasesArray = phrasesArray0.map((elem) => ({
            ...elem,
            ...readModeRegionOptions
        }))
        dragSelection = false
    }

    wavesurfer = WaveSurfer.create({
        container: waveformConteiner,
        scrollParent: true,
        //   minPxPerSec: 200,
        plugins: [
            RegionsPlugin.create({
                regions: phrasesArray,
                dragSelection,
            }),
            TimelinePlugin.create({
                container: timelineContainer,
            }),
        ],
    })

    wavesurfer.load(mediaLink)

    // console.log('wavesurfer', wavesurfer)

    wavesurfer.on('region-click', (region, e) => {
        e.stopPropagation()
        region.play()
    })

    wavesurfer.on('region-in', (region) => {
        const { id } = region
        store.dispatch(setPlayerState(['currentPhraseId', id]))
    })

    wavesurfer.on('region-out', (region) => {
        //console.log('region out', region.id)
    })

    wavesurfer.on('play', () => {
        store.dispatch(setPlayerState(['play', true]))
    })
    wavesurfer.on('pause', () => {
        store.dispatch(setPlayerState(['play', false]))
    })
    wavesurfer.on('loading', (progress) => {
        store.dispatch(setPageParameters({ 'waveformRenderProgress': progress }))
    })

    // edit mode

    const regionsToPhrasesArray = () => {
        const { phrases: oldPhrases } = store.getState().pageContent
        let phrases = map(wavesurfer.regions.list, (elem, key) => {
            const { start, end, color } = elem
            const id = key
                /*       console.log('text', text)
                console.log('trText', trText) */
            const oldPhrase = oldPhrases.find((elem) => id === elem.id)
            return {...oldPhrase, id, start, end, color }
        })
        phrases = orderBy(phrases, 'start')
        store.dispatch(setPageParameters({ 'phrases': phrases }))
    }

    wavesurfer.on('region-update-end', (region) => {
        console.log('region-update-end')
        regionsToPhrasesArray()
    })

    wavesurfer.on('region-created', (region) => {
        region.update({ color: randomColor(0.5) })
    })

    wavesurfer.on('region-dblclick', (region) => {
        // region.remove()
        let { selectedPhrases } = store.getState().pageContent
        if (selectedPhrases.includes(region.id)) {
            selectedPhrases = selectedPhrases.filter((elem) => elem !== region.id)
        } else {
            selectedPhrases = selectedPhrases.concat(region.id)
        }
        store.dispatch(setPageParameters({ 'selectedPhrases': selectedPhrases }))
    })

    wavesurfer.on('region-removed', (region) => {
        regionsToPhrasesArray()
    })

    // Time stretcher (preserve pitch on speeds != 1 )
    wavesurfer.on('ready', function() {
        store.dispatch(setPageParameters({ 'duration': +wavesurfer.getDuration().toFixed(3) }))
        var st = new soundtouch.SoundTouch(wavesurfer.backend.ac.sampleRate)
        var buffer = wavesurfer.backend.buffer
        var channels = buffer.numberOfChannels
        var l = buffer.getChannelData(0)
        var r = channels > 1 ? buffer.getChannelData(1) : l
        var length = buffer.length
        var seekingPos = null
        var seekingDiff = 0

        var source = {
            extract: function(target, numFrames, position) {
                if (seekingPos != null) {
                    seekingDiff = seekingPos - position
                    seekingPos = null
                }

                position += seekingDiff

                for (var i = 0; i < numFrames; i++) {
                    target[i * 2] = l[i + position]
                    target[i * 2 + 1] = r[i + position]
                }

                return Math.min(numFrames, length - position)
            },
        }

        var soundtouchNode

        wavesurfer.on('play', function() {
            seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length)
            st.tempo = wavesurfer.getPlaybackRate()

            if (st.tempo === 1) {
                wavesurfer.backend.disconnectFilters()
            } else {
                if (!soundtouchNode) {
                    var filter = new soundtouch.SimpleFilter(source, st)
                    soundtouchNode = soundtouch.getWebAudioNode(wavesurfer.backend.ac, filter)
                }
                wavesurfer.backend.setFilter(soundtouchNode)
            }
        })

        wavesurfer.on('pause', function() {
            soundtouchNode && soundtouchNode.disconnect()
        })

        wavesurfer.on('seek', function() {
            seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length)
        })
    })

    const { playbackRate, volume } = store.getState().playerSettings

    wavesurfer.setPlaybackRate(playbackRate)
    wavesurfer.setVolume(volume)

    return wavesurfer
}

export default { wavesurfer, init }