import React, { useRef } from 'react'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import Waveform from './Waveform'
import { connect } from 'react-redux'
import PlayerSlideShow from './PlayerSlideShow'

function UnitPage(props) {
  const { phrasesArray, mediaLink, currentPhraseNum } = props
  const waveformComponent = useRef(null)

  const play = () => {
    waveformComponent.current.wavesurfer.play()
  }

  const pause = () => {
    waveformComponent.current.wavesurfer.pause()
  }

  const playPhrase = id => event => {
    waveformComponent.current.wavesurfer.regions.list[id].play()
  }

  const playNext = () => {
    const { id: nextId } = phrasesArray[currentPhraseNum + 1]

    playPhrase(nextId)(null)
  }

  const playPrev = () => {
    const { id: prevId } = phrasesArray[currentPhraseNum - 1]
    playPhrase(prevId)(null)
  }

  const playerMethods = { play, pause, playPhrase, playNext, playPrev }

  return (
    <div>
      {mediaLink ? (
        <div>
          <Waveform
            readOnly
            mediaLink={mediaLink}
            phrasesArray={phrasesArray}
            ref={waveformComponent}
          />
          <PlayerSlideShow phrasesArray={phrasesArray} />
          <PlayerControls {...playerMethods} />
          <Phrases phrasesArray={phrasesArray} playPhrase={playPhrase} />
        </div>
      ) : (
        <div style={{ marginTop: 200 }}>
          {phrasesArray.length ? '' : <p>Select chapter from heading menu</p>}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    phrasesArray: state.pageContent.phrasesArray,
    mediaLink: state.pageContent.mediaLink,
    currentPhraseNum: state.playerState.currentPhraseNum
  }
}

export default connect(mapStateToProps)(UnitPage)
