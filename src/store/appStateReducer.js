const initState = { showHeadingDrawer: false }

const appStateReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_HEADING_DRAWER': {
      console.log('TOGGLE_HEADING_DRAWER', action.payload)
      const showHeadingDrawer = action.payload.showHeadingDrawer
      return { ...state, showHeadingDrawer }
    }

    default:
      return state
  }
}

export default appStateReducer
