const initState = {
    showHeadingDrawer: false,
    showSettingsDrawer: false,
    showFullscreenDialog: false,
    langsUserInterestedIn: [],
    editMode: false
}

const appStateReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_APP_STATE_PARAMS':
            {
                return {...state, ...action.payload }
            }
        default:
            return state
    }
}

export default appStateReducer