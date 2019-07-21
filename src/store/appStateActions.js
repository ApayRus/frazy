export const toggleHeadingDrawer = payload => {
  return {
    type: 'TOGGLE_HEADING_DRAWER',
    payload
  }
}

export const toggleSettingsDrawer = payload => {
  return {
    type: 'TOGGLE_SETTINGS_DRAWER',
    payload
  }
}

/* 
const exampleToggleHeadingDrawerToTrue = {
  type: 'TOGGLE_HEADING_DRAWER',
  payload: { showHeadingDrawer: true }
}

const exampleToggleHeadingDrawerToFalse = {
  type: 'TOGGLE_HEADING_DRAWER',
  payload: { showHeadingDrawer: false }
}
 */
