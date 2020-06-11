import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './Wavesurfer.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import wavesurferModule from '../wavesurfer/wavesurfer'
import youtubeModule from '../youtube/youtube'
import ControlsPanel from './materialForm/ControlsPanel'
import { map } from 'lodash'

function Waveform(props) {
  let waveformElem = useRef(),
    timelineElem = useRef()
  const [isReady, setIsReady] = useState(false)
  const { phrases, mediaLinkUrl, youtubeId, waveformRenderProgress, trLang } = useSelector(
    state => state.pageContent
  )
  const { showWaveform, sticked } = useSelector(state => state.playerSettings)
  const { editMode } = useSelector(state => state.appState)

  //mediaLink changed
  useEffect(() => {
    //component will mount
    setIsReady(false)
    const initWaveform = url => {
      wavesurferModule.wavesurfer = wavesurferModule.init(
        waveformElem.current,
        timelineElem.current,
        url,
        phrases
      )
      wavesurferModule.wavesurfer.on('ready', e => {
        if (youtubeId) {
          youtubeModule.initWavesurfer(wavesurferModule.wavesurfer)
        }
        setIsReady(true)
      })
    }

    if (mediaLinkUrl) {
      initWaveform(mediaLinkUrl)
    }

    return () => {
      //component will UNmount
      if (mediaLinkUrl) {
        wavesurferModule.wavesurfer.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLinkUrl])

  //phrases changed
  useEffect(() => {
    const wavesurfer = wavesurferModule.wavesurfer
    const updateRegionsInWaveform = () => {
      phrases.forEach(elem => {
        const { id, text = '', start, end, translations = {} } = elem || {}
        const { text: trText = '' } = translations[trLang] || {}
        const label1 = text.replace(/<.+?>/g, '')
        const label2 = trText.replace(/<.+?>/g, '')
        const region = wavesurferModule.wavesurfer.regions.list[id]
        if (region) {
          region.update({ start, end, attributes: { label1, label2 } })
        }
      })
    }

    const deleteRegions = regionsForDelete => {
      regionsForDelete.forEach(id => {
        const region = wavesurferModule.wavesurfer.regions.list[id]
        region.remove()
      })
    }

    const createNewRegions = newPhrases => {
      newPhrases.forEach(elem => {
        wavesurfer.regions.add(elem)
      })
    }

    if (wavesurfer) {
      const regions = Object.keys(wavesurfer.regions.list)
      const regionsCount = regions.length
      const newPhrasesCount = phrases.length - regionsCount
      if (newPhrasesCount > 2 && regionsCount === 0) {
        //it is import of subtitles
        if (wavesurfer.isReady) {
          createNewRegions(phrases)
        }
      } else if (newPhrasesCount > 0 && regionsCount > 0 && newPhrasesCount <= regionsCount) {
        //it is cloning of phrases
        const newPhrases = phrases.filter(elem => !regions.includes(elem.id))
        createNewRegions(newPhrases)
      } else if (newPhrasesCount < 0) {
        //it is deleting
        const phrasesIds = map(phrases, 'id')
        const regionsForDelete = regions.filter(regionId => !phrasesIds.includes(regionId))
        deleteRegions(regionsForDelete)
      } else {
        //textarea changed
        updateRegionsInWaveform()
      }
    }
  }, [phrases, trLang])

  useEffect(() => {
    const { wavesurfer } = wavesurferModule
    if (wavesurfer) {
      const regions = wavesurfer.regions.list

      if (editMode) {
        for (let id in regions) {
          regions[id].update({ drag: true, resize: true })
        }
        wavesurfer.enableDragSelection(true)
      } else {
        for (let id in regions) {
          regions[id].update({ drag: false, resize: false })
        }
        wavesurfer.disableDragSelection(true)
      }
    }
  }, [editMode, isReady])

  return (
    <div
      className='waveform'
      style={{
        display: !showWaveform ? 'none' : '',
        position: sticked ? 'sticky' : 'unset',
        top: 0,
        backgroundColor: 'white',
        zIndex: 2
      }}
    >
      {!isReady && (
        <div style={{ textAlign: 'center' }}>
          <Typography variant='body2' color='textSecondary'>
            Waveform rendering...
          </Typography>
          <CircularProgress value={waveformRenderProgress} variant='static' color='secondary' />
        </div>
      )}
      <div style={isReady ? {} : { visibility: 'hidden' }}>
        <div ref={waveformElem} />
        <div ref={timelineElem} />
        <ControlsPanel />
      </div>
    </div>
  )
}

export default Waveform
