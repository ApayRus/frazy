import React, { useRef } from 'react'
import PlayerControls from './PlayerControls'
import Phrases from './Phrases'
import Waveform from './Waveform'
import { connect } from 'react-redux'
import PlayerSlideShow from './PlayerSlideShow'

function UnitPage(props) {
  const { phrasesArray, mediaLink } = props
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
          <PlayerControls play={play} pause={pause} playPhrase={playPhrase} />
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
    mediaLink: state.pageContent.mediaLink
  }
}

export default connect(mapStateToProps)(UnitPage)
