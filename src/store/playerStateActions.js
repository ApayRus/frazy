/**
 *
 * @param {array} payload - ['nameOfParam', value]
 *@example
 const exampleSetCurrentPhraseNum = {
  type: 'SET_PLAYER_STATE',
  payload: ['currentPhraseNum', 8]
}
 */
export const setPlayerState = payload => {
  return {
    type: 'SET_PLAYER_STATE',
    payload
  }
}
