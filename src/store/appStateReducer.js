const initState = { showHeadingDrawer: false, showSettingsDrawer: false }

const appStateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_HEADING_DRAWER': {
      const showHeadingDrawer = action.payload.showHeadingDrawer
      return { ...state, showHeadingDrawer }
    }
    case 'TOGGLE_SETTINGS_DRAWER': {
      const showSettingsDrawer = action.payload.showSettingsDrawer
      return { ...state, showSettingsDrawer }
    }

    default:
      return state
  }
}

export default appStateReducer
