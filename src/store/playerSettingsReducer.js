const initState = {
  /*display*/
  showSlideshow: true,
  showWaveform: true,
  showOriginalText: true,
  showTranslation: true,
  /*playback*/
  volume: 1,
  playbackRate: 1,
  /*dictation*/
  dictationRepeats: 2,
  dictationDelay: 2,
  waveformZoom: 20,
  sticked: false
}

const playerSettingsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_SETTINGS': {
      const [key, value] = action.payload // ['volume', 55]
      return { ...state, [key]: value }
    }
    default:
      return state
  }
}

export default playerSettingsReducer
