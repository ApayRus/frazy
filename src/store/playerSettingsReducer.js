const initState = {
  /*display*/
  showPlayer: true,
  showOriginalText: false,
  showTranslation: true,
  /*playback*/
  volume: 40,
  playbackRate: 50,
  /*dictation*/
  dictationRepeats: 60,
  dictationDelay: 70
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
