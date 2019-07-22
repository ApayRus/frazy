/**
 *
 * @param {array} payload - ['nameOfParam', value]
 *
 */
export const setPlayerSettings = payload => {
  return {
    type: 'SET_PLAYER_SETTINGS',
    payload
  }
}

/* 
const exampleSetPlayerSettingsVolume = {
  type: 'SET_PLAYER_SETTINGS',
  payload: ['volume', 50]
}

const exampleSetPlayerSettingsShowPlayer = {
  type: 'TOGGLE_HEADING_DRAWER',
  payload: ['showPlayer', false]
}
 */
