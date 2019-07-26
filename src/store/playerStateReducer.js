const initState = {
  currentPhraseNum: 0,
  currentPhraseId: '',
  currentTime: 0,
  play: false
}

const playerStateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_STATE': {
      const [key, value] = action.payload // ['currentTime', 18.38]
      return { ...state, [key]: value }
    }
    default:
      return state
  }
}

export default playerStateReducer
