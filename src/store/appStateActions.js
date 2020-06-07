import { actionTypes } from 'redux-firestore'

export const clearCachedDocs = () => {
    return { type: actionTypes.CLEAR_DATA, preserve: { ordered: true } }
}

/**
 * 
 *@example
 const examplesetAppStateParamToTrue = {
  type: 'SET_APP_STATE_PARAM',
  payload: { showHeadingDrawer: true }
}

const examplesetAppStateParamToFalse = {
  type: 'SET_APP_STATE_PARAM',
  payload: { showHeadingDrawer: false }
}

const examplesetAppStateParamToFalse = {
  type: 'SET_APP_STATE_PARAM',
  payload: { showFullscreenDialog: true }
} 
 */
export const setAppStateParams = (payload) => {
    return {
        type: 'SET_APP_STATE_PARAMS',
        payload,
    }
}