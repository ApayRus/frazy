const initState = { showHeadingDrawer: false, showSettingsDrawer: false }

const appStateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_APP_STATE_PARAM': {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

export default appStateReducer
