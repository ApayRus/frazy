const initState = {
  /*display*/
  showPlayer: true,
  showOriginalText: true,
  showTranslation: true,
  /*playback*/
  volume: 100,
  playbackRate: 1,
  /*dictation*/
  dictationRepeats: 2,
  dictationDelay: 2
}

const playerSettingsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_SETTINGS': {
      console.log('SET_PLAYER_SETTINGS', action.payload)
      const [key, value] = action.payload // ['volume', 55]
      return { ...state, [key]: value }
    }
    default:
      return state
  }
}

export default playerSettingsReducer
