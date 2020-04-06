import { actionTypes } from 'redux-firestore'

export const clearCachedDocs = () => {
  return { type: actionTypes.CLEAR_DATA, preserve: { ordered: true } }
}

export const setAppStateParam = (payload) => {
  return {
    type: 'SET_APP_STATE_PARAM',
    payload,
  }
}

/* 
const examplesetAppStateParamToTrue = {
  type: 'TOGGLE_HEADING_DRAWER',
  payload: { showHeadingDrawer: true }
}

const examplesetAppStateParamToFalse = {
  type: 'TOGGLE_HEADING_DRAWER',
  payload: { showHeadingDrawer: false }
}
 */
