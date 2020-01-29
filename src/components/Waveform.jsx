import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './Wavesurfer.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import wavesurferModule from '../wavesurfer/wavesurfer'
import { afterFirebaseFileDownloadUrlReady } from '../utils/firebase'

function Waveform(props) {
  let waveformElem = useRef(),
    timelineElem = useRef()
  const [isReady, setIsReady] = useState(false)
  const { phrases, mediaLink, waveformRenderProgress, trLang } = useSelector(
    state => state.pageContent
  )
  const { readOnly } = props

  //mediaLink changed
  useEffect(() => {
    //component will mount
    setIsReady(false)
    const initWaveform = url => {
      wavesurferModule.wavesurfer = wavesurferModule.init(
        waveformElem.current,
        timelineElem.current,
        url,
        phrases,
        readOnly
      )
      wavesurferModule.wavesurfer.on('ready', e => {
        setIsReady(true)
      })
    }

    if (mediaLink.match('http')) {
      initWaveform(mediaLink)
    } else {
      afterFirebaseFileDownloadUrlReady(mediaLink, url => {
        initWaveform(url)
      })
    }

    return () => {
      //component will UNmount
      if (mediaLink) {
        wavesurferModule.wavesurfer.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaLink])

  //phrases changed
  useEffect(() => {
    const wavesurfer = wavesurferModule.wavesurfer

    const updateRegionsInWaveform = () => {
      phrases.forEach(elem => {
        const { id, text, start, end, translations: { [trLang]: trText = '' } = {} } = elem || {}
        const label1 = text || ''
        const label2 = trText
        const region = wavesurferModule.wavesurfer.regions.list[id]
        if (region) {
          region.update({ start, end, attributes: { label1, label2 } })
        }
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
        console.log('newPhrasesCount', newPhrasesCount)
        if (wavesurfer.isReady) {
          createNewRegions(phrases)
        }
      } else if (newPhrasesCount > 0 && regionsCount > 0 && newPhrasesCount <= regionsCount) {
        //it is cloning of phrases
        console.log('it is cloning')
        const newPhrases = phrases.filter(elem => !regions.includes(elem.id))
        createNewRegions(newPhrases)
      } else {
        //textarea changed
        console.log('newPhrasesCount', newPhrasesCount)
        updateRegionsInWaveform()
      }
    }
  }, [phrases, trLang])

  return (
    <div className='waveform'>
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
      </div>
    </div>
  )
}

export default Waveform
